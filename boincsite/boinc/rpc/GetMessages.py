# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import lib.boincindicator.client as client

import boincsite.status.rpc.Message as message


class GetMessages(object):

    def execute(self):
        messages = client.BoincClient().get_messages()
        return map(lambda x: message.Message(x), messages)
