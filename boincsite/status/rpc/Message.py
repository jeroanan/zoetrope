# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import boincsite.status.Message as message


class Message(message.Message):

    def __init__(self, message):
        super().__init__(message)

        self.message_number = message.seqno
        self.project = message.project
        self.message_text = message.body
        self.message_type = message.pri
        self.date_time = message.time
