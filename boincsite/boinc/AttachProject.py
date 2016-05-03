# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import time

import lib.boincindicator.resulttypes.SuccessError as se
import lib.boincindicator.client as client
import config as conf


class AttachProject(object):

    def execute(self, project_url, email_address, password_hash):
        """
        Attach to a project with existing credentials (i.e. you already signed up for it)

        Do a lookup on the account to make sure that it exists. If it does then attach to it
        using the credentials supplied.

        params:
          project_url: The url of the project to attach to

          email_address: The email address to act as username

          password_hash: The MD5 hash of email_address+password
        
        returns:
          An instance of SuccessError. Its success field is true for a successful attach.
          Otherwise it will be false and the error_message field will contain details of
          what went wrong.
        """
        client.GUI_RPC_PASSWD_FILE = conf.gui_rpc_file_location
        password = client.read_gui_rpc_password()

        with client.BoincClient(passwd=password) as c:
            c.authorize(password)

            c.lookup_account(project_url, email_address, password_hash, already_hashed=True)

            lookup_result = c.lookup_account_poll()
            success_error = se.SuccessError()
            
            try:
                still_waiting = '-204'

                while lookup_result.error_num == still_waiting:

                    lookup_result = c.lookup_account_poll()
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
