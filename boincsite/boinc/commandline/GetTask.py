# Copyright (c) David Wilson 2015
#
# Licensed under the GPL version 3

import boincsite.boinc.commandline.BoincCommand as bc
import boincsite.boinc.commandline.GetTasks as gt


class GetTask(bc.BoincCommand):

    def execute(self, task_name):
        all_tasks = gt.GetTasks().execute()

        ts = [t for t in all_tasks if t.name==task_name]

        if not any(ts):
            raise TaskNotFoundException()

        return ts.pop()

class TaskNotFoundException(Exception):
    pass
