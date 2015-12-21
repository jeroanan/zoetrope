# Copyright (c) David Wilson 2015
#
# Licensed under the GPL version 3

import lib.boincindicator.client as client

import boincsite.boinc.commandline.GetTask as gt


class ResumeTask(object):

    def execute(self, task_name):
        t = gt.GetTask().execute(task_name)

        # TODO: Obviously, this is only going to work on my pi.
        client.GUI_RPC_PASSWD_FILE = "/home/pi/gui_rpc_auth.cfg"
        password = client.read_gui_rpc_password()

        with client.BoincClient(passwd=password) as c:
            c.authorize(password)
            c.resume_result(t.name, t.project_url)
