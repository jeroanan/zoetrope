# Copyright (c) David Wilson 2015
#
# Licensed under the GPL version 3

import lib.boincindicator.client as client

import boincsite.status.Task as t

class GetTasks(object):

    def execute(self):
        try:
            results = client.BoincClient().get_results(False)
            return map(lambda r: t.Task(r), results)
        except ConnectionRefusedError:
            # ConnectionRefusedError will happen if the site is running on a box with no boinc installation.
            return []
