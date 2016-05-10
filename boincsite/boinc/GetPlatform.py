# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import os

import config as c

import xml.etree.ElementTree


class GetPlatform(object):

    def execute(self):
        file_name = 'client_state.xml'
        full_path = os.path.join(c.boinc_data_dir, file_name)
        tree = xml.etree.ElementTree.parse(full_path)
        return tree.findall('platform_name')[0].text
