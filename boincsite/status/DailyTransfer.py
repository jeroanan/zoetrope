# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import datetime as dtime
import json

import boincsite.util.ByteConversion as bc


class DailyTransfer(object):

    def __init__(self, daily_transfer):
        self.date = str(self.get_transfer_date(int(daily_transfer.when)))
        self.uploaded = bc.bytes_to_megabytes(daily_transfer.up)
        self.downloaded = bc.bytes_to_megabytes(daily_transfer.down)

    def get_transfer_date(self, epoch_days):
        first_day = dtime.date(1970, 1, 1)
        delta = dtime.timedelta(days=epoch_days)
        return first_day + delta

    def __str__(self):
        return 'Date: {date}: uploaded: {uploaded}, downloaded: {downloaded}'.format(
            date=self.date, uploaded=self.uploaded, downloaded=self.downloaded)

class JSONEncoder(json.JSONEncoder):

    def default(self, o):
        return {
            'date': o.date,
            'uploaded': float(o.uploaded.strip('MB')),
            'downloaded': float(o.downloaded.strip('MB'))
        }


def get_month_num(month_abbr):

    nums = {
        'JAN': 1,
        'FEB': 2,
        'MAR': 3,
        'APR': 4,
        'MAY': 5,
        'JUN': 6,
        'JUL': 7,
        'AUG': 8,
        'SEP': 9,
        'OCT': 10,
        'NOV': 11,
        'DEC': 12
    }

    return nums.get(str.upper(month_abbr), 0)
