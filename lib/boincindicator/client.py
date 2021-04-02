#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# client.py - Somewhat higher-level GUI_RPC API for BOINC core client
#
#    Copyright (C) 2013 Rodrigo Silva (MestreLion) <linux@rodrigosilva.com>
#    Further modifications for Zoetrope project (C) 2016, 2021 David Wilson <davidwil@posteo.de>
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

import hashlib
import logging
import socket
import time

from xml.etree import ElementTree

import lib.boincindicator.rpc as rpc

import lib.boincindicator.enums.RunMode as runmode

import lib.boincindicator.resulttypes.AvailableProject as availableproject
import lib.boincindicator.resulttypes.CcStatus as ccstatus
import lib.boincindicator.resulttypes.DailyTransfer as dailytransfer
import lib.boincindicator.resulttypes.DiskUsage as diskusage
import lib.boincindicator.resulttypes.GlobalPreferences as globalpreferences
import lib.boincindicator.resulttypes.HostInfo as hostinfo
import lib.boincindicator.resulttypes.JoinedProject as joinedproject
import lib.boincindicator.resulttypes.LookupAccountPoll as lookupaccountpoll
import lib.boincindicator.resulttypes.Message as message
import lib.boincindicator.resulttypes.Notice as notice
import lib.boincindicator.resulttypes.Result as result
import lib.boincindicator.resulttypes.SuccessError as successerror
import lib.boincindicator.resulttypes.Statistics as statistics
import lib.boincindicator.resulttypes.VersionInfo as versioninfo

import lib.boincindicator.util.xmlutil as xmlutil

GUI_RPC_PASSWD_FILE = "/etc/boinc-client/gui_rpc_auth.cfg"


class BoincClient(object):
    '''
    Handles XML-RPC communications with the running BOINC client.
    '''

    def __init__(self, host="", passwd=None):
        '''
        Initialise state
        '''
        host = host.split(':', 1)

        self.hostname   = host[0]
        self.port       = int(host[1]) if len(host)==2 else 0
        self.passwd     = passwd
        self.rpc        = rpc.Rpc(text_output=False, hostname=self.hostname, port=self.port)
        self.version    = None
        self.authorized = False

        # Informative, not authoritative. Records status of *last* RPC call,
        # but does not infer success about the *next* one.
        # Thus, it should be read *after* an RPC call, not prior to one
        self.connected = False

    def __enter__(self): self.connect(); return self
    def __exit__(self, *args): self.disconnect()

    def connect(self):
        '''
        Connect to the running BOINC client
        '''
        try:
            self.rpc.connect(self.hostname, self.port)
            self.connected = True
        except socket.error:
            self.connected = False
            return
        self.authorized = self.authorize(self.passwd)
        self.version = self.exchange_versions()

    def disconnect(self):
        '''
        Disconnect from the running BOINC client
        '''
        self.rpc.disconnect()

    def write_xml_to_file(self, file_name, file_content):
        '''
        Write the given content to the given filename

        This is intended to capture responses from the BOINC client for sample purposes.
        '''
        directory = 'lib/boincindicator/doc/samplexml/'
        file_path = directory + file_name
        decoded = file_content.decode()

        with open(file_path, 'w') as f:
            f.write(file_content.decode())

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
        ''' Return VersionInfo instance with core client version info

        See doc/samplexml/exchange_versions.xml for an example of what the RPC call returns to this method.
        '''
        xml = '<exchange_versions/>'
        result = self.rpc.call(xml)
        return versioninfo.VersionInfo.parse(result)

    def get_newer_version(self):
        '''Check for a newer version of BOINC.

        See doc/samplexml/get_newer_version.xml for an example of what the RPC call returns to this method.

        Does the presence of the newer_version element mean that a newer version is available? Or does the fact that it
        is empty mean that there's no newer version available? I don't know at the moment.
        '''
        xml = '<get_newer_version/>'
        result = self.rpc.call(xml)

    def get_cc_status(self):
        ''' Return CcStatus instance containing basic status, such as
            CPU / GPU / Network active/suspended, etc

            See doc/samplexml/get_cc_status.xml for an example of what the RPC call returns to this method.
        '''
        if not self.connected: self.connect()
        try:
            xml = '<get_cc_status/>'
            result = self.rpc.call(xml)
            return ccstatus.CcStatus.parse(result)
        except socket.error:
            self.connected = False

    def get_cc_config(self):
        ''' Gets client config

        See doc/samplexml/get_cc_config.xml for an example of what the RPC call returns to this method.
        '''
        xml = '<get_cc_config/>'
        result = self.rpc.call(xml)

    def get_host_info(self):
        ''' Get information about host hardware and usage.

        See doc/samplexml/get_host_info.xml for an example of what the RPC call returns to this method.
        '''
        xml = '<get_host_info/>'
        result = self.rpc.call(xml)
        return hostinfo.HostInfo.parse(result)

    def get_tasks(self):
        ''' Same as get_results(active_only=False) '''
        return self.get_results(False)

    def get_results(self, active_only=False):
        ''' Get a list of results.
            Those that are in progress will have information such as CPU time
            and fraction done. Each result includes a name;
            Use CC_STATE::lookup_result() to find this result in the current static state;
            if it's not there, call get_state() again.

            See doc/samplexml/get_results.xml for an example of what the RPC call returns to this method.
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
        """
        Perform an operation for a result using the xml schema below.

        Many result operations use very similar xml schemas, so this procedure constructs and executes the RPC call
        according to the operation name given.
        
        Parameters:
        
        op: The name of the operation to perform

        result_name: The name of the workunit to perform the operation on

        project_url: The url of the project associated with the workunit
        """        
        xml = '<{op}>\n<name>{rn}</name>\n<project_url>{pu}</project_url>\n</{op}>'.format(
          op=op,
          rn=result_name,
          pu=project_url
        )
        result = self.rpc.call(xml)
        return result

    def get_all_projects_list(self):
        '''Returns a list of available projects for the client to attach to.

        See See doc/samplexml/get_all_projects_list.xml for an example of what the RPC call returns to this method.
        '''
        xml = '<get_all_projects_list />'
        results = self.rpc.call(xml)
        return map(lambda x: availableproject.AvailableProject.parse(x), xmlutil.parse_list(results))

    def get_project_status(self):
        ''' Get the status of currently-attached projects.

        See See doc/samplexml/get_project_status.xml for an example of what the RPC call returns to this method.
        
        Special note: The presence of the element dont_request_more_work indicates that the project is not going
        to request any more work. Its absence indicates that more work will be requested.
        '''
        xml = '<get_project_status />'
        results = self.rpc.call(xml)
        return map(lambda x: joinedproject.JoinedProject.parse(x), results)

    def get_disk_usage(self):
        '''Get disk usage

        Disk usage is returned on a per-project basis. Additionally the disk free and total disk space used on the
        filesystem BOINC runs in is returned.

        See See doc/samplexml/get_disk_usage.xml for an example of what the RPC call returns to this method.
        '''
        xml = '<get_disk_usage />'
        results = self.rpc.call(xml)

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
        '''Gets the history of daily transfers

        See See doc/samplexml/get_daily_xfer_history.xml for an example of what the RPC call returns to this method.

        ...There are as many dx elements as there are days recorded
        that have had network transfer activity.

        when is the numnber of days since 1970-01-01.
        up and down are the number of bytes uploaded and downloaded respectively.
        '''
        xml = '<get_daily_xfer_history />'
        results = self.rpc.call(xml)
        return map(lambda x: dailytransfer.DailyTransfer.parse(x), xmlutil.parse_list(results))

    def get_messages(self):
        '''Get BOINC system messages.

        System messages tend to be things like "Finished computation of XXX", so it's basically the log of the BOINC
        process.

        See See doc/samplexml/get_messages.xml for an example of what the RPC call returns to this method.
        '''
        xml = '<get_messages />'
        results = self.rpc.call(xml)

        return map(lambda x: message.Message.parse(x), results)

    def get_message_count(self):
        '''Get message count

        ...Whatever that means. The get_message_count RPC call returns the following:

        <seqno>2096</seqno>

        ...Which does indeed match the highest sequence number I have when I call get_messages. However, get_messages
        limits to the last 2000 messages when I call it.
        '''
        xml = '<get_message_count />'
        result = self.rpc.call(xml)

    def get_notices(self):
        '''Get BOINC notices

        Notices tend to be announcements made by the BOINC projects, although I've also seen things like alerts that
        a project doesn't support the current processor architecture in there as well.

        See See doc/samplexml/get_notices.xml for an example of what the RPC call returns to this method.
        '''
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

        See doc/samplexml/get_acct_mgr_info.xml for an example of what the RPC call returns to this method.
        '''
        xml = '<acct_mgr_info />'
        results = self.rpc.call(xml)        

    def get_global_prefs_file(self):
        ''' The get_globals_prefs_file RPC call returns a quite large XML
        document containing global preferences.

        See doc/samplexml/get_globals_prefs_file.xml for an example of what the RPC call returns to this method. 
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
        
        See doc/samplexml/get_project_init_status.xml for an example of what the RPC call returns to this method.

        '''
        xml = '<get_project_init_status />'
        results = self.rpc.call(xml)        

    def create_account(self, url, email_address, password_hash, username):
        '''
        Create a new account for the given project

        This method merely begins the process of creating a new account. Once this has been called, create_account_poll
        should be called periodically in order to check on how account creation is progressing.

        Parameters:

        url: The url for account sign-up at the project
        
        email_address: The email address to sign up to the project with

        password_hash: The MD5 hash of the user's chosen password concatenated with email_address
        
        username: The name that the user will be known by in the project.
        '''
        xml = '<create_account><url>{url}</url><email_addr>{email_address}</email_addr><passwd_hash>{password_hash}</passwd_hash><ldap_auth>0</ldap_auth><user_name>{user_name}</user_name></create_account>'.format(
            url=url, email_address=email_address, password_hash=password_hash, user_name=username)
        results = self.rpc.call(xml)        

    def create_account_poll(self):
        '''
        Once a request to create a new account on a project has been made, this procedure must be called periodically in
        order to check the progress of new account creation.
        '''
        xml = '<create_account_poll />'
        results = self.rpc.call(xml)

        results_str = ElementTree.tostring(results)

        result_is_account_out = results_str.startswith('<account_out>'.encode())
        result_is_error = results_str.startswith('<error>'.encode())

        if result_is_account_out or result_is_error:
            return lookupaccountpoll.AccountOut.parse(results)

        return ElementTree.tostring(results) # If all else fails, just return a string containing what we did get.

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
        return ElementTree.tostring(results)

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

    def get_screensaver_tasks(self):
        '''Gives me a wealth of information, presumably on tasks that can run as a screensaver.
        
        See doc/samplexml/get_screensaver_tasks.xml for an example of what the RPC call returns to this method.
        '''
        xml = '<get_screensaver_tasks/>'
        result = self.rpc.call(xml)

    def get_simple_gui_info(self):
        '''Returns info for a simple GUI

        See doc/samplexml/get_simple_gui_info.xml for an example of what the RPC call returns to this method.
        '''
        xml = '<get_simple_gui_info/>'
        result = self.rpc.call(xml)

    def get_state(self):
        ''' Gets a whole load of information about the overall state of the BOINC process, its tasks and projects.

        See doc/samplexml/get_state.xml for an example of what the RPC call returns to this method.        
        '''
        xml = '<get_state/>'
        result = self.rpc.call(xml)

    def get_statistics(self):
        ''' Gets a whole load of statistics

        See doc/samplexml/get_statistics.xml for an example of what the RPC call returns to this method.
        '''
        xml = '<get_statistics />'
        result = self.rpc.call(xml)
        out = statistics.Statistics.parse(result)
        return out

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

    # We have a number of operations whose xml is just:
    # <operation_name><project_url>{project_url}</project_url></operation_name>
    #
    # ... Where operation_name is the BOINC function to be initiated. Then the xml
    # gets passed to rpc.call and the result is processed (or not) before being
    # returned.
    #
    # So I might as well boil down the build-up XML and call RPC bit into a common
    # method.
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
        result = self.simple_project_operation('project_detach', project_url)
        out = successerror.SuccessError()
        
        for i in list(result):
            out.success = i.tag == 'success'

            if not out.success:
                out.error_message = i.text.strip()

        return out
    
    def project_detach_when_done(self, project_url):
        '''
        Detach from the given project once its outstanding workunits have been completed.
        '''
        result = self.simple_project_operation('project_detach_when_done', project_url)
        return successerror.SuccessError()
    
    def project_dont_detach_when_done(self, project_url):
        '''
        Reverse a previous request to detach from the given project when its outstanding workunits have been completed.
        '''
        result = self.simple_project_operation('project_dont_detach_when_done', project_url)
        return successerror.SuccessError()

    def project_update(self, project_url):
        ''' Update a project with the project server.
        
        Used to do things like report finished tasks and get new workunits.

        If it is successful then the usual success response is given:

        <success />

        It will also be evident that this was successful by examining the output of get_messages

        If there is an error then the following kind of response is given:

        <error>Missing project URL</error>
        '''
        self.simple_project_operation('project_update', project_url)

    def project_no_more_work(self, project_url):
        '''
        Request that no more work is requested for the given project
	
        Workunits for the project that are in progress or waiting to be processed
        will be completed even when the project is set to request no more work.
        
        The RPC call will return <success /> or <error>Error message</error> depending on whether or not the request is
        successful.

        Params:
        @project_url: The url of the project to perform the request on
        '''
        #TODO: investigate the return value of this one so we can give
        # feedback if needed        
        self.simple_project_operation('project_nomorework', project_url)

    def project_allow_more_work(self, project_url):
        '''
        Request that work is requested for the given project
	
        To be called for projects that are currently set not to request more work.
	
        The RPC call will return <success /> or <error>Error message</error> depending on whether or not the request is
        successful.

        Params:
        @project_url: The url of the project to perform the request on
        '''
        self.simple_project_operation('project_allowmorework', project_url)
        
    def project_suspend(self, project_url):
        '''
        Request that work is suspended for the given project
	
        Workunits for the project that are currently in progress or waiting to processed will be paused.
	
        The RPC call will return <success /> or <error>Error message</error> depending on whether or not the request is
        successful.

        Params:
        @project_url: The url of the project to perform the request on
        '''
        self.simple_project_operation('project_suspend', project_url)
            
    def project_resume(self, project_url):
        '''
        Request that work is resumed for the given project
	
        Existing workunits for the project will be resumed.
	
        The RPC call will return <success /> or <error>Error message</error> depending on whether or not the request is
        successful.

        Params:
        @project_url: The url of the project to perform the request on
        '''
        return self.simple_project_operation('project_resume', project_url)

    def simple_project_operation(self, operation_name, project_url):
        '''
        Do a generic operation on a project where that operation only requires the project's url
		
        Params:
        @operation_name: The command name to use in the RPC call
        @project_url: The url of the project to perform the request on
        '''
        xml = '<{operation_name}><project_url>{project_url}</project_url></{operation_name}>'.format(
            operation_name=operation_name, project_url=project_url)
        return self.rpc.call(xml)

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
