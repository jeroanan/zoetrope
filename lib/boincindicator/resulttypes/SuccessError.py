# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import lib.boincindicator.basetypes.Struct as struct


class SuccessError(struct.Struct):

    def __init__(self):
        self.fields = ['success', 'error_message']
        self.success = True
        self.error_message = -1

    def __str__(self):
        return '''SuccessError: 
success: {success}
error_message: {error_message}'''.format(success=self.success, error_message=self.error_message)
