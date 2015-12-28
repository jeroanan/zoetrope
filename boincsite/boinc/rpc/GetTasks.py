# Copyright (c) David Wilson 2015
#
# Licensed under the GPL version 3

import lib.boincindicator.client as client

import boincsite.status.rpc.Task as t

class GetTasks(object):

    def execute(self):
        results = client.BoincClient().get_results(False)

        tasks = []
        for r in results:
            tasks.append(t.Task(r))

        return tasks
