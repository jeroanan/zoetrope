import boinc.BoincCommand as bc

import DiskUsage as du

class DiskUsage(bc.BoincCommand):

    def execute(self):
        out, err = self.run_command('boinccmd --get_disk_usage')
        return du.DiskUsage(out.decode('UTF-8'))
