from subprocess import Popen, PIPE

class BoincCommand(object):
    def execute(self):
        raise NotImplementedError

    def run_command(self, command_text):
        boinccmd = Popen([command_text], shell=True, stdout=PIPE, stderr=PIPE)
        return boinccmd.communicate()
