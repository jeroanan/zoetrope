# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import datetime as dt

epoch = dt.datetime(1970, 1, 1)

def get_date_from_epoch_seconds(seconds_in):
    return str(get_date_object_from_epoch_seconds(seconds_in))

def get_date_object_from_epoch_seconds(seconds_in):
    delta = dt.timedelta(seconds=seconds_in)
    return epoch + delta

def get_difference_with_epoch(seconds_in):
    date_from_seconds = get_date_object_from_epoch_seconds(float(seconds_in))
    return date_from_seconds-epoch
