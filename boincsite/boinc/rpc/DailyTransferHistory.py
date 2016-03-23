# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import lib.boincindicator.client as client

import boincsite.status.rpc.DailyTransfer as dt


class DailyTransferHistory(object):


    def execute(self):
        ts = client.BoincClient().get_daily_transfer_history()
        return map(lambda x: dt.DailyTransfer(x), ts)
