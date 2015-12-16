import boincsite.boinc.commandline.BoincCommand as bc

import boincsite.boinc.commandline.GetTask as gt


class AbortTask(bc.BoincCommand):

    def execute(self, task_name):
        task = gt.GetTask().execute(task_name)

        command_line = 'boinccmd --task {project_url} {task_name} abort'.format(
            project_url=task.project_url.strip('/'),
            task_name=task.name)

        out, err = self.run(command_line)
