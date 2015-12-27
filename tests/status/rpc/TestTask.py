# Copyright (c) David Wilson 2015
#
# Licensed under the GPL version 3

import unittest

import lib.boincindicator.client as client

import boincsite.status.rpc.Task as t


class TestTask(unittest.TestCase):

    def setUp(self):
        self.__client_result = client.Result()

        self.__result_attrs = {
            'name': 'result name',
            'wu_name': 'workunit name',
            'project_url': 'http://project.url',
            'report_deadline': 1.1,
            'ready_to_report': False,
            'got_server_ack': True,
            'final_cpu_time': 1338.0,
            'state': 4,
            'scheduler_state': 0,
            'exit_status': 1,
            'signal': 2,
            'suspended_via_gui': True,
            'active_task_state': 3,
            'app_version_num': 4,
            'checkpoint_cpu_time': 1337.0,
            'current_cpu_time': 1414.0,
            'fraction_done': 0.8800000,
            'swap_size': '0.1',
            'working_set_size': '11.000000',
            'estimated_cpu_time_remaining': '74181.87'
        }

        for key, value in self.__result_attrs.items():
            setattr(self.__client_result, key, value)

        self.__target = t.Task(self.__client_result)

    def test_task_attrs(self):

        # client.Result.wu_name = target.workunit_name
        self.__result_attrs['workunit_name'] = self.__result_attrs['wu_name']

        del(self.__result_attrs['wu_name'])

        # 1338.0 seconds goes in. 0:22:18 comes out as a formatted timestring.
        self.__result_attrs['final_cpu_time'] = '0:22:18'

        # 1414.0 seconds goes in. 0:23:24 comes out as a formatted timestring.
        self.__result_attrs['current_cpu_time'] = '0:23:34'

        # 74181.87 seconds goes in. 20:36:21 comes out as a formatted timestring.
        self.__result_attrs['estimated_cpu_time_remaining'] = '20:36:21'

        # 0.8800000 goes in but 88.00 should come out as thre percentage done.
        self.__result_attrs['fraction_done'] = '88.00'

        for key, value in self.__result_attrs.items():
            result = getattr(self.__target, key)
            self.assertEqual(value, result, 'Expected "{er}" from Task.{attr}. Instead got "{res}"'.format(
                er=value,
                attr=key,
                res=result
            ))
