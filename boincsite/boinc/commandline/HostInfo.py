import boincsite.boinc.commandline.BoincCommand as bc

import boincsite.HostInfo as hi


class HostInfo(bc.BoincCommand):

    def execute(self):
        out, err = self.run_command('boinccmd --get_host_info')
        return hi.HostInfo(out.decode('UTF-8'))
