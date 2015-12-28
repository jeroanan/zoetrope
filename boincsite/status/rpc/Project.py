# Copyright (c) David Wilson 2015
#
# Licensed under the GPL version 3

import boincsite.status.Project as p


class Project(p.Project):

    def __init__(self, project):
        super().__init__(project)
        # can't do master_fetch_pending, trickle_upload_pending, ended, suspended_via_gui, dont_request_more_work,
        #   disk_usage

        # src: dest
        mappings = {
            'project_name': 'name',
            'master_url': 'master_url',
            'user_name': 'user_name',
            'team_name': 'team_name',
            'resource_share': 'resource_share',
            'user_total_credit': 'user_total_credit',
            'user_expavg_credit': 'user_expavg_credit',
            'host_total_credit': 'host_total_credit',
            'host_expavg_credit': 'host_expavg_credit',
            'nrpc_failures': 'nrpc_failures',
            'master_fetch_failures': 'master_fetch_failures',
            'sched_rpc_pending': 'scheduler_rpc_pending',
            'attached_via_acct_mgr': 'attached_via_account_manager',
            'last_rpc_time': 'last_rpc',
            'project_files_downloaded_time': 'project_files_downloaded'
        }

        for src, dest in mappings.items():
            setattr(self, dest, getattr(project, src))


        @property
        def scheduler_rpc_pending(self):
            return self.srpc_pending

        @scheduler_rpc_pending.setter
        def scheduler_rpc_pending(self, val):
            self.srpc_pending = val
