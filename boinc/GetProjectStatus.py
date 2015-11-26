from subprocess import Popen, PIPE

import Project as p

class GetProjectStatus(object):

    def execute(self):
        boinccmd = Popen(['boinccmd --get_project_status'], shell=True, stdout=PIPE, stderr=PIPE)
        out, err = boinccmd.communicate()
        projects = out.decode("utf-8").split(') -----------')

        del(projects[0])

        return map(lambda x: p.Project(x), projects)
