# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import lib.boincindicator.basetypes.Struct as struct


class AccountOut(struct.Struct):

    def __init__(self):
        self.error_num = ''
        self.error_msg = ''
        self.authenticator = ''
