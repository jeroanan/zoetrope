# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import boincsite.boinc.ExperimentalTask as et
import boincsite.boinc.GetMessages as gm
import boincsite.boinc.GetNotices as gn

class RpcFactory(object):

    @staticmethod
    def create(command_type):
        mappings = {
            'ExperimentalTask': et.ExperimentalTask,
            'GetMessages': gm.GetMessages,
            'GetNotices': gn.GetNotices
        }

        if command_type in mappings:
            return mappings[command_type]()

        raise UnknownCommandException

class UnknownCommandException(Exception):
    pass
