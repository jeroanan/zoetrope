import boincsite.boinc.commandline.BoincCommand as bc

import boincsite.status.Task as t

class GetTasks(bc.BoincCommand):

    def execute(self):
        out, err = self.run_command('boinccmd --get_tasks')

        tasks = out.decode("utf-8").split(') -----------')
        del(tasks[0])

        return map(lambda x: t.Task(x), tasks)
