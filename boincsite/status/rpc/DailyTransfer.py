# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import datetime as dtime

import boincsite.status.DailyTransfer as dt


class DailyTransfer(dt.DailyTransfer):

    def __init__(self, daily_transfer):
        super().__init__(daily_transfer)
        self.date = str(self.get_transfer_date(int(daily_transfer.when)))
        self.uploaded = daily_transfer.up
        self.downloaded = daily_transfer.down

    def get_transfer_date(self, epoch_days):
        first_day = dtime.date(1970, 1, 1)
        delta = dtime.timedelta(epoch_days)
        return first_day + delta
