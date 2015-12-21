# Copyright (c) David Wilson 2015
#
# Licensed under the GPL version 3

import boincsite.boinc.rpc.GetTasks as gts
import boincsite.boinc.rpc.AbortTask as at
import boincsite.boinc.rpc.SuspendTask as st
import boincsite.boinc.rpc.ResumeTask as rt

class RpcFactory(object):

    @staticmethod
    def create(command_type):
        mappings = {
            'GetTasks': gts.GetTasks,
            'AbortTask': at.AbortTask,
            'SuspendTask': st.SuspendTask,
            'ResumeTask': rt.ResumeTask
        }

        if command_type in mappings:
            return mappings[command_type]()
