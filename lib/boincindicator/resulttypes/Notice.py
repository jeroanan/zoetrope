# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import lib.boincindicator.basetypes.Struct as struct


class Notice(struct.Struct):

    def __init__(self):
        self.title = ''
        self.description = ''
        self.create_time = ''
        self.arrival_time = ''
        self.is_private = ''
        self.project_name = ''
        self.category = ''
        self.link = ''
        self.seqno = ''
