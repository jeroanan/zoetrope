# Copyright (c) David Wilson 2015, 2016
#
# Based on code from Boinc Indicator, (C) 2013 Rodrigo Silva (MestreLion) <linux@rodrigosilva.com>
#
# Licensed under the GPL version 3

import lib.boincindicator.basetypes.Enum as enum


class CpuSched(enum.Enum):
    ''' values of ACTIVE_TASK::scheduler_state and ACTIVE_TASK::next_scheduler_state
        "SCHEDULED" is synonymous with "executing" except when CPU throttling
        is in use.
    '''
    UNINITIALIZED          =    0
    PREEMPTED              =    1
    SCHEDULED              =    2
