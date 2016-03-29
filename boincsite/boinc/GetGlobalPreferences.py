# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

from io import StringIO
import json

import lib.boincindicator.client as client

import config as conf
import boincsite.status.GlobalPreferences as gp


class GetGlobalPreferences(object):

    def execute(self):
        client.GUI_RPC_PASSWD_FILE = conf.gui_rpc_file_location
        password = client.read_gui_rpc_password()

        with client.BoincClient(passwd=password) as c:
            c.authorize(password)
            return gp.GlobalPreferences(c.get_global_prefs_file())
