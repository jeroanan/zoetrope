import unittest

import boincsite.boinc.commandline.AbortTask as at
import boincsite.boinc.commandline.DailyTransferHistory as dth
import boincsite.boinc.commandline.DiskUsage as du
import boincsite.boinc.commandline.DoNetworkCommunication as dnc
import boincsite.boinc.commandline.GetMessages as gm
import boincsite.boinc.commandline.GetProjectStatus as gps
import boincsite.boinc.commandline.GetTask as gt
import boincsite.boinc.commandline.GetTasks as gts
import boincsite.boinc.commandline.HostInfo as hi

import boincsite.boinc.CommandLineFactory as clf


class TestCommandLineFactory(unittest.TestCase):

    def test_create(self):
        mappings = {
            'AbortTask': at.AbortTask,
            'DailyTransferHistory': dth.DailyTransferHistory,
            'DiskUsage': du.DiskUsage,
            'DoNetworkCommunication': dnc.DoNetworkCommunication,
            'GetMessages': gm.GetMessages,
            'GetProjectStatus': gps.GetProjectStatus,
            'GetTask': gt.GetTask,
            'GetTasks': gts.GetTasks,
            'HostInfo': hi.HostInfo
        }

        for type_string, return_type in mappings.items():
            result = clf.CommandLineFactory.create(type_string)
            self.assertIsInstance(result,
                return_type,
                'Did not get instance of {instance} when trying to create {type_string}. Got {result}.'.format(
                    instance=return_type,
                    type_string=type_string,
                    result=result))
