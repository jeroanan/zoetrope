import boincsite.status.HostInfo as hi


class HostInfo(hi.HostInfo):

    def __init__(self, host_info):
        super().__init__(host_info)

        host_info_stack = [s for s in list(reversed(host_info.split('\n'))) if s.strip() != '']

        get_next_field = lambda: host_info_stack.pop().split(':')[1].strip()

        self.timezone = get_next_field()
        self.domain_name = get_next_field()
        self.ip_address = get_next_field()
        self.number_of_cpus = get_next_field()
        self.cpu_vendor = get_next_field()
        self.cpu_model = get_next_field()
        self.cpu_fps_ops = get_next_field()
        self.cpu_int_ops = get_next_field()
        self.cpu_mem_bw = get_next_field()
        self.os_name = get_next_field()
        self.os_version = get_next_field()
        self.memory_size = get_next_field()
        self.cache_size = get_next_field()
        self.swap_size = get_next_field()
        self.disk_size = get_next_field()
        self.disk_free = get_next_field()
