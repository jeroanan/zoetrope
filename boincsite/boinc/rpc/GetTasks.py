# Copyright (c) David Wilson 2015
#
# Licensed under the GPL version 3

import lib.boincindicator.client as client


class GetTasks(object):

    def execute(self):
        return client.BoincClient().get_results(False)
