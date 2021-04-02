# Copyright (c) David Wilson 2015, 2016, 2021
#
# Based on code from Boinc Indicator, (C) 2013 Rodrigo Silva (MestreLion) <linux@rodrigosilva.com>
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

import logging

import time

import lib.boincindicator.basetypes.Struct as struct

import lib.boincindicator.enums.CPUSched as cpusched
import lib.boincindicator.enums.Process as process
import lib.boincindicator.enums.ResultState as resultstate

import lib.boincindicator.util.xmlutil as xmlutil

from xml.etree import ElementTree


class Result(struct.Struct):
    ''' Also called "task" in some contexts '''
    def __init__(self):

        self.fields = ['name',
                       'wu_name',
                       'project_url',
                       'report_deadline',
                       'ready_to_report',
                       'got_server_ack',
                       'final_cpu_time',
                       'state',
                       'scheduler_state',
                       'exit_status',
                       'signal',
                       'suspended_via_gui',
                       'active_task_state',
                       'app_version_num',
                       'checkpoint_cpu_time',
                       'current_cpu_time',
                       'fraction_done',
                       'swap_size',
                       'working_set_size',
                       'estimated_cpu_time_remaining',
                       'platform',
                       'progress_rate']
        
        # Names and values follow lib/gui_rpc_client.h @ RESULT
        # Order too, except when grouping contradicts client/result.cpp
        # RESULT::write_gui(), then XML order is used.

        self.name                         = ""
        self.wu_name                      = ""
        self.version_num                  = 0
            #// identifies the app used
        self.plan_class                   = ""
        self.project_url                  = ""  # from PROJECT.master_url
        self.__report_deadline              = 0.0 # seconds since epoch
        self.received_time                = 0.0 # seconds since epoch
            #// when we got this from server
        self.ready_to_report              = False
            #// we're ready to report this result to the server;
            #// either computation is done and all the files have been uploaded
            #// or there was an error
        self.got_server_ack               = False
            #// we've received the ack for this result from the server
        self.__final_cpu_time               = 0.0
        self.final_elapsed_time           = 0.0
        self.state                        = resultstate.ResultState.NEW
        self.__estimated_cpu_time_remaining = 0.0
            #// actually, estimated elapsed time remaining
        self.exit_status                  = 0
            #// return value from the application
        self.suspended_via_gui            = False
        self.project_suspended_via_gui    = False
        self.edf_scheduled                = False
            #// temporary used to tell GUI that this result is deadline-scheduled
        self.coproc_missing               = False
            #// a coproc needed by this job is missing
            #// (e.g. because user removed their GPU board).
        self.scheduler_wait               = False
        self.scheduler_wait_reason        = ""
        self.network_wait                 = False
        self.resources                    = ""
            #// textual description of resources used

        #// the following defined if active
        # XML is generated in client/app.cpp ACTIVE_TASK::write_gui()
        self.active_task                  = False
        self.active_task_state            = process.Process.UNINITIALIZED
        self.app_version_num              = 0
        self.slot                         = -1
        self.pid                          = 0
        self.scheduler_state              = cpusched.CpuSched.UNINITIALIZED
        self.checkpoint_cpu_time          = 0.0
        self.__current_cpu_time             = 0.0
        self.__fraction_done                = 0.0
        self.elapsed_time                 = 0.0
        self.swap_size                    = 0
        self.working_set_size_smoothed    = 0.0
        self.too_large                    = False
        self.needs_shmem                  = False
        self.graphics_exec_path           = ""
        self.web_graphics_url             = ""
        self.remote_desktop_addr          = ""
        self.slot_path                    = ""
            #// only present if graphics_exec_path is

        # The following are not in original API, but are present in RPC XML reply
        self.completed_time               = 0.0
            #// time when ready_to_report was set
        self.report_immediately           = False
        self.working_set_size             = 0
        self.page_fault_rate              = 0.0
            #// derived by higher-level code

        # The following are in API, but are NEVER in RPC XML reply. Go figure
        self.signal                       = 0

        self.app                          = None  # APP*
        self.wup                          = None  # WORKUNIT*
        self.project                      = None  # PROJECT*
        self.avp                          = None  # APP_VERSION*
        self.bytes_sent                   = ''
        self.bytes_received               = ''
        self.platform                     = ''
        self.progress_rate                = ''

    @property
    def report_deadline(self):
        return time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(self.__report_deadline))

    @report_deadline.setter
    def report_deadline(self, val):
        self.__report_deadline = int(float(val))

    @property
    def final_cpu_time(self):
        return self.formatted_time_from_seconds(self.__final_cpu_time)

    @final_cpu_time.setter
    def final_cpu_time(self, val):
        self.__final_cpu_time = val

    @property
    def current_cpu_time(self):
        return self.formatted_time_from_seconds(self.__current_cpu_time)

    @current_cpu_time.setter
    def current_cpu_time(self, val):
        self.__current_cpu_time = val

    @property
    def fraction_done(self):
        return self.__get_fraction_done(self.__fraction_done)

    @fraction_done.setter
    def fraction_done(self, val):
        self.__fraction_done = val

    @property
    def estimated_cpu_time_remaining(self):
        return self.formatted_time_from_seconds(self.__estimated_cpu_time_remaining)

    @estimated_cpu_time_remaining.setter
    def estimated_cpu_time_remaining(self, val):
        self.__estimated_cpu_time_remaining = val

    @classmethod
    def parse(cls, xml):
        if not isinstance(xml, ElementTree.Element):
            xml = ElementTree.fromstring(xml)

        # parse main XML
        result = super(Result, cls).parse(xml)

        # parse '<active_task>' children
        active_task = xml.find('active_task')
        if active_task is None:
            result.active_task = False  # already the default after __init__()
        else:
            result.active_task = True   # already the default after main parse
            result = xmlutil.setattrs_from_xml(result, active_task)

        #// if CPU time is nonzero but elapsed time is zero,
        #// we must be talking to an old client.
        #// Set elapsed = CPU
        #// (easier to deal with this here than in the manager)
        if result.current_cpu_time != 0 and result.elapsed_time == 0:
            result.elapsed_time = result.current_cpu_time

        if result.final_cpu_time != 0 and result.final_elapsed_time == 0:
            result.final_elapsed_time = result.final_cpu_time

        return result

    def formatted_time_from_seconds(self, seconds):
        m, s = divmod(float(seconds), 60)
        h, m = divmod(m, 60)
        return "%d:%02d:%02d" % (h, m, s)

    def __get_fraction_done(self, fraction_done):
        percentage = 100.00 if self.ready_to_report else round(fraction_done * 100, 2)
        return float('{0:.2f}'.format(percentage))

    def __str__(self):
        buf = '%s:\n' % self.__class__.__name__
        for attr in self.__dict__:
            value = getattr(self, attr)
            if attr in ['received_time', 'report_deadline']:
                value = time.ctime(value)
            buf += '\t%s\t%r\n' % (attr, value)
        return buf
