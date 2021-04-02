# Copyright (c) David Wilson 2015, 2016, 2021
# This file is part of Zoetrope.
# 
# Zoetrope is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
# 
# Zoetrope is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
# 
# You should have received a copy of the GNU General Public License
# along with Zoetrope.  If not, see <http://www.gnu.org/licenses/>.

import logging

from xml.etree import ElementTree

import lib.boincindicator.basetypes.Struct as struct


class JoinedProject(struct.Struct):

    # TODO: I would have rather called this AttachedProject

    def __init__(self):

        self.fields = ['project_name',
                       'user_name',
                       'team_name',
                       'resource_share',
                       'user_total_credit',
                       'user_expavg_credit',
                       'host_total_credit',
                       'host_expavg_credit',
                       'nrpc_failures',
                       'master_fetch_failures',
                       'suspended_via_gui',
                       'dont_request_more_work',
                       'last_rpc_time',
                       'project_files_downloaded_time',
                       'gui_urls',
                       'master_url',
                       'sched_rpc_pending',
                       'attached_via_acct_mgr',
                       'detach_when_done',
                       'upload_backoff',
                       'disk_usage',
                       'disk_share'
        ]
        
        self.master_url = ''
        self.project_name = ''
        self.symstore = ''
        self.user_name = ''
        self.team_name = ''
        self.host_venue = ''
        self.email_hash = ''
        self.cross_project_id = ''
        self.cpid_time = ''
        self.user_total_credit = ''
        self.user_expavg_credit = ''
        self.user_create_time = ''
        self.rpc_seqno = ''
        self.userid = ''
        self.teamid = ''
        self.hostid = ''
        self.host_total_credit = ''
        self.host_expavg_credit = ''
        self.host_create_time = ''
        self.nrpc_failures = ''
        self.master_fetch_failures = ''
        self.min_rpc_time = ''
        self.next_rpc_time = ''
        self.rec = ''
        self.rec_time = ''
        self.resource_share = ''
        self.duration_correction_factor = ''
        self.sched_rpc_pending = ''
        self.send_time_stats_log = ''
        self.send_job_log = ''
        self.attached_via_acct_mgr = False
        self.rsc_backoff_time = ''
        self.rsc_backoff_interval = ''
        self.gui_urls = []
        self.sched_priority = ''
        self.last_rpc_time = ''
        self.project_files_downloaded_time = ''
        self.venue = ''
        self.verify_files_on_app_start = ''
        self.no_rsc_pref = ''
        self.external_cpid = ''
        self.desired_disk_usage = ''
        self.njobs_success = ''
        self.njobs_error = ''
        self.elapsed_time = ''
        self.send_full_workload = ''
        self.dont_use_dcf = ''
        self.project_dir = ''
        self.master_url_fetch_pending = ''
        self.dont_request_more_work = False
        self.suspended_via_gui = False
        self.scheduler_rpc_in_progress = False
        self.detach_when_done = False
        self.upload_backoff = None # I think this means that an upload has been attempted, it's failed for
                                   # some reason, so the BOINC client is waiting for a period of time before
                                   # trying again. Its text value represents a timestamp since epoch. The
                                   # difference between epoch and that timestamp is how long remains until
                                   # the upload is retried. e.g. 15933.489031
        self.disk_usage = ''
        self.disk_share = ''

    @classmethod
    def parse(cls, xml):
        joined_project = super(JoinedProject, cls).parse(xml)        

        for c in xml:
            if c.tag=='dont_request_more_work':
                joined_project.dont_request_more_work = True
            elif c.tag == 'attached_via_acct_mgr':
                joined_project.attached_via_acct_mgr = True
            elif c.tag == 'suspended_via_gui':
                joined_project.suspend_via_gui = True
            elif c.tag == 'detach_when_done':
                joined_project.detach_when_done = True
            elif c.tag == 'upload_backoff':
                joined_project.upload_backoff = c.text
            elif c.tag == 'gui_urls':
                joined_project.gui_urls = [GuiUrl.parse(x) for x in c.iter('gui_url')]

        return joined_project
    

class GuiUrl(struct.Struct):

    def __init__(self):
        self.fields = ['name', 'description', 'url']
        self.name = ''
        self.description = ''
        self.url = ''

    @classmethod
    def parse(cls, xml):
        gui_url = GuiUrl()
        
        for c in xml:
            for d in c.iter():

                if d.tag == 'name':
                    gui_url.name = d.text                    
                if d.tag == 'description':
                    gui_url.description = d.text
                if d.tag == 'url':
                    gui_url.url = d.text

        return gui_url

