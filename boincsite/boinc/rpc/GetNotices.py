# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import lib.boincindicator.client as client

import boincsite.status.Notice as n


class GetNotices(object):

    def execute(self):
        return map(lambda x: n.Notice(x), client.BoincClient().get_notices())
