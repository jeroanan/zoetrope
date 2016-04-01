# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import lib.boincindicator.client as client
import config as conf


class DetachProject(object):

    def execute(self, project_url):
        client.GUI_RPC_PASSWD_FILE = conf.gui_rpc_file_location
        password = client.read_gui_rpc_password()

        with client.BoincClient(passwd=password) as c:
            c.authorize(password)

            c.project_detach(project_url)
