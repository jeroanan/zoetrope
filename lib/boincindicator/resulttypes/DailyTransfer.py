# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import datetime as dtime

import lib.boincindicator.basetypes.Struct as struct

import boincsite.util.ByteConversion as bc


class DailyTransfer(struct.Struct):

    def __init__(self):
        self.fields = ['when', 'up', 'down']

        self.__when = ''
        self.__up = ''
        self.__down = ''

    # It is necessary to do properties here so we can make
    # use of the struct.Struct type as well as being able to
    # change the values of attributes when they are accessed.
    @property
    def when(self):
        if self.__when == '':
            return ''
        return str(self.get_transfer_date(int(self.__when)))

    @when.setter
    def when(self, val):
        self.__when = val

    @property
    def up(self):
        if self.__up == '':
            return ''
        return float(bc.bytes_to_megabytes(self.__up).strip('MB'))

    @up.setter
    def up(self, val):
        self.__up = val

    @property
    def down(self):
        if self.__down == '':
            return ''
        return float(bc.bytes_to_megabytes(self.__down).strip('MB'))

    @down.setter
    def down(self, val):
        self.__down =  val

    def get_transfer_date(self, epoch_days):
        first_day = dtime.date(1970, 1, 1)
        delta = dtime.timedelta(days=epoch_days)
        return first_day + delta

    def __str__(self):
        return 'Date: {when}: uploaded: {up}, downloaded: {down}'.format(
            when=self.when, up=self.up, down=self.down)
