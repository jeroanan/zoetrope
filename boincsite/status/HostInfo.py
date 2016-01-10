# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import boincsite.util.ByteConversion as bc


class HostInfo(object):

    def __init__(self, host_info):
        self.__timezone = ''
        self.__domain_name = ''
        self.__ip_address = ''
        self.__number_of_cpus = ''
        self.__cpu_vendor = ''
        self.__cpu_model = ''
        self.__cpu_fps_ops = ''
        self.__cpu_int_ops = ''
        self.__cpu_mem_bw = ''
        self.__os_name = ''
        self.__os_version = ''
        self.__memory_size = ''
        self.__cache_size = ''
        self.__swap_size = ''
        self.__disk_size = ''
        self.__disk_free = ''
        self.__uptime = ''

    @property
    def timezone(self):
        return self.__timezone

    @timezone.setter
    def timezone(self, val):
        self.__timezone = val

    @property
    def domain_name(self):
        return self.__domain_name

    @domain_name.setter
    def domain_name(self, val):
        self.__domain_name = val

    @property
    def ip_address(self):
        return self.__ip_address

    @ip_address.setter
    def ip_address(self, val):
        self.__ip_address = val

    @property
    def number_of_cpus(self):
        return self.__number_of_cpus

    @number_of_cpus.setter
    def number_of_cpus(self, val):
        self.__number_of_cpus = val

    @property
    def cpu_vendor(self):
        return self.__cpu_vendor

    @cpu_vendor.setter
    def cpu_vendor(self, val):
        self.__cpu_vendor = val

    @property
    def cpu_model(self):
        return self.__cpu_model

    @cpu_model.setter
    def cpu_model(self, val):
        self.__cpu_model = val

    @property
    def cpu_fps_ops(self):
        return self.__cpu_fps_ops

    @cpu_fps_ops.setter
    def cpu_fps_ops(self, val):
        self.__cpu_fps_ops = val

    @property
    def cpu_int_ops(self):
        return self.__cpu_int_ops

    @cpu_int_ops.setter
    def cpu_int_ops(self, val):
        self.__cpu_int_ops = val

    @property
    def cpu_mem_bw(self):
        return self.__cpu_mem_bw

    @cpu_mem_bw.setter
    def cpu_mem_bw(self, val):
        self.__cpu_mem_bw = val

    @property
    def os_name(self):
        return self.__os_name

    @os_name.setter
    def os_name(self, val):
        self.__os_name = val

    @property
    def os_version(self):
        return self.__os_version

    @os_version.setter
    def os_version(self, val):
        self.__os_version = val

    @property
    def memory_size(self):
        return bc.bytes_to_gigabytes(self.__memory_size)

    @memory_size.setter
    def memory_size(self, val):
        self.__memory_size = val

    @property
    def cache_size(self):
        return self.__cache_size

    @cache_size.setter
    def cache_size(self, val):
        self.__cache_size = val

    @property
    def swap_size(self):
        return bc.bytes_to_gigabytes(self.__swap_size)

    @swap_size.setter
    def swap_size(self, val):
        self.__swap_size = val

    @property
    def disk_size(self):
        return bc.bytes_to_gigabytes(self.__disk_size)

    @disk_size.setter
    def disk_size(self, val):
        self.__disk_size = val

    @property
    def disk_free(self):
        return bc.bytes_to_gigabytes(self.__disk_free)

    @disk_free.setter
    def disk_free(self, val):
        self.__disk_free = val

    @property
    def uptime(self):
        return self.__uptime

    @uptime.setter
    def uptime(self, val):
        self.__uptime = val
