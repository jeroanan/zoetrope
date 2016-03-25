# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import config as c
import boincsite.boinc.rpc.GetTask as gt

import lib.boincindicator.client as client


class ResultTask(object):

    def __init__(self, task_name):
        self.__task = gt.GetTask().execute(task_name)

        client.GUI_RPC_PASSWD_FILE = c.gui_rpc_file_location
        self.__password = client.read_gui_rpc_password()

    def execute(self, result_func):
        with client.BoincClient(passwd=self.__password) as c:
            c.authorize(self.__password)
            getattr(c, result_func)(self.__task.name, self.__task.project_url)
