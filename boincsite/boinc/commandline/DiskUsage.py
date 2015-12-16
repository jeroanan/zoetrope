import boincsite.boinc.commandline.BoincCommand as bc

import boincsite.DiskUsage as du

class DiskUsage(bc.BoincCommand):

    def execute(self):
        out, err = self.run_command('boinccmd --get_disk_usage')
        return du.DiskUsage(out.decode('UTF-8'))
