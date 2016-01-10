# Copyright (c) David Wilson 2015
#
# Licensed under the GPL version 3

from datetime import timedelta

import uptime


def get_uptime():
    return str(timedelta(seconds = uptime.uptime()))
