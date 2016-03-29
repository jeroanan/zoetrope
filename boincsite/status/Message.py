# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import boincsite.util.DateTimeUtil as dt


class Message(object):

    def __init__(self, message):
        self.__message_number = int(message.seqno)
        self.__project_name = message.project
        self.__message_text = message.body
        self.__message_type = message.pri
        self.__date_time = dt.get_date_from_epoch_seconds(int(message.time))

    @property
    def message_number(self):
        return self.__message_number

    @message_number.setter
    def message_number(self, val):
        self.__message_number = val

    @property
    def date_time(self):
        return self.__date_time

    @date_time.setter
    def date_time(self, val):
        self.__date_time = val

    @property
    def message_type(self):
        return self.__message_type

    @message_type.setter
    def message_type(self, val):
        self.__message_type = val

    @property
    def project_name(self):
        return self.__project_name

    @project_name.setter
    def project_name(self, val):
        self.__project_name = val

    @property
    def message_text(self):
        return self.__message_text

    @message_text.setter
    def message_text(self, val):
        self.__message_text = val

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
