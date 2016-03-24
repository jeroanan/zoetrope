# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import datetime as dt

import boincsite.status.Message as message


class Message(message.Message):

    def __init__(self, message):
        super().__init__(message)

        self.message_number = int(message.seqno)
        self.project_name = message.project
        self.message_text = message.body
        self.message_type = message.pri
        self.date_time = self.get_date_time(int(message.time))

    def get_date_time(self, seconds_in):
        epoch = dt.datetime(1970, 1, 1)
        delta = dt.timedelta(seconds=seconds_in)
        return str(epoch + delta)

    def __str__(self):
        return """Message no: {message_number}
Project: {project}
Message Text: {message_text}
Message Type: {message_type}
Date/Time: {date_time}
""".format(message_number=self.message_number,
           project=self.project_name,
           message_text=self.message_text,
           message_type=self.message_type,
           date_time=self.date_time)
