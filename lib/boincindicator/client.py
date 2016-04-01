#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# client.py - Somewhat higher-level GUI_RPC API for BOINC core client
#
#    Copyright (C) 2013 Rodrigo Silva (MestreLion) <linux@rodrigosilva.com>
#    Further modifications for Zoetrope project (C) 2016 David Wilson <davidwil@posteo.de>
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License
#    along with this program. See <http://www.gnu.org/licenses/gpl.html>

# Based on client/boinc_cmd.cpp

import lib.boincindicator.rpc as rpc

import lib.boincindicator.enums.RunMode as runmode

import lib.boincindicator.resulttypes.AvailableProject as availableproject
import lib.boincindicator.resulttypes.CcStatus as ccstatus
import lib.boincindicator.resulttypes.DailyTransfer as dailytransfer
import lib.boincindicator.resulttypes.DiskUsage as diskusage
import lib.boincindicator.resulttypes.GlobalPreferences as globalpreferences
import lib.boincindicator.resulttypes.HostInfo as hostinfo
import lib.boincindicator.resulttypes.LookupAccountPoll as lookupaccountpoll
import lib.boincindicator.resulttypes.Message as message
import lib.boincindicator.resulttypes.Notice as notice
import lib.boincindicator.resulttypes.Result as result
import lib.boincindicator.resulttypes.JoinedProject as joinedproject
import lib.boincindicator.resulttypes.VersionInfo as versioninfo

import lib.boincindicator.util.xmlutil as xmlutil

import socket
import hashlib
import time

from xml.etree import ElementTree

GUI_RPC_PASSWD_FILE = "/etc/boinc-client/gui_rpc_auth.cfg"


class BoincClient(object):

    def __init__(self, host="", passwd=None):
        host = host.split(':', 1)

        self.hostname   = host[0]
        self.port       = int(host[1]) if len(host)==2 else 0
        self.passwd     = passwd
        self.rpc        = rpc.Rpc(text_output=False)
        self.version    = None
        self.authorized = False

        # Informative, not authoritative. Records status of *last* RPC call,
        # but does not infer success about the *next* one.
        # Thus, it should be read *after* an RPC call, not prior to one
        self.connected = False

    def __enter__(self): self.connect(); return self
    def __exit__(self, *args): self.disconnect()

    def connect(self):
        try:
            self.rpc.connect(self.hostname, self.port)
            self.connected = True
        except socket.error:
            self.connected = False
            return
        self.authorized = self.authorize(self.passwd)
        self.version = self.exchange_versions()

    def disconnect(self):
        self.rpc.disconnect()

    def authorize(self, password):
        ''' Request authorization. If password is None and we are connecting
            to localhost, try to read password from the local config file
            GUI_RPC_PASSWD_FILE. If file can't be read (not found or no
            permission to read), try to authorize with a blank password.
            If authorization is requested and fails, all subsequent calls
            will be refused with socket.error 'Connection reset by peer' (104).
            Since most local calls do no require authorization, do not attempt
            it if you're not sure about the password.
        '''
        if password is None and not self.hostname:
            password = read_gui_rpc_password() or ""
        nonce = self.rpc.call('<auth1/>').text
        hashstr = '{nonce}{password}'.format(nonce=nonce, password=password).encode('utf-8')
        hash = hashlib.md5(hashstr).hexdigest().lower()
        reply = self.rpc.call('<auth2><nonce_hash>%s</nonce_hash></auth2>' % hash)

        if reply.tag == 'authorized':
            return True
        else:
            return False

    def exchange_versions(self):
        ''' Return VersionInfo instance with core client version info '''
        return versioninfo.VersionInfo.parse(self.rpc.call('<exchange_versions/>'))

    def get_cc_status(self):
        ''' Return CcStatus instance containing basic status, such as
            CPU / GPU / Network active/suspended, etc
        '''
        if not self.connected: self.connect()
        try:
            return ccstatus.CcStatus.parse(self.rpc.call('<get_cc_status/>'))
        except socket.error:
            self.connected = False

    def get_cc_config(self):
        ''' The get_cc_config RPC call returns an xml document similar to:

        <cc_config>
          <log_flags>
            <task>1</task>
            <file_xfer>1</file_xfer>
            <sched_ops>1</sched_ops>
          </log_flags>
        </cc_config>
        '''
        result = self.rpc.call('<get_cc_config />')
        print(ElementTree.tostring(result))

    def get_host_info(self):
        ''' Get information about host hardware and usage. '''
        return hostinfo.HostInfo.parse(self.rpc.call('<get_host_info/>'))

    def get_tasks(self):
        ''' Same as get_results(active_only=False) '''
        return self.get_results(False)

    def get_results(self, active_only=False):
        ''' Get a list of results.
            Those that are in progress will have information such as CPU time
            and fraction done. Each result includes a name;
            Use CC_STATE::lookup_result() to find this result in the current static state;
            if it's not there, call get_state() again.
        '''
        reply = self.rpc.call("<get_results><active_only>%d</active_only></get_results>"
                               % (1 if active_only else 0))
        if not reply.tag == 'results':
            return []

        results = []
        for item in list(reply):
            results.append(result.Result.parse(item))

        return results

    def set_mode(self, component, mode, duration=0):
        ''' Do the real work of set_{run,gpu,network}_mode()
            This method is not part of the original API.
            Valid components are 'run' (or 'cpu'), 'gpu', 'network' (or 'net')
        '''
        component = component.replace('cpu','run')
        component = component.replace('net','network')
        try:
            reply = self.rpc.call("<set_%s_mode>"
                                  "<%s/><duration>%f</duration>"
                                  "</set_%s_mode>"
                                  % (component,
                                     runmode.RunMode.name(mode).lower(), duration,
                                     component))
            return (reply.tag == 'success')
        except socket.error:
            return False

    def set_run_mode(self, mode, duration=0):
        ''' Set the run mode (RunMode.NEVER/AUTO/ALWAYS/RESTORE)
            NEVER will suspend all activity, including CPU, GPU and Network
            AUTO will run according to preferences.
            If duration is zero, mode is permanent. Otherwise revert to last
            permanent mode after duration seconds elapse.
        '''
        return self.set_mode('cpu', mode, duration)

    def set_gpu_mode(self, mode, duration=0):
        ''' Set the GPU run mode, similar to set_run_mode() but for GPU only
        '''
        return self.set_mode('gpu', mode, duration)

    def set_network_mode(self, mode, duration=0):
        ''' Set the Network run mode, similar to set_run_mode()
            but for network activity only
        '''
        return self.set_mode('net', mode, duration)

    def run_benchmarks(self):
        ''' Run benchmarks. Computing will suspend during benchmarks '''
        return self.rpc.call('<run_benchmarks/>').tag == "success"

    def quit(self):
        ''' Tell the core client to exit '''
        if self.rpc.call('<quit/>').tag == "success":
            self.connected = False
            return True
        return False

    def abort_result(self, result_name, project_url):
        ''' Abort the given result.

        This command requires authorization in order to run successfully.
        '''
        return self.result_op('abort_result', result_name, project_url)

    def suspend_result(self, result_name, project_url):
        ''' suspend the given result.

        This command requires authorization in order to run successfully.
        '''
        return self.result_op('suspend_result', result_name, project_url)

    def resume_result(self, result_name, project_url):
        ''' resume the given result.

        This command requires authorization in order to run successfully.
        '''
        return self.result_op('resume_result', result_name, project_url)

    def result_op(self, op, result_name, project_url):
        xml = '<{op}>\n<name>{rn}</name>\n<project_url>{pu}</project_url>\n</{op}>'.format(
          op=op,
          rn=result_name,
          pu=project_url
        )
        result = self.rpc.call(xml)
        return result

    def get_all_projects_list(self):
        '''Returns a list of available projects for the client to attach to.

        The get_all_projects_list RPC call returns an xml document similar to:

        <projects>
          <project>
            <name>Radioactive@Home</name>
            <url>http://radioactiveathome.org/boinc/</url>
            <general_area>Distributed sensing</general_area>
            <specific_area>Environmental research</specific_area>
            <description>Radioactive@Home is creating a free and continuously updated map of radiation levels
                  using sensors connected to volunteers\' computers.  You must buy a sensor to participate.</description>
            <home>BOINC Poland Foundation</home>
            <platforms>
              <name>windows_intelx86</name>
              <name>i686-pc-linux-gnu[nci]</name>
              <name>armv7l-unknown-linux-gnueabihf</name>
            </platforms>
            <image>http://boinc.berkeley.edu/images/radioactive.jpg</image>
            <summary>Monitor radiation levels</summary>
          </project>
        </projects>

        There are an arbitrary number of projects. Each project can have an arbitrary number of platforms.
        '''
        xml = '<get_all_projects_list />'
        results = self.rpc.call(xml)
        return map(lambda x: availableproject.AvailableProject.parse(x), xmlutil.parse_list(results))

    def get_project_status(self):
        xml = '<get_project_status />'
        ret = []
        results = self.rpc.call(xml)

        for r in list(results):
            ret.append(joinedproject.JoinedProject.parse(r))

        return ret

    def get_disk_usage(self):
        xml = '<get_disk_usage />'
        results = self.rpc.call(xml)

        # The problem that we have here is that we're not dealing with a list of the same element type here.
        # Rather, we're dealing with a list of elements that could be one of a few types:
        #
        # * project
        # * d_total
        # * d_free
        # * d_boinc (Whatever that is)
        # * d_allowed (Whatever that is)
        #
        # So I guess we need to test each element's name, make a struct object of a type depending on the name,
        # and return all that lot as a list.

        def objects_from_tag_class(tag_name, cls):
            return list(map(lambda x: cls.parse(x), get_element_by_tag(tag_name)))

        def objects_from_tag_object(tag_name, object_type):
            element = get_element_by_tag(tag_name)[0]
            o = object_type()
            o.parse(element)
            return o

        def get_element_by_tag(tag_name):
            return [x for x in results if x.tag == tag_name]

        projects = objects_from_tag_class('project', diskusage.DiskUsageProject)
        disk_total = objects_from_tag_object('d_total', diskusage.DiskUsageDiskTotal)
        disk_free = objects_from_tag_object('d_free', diskusage.DiskUsageDiskFree)

        projects.append(disk_total)
        projects.append(disk_free)

        return projects

    def get_daily_transfer_history(self):
        '''The get_daily_xfer_history RPC call returns an xml document similar to:

        <daily_xfers>
         <dx>
           <when>16882</when>
           <up>158287.000000</up>
           <down>1127055.000000</down>
         </dx>
        </daily_xfers>

        ...There are as many dx elements as there are days recorded
        that have had network transfer activity.

        when is the numnber of days since 1970-01-01.
        up and down are the number of bytes uploaded and downloaded respectively.
        '''
        xml = '<get_daily_xfer_history />'
        results = self.rpc.call(xml)
        return map(lambda x: dailytransfer.DailyTransfer.parse(x), xmlutil.parse_list(results))

    def get_messages(self):
        xml = '<get_messages />'
        results = self.rpc.call(xml)
        return map(lambda x: message.Message.parse(x), results)

    def get_notices(self):
        xml = '<get_notices />'
        results = self.rpc.call(xml)
        return map(lambda x: notice.Notice.parse(x), results)

    def get_notices_public(self):
        ''' How does this differ from get_notices?
        Not much I think. Presumably it filters out the private notices,
        of which I have yet to see any examples.
        '''
        xml = '<get_notices_public />'
        results = self.rpc.call(xml)
        return map(lambda x: notice.Notice.parse(x), results)

    def get_account_manager_info(self):
        ''' The get_acct_mgr_info RPC call returns an XML document similar to:

        <acct_mgr_info>
          <acct_mgr_url>https://bam.boincstats.com/</acct_mgr_url>
          <acct_mgr_name>BOINCstatsBAM!</acct_mgr_name>
          <have_credentials /> <!-- I don't know what this is for yet. -->
        </acct_mgr_info>'''
        xml = '<acct_mgr_info />'
        results = self.rpc.call(xml)
        print(ElementTree.tostring(results))

    def get_global_prefs_file(self):
        ''' The get_globals_prefs_file RPC call returns a quite large XML
        document containing global preferences. See the struct class
        for details.
        '''
        xml = '<get_global_prefs_file />'
        results = self.rpc.call(xml)
        return globalpreferences.GlobalPreferences.parse(results)

    def get_project_init_status(self):
        ''' The get_project_init_status RPC call returns an xml document similar to:

         <get_project_init_status>
          <url />
          <name />
          <team_name />
         </get_project_init_status>

        .. for me at least. I probably have to supply a project name to actually get anything.
        '''
        xml = '<get_project_init_status />'
        results = self.rpc.call(xml)
        print(ElementTree.tostring(results))

    def lookup_account(self, project_url, email_address, password, already_hashed=False):
        ''' Look up an existing account on a BOINC project
        If the lookup_account RPC call is received successfully by the server, a very simple XML element is returned:

        <success />

        What we're really after is an account key. In order to get that we need to poll until it has been retrieved.
        Polling is done by calling a different command.

        If already_hashed is True, the password parameter should be an md5 hash of password+email_address.
        '''
        if already_hashed:
            password_hash = password
        else:
            hash_input = password + email_address
            password_hash = hashlib.md5(hash_input.encode()).hexdigest()

        xml = '<lookup_account><url>{url}</url><email_addr>{email_address}</email_addr><passwd_hash>{password_hash}</passwd_hash><ldap_auth>0</ldap_auth></lookup_account>'.format(
            url=project_url, email_address=email_address, password_hash=password)

        results = self.rpc.call(xml)

    def lookup_account_poll(self):
        ''' Check up on the progress of a previous lookup_account RPC call.

        The returned XML from the lookup_account_poll differs based on how the request is getting on.

        When it's called right after the lookup_account call is made, the chances are it will be in progress, which is
        represented by error -204:

        <account_out><error_num>-204</error_num>\n</account_out>

        If the lookup has completed but the password is incorrect, the error is -206 and a descriptive message is
        returned:

        <error><error_num>-206</error_num><error_msg>Invalid password</error_msg></error>

        There are other possible error numbers for things like incorrect email addresses which for now can be seen in
        the main BOINC source code in lib/error_numbers.h.

        If the lookup has completed and was successful then the authenticator is returned:

        <account_out><authenticator>[AUTHENTICATOR STRING]</authenticator></account_out>

        The return type is one of two possibilities:

            1. AccountOut for waiting, success or error:
             a. If successful the authenticator field will be set
             b. If we're still waiting then the error_num field will be set to -204. Other fields will be empty.
             c. If there's been an error then the error_num will be something other than empty or -204 and the
                erorr_msg field will be set.

            2. A string if we get something back that's unrecognised (e.g. If this function is called when there's been
               no recent call to lookup_account)
        '''
        xml = '<lookup_account_poll />'
        results = self.rpc.call(xml)

        results_str = ElementTree.tostring(results)

        result_is_account_out = results_str.startswith('<account_out>'.encode())
        result_is_error = results_str.startswith('<error>'.encode())

        if result_is_account_out or result_is_error:
            return lookupaccountpoll.AccountOut.parse(results)

        return ElementTree.tostring(results) # If all else fails, just return a string containing what we did get.

    def project_attach(self, project_url, authenticator):
        '''Attach to a project.

        authenticator is a string that is used to indicate to the project which account you are. It is obtained by
        calling lookup_account with the correct details and then calling lookup_account_poll until the authenticator
        property has been set (assuming no other problem has arisen).

        When the project has been successfully attached to the following xml is returned:

        <success />
        '''
        xml = '<project_attach><use_config_file>false</use_config_file><project_url>{project_url}</project_url><authenticator>{authenticator}</authenticator><project_name>{project_url}</project_name></project_attach>'.format(
                project_url=project_url, authenticator=authenticator)

        result = self.rpc.call(xml)
        print(ElementTree.tostring(result))

    def project_detach(self, project_url):
        '''Detach from a project.

        The project_detach RPC call can return the following things:

        If the project being detached from is not recognised by BOINC:

            <error>No such project</error>

        If the project has been attached via an account manager:

            <boinc_gui_rpc_reply><error>must detach using account manager</error></boinc_gui_rpc_reply>

        Successful detachment:

            <success />
        '''
        xml = '<project_detach><project_url>{project_url}</project_url></project_detach>'.format(
            project_url=project_url)
        result = self.rpc.call(xml)
        print(ElementTree.tostring(result))

def read_gui_rpc_password():
    ''' Read password string from GUI_RPC_PASSWD_FILE file, trim the last CR
        (if any), and return it
    '''
    try:
        with open(GUI_RPC_PASSWD_FILE, 'r') as f:
            buf = f.read()
            if buf.endswith('\n'): return buf[:-1]  # trim last CR
            else: return buf
    except IOError:
        # Permission denied or File not found.
        pass
