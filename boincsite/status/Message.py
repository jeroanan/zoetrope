# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import boincsite.util.DateTimeUtil as dt


class Message(object):

    def __init__(self, message):
        self.fields = ['message_number',
                       'date_time',
                       'message_type',
                       'project_name',
                       'message_text']

        self.message_number = int(message.seqno)
        self.project_name = message.project
        self.message_text = message.body
        self.message_type = message.pri
        self.date_time = dt.get_date_from_epoch_seconds(int(message.time))

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
