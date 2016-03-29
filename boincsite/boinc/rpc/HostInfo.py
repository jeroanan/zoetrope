# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import lib.boincindicator.client as client

import boincsite.status.HostInfo as hi
import boincsite.util.uptime as uptime


class HostInfo(object):

    def execute(self):
        ho = client.BoincClient().get_host_info()
        host_info = hi.HostInfo(ho)
        host_info.uptime = uptime.get_uptime()
        return host_info
