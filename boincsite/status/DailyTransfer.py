# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import datetime as dtime
import json

import boincsite.util.ByteConversion as bc


class DailyTransfer(object):

    def __init__(self, daily_transfer):
        self.fields = ['date', 'uploaded', 'downloaded']
        self.date = str(self.get_transfer_date(int(daily_transfer.when)))
        self.uploaded = float(bc.bytes_to_megabytes(daily_transfer.up).strip('MB'))
        self.downloaded = float(bc.bytes_to_megabytes(daily_transfer.down).strip('MB'))

    def get_transfer_date(self, epoch_days):
        first_day = dtime.date(1970, 1, 1)
        delta = dtime.timedelta(days=epoch_days)
        return first_day + delta

    def __str__(self):
        return 'Date: {date}: uploaded: {uploaded}, downloaded: {downloaded}'.format(
            date=self.date, uploaded=self.uploaded, downloaded=self.downloaded)
