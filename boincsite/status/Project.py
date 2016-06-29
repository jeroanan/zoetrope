# Copyright (c) David Wilson 2015, 2016
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

import boincsite.util.DateTimeUtil as dt


class Project(object):

    def __init__(self, project):
        """
        Initialise an instance of the Project class

        Parameters:
        project: An instance of JoinedProject. The attributes of this class are initialised
                 from the attributes of this parameter.
        """

        self.fields = ['name',
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
                       'last_rpc',
                       'project_files_downloaded',
                       'gui_urls',
                       'master_url',
                       'scheduler_rpc_pending',
                       'attached_via_account_manager',
                       'detach_when_done',
                       'upload_backoff'
                       ]
        
        self.name = project.project_name
        self.master_url = project.master_url
        self.user_name = project.user_name
        self.team_name = project.team_name
        self.resource_share = project.resource_share
        self.user_total_credit = float(project.user_total_credit)
        self.user_expavg_credit = float(project.user_expavg_credit)
        self.host_total_credit = project.host_total_credit
        self.host_expavg_credit = project.host_expavg_credit
        self.nrpc_failures = project.nrpc_failures
        self.master_fetch_failures = project.master_fetch_failures
        self.scheduler_rpc_pending = project.sched_rpc_pending
        self.attached_via_account_manager = project.attached_via_acct_mgr
        self.suspended_via_gui = project.suspended_via_gui
        self.dont_request_more_work = project.dont_request_more_work
        self.last_rpc = str(dt.get_date_from_epoch_seconds(float(project.last_rpc_time)).split('.')[0])
        self.project_files_downloaded = project.project_files_downloaded_time
        self.gui_urls = [GuiUrl(x) for x in project.gui_urls]
        self.detach_when_done = project.detach_when_done

        self.upload_backoff = None

        if project.upload_backoff is not None:
            self.upload_backoff = str(dt.get_difference_with_epoch(project.upload_backoff)).split('.')[0]


class GuiUrl(object):

    def __init__(self, gui_url):
        """
        Initialise an instance of the GuiUrl class.

        Parameters:
        gui_url: An instance of lib.boincindicator.resulttypes.GuiUrl. The attributes of this class
                 are initialised from the properties of this parameter.
        """
        self.fields = ['name', 'description', 'url']
        self.name = gui_url.name
        self.description = gui_url.description
        self.url = gui_url.url
