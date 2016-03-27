# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import datetime as dt


def get_date_from_epoch_seconds(seconds_in):
    epoch = dt.date(1970, 1, 1)
    delta = dt.timedelta(seconds=seconds_in)
    return str(epoch + delta)
