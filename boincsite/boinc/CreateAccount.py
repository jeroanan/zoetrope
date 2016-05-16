# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import time

import lib.boincindicator.resulttypes.SuccessError as se
import lib.boincindicator.client as client
import config as conf


class CreateAccount(object):

    def execute(self, project_url, email_address, password_hash, username):
        client.GUI_RPC_PASSWD_FILE = conf.gui_rpc_file_location
        password = client.read_gui_rpc_password()

        with client.BoincClient(passwd=password) as c:
            c.authorize(password)

            c.create_account(project_url, email_address, password_hash, username)

            lookup_result = c.create_account_poll()
            success_error = se.SuccessError()

            try:
                still_waiting = '-204'

                while lookup_result.error_num == still_waiting:

                    lookup_result = c.create_account_poll()
                    time.sleep(2)
                
                    if lookup_result.authenticator != '':
                        attach_result = c.project_attach(project_url, lookup_result.authenticator)
                    elif lookup_result.error_msg != '':
                        success_error.success = False
                        success_error.error_message = lookup_result.error_msg
                        
            except AttributeError as e:
                success_error.success = False
                success_error.error_message = str(e)
            finally:
                return success_error
