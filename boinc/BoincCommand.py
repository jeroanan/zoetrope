import shlex
from subprocess import Popen, PIPE

class BoincCommand(object):
    def execute(self):
        raise NotImplementedError

    def run_command(self, command_text):
        print('\n{ct}\n'.format(ct=command_text))

        args = shlex.split(command_text)

        print('\n{a}\n'.format(a=args))
        boinccmd = Popen(args, stdout=PIPE, stderr=PIPE)
        return boinccmd.communicate()
