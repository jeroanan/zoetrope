# Copyright (c) David Wilson 2016, 2021
#
# Licensed under the GPL version 3

import os
import os.path

import config as conf

import xml.etree.ElementTree

import lib.boincindicator.resulttypes.GlobalPreferences as gp

import boincsite.boinc.AuthorizedTask as at

import boincsite.status.DiskUsage as du
import boincsite.status.Notice as n
import boincsite.status.HostInfo as hi

import boincsite.util.uptime as uptime


class SystemInfoTasks(object):
    """
    Handles tasks that relate to information about the running BOINC client and the computer it is hosted on.
    """

    def __init__(self, client):
        """
        Constructor

        Params:

        client - an instance of lib.boincindicator.client
        """
        self.__client = client

    def get_daily_transfer_history(self):
        """
        Get upload/download figures for each day as well as total upload/download.
        """
        return self.__client.get_daily_transfer_history()

    def get_disk_usage(self):
        """
        Get project-by-project disk usage and disk size/disk free details.
        """
        return du.DiskUsage(self.__client.get_disk_usage())

    def get_global_preferences(self):
        """
        Get BOINC global preferences.
        """
        return self.__client.get_global_prefs_file()

    def get_host_info(self):
        """
        Get information about the BOINC client and the computer it is running on.
        """
        self.get_cpu_temperature()

        ho = self.__client.get_host_info()
        host_info = hi.HostInfo(ho)
        host_info.uptime = uptime.get_uptime()
        host_info.cpu_temperature = self.get_cpu_temperature()
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

    def get_messages(self):
        """
        Get all operational and project-related messages generated by the BOINC client.
        """
        return self.__client.get_messages()

    def get_notices(self):
        """
        Get notices sent by attached projects.
        """
        return map(lambda x: n.Notice(x), self.__client.get_notices())

    def get_cpu_temperature(self):
        """
        Get the CPU temperature in degress celsius

        This will only work on systems where the current CPU temperature is held somewhere that's
        accessible through the filesystem. You can set this by setting cpu_temperature_file in
        config.py. This means that without some jiggery-pokery, I guess that this won't work under
        MS Windows (unless you have some process that polls the sensors and puts the result into a file).

        In cases where such a file cannot be accessed, an empty string is returned.

        It is assumed here that when the temperature file is found it contains one line, which is a number
        containing that is temperatue in degress C * 1000. I have found that this number will always contain
        e.g. 61604 = 61.604 degrees. I multiply this by 1000, giving 61.604, and then round that result,
        giving 62. 
        """
        cpu_temperature_file = conf.cpu_temperature_file

        if not os.path.isfile(cpu_temperature_file):
            return ""

        with open(cpu_temperature_file) as f:
            a = f.read()
            return str(round(int(a)/1000))
