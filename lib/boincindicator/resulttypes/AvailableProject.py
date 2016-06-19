# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import lib.boincindicator.basetypes.Struct as struct

import lib.boincindicator.util.xmlutil as xmlutil

from xml.etree import ElementTree


class AvailableProject(struct.Struct):

    def __init__(self):
        self.fields = ['name', 'url', 'general_area', 'specific_area', 'description', 'home', 'platforms', 'image', 'summary']
        self.name = ''
        self.url = ''
        self.general_area = ''
        self.specific_area = ''
        self.description = ''
        self.home = ''
        self.platforms = []
        self.image = ''
        self.summary = ''

    @classmethod
    def parse(cls, xml):
        if not isinstance(xml, ElementTree.Element):
            xml = ElementTree.fromstring(xml)

        available_project = super(AvailableProject, cls).parse(xml)

        aux = []
        for c in available_project.platforms:
            platform = AvailableProjectPlatform()
            platform.parse(c)

            aux.append(platform)
        available_project.platforms = aux

        return available_project


class AvailableProjectPlatform(struct.Struct):

    def __init__(self):
        self.fields = ['name']
        self.name = ''

    def parse(self, xml):
        self.name = xmlutil.parse_str(xml)
