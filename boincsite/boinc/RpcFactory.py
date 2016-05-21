# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import boincsite.boinc.DailyTransferHistory as dth
import boincsite.boinc.ExperimentalTask as et
import boincsite.boinc.GetDiskUsage as gdu
import boincsite.boinc.GetGlobalPreferences as ggp
import boincsite.boinc.GetMessages as gm
import boincsite.boinc.GetNotices as gn
import boincsite.boinc.GetPlatform as gp
import boincsite.boinc.HostInfo as hi


class RpcFactory(object):

    @staticmethod
    def create(command_type):
        mappings = {
            'DailyTransferHistory': dth.DailyTransferHistory,
            'DiskUsage': gdu.GetDiskUsage,
            'ExperimentalTask': et.ExperimentalTask,
            'GetGlobalPreferences': ggp.GetGlobalPreferences,
            'GetMessages': gm.GetMessages,
            'GetNotices': gn.GetNotices,
            'GetPlatform': gp.GetPlatform,
            'HostInfo': hi.HostInfo
        }

        if command_type in mappings:
            return mappings[command_type]()

        raise UnknownCommandException

class UnknownCommandException(Exception):
    pass
