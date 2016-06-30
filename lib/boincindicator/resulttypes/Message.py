# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import lib.boincindicator.basetypes.Struct as struct

import boincsite.util.DateTimeUtil as dt


class Message(struct.Struct):

    def __init__(self):
        self.fields = ['seqno',
                       'time',
                       'pri',
                       'project',
                       'body']

        self.__project = ''
        self.__pri = ''
        self.__seqno = ''
        self.__body = ''
        self.__time = ''

    # It is necessary to do properties here so we can make
    # use of the struct.Struct type as well as being able to
    # change the values of attributes when they are accessed.
    @property
    def project(self):
        return self.__project

    @project.setter
    def project(self, val):
        self.__project = val

    @property
    def pri(self):
        return self.__pri

    @pri.setter
    def pri(self, val):
        self.__pri = val

    @property
    def seqno(self):
        if self.__seqno == '':
            return ''
        return int(self.__seqno)

    @seqno.setter
    def seqno(self, val):
        self.__seqno = val

    @property
    def body(self):
        return self.__body

    @body.setter
    def body(self, val):
        self.__body = val

    @property
    def time(self):
        if self.__time=='':
            return ''
        return dt.get_date_from_epoch_seconds(int(self.__time))

    @time.setter
    def time(self, val):
        self.__time = val
        
    def __str__(self):
        return """Message no: {seqno}
Project: {project}
Message Text: {body}
Message Type: {pri}
Date/Time: {time}
""".format(seqno=self.seqno,
           project=self.project,
           body=self.body,
           pri=self.pri,
           time=self.time)
