# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import lib.boincindicator.client as client

import boincsite.status.DiskUsage as du
import boincsite.util.ByteConversion as bc

class DiskUsage(du.DiskUsage):

    def __init__(self, disk_usage):
        super().__init__(disk_usage)

        def list_from_type(type_name):
            return [x for x in disk_usage if type(x) == type_name]

        projects = list_from_type(client.DiskUsageProject)
        self.total_disk_space = list_from_type(client.DiskUsageDiskTotal)[0].disk_bytes
        self.free_disk_space = list_from_type(client.DiskUsageDiskFree)[0].disk_bytes

        self.project_disk_usages = map(lambda x: ProjectDiskUsage(x), projects)


class ProjectDiskUsage(du.ProjectDiskUsage):

    def __init__(self, project_disk_usage):
        super().__init__(project_disk_usage)

        self.master_url = project_disk_usage.master_url
        self.disk_usage = bc.bytes_to_megabytes(project_disk_usage.disk_usage)
