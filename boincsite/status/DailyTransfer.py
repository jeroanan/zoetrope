# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import json

import boincsite.util.ByteConversion as bc


class DailyTransfer(object):

    def __init__(self, daily_transfer):
        self.bytes_uploaded = 0.0
        self.bytes_downloaded = 0.0
        self.transfers_date = ''

    def __str__(self):
        return 'Date: {date}: uploaded: {uploaded}, downloaded: {downloaded}'.format(
            date=self.date, uploaded=self.uploaded, downloaded=self.downloaded)

    @property
    def date(self):
        return self.transfers_date

    @date.setter
    def date(self, val):
        self.transfers_date = val

    @property
    def uploaded(self):
        return bc.bytes_to_megabytes(self.bytes_uploaded)

    @uploaded.setter
    def uploaded(self, val):
        self.bytes_uploaded = val

    @property
    def downloaded(self):
        return bc.bytes_to_megabytes(self.bytes_downloaded)

    @downloaded.setter
    def downloaded(self, val):
        self.bytes_downloaded = val


class JSONEncoder(json.JSONEncoder):

    def default(self, o):
        # Expected date example: 02-Jan-2016
        date_split = o.date.split('-')
        date_str = "{year}-{month}-{day}".format(year=date_split[2],
                                                 month=get_month_num(date_split[1]),
                                                 day=date_split[0])

        return {
            'date': date_str,
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
