# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import lib.boincindicator.basetypes.Struct as struct
import lib.boincindicator.util.xmlutil as xmlutil

from xml.etree import ElementTree

class Statistics(struct.Struct):

    def __init__(self):
        self.project_statistics = []
        
    @classmethod
    def parse(cls, xml):
        
        if not isinstance(xml, ElementTree.Element):
            xml = ElementTree.fromstring(xml)

        statistics = super(Statistics, cls).parse(xml)

        children = []

        for c in xml:

            if c.tag=='project_statistics':
 
                for d in c:
                    if d.tag=='master_url':
                        master_url = MasterUrl()
                        master_url.parse(d)
                        children.append(master_url)

                    elif d.tag=='daily_statistics':
                        daily_statistics = DailyStatistics.parse(d)
                        children.append(daily_statistics)
                    else:
                        print('Some otther tag (inner): ' + d.tag)
                
            else:
                print('Some other tag: ' + c.tag)

        statistics.project_statistics = children
        return statistics


class MasterUrl(struct.Struct):

    def __init__(self):
        self.url = ''

    def parse(self, xml):
        self.url = xmlutil.parse_str(xml)

class DailyStatistics(struct.Struct):

    def __init__(self):
        self.day = ''
        self.user_total_credit = ''
        self.user_expavg_credit = ''
        self.host_total_credit = ''
        self.host_expavg_credit = ''
