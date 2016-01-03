# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import boincsite.boinc.exceptions.TaskNotFoundException as tnfe
import boincsite.boinc.commandline.BoincCommand as bc
import boincsite.boinc.commandline.GetTasks as gt


class GetTask(bc.BoincCommand):

    def execute(self, task_name):
        all_tasks = gt.GetTasks().execute()

        ts = [t for t in all_tasks if t.name==task_name]

        if not any(ts):
            raise tnfe.TaskNotFoundException()

        return ts.pop()
