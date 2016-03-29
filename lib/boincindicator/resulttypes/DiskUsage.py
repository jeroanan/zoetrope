# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import lib.boincindicator.basetypes.Struct as struct
import lib.boincindicator.util.xmlutil as xmlutil


class DiskUsageProject(struct.Struct):

    def __init__(self):
        self.master_url = ''
        self.disk_usage = ''


class DiskUsageDiskBytes(struct.Struct):
    def __init__(self):
        self.disk_bytes = ''

    def parse(self, xml):
        self.disk_bytes = xmlutil.parse_str(xml)


class DiskUsageDiskTotal(DiskUsageDiskBytes):
    pass


class DiskUsageDiskFree(DiskUsageDiskBytes):
    pass
