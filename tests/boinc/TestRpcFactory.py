import unittest

import boincsite.boinc.RpcFactory as rf
import boincsite.boinc.rpc.GetTasks as gts


class TestRpcFactory(unittest.TestCase):

    def test_create(self):
        result = rf.RpcFactory.create('GetTasks')
        self.assertIsInstance(result, gts.GetTasks)
