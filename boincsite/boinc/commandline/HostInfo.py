# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import boincsite.boinc.commandline.BoincCommand as bc
import boincsite.status.commandline.HostInfo as hi
import boincsite.util.uptime as uptime


class HostInfo(bc.BoincCommand):

    def execute(self):
        out, err = self.run_command('boinccmd --get_host_info')
        host_info = hi.HostInfo(out.decode('UTF-8'))
        host_info.uptime = uptime.get_uptime()
        return host_info
