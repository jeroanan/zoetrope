# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import lib.boincindicator.client as client


class GetAllProjectsList(object):

    def execute(self):
        c = client.BoincClient()
        return c.get_all_projects_list()
