# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import boincsite.util.ByteConversion as bc


class HostInfo(object):

    def __init__(self, host_info):
        # Fields offered here that I didn't have before and haven't included yet:
        #  host_cpid (seems like a guid identifying the host)
        #  p_feautres (processor features? For my pi2 this gives:
        #   'half thumb fastmult vfp edsp neon vfpv3 tls vfpv4 idiva idivt vfpd32 lpae evtstrm')
        #  p_calculated ("when benchmarks were last run, or zero")
        #  p_vm_extensions_disabled (This just gives "False" for my pi2. Not sure what this means yet.)
        #  virtualbox_version (Version of Virtual Box, if installed)
        #  coprocs (Co-processors? On my pi2 this is just empty)

        self.__timezone = host_info.timezone
        self.__domain_name = host_info.domain_name
        self.__ip_address = host_info.ip_addr
        self.__cpu_fps_ops = host_info.p_fpops
        self.__number_of_cpus = host_info.p_ncpus
        self.__cpu_vendor = host_info.p_vendor
        self.__cpu_model = host_info.p_model
        self.__cpu_int_ops = host_info.p_iops
        self.__cpu_mem_bw = host_info.p_membw
        self.__memory_size = host_info.m_nbytes
        self.__cache_size = host_info.m_cache
        self.__swap_size = host_info.m_swap
        self.__disk_size = host_info.d_total
        self.__disk_free = host_info.d_free
        self.__os_name = host_info.os_name
        self.__os_version = host_info.os_version

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

    def __str__(self):
        return """Timezone: {timezone}
Domain Name: {domain_name}
IP Address: {ip_address}
Number of CPUs: {number_of_cpus}
CPU Vendor: {cpu_vendor}
CPU Model: {cpu_model}
Floating Point Operations: {cpu_fps_ops}
Integer Operations: {cpu_int_ops}
Memory Bandwidth: {cpu_mem_bw}
Memory Size: {memory_size}
Cache Size: {cache_size}
Swap Size: {swap_size}
Disk Size: {disk_size}
Free Disk Space: {disk_free}
Operating System Name: {os_name}
Operating System Version: {os_version}
""".format(
timezone=self.timezone,
domain_name=self.domain_name,
ip_address=self.ip_address,
number_of_cpus=self.number_of_cpus,
cpu_vendor=self.cpu_vendor,
cpu_model=self.cpu_model,
cpu_fps_ops=self.cpu_fps_ops,
cpu_int_ops=self.cpu_int_ops,
cpu_mem_bw=self.cpu_mem_bw,
memory_size=self.memory_size,
cache_size=self.cache_size,
swap_size=self.swap_size,
disk_size=self.disk_size,
disk_free=self.disk_free,
os_name=self.os_name,
os_version=self.os_version)
