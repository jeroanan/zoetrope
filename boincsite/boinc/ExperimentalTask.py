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

            #password + email
            password_hash = '32bd8081c1ac7e5c61e941f22af2a026'

            c.create_account('http://atlasathome.cern.ch/', 'davidwil@posteo.de', password_hash,'jeroanan')

            time.sleep(2)

            c.create_account_poll()

            time.sleep(2)

            c.create_account_poll()

            time.sleep(2)

            c.create_account_poll()



