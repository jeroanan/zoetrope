# Copyright (c) David Wilson 2015
#
# Licensed under the GPL version 3

from xml.etree import ElementTree

import lib.boincindicator.client as client

import boincsite.status.Project as p


class GetProjectStatus(object):

    def execute(self):
        try:
            result = client.BoincClient().get_project_status()
            return map(lambda r: p.Project(r), result)
        except ConnectionRefusedError:
            # ConnectionRefusedError will happen if the site is running on a box with no boinc installation.
            print("Connection Refused. Is boinc running?")
            return []
