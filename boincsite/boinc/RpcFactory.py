# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import boincsite.boinc.AbortTask as at
import boincsite.boinc.DailyTransferHistory as dth
import boincsite.boinc.ExperimentalTask as et
import boincsite.boinc.GetDiskUsage as gdu
import boincsite.boinc.GetGlobalPreferences as ggp
import boincsite.boinc.GetMessages as gm
import boincsite.boinc.GetNotices as gn
import boincsite.boinc.GetPlatform as gp
import boincsite.boinc.GetTask as gt
import boincsite.boinc.GetTasks as gts
import boincsite.boinc.HostInfo as hi
import boincsite.boinc.ResumeTask as rt
import boincsite.boinc.SuspendTask as st


class RpcFactory(object):

    @staticmethod
    def create(command_type):
        mappings = {
            'AbortTask': at.AbortTask,
            'DailyTransferHistory': dth.DailyTransferHistory,
            'DiskUsage': gdu.GetDiskUsage,
            'ExperimentalTask': et.ExperimentalTask,
            'GetGlobalPreferences': ggp.GetGlobalPreferences,
            'GetMessages': gm.GetMessages,
            'GetNotices': gn.GetNotices,
            'GetPlatform': gp.GetPlatform,
            'GetTask': gt.GetTask,
            'GetTasks': gts.GetTasks,
            'HostInfo': hi.HostInfo,
            'ResumeTask': rt.ResumeTask,
            'SuspendTask': st.SuspendTask,
        }

        if command_type in mappings:
            return mappings[command_type]()

        raise UnknownCommandException

class UnknownCommandException(Exception):
    pass
