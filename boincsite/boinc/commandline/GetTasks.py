# Copyright (c) David Wilson 2015
#
# Licensed under the GPL version 3

import boincsite.boinc.commandline.BoincCommand as bc

import boincsite.status.commandline.Task as t


class GetTasks(bc.BoincCommand):

    def execute(self):
        out, err = self.run_command('boinccmd --get_tasks')

        tasks = out.decode("utf-8").split(') -----------')
        del(tasks[0])

        return map(lambda x: t.Task(x), tasks)
