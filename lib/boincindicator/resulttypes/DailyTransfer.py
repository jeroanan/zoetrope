# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import lib.boincindicator.basetypes.Struct as struct


class DailyTransfer(struct.Struct):

    def __init__(self):
        self.when = ''
        self.up = ''
        self.down = ''
