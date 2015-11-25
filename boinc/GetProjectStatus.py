from subprocess import Popen, PIPE

class GetProjectStatus(object):

    def execute(self):
        boinccmd = Popen(['boinccmd --get_project_status'], shell=True, stdout=PIPE, stderr=PIPE)
        out, err = boinccmd.communicate()
        projects = out.decode("utf-8").split(') -----------')
