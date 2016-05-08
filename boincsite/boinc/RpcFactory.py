# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import boincsite.boinc.AbortTask as at
import boincsite.boinc.AttachProject as ap
import boincsite.boinc.DailyTransferHistory as dth
import boincsite.boinc.DetachProject as dp
import boincsite.boinc.ExperimentalTask as et
import boincsite.boinc.GetAllProjectsList as gap
import boincsite.boinc.GetDiskUsage as gdu
import boincsite.boinc.GetGlobalPreferences as ggp
import boincsite.boinc.GetMessages as gm
import boincsite.boinc.GetNotices as gn
import boincsite.boinc.GetProjectStatus as gps
import boincsite.boinc.GetStatistics as gs
import boincsite.boinc.GetTask as gt
import boincsite.boinc.GetTasks as gts
import boincsite.boinc.HostInfo as hi
import boincsite.boinc.ResumeTask as rt
import boincsite.boinc.SuspendTask as st
import boincsite.boinc.UpdateProject as up


class RpcFactory(object):

    @staticmethod
    def create(command_type):
        mappings = {
            'AbortTask': at.AbortTask,
            'AttachProject': ap.AttachProject,
            'DailyTransferHistory': dth.DailyTransferHistory,
            'DetachProject': dp.DetachProject,
            'DiskUsage': gdu.GetDiskUsage,
            'ExperimentalTask': et.ExperimentalTask,
            'GetAllProjectsList': gap.GetAllProjectsList,
            'GetGlobalPreferences': ggp.GetGlobalPreferences,
            'GetMessages': gm.GetMessages,
            'GetNotices': gn.GetNotices,
            'GetProjectStatus': gps.GetProjectStatus,
            'GetTask': gt.GetTask,
            'GetTasks': gts.GetTasks,
            'GetStatistics': gs.GetStatistics,
            'HostInfo': hi.HostInfo,
            'ResumeTask': rt.ResumeTask,
            'SuspendTask': st.SuspendTask,
            'UpdateProject': up.UpdateProject            
        }

        if command_type in mappings:
            return mappings[command_type]()

        raise UnknownCommandException

class UnknownCommandException(Exception):
    pass
