# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import lib.boincindicator.client as client

import config as c

def do_authorized_task(work_function):
    """
    Generic function to perform a BOINC task with an authorized client
    
    Params:
      work_function: What should be done once authorization has taken place.
    
    Returns:
      Whatever is returned by work_function
    """
    client.GUI_RPC_PASSWD_FILE = c.gui_rpc_file_location
    password = client.read_gui_rpc_password()
    
    with client.BoincClient(passwd=password) as auth_client:
        auth_client.authorize(password)
        return work_function(auth_client)
    
