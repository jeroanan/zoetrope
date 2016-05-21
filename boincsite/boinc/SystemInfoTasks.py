# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import os

import config as conf

import xml.etree.ElementTree

import lib.boincindicator.client as client

import boincsite.boinc.AuthorizedTask as at

import boincsite.status.DailyTransfer as dt
import boincsite.status.DiskUsage as du
import boincsite.status.GlobalPreferences as gp
import boincsite.status.HostInfo as hi
import boincsite.util.uptime as uptime


class SystemInfoTasks(object):
    """
    Handles tasks that relate to information about the running BOINC client and the computer it is hosted on.
    """

    def __init__(self):
        self.__client = client.BoincClient()

    def get_daily_transfer_history(self):
        """
        Get upload/download figures for each day as well as total upload/download.
        """
        ts = self.__client.get_daily_transfer_history()
        return map(lambda x: dt.DailyTransfer(x), ts)

    def get_disk_usage(self):
        """
        Get project-by-project disk usage and disk size/disk free details.
        """
        return du.DiskUsage(self.__client.get_disk_usage())

    def get_global_preferences(self):
        """
        Get BOINC global preferences.
        """
        return at.do_authorized_task(lambda c: gp.GlobalPreferences(c.get_global_prefs_file()))

    def get_host_info(self):
        """
        Get information about the BOINC client and the computer it is running on.
        """
        ho = self.__client.get_host_info()
        host_info = hi.HostInfo(ho)
        host_info.uptime = uptime.get_uptime()
        return host_info

    def get_platform(self):
        """
        Get the platform that the BOINC client is running on.

        This is a combination of things such as OS, CPU architecture, and so on.
        """
        file_name = 'client_state.xml'
        full_path = os.path.join(conf.boinc_data_dir, file_name)
        tree = xml.etree.ElementTree.parse(full_path)
        return tree.findall('platform_name')[0].text
        
    
