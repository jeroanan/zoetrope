# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import boincsite.util.DateTimeUtil as dt


class Project(object):

    def __init__(self, project):

        # can't do master_fetch_pending, trickle_upload_pending, ended, disk_usage
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
                       'master_fetch_pending',
                       'trickle_upload_pending',
                       'ended',
                       'suspended_via_gui',
                       'dont_request_more_work',
                       'disk_usage',
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
        self.master_fetch_pending = False
        self.scheduler_rpc_pending = project.sched_rpc_pending
        self.trickle_upload_pending = False
        self.attached_via_account_manager = project.attached_via_acct_mgr
        self.ended = False
        self.suspended_via_gui = project.suspended_via_gui
        self.dont_request_more_work = project.dont_request_more_work
        self.disk_usage = ''
        self.last_rpc = str(dt.get_date_from_epoch_seconds(float(project.last_rpc_time)).split('.')[0])
        self.project_files_downloaded = project.project_files_downloaded_time
        self.gui_urls = []
        self.detach_when_done = project.detach_when_done

        self.upload_backoff = None

        if project.upload_backoff is not None:
            self.upload_backoff = str(dt.get_difference_with_epoch(project.upload_backoff)).split('.')[0]


class GuiUrl(object):

    def __init__(self, gui_urls):
        self.__name = ''
        self.__description = ''
        self.__url = ''

    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, val):
        self.__name = val

    @property
    def description(self):
        return self.__description

    @description.setter
    def description(self, val):
        self.__description = val

    @property
    def url(self):
        return self.__url

    @url.setter
    def url(self, val):
        self.__url = val
