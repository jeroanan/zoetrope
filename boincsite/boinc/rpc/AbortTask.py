# Copyright (c) David Wilson 2015
#
# Licensed under the GPL version 3

import boincsite.boinc.rpc.ResultTask as rt


class AbortTask(object):

    def execute(self, task_name):
        rt.ResultTask(task_name).execute('resume_result')
