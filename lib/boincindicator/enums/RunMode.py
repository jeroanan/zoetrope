# Copyright (c) David Wilson 2015, 2016
#
# Based on code from Boinc Indicator, (C) 2013 Rodrigo Silva (MestreLion) <linux@rodrigosilva.com>
#
# Licensed under the GPL version 3

import lib.boincindicator.basetypes.Enum as enum


class RunMode(enum.Enum):
    ''' Run modes for CPU, GPU, network,
        controlled by Activity menu and snooze button
    '''
    ALWAYS                 =    1
    AUTO                   =    2
    NEVER                  =    3
    RESTORE                =    4
        #// restore permanent mode - used only in set_X_mode() GUI RPC

    @classmethod
    def name(cls, v):
        # all other modes use the fallback name
        if v == cls.AUTO: return "according to prefs"
        else: return super(RunMode, cls).name(v)
