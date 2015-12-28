# Copyright (c) David Wilson 2015
#
# Licensed under the GPL version 3

import unittest

import lib.boincindicator.client as jp

import boincsite.status.rpc.Project as p


class TestProject(unittest.TestCase):

    def setUp(self):

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

        self.__joined_project_attrs = {
            'project_name': 'project name',
            'master_url': 'http://localhost',
            'user_name': 'user name',
            'team_name': 'team name',
            'resource_share': 'resource_share',
            'user_total_credit': '180',
            'user_expavg_credit': '12',
            'host_total_credit': '1414',
            'host_expavg_credit': '100',
            'nrpc_failures': '5',
            'master_fetch_failures': '10',
            'sched_rpc_pending': True,
            'attached_via_acct_mgr': True,
            'last_rpc_time': '1415',
            'project_files_downloaded_time': '0129393232'
        }

        joined_project = jp.JoinedProject()

        for name, value in self.__joined_project_attrs.items():
            setattr(joined_project, name, value)

        self.__target = p.Project(joined_project)


    def test_attrs(self):

        expected_results = {
            'name': self.__joined_project_attrs['project_name'],
            'master_url': self.__joined_project_attrs['master_url'],
            'user_name': self.__joined_project_attrs['user_name'],
            'team_name': self.__joined_project_attrs['team_name'],
            'resource_share': self.__joined_project_attrs['resource_share'],
            'user_total_credit': self.__joined_project_attrs['user_total_credit'],
            'user_expavg_credit': self.__joined_project_attrs['user_expavg_credit'],
            'host_total_credit': self.__joined_project_attrs['host_total_credit'],
            'host_expavg_credit': self.__joined_project_attrs['host_expavg_credit'],
            'nrpc_failures': self.__joined_project_attrs['nrpc_failures'],
            'master_fetch_failures': self.__joined_project_attrs['master_fetch_failures'],
            'scheduler_rpc_pending': self.__joined_project_attrs['sched_rpc_pending'],
            'attached_via_account_manager': self.__joined_project_attrs['attached_via_acct_mgr'],
            'last_rpc': self.__joined_project_attrs['last_rpc_time'],
            'project_files_downloaded': self.__joined_project_attrs['project_files_downloaded_time']
        }

        for name, value in expected_results.items():
            result = getattr(self.__target, name)
            self.assertEqual(
                result,
                value,
                'Expected "{ex}" when retrieving attribute "{an}". Got "{res}".'.format(
                    ex=value, an=name, res=result
                ))
