# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3


class Project(object):

    def __init__(self, project):
        # can't do master_fetch_pending, trickle_upload_pending, ended, suspended_via_gui, dont_request_more_work,
        #   disk_usage

        # 'project_name': 'name',
        # 'master_url': 'master_url',
        # 'user_name': 'user_name',
        # 'team_name': 'team_name',
        # 'resource_share': 'resource_share',
        # 'user_total_credit': 'user_total_credit',
        # 'user_expavg_credit': 'user_expavg_credit',
        # 'host_total_credit': 'host_total_credit',
        # 'host_expavg_credit': 'host_expavg_credit',
        # 'nrpc_failures': 'nrpc_failures',
        # 'master_fetch_failures': 'master_fetch_failures',
        # 'sched_rpc_pending': 'scheduler_rpc_pending',
        # 'attached_via_acct_mgr': 'attached_via_account_manager',
        # 'last_rpc_time': 'last_rpc',
        # 'project_files_downloaded_time': 'project_files_downloaded'

        self.__name = project.project_name
        self.__master_url = project.master_url
        self.__user_name = project.user_name
        self.__team_name = project.team_name
        self.__resource_share = project.resource_share
        self.__user_total_credit = project.user_total_credit
        self.__user_expavg_credit = project.user_expavg_credit
        self.__host_total_credit = project.host_total_credit
        self.__host_expavg_credit = project.host_expavg_credit
        self.__nrpc_failures = project.nrpc_failures
        self.__master_fetch_failures = project.master_fetch_failures
        self.__master_fetch_pending = ''
        self.__scheduler_rpc_pending = project.sched_rpc_pending
        self.__trickle_upload_pending = ''
        self.__attached_via_account_manager = project.attached_via_acct_mgr
        self.__ended = ''
        self.__suspended_via_gui = ''
        self.__dont_request_more_work = ''
        self.__disk_usage = ''
        self.__last_rpc = project.last_rpc_time
        self.__project_files_downloaded = project.project_files_downloaded_time
        self.__gui_urls = []

    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, val):
        self.__name = val

    @property
    def user_name(self):
        return self.__user_name

    @user_name.setter
    def user_name(self, val):
        self.__user_name = val

    @property
    def team_name(self):
        return self.__team_name

    @team_name.setter
    def team_name(self, val):
        self.__team_name = val

    @property
    def resource_share(self):
        return self.__resource_share

    @resource_share.setter
    def resource_share(self, val):
        self.__resource_share = val

    @property
    def user_total_credit(self):
        return self.__user_total_credit

    @user_total_credit.setter
    def user_total_credit(self, val):
        self.__user_total_credit = float(val)

    @property
    def user_expavg_credit(self):
        return self.__user_expavg_credit

    @user_expavg_credit.setter
    def user_expavg_credit(self, val):
        self.__user_expavg_credit = float(val)

    @property
    def host_total_credit(self):
        return self.__host_total_credit

    @host_total_credit.setter
    def host_total_credit(self, val):
        self.__host_total_credit = val

    @property
    def host_expavg_credit(self):
        return self.__host_expavg_credit

    @host_expavg_credit.setter
    def host_expavg_credit(self, val):
        self.__host_expavg_credit = val

    @property
    def nrpc_failures(self):
        return self.__nrpc_failures

    @nrpc_failures.setter
    def nrpc_failures(self, val):
        self.__nrpc_failures = val

    @property
    def master_fetch_failures(self):
        return self.__master_fetch_failures

    @master_fetch_failures.setter
    def master_fetch_failures(self, val):
        self.__master_fetch_failures = val

    @property
    def master_fetch_pending(self):
        return self.__master_fetch_pending == 'yes'

    @master_fetch_pending.setter
    def master_fetch_pending(self, val):
        self.__master_fetch_pending = val

    @property
    def trickle_upload_pending(self):
        return self.__trickle_upload_pending == 'yes'

    @trickle_upload_pending.setter
    def trickle_upload_pending(self, val):
        self.__trickle_upload_pending = val

    @property
    def ended(self):
        return self.__ended == 'yes'

    @ended.setter
    def ended(self, val):
        self.__ended = val

    @property
    def suspended_via_gui(self):
        return self.__suspended_via_gui == 'yes'

    @suspended_via_gui.setter
    def suspended_via_gui(self, val):
        self.__suspended_via_gui = val

    @property
    def dont_request_more_work(self):
        return self.__dont_request_more_work == 'yes'

    @dont_request_more_work.setter
    def dont_request_more_work(self, val):
        self.__dont_request_more_work = val

    @property
    def disk_usage(self):
        return self.__disk_usage

    @disk_usage.setter
    def disk_usage(self, val):
        self.__disk_usage = val

    @property
    def last_rpc(self):
        return self.__last_rpc

    @last_rpc.setter
    def last_rpc(self, val):
        self.__last_rpc = val

    @property
    def project_files_downloaded(self):
        return self.__project_files_downloaded

    @project_files_downloaded.setter
    def project_files_downloaded(self, val):
        self.__project_files_downloaded = val

    @property
    def gui_urls(self):
        return self.__gui_urls

    @gui_urls.setter
    def gui_urls(self, val):
        self.__gui_urls = val

    @property
    def master_url(self):
        return self.__master_url

    @master_url.setter
    def master_url(self, val):
        self.__master_url = val

    @property
    def scheduler_rpc_pending(self):
        return self.__scheduler_rpc_pending

    @scheduler_rpc_pending.setter
    def scheduler_rpc_pending(self, val):
        self.__scheduler_rpc_pending = val


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
