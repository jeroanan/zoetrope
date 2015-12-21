# Copyright (c) David Wilson 2015
#
# Licensed under the GPL version 3

import unittest

import boincsite.boinc.RpcFactory as rf
import boincsite.boinc.rpc.GetTasks as gts
import boincsite.boinc.rpc.AbortTask as at
import boincsite.boinc.rpc.SuspendTask as st


class TestRpcFactory(unittest.TestCase):

    def test_create(self):
        mappings = {
            'GetTasks': gts.GetTasks,
            'AbortTask': at.AbortTask,
            'SuspendTask': st.SuspendTask
        }

        for command_type, command_class in mappings.items():
            result = rf.RpcFactory.create(command_type)
            self.assertIsInstance(result,
                                  command_class,
                                  'Did not get type {cc} when creating with string {ct}. Instead got {r}'.format(
                                    cc=command_class, ct=command_type, r=result
                                  ))
