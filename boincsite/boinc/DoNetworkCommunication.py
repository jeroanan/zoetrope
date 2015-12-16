import boincsite.boinc.BoincCommand as bc

class DoNetworkCommunication(bc.BoincCommand):

    def execute(self):
        out, err = self.run_command('boinccmd --network_available')
