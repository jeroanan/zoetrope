# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import lib.boincindicator.client as client
import boincsite.status.DiskUsage as du


class GetDiskUsage(object):

    def execute(self):
        return du.DiskUsage(client.BoincClient().get_disk_usage())
