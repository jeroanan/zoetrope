# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import boincsite.status.HostInfo as hi


class HostInfo(hi.HostInfo):

    def __init__(self, host_info):
        super().__init__(host_info)

        # Fields offered here that I didn't have before and haven't included yet:
        #  host_cpid (seems like a guid identifying the host)
        #  p_feautres (processor features? For my pi2 this gives:
        #   'half thumb fastmult vfp edsp neon vfpv3 tls vfpv4 idiva idivt vfpd32 lpae evtstrm')
        #  p_calculated ("when benchmarks were last run, or zero")
        #  p_vm_extensions_disabled (This just gives "False" for my pi2. Not sure what this means yet.)
        #  virtualbox_version (Version of Virtual Box, if installed)
        #  coprocs (Co-processors? On my pi2 this is just empty)

        self.timezone = host_info.timezone
        self.domain_name = host_info.domain_name
        self.ip_address = host_info.ip_addr
        self.cpu_fps_ops = host_info.p_fpops
        self.number_of_cpus = host_info.p_ncpus
        self.cpu_vendor = host_info.p_vendor
        self.cpu_model = host_info.p_model
        self.cpu_int_ops = host_info.p_iops
        self.cpu_mem_bw = host_info.p_membw
        self.memory_size = host_info.m_nbytes
        self.cache_size = host_info.m_cache
        self.swap_size = host_info.m_swap
        self.disk_size = host_info.d_total
        self.disk_free = host_info.d_free
        self.os_name = host_info.os_name
        self.os_version = host_info.os_version

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
