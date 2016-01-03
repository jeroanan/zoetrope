# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import boincsite.boinc.rpc.GetTasks as gts


class GetTask(object):

    def execute(self, task_name):
        all_tasks = gts.GetTasks().execute()

        ts = [t for t in all_tasks if t.name==task_name]

        if not any(ts):
            raise tnfe.TaskNotFoundException()

        return ts.pop()
