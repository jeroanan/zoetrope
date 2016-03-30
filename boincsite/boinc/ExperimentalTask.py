# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

from io import StringIO
import json
import time

import lib.boincindicator.client as client

import config as conf



class ExperimentalTask(object):

    def execute(self):
        client.GUI_RPC_PASSWD_FILE = conf.gui_rpc_file_location
        password = client.read_gui_rpc_password()

        with client.BoincClient(passwd=password) as c:
            c.authorize(password)

            project_url = 'http://asteroidsathome.net/boinc'
            email_address = ''

            # hash of pasword + email_address
            password = '4d3eeb4a0230a38f84011caa7d1e1b0d'
            c.lookup_account(project_url, email_address, password, already_hashed=True)

            i = 0

            while i<6:
                print(c.lookup_account_poll())
                time.sleep(2)
                i+=1
