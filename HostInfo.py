class HostInfo(object):

    def __init__(self, host_info_string):

        host_info_stack = [s for s in list(reversed(host_info_string.split('\n'))) if s.strip() != '']

        get_next_field = lambda: host_info_stack.pop().split(':')[1].strip()

        self.__timezone = get_next_field()
        self.__domain_name = get_next_field()
        self.__ip_address = get_next_field()
        self.__number_of_cpus = get_next_field()
        self.__cpu_vendor = get_next_field()
        self.__cpu_model = get_next_field()
        self.__cpu_fps_ops = get_next_field()
        self.__cpu_int_ops = get_next_field()
        self.__cpu_mem_bw = get_next_field()
        self.__os_name = get_next_field()
        self.__os_version = get_next_field()
        self.__memory_size = get_next_field()
        self.__cache_size = get_next_field()
        self.__swap_size = get_next_field()
        self.__disk_size = get_next_field()
        self.__disk_free = get_next_field()

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
        return self.__memory_size

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
        return self.__swap_size

    @swap_size.setter
    def swap_size(self, val):
        self.__swap_size = val

    @property
    def disk_size(self):
        return self.__disk_size

    @disk_size.setter
    def disk_size(self, val):
        self.__disk_size = val

    @property
    def disk_free(self):
        return self.__disk_free

    @disk_free.setter
    def disk_free(self, val):
        self.__disk_free = val
