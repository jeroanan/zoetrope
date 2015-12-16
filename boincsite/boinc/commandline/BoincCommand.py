import shlex
import subprocess
from subprocess import Popen, PIPE

class BoincCommand(object):
    def execute(self):
        raise NotImplementedError

    def run_command(self, command_text):
        args = shlex.split(command_text)
        boinccmd = Popen(args, stdout=PIPE, stderr=PIPE)
        return boinccmd.communicate()

    def run(self, command_text):
        args = shlex.split(command_text)
        #boinccmd = Popen(args, stdout=PIPE, stderr=PIPE)
        return subprocess.run(args)
