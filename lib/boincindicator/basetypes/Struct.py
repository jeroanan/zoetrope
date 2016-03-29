# Copyright (c) David Wilson 2015, 2016
#
# Based on code from Boinc Indicator, (C) 2013 Rodrigo Silva (MestreLion) <linux@rodrigosilva.com>
#
# Licensed under the GPL version 3

import lib.boincindicator.util.xmlutil as xmlutil


class Struct(object):
    ''' base helper class with common methods for all classes derived from
        BOINC's C++ structs
    '''
    @classmethod
    def parse(cls, xml):
        return xmlutil.setattrs_from_xml(cls(), xml)

    def __str__(self, indent=0):
        buf = '%s%s:\n' % ('\t' * indent, self.__class__.__name__)
        for attr in self.__dict__:
            value = getattr(self, attr)
            if isinstance(value, list):
                buf += '%s\t%s [\n' % ('\t' * indent, attr)
                for v in value: buf += '\t\t%s\t\t,\n' % v
                buf += '\t]\n'
            else:
                buf += '%s\t%s\t%s\n' % ('\t' * indent,
                                         attr,
                                         value.__str__(indent+2)
                                            if isinstance(value, Struct)
                                            else repr(value))
        return buf
