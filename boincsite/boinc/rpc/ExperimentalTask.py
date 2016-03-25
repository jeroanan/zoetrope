# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import config as c


class ExperimentalTask(object):

    def execute(self):
        print(c.gui_rpc_file_location)
