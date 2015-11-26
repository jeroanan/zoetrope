class Project(object):

    def __init__(self, project_string):
        self.__name = ''
        self.__master_url = ''
        self.__user_name = ''
        self.__team_name = ''
        self.__resource_share = ''
        self.__user_total_credit = ''
        self.__user_expavg_credit = ''
        self.__host_total_credit = ''
        self.__host_expavg_credit = ''
        self.__nrpc_failures = ''
        self.__master_fetch_failures = ''
        self.__master_fetch_pending = ''
        self.__scheduler_rpc_pending = ''
        self.__trickle_upload_pending = ''
        self.__attached_via_account_manager = ''
        self.__ended = ''
        self.__suspended_via_gui = ''
        self.__dont_request_more_work = ''
        self.__disk_usage = ''
        self.__last_rpc = ''
        self.__project_files_downloaded = ''
        self.__gui_urls = []

        project_strings = project_string.split('GUI URL:')
        project_strings.reverse()

        line_mappings = {'name': 'name',
                         'user_name': 'user_name',
                         'team_name': 'team_name',
                         'resource share': 'resource_share',
                         'user_total_credit': 'user_total_credit',
                         'user_expavg_credit': 'user_expavg_credit',
                         'host_total_credit': 'host_total_credit',
                         'host_expavg_credit': 'host_expavg_credit',
                         'nrpc_failures': 'nrpc_failures',
                         'master_fetch_failures': 'master_fetch_failures',
                         'master fetch pending': 'master_fetch_pending',
                         'scheduler RPC pending': 'scheduler_rpc_pending',
                         'trickle upload pending': 'trickle_upload_pending',
                         'attached via Account Manager': 'attached_via_account_manager',
                         'ended': 'ended',
                         'suspended via GUI': 'suspended_via_gui',
                         'don\'t request more work': 'dont_request_more_work',
                         'disk usage': 'disk_usage',
                         'last RPC': 'last_rpc',
                         'project files downloaded': 'project_files_downloaded'}

        for ps in project_strings.pop().split('\n'):
            line_split = ps.split(':')
            line_split.reverse()
            key = line_split.pop().strip()
            if key in line_mappings:
                line_split.reverse()
                setattr(self, line_mappings[key], str.join(':', line_split).strip())

        if any(project_strings):
            for ps in project_strings:
                self.gui_urls.append(GuiUrl(ps))

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
        self.__user_total_credit = val

    @property
    def user_expavg_credit(self):
        return self.__user_expavg_credit

    @user_expavg_credit.setter
    def user_expavg_credit(self, val):
        self.__user_expavg_credit = val

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
    def scheduler_rpc_pending(self):
        return self.__scheduler_rpc_pending == 'yes'

    @scheduler_rpc_pending.setter
    def scheduler_rpc_pending(self, val):
        self.__scheduler_rpc_pending = val

    @property
    def trickle_upload_pending(self):
        return self.__trickle_upload_pending == 'yes'

    @trickle_upload_pending.setter
    def trickle_upload_pending(self, val):
        self.__trickle_upload_pending = val

    @property
    def attached_via_account_manager(self):
        return self.__attached_via_account_manager == 'yes'

    @attached_via_account_manager.setter
    def attached_via_account_manager(self, val):
        self.__attached_via_account_manager = val

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

class GuiUrl(object):

    def __init__(self, gui_url_strings):
        self.__name = ''
        self.__description = ''
        self.__url = ''

        line_mappings = {'name': 'name',
                         'description': 'description',
                         'URL': 'url'}

        for gus in gui_url_strings.split('\n'):
            line_split = gus.split(':')
            line_split.reverse()
            key = line_split.pop().strip()
            if key in line_mappings:
                line_split.reverse()
                setattr(self, line_mappings[key], str.join(':', line_split).strip())

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
