# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import json

import lib.boincindicator.resulttypes.DiskUsage as diskusage

import boincsite.util.ByteConversion as bc


class DiskUsage(object):

    def __init__(self, disk_usage):

        def list_from_type(type_name):
            return [x for x in disk_usage if type(x) == type_name]

        projects = list_from_type(diskusage.DiskUsageProject)
        self.total_disk_space = bc.bytes_to_gigabytes(list_from_type(diskusage.DiskUsageDiskTotal)[0].disk_bytes)
        self.free_disk_space = bc.bytes_to_gigabytes(list_from_type(diskusage.DiskUsageDiskFree)[0].disk_bytes)

        self.project_disk_usages = map(lambda x: ProjectDiskUsage(x), projects)

class JSONEncoder(json.JSONEncoder):

    def default(self, o):
        disk_usages = {
            'total_disk_space': o.total_disk_space,
            'free_disk_space': o.free_disk_space
        }

        project_disk_usages = []

        for pdu in o.project_disk_usages:
            d = {
                'master_url': pdu.master_url,
                'disk_usage': float(pdu.disk_usage.strip('MB'))
            }
            project_disk_usages.append(d)

        disk_usages['project_disk_usages'] = project_disk_usages

        return disk_usages

class ProjectDiskUsage(object):

    def __init__(self, project_disk_usage):
        """
        Expects data in the form of:

        4) -----------
           master URL: http://setiathome.berkeley.edu/
           disk usage: 0.11MB
        """
        self.master_url = project_disk_usage.master_url
        self.disk_usage = bc.bytes_to_megabytes(project_disk_usage.disk_usage)
