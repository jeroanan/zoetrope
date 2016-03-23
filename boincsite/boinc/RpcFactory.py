# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import boincsite.boinc.rpc.GetDiskUsage as gdu
import boincsite.boinc.rpc.GetMessages as gm
import boincsite.boinc.rpc.GetTask as gt
import boincsite.boinc.rpc.GetTasks as gts
import boincsite.boinc.rpc.AbortTask as at
import boincsite.boinc.rpc.SuspendTask as st
import boincsite.boinc.rpc.ResumeTask as rt
import boincsite.boinc.rpc.GetProjectStatus as gps
import boincsite.boinc.rpc.DailyTransferHistory as dth
import boincsite.boinc.rpc.HostInfo as hi


class RpcFactory(object):

    @staticmethod
    def create(command_type):
        mappings = {
            'DiskUsage': gdu.GetDiskUsage,
            'GetTasks': gts.GetTasks,
            'GetTask': gt.GetTask,
            'GetMessages': gm.GetMessages,
            'AbortTask': at.AbortTask,
            'SuspendTask': st.SuspendTask,
            'ResumeTask': rt.ResumeTask,
            'GetProjectStatus': gps.GetProjectStatus,
            'DailyTransferHistory': dth.DailyTransferHistory,
            'HostInfo': hi.HostInfo            
        }

        if command_type in mappings:
            return mappings[command_type]()

        raise UnknownCommandException

class UnknownCommandException(Exception):
    pass
