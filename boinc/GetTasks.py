import Task as t
from subprocess import Popen, PIPE

class GetTasks(object):

    def execute(self):
        boinccmd = Popen(['boinccmd --get_tasks'], shell=True, stdout=PIPE, stderr=PIPE)
        out, err = boinccmd.communicate()
        tasks = out.decode("utf-8").split(') -----------')
        del(tasks[0])

        boinc_tasks = []
        for task in tasks:
            boinc_tasks.append(t.Task(task))
        return boinc_tasks
