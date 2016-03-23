# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import unittest

import boincsite.boinc.RpcFactory as rf
import boincsite.boinc.rpc.GetDiskUsage as gdu
import boincsite.boinc.rpc.GetMessages as gm
import boincsite.boinc.rpc.GetTask as gt
import boincsite.boinc.rpc.GetTasks as gts
import boincsite.boinc.rpc.AbortTask as at
import boincsite.boinc.rpc.SuspendTask as st
import boincsite.boinc.rpc.ResumeTask as rt
import boincsite.boinc.rpc.GetProjectStatus as gps
import boincsite.boinc.rpc.DailyTransferHistory as dth

class TestRpcFactory(unittest.TestCase):

    def test_create(self):
        mappings = {
            'DiskUsage': gdu.GetDiskUsage,
            'GetTasks': gts.GetTasks,
            'GetTask': gt.GetTask,
            'GetMessages': gm.GetMessages,
            'AbortTask': at.AbortTask,
            'SuspendTask': st.SuspendTask,
            'ResumeTask': rt.ResumeTask,
            'GetProjectStatus': gps.GetProjectStatus,
            'DailyTransferHistory': dth.DailyTransferHistory
        }

        for command_type, command_class in mappings.items():
            result = rf.RpcFactory.create(command_type)
            self.assertIsInstance(result,
                                  command_class,
                                  'Did not get type {cc} when creating with string {ct}. Instead got {r}'.format(
                                    cc=command_class, ct=command_type, r=result
                                  ))

    def test_unknown_command_raises_unknown_command_exception(self):
        self.assertRaises(rf.UnknownCommandException, rf.RpcFactory.create, 'SomeUnknownCommand')
