import Task as t
from subprocess import Popen, PIPE

class GetTasks(object):

    def execute(self):
        boinccmd = Popen(['boinccmd --get_tasks'], shell=True, stdout=PIPE, stderr=PIPE)
        out, err = boinccmd.communicate()
        tasks = out.decode("utf-8").split(') -----------')
        del(tasks[0])

        return map(lambda x: t.Task(x), tasks)
        
