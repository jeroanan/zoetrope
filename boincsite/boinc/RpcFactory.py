# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import boincsite.boinc.AbortTask as at
import boincsite.boinc.AllowMoreWork as amw
import boincsite.boinc.AttachProject as ap
import boincsite.boinc.CreateAccount as ca
import boincsite.boinc.DailyTransferHistory as dth
import boincsite.boinc.DetachProject as dp
import boincsite.boinc.ExperimentalTask as et
import boincsite.boinc.GetAllProjectsList as gap
import boincsite.boinc.GetDiskUsage as gdu
import boincsite.boinc.GetGlobalPreferences as ggp
import boincsite.boinc.GetMessages as gm
import boincsite.boinc.GetNotices as gn
import boincsite.boinc.GetPlatform as gp
import boincsite.boinc.GetProjectStatus as gps
import boincsite.boinc.GetStatistics as gs
import boincsite.boinc.GetTask as gt
import boincsite.boinc.GetTasks as gts
import boincsite.boinc.HostInfo as hi
import boincsite.boinc.NoMoreWork as nmw
import boincsite.boinc.ResumeProject as rp
import boincsite.boinc.ResumeTask as rt
import boincsite.boinc.SuspendProject as sp
import boincsite.boinc.SuspendTask as st
import boincsite.boinc.UpdateProject as up


class RpcFactory(object):

    @staticmethod
    def create(command_type):
        mappings = {
            'AbortTask': at.AbortTask,
            'AllowMoreWork': amw.AllowMoreWork,
            'AttachProject': ap.AttachProject,
            'CreateAccount': ca.CreateAccount,
            'DailyTransferHistory': dth.DailyTransferHistory,
            'DetachProject': dp.DetachProject,
            'DiskUsage': gdu.GetDiskUsage,
            'ExperimentalTask': et.ExperimentalTask,
            'GetAllProjectsList': gap.GetAllProjectsList,
            'GetGlobalPreferences': ggp.GetGlobalPreferences,
            'GetMessages': gm.GetMessages,
            'GetNotices': gn.GetNotices,
            'GetPlatform': gp.GetPlatform,
            'GetProjectStatus': gps.GetProjectStatus,
            'GetTask': gt.GetTask,
            'GetTasks': gts.GetTasks,
            'GetStatistics': gs.GetStatistics,
            'HostInfo': hi.HostInfo,
            'NoMoreWork': nmw.NoMoreWork,
            'ResumeProject': rp.ResumeProject,
            'ResumeTask': rt.ResumeTask,
            'SuspendProject': sp.SuspendProject,
            'SuspendTask': st.SuspendTask,
            'UpdateProject': up.UpdateProject            
        }

        if command_type in mappings:
            return mappings[command_type]()

        raise UnknownCommandException

class UnknownCommandException(Exception):
    pass
