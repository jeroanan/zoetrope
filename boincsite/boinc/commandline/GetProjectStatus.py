import boincsite.boinc.commandline.BoincCommand as bc

import boincsite.status.Project as p

class GetProjectStatus(bc.BoincCommand):

    def execute(self):
        out, err = self.run_command('boinccmd --get_project_status')

        projects = out.decode("utf-8").split(') -----------')

        del(projects[0])

        return map(lambda x: p.Project(x), projects)
