# Copyright (c) David Wilson 2015
#
# Licensed under the GPL version 3

from xml.etree import ElementTree

import lib.boincindicator.client as client


class GetProjectStatus(object):

    def execute(self):
        result = client.BoincClient().get_project_status()

        return result
