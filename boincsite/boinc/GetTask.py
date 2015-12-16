import boincsite.boinc.BoincCommand as bc
import boincsite.boinc.GetTasks as gt

class GetTask(bc.BoincCommand):

    def execute(self, task_name):
        all_tasks = gt.GetTasks().execute()

        ts = [t for t in all_tasks if t.name==task_name]

        if not any(ts):
            raise TaskNotFoundException()

        return ts.pop()

class TaskNotFoundException(Exception):
    pass
