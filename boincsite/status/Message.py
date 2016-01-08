# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3


class Message(object):

    def __init__(self, message):
        self.__message_number = -1
        self.__date_time = ''
        self.__message_type = ''
        self.__project_name = ''
        self.__message_text = ''

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
