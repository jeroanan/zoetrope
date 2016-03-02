import boinc.BoincCommand as bc

import Task as t

class GetTasks(bc.BoincCommand):

    def execute(self):
        out, err = self.run_command('boinccmd --get_tasks')

        tasks = out.decode("utf-8").split(') -----------')
        del(tasks[0])

        return map(lambda x: t.Task(x), tasks)
