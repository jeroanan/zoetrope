# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import boincsite.boinc.commandline.DoNetworkCommunication as dnc
import boincsite.boinc.commandline.GetMessages as gm
import boincsite.boinc.commandline.HostInfo as hi


class CommandLineFactory(object):

    @staticmethod
    def create(command_type):
        mappings = {
            'DoNetworkCommunication': dnc.DoNetworkCommunication,
            'GetMessages': gm.GetMessages,
            'HostInfo': hi.HostInfo
        }

        if command_type in mappings:
            return mappings[command_type]()

        raise UnknownCommandException

class UnknownCommandException(Exception):
    pass
