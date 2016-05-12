# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import lib.boincindicator.client as client


class NoMoreWork(object):

    def execute(self, project_url):
        client.BoincClient().project_no_more_work()

