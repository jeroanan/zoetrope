from subprocess import Popen, PIPE

class DoNetworkCommunication(object):

    def execute(self):
        boinccmd = Popen(['boinccmd --network_available'], shell=True, stdout=PIPE, stderr=PIPE)
        out, err = boinccmd.communicate()
