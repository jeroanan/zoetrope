# Copyright (c) David Wilson 2015, 2016
#
# Based on code from Boinc Indicator, (C) 2013 Rodrigo Silva (MestreLion) <linux@rodrigosilva.com>
#
# Licensed under the GPL version 3

import lib.boincindicator.basetypes.Enum as enum


class SuspendReason(enum.Enum):
    ''' bitmap defs for task_suspend_reason, network_suspend_reason
        Note: doesn't need to be a bitmap, but keep for compatibility
    '''
    NOT_SUSPENDED          =    0  # Not in original API
    BATTERIES              =    1
    USER_ACTIVE            =    2
    USER_REQ               =    4
    TIME_OF_DAY            =    8
    BENCHMARKS             =   16
    DISK_SIZE              =   32
    CPU_THROTTLE           =   64
    NO_RECENT_INPUT        =  128
    INITIAL_DELAY          =  256
    EXCLUSIVE_APP_RUNNING  =  512
    CPU_USAGE              = 1024
    NETWORK_QUOTA_EXCEEDED = 2048
    OS                     = 4096
    WIFI_STATE             = 4097
    BATTERY_CHARGING       = 4098
    BATTERY_OVERHEATED     = 4099

    @classmethod
    def name(cls, v):
        if   v == cls.UNKNOWN:                return "unknown reason"
        elif v == cls.BATTERIES:              return "on batteries"
        elif v == cls.USER_ACTIVE:            return "computer is in use"
        elif v == cls.USER_REQ:               return "user request"
        elif v == cls.TIME_OF_DAY:            return "time of day"
        elif v == cls.BENCHMARKS:             return "CPU benchmarks in progress"
        elif v == cls.DISK_SIZE:              return "need disk space - check preferences"
        elif v == cls.NO_RECENT_INPUT:        return "no recent user activity"
        elif v == cls.INITIAL_DELAY:          return "initial delay"
        elif v == cls.EXCLUSIVE_APP_RUNNING:  return "an exclusive app is running"
        elif v == cls.CPU_USAGE:              return "CPU is busy"
        elif v == cls.NETWORK_QUOTA_EXCEEDED: return "network bandwidth limit exceeded"
        elif v == cls.OS:                     return "requested by operating system"
        elif v == cls.WIFI_STATE:             return "not connected to WiFi network"
        elif v == cls.BATTERY_CHARGING:       return "battery is recharging"
        elif v == cls.BATTERY_OVERHEATED:     return "battery is overheated"
        else: return super(SuspendReason, cls).name(v)
