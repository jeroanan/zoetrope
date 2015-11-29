import boinc.BoincCommand as bc

import HostInfo as hi


class HostInfo(bc.BoincCommand):

    def execute(self):
        out, err = self.run_command('boinccmd --get_host_info')
        return hi.HostInfo(out.decode('UTF-8'))
