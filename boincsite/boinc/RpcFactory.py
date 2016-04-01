# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import boincsite.boinc.AttachProject as ap
import boincsite.boinc.DetachProject as dp
import boincsite.boinc.GetDiskUsage as gdu
import boincsite.boinc.GetMessages as gm
import boincsite.boinc.GetTask as gt
import boincsite.boinc.GetTasks as gts
import boincsite.boinc.AbortTask as at
import boincsite.boinc.SuspendTask as st
import boincsite.boinc.ResumeTask as rt
import boincsite.boinc.GetProjectStatus as gps
import boincsite.boinc.DailyTransferHistory as dth
import boincsite.boinc.HostInfo as hi
import boincsite.boinc.GetNotices as gn
import boincsite.boinc.ExperimentalTask as et
import boincsite.boinc.GetGlobalPreferences as ggp
import boincsite.boinc.GetAllProjectsList as gap


class RpcFactory(object):

    @staticmethod
    def create(command_type):
        mappings = {
            'AttachProject': ap.AttachProject,
            'DetachProject': dp.DetachProject,
            'DiskUsage': gdu.GetDiskUsage,
            'GetTasks': gts.GetTasks,
            'GetTask': gt.GetTask,
            'GetMessages': gm.GetMessages,
            'AbortTask': at.AbortTask,
            'SuspendTask': st.SuspendTask,
            'ResumeTask': rt.ResumeTask,
            'GetProjectStatus': gps.GetProjectStatus,
            'DailyTransferHistory': dth.DailyTransferHistory,
            'HostInfo': hi.HostInfo,
            'GetNotices': gn.GetNotices,
            'ExperimentalTask': et.ExperimentalTask,
            'GetGlobalPreferences': ggp.GetGlobalPreferences,
            'GetAllProjectsList': gap.GetAllProjectsList
        }

        if command_type in mappings:
            return mappings[command_type]()

        raise UnknownCommandException

class UnknownCommandException(Exception):
    pass
