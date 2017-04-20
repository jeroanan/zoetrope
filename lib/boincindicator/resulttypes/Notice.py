# Copyright (c) David Wilson 2015, 2016, 2017
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

        self.title = ''
        self.description = ''
        self.create_time = ''
        self.arrival_time = ''
        self.is_private = ''
        self.project_name = ''
        self.category = ''
        self.link = ''
        self.seqno = ''

