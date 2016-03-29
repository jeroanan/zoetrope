# Copyright (c) David Wilson 2015, 2016
#
# Based on code from Boinc Indicator, (C) 2013 Rodrigo Silva (MestreLion) <linux@rodrigosilva.com>
#
# Licensed under the GPL version 3

import lib.boincindicator.basetypes.Struct as struct
import lib.boincindicator.enums.NetworkStatus as networkstatus
import lib.boincindicator.enums.RunMode as runmode
import lib.boincindicator.enums.SuspendReason as suspendreason


class CcStatus(struct.Struct):
    def __init__(self):
        self.network_status         = networkstatus.NetworkStatus.UNKNOWN
        self.ams_password_error     = False
        self.manager_must_quit      = False

        self.task_suspend_reason    = suspendreason.SuspendReason.UNKNOWN  #// bitmap
        self.task_mode              = runmode.RunMode.UNKNOWN
        self.task_mode_perm         = runmode.RunMode.UNKNOWN        #// same, but permanent version
        self.task_mode_delay        = 0.0                    #// time until perm becomes actual

        self.network_suspend_reason = suspendreason.SuspendReason.UNKNOWN
        self.network_mode           = runmode.RunMode.UNKNOWN
        self.network_mode_perm      = runmode.RunMode.UNKNOWN
        self.network_mode_delay     = 0.0

        self.gpu_suspend_reason     = suspendreason.SuspendReason.UNKNOWN
        self.gpu_mode               = runmode.RunMode.UNKNOWN
        self.gpu_mode_perm          = runmode.RunMode.UNKNOWN
        self.gpu_mode_delay         = 0.0

        self.disallow_attach        = False
        self.simple_gui_only        = False
