# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import time

import lib.boincindicator.client as client
import config as conf


class AttachProject(object):

    def execute(self, project_url, email_address, password_hash):
        client.GUI_RPC_PASSWD_FILE = conf.gui_rpc_file_location
        password = client.read_gui_rpc_password()

        with client.BoincClient(passwd=password) as c:
            c.authorize(password)

            c.lookup_account(project_url, email_address, password_hash, already_hashed=True)

            lookup_result = c.lookup_account_poll()

            while lookup_result.error_num == '-204':
                lookup_result = c.lookup_account_poll()
                time.sleep(2)

            if lookup_result.authenticator != '':
                c.project_attach(project_url, lookup_result.authenticator)
