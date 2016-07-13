# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import lib.boincindicator.basetypes.Struct as struct

import boincsite.util.DateTimeUtil as dt


class Notice(struct.Struct):

    def __init__(self):
        self.fields = ['title',
                       'description',
                       'create_time',
                       'arrival_time',
                       'is_private',
                       'project_name',
                       'category',
                       'link',
                       'seqno']

        self.__title = ''
        self.__description = ''
        self.__create_time = ''
        self.__arrival_time = ''
        self.__is_private = ''
        self.__project_name = ''
        self.__category = ''
        self.__link = ''
        self.__seqno = ''

        @property
        def title(self):
            return self.__title

        @title.setter
        def title(self, val):
            self.__title = val

        @property
        def description(self):
            return self.__description

        @description.setter
        def description(self, val):
            self.__description = val

        @property
        def create_time(self):
            return self.__create_time

        @create_time.setter
        def create_time(self, val):
            self.__create_time = val

        @property
        def arrival_time(self):
            return self.__arrival_time

        @arrival_time.setter
        def arrival_time(self, val):
            self.__arrival_time = val

        @property
        def is_private(self):
            return self.is_private

        @is_private.setter
        def is_private(self, val):
            self.__is_private = val

        @property
        def project_name(self):
            return self.__project_name

        @project_name.setter
        def project_name(self, val):
            self.__project_name = val

        @property
        def category(self):
            return self.__category

        @category.setter
        def category(self, val):
            self.__category = val

        @property
        def link(self):
            return self.__link

        @link.setter
        def link(self, val):
            self.__link = val

        @property
        def seqno(self):
            return self.__seqno

        @seqno.setter
        def seqno(self, val):
            self.__seqno = val
