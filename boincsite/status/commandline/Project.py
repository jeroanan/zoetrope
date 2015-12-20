# Copyright (c) David Wilson 2015
#
# Licensed under the GPL version 3

import boincsite.status.Project as proj


class Project(proj.Project):
    """
    Contains details of one project in
    """
    def __init__(self, project):
        super().__init__(project)

        project_strings = project.split('GUI URL:')
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
                         'project files downloaded': 'project_files_downloaded',
                         'master URL': 'master_url'}

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


class GuiUrl(proj.GuiUrl):

    def __init__(self, gui_urls):
        super().__init__(gui_urls)

        line_mappings = {'name': 'name',
                         'description': 'description',
                         'URL': 'url'}

        for gus in gui_urls.split('\n'):
            line_split = gus.split(':')
            line_split.reverse()
            key = line_split.pop().strip()
            if key in line_mappings:
                line_split.reverse()
                setattr(self, line_mappings[key], str.join(':', line_split).strip())
