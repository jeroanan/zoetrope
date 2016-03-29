# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import lib.boincindicator.basetypes.Struct as struct


class Message(struct.Struct):

    def __init__(self):
        self.project = ''
        self.pri = ''
        self.seqno = ''
        self.body = ''
        self.time = ''
