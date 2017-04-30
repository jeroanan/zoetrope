divert(-1)
include(boincsite/m4/templates/assets/views/views_common.m4)
divert(0)dnl
<div>
  zoe_level_one_breadcrumb(Host Info)
  zoe_page_title(vm.title)
  zoe_loading_panel
  zoe_error_panel(host info)
  <div ng-show="vm.ready && !vm.error">
    zoe_two_column_row(System uptime, vm.host_info.uptime,
                       CPU temperature, vm.host_info.cpu_temperature)

    zoe_two_column_row(Domain name, vm.host_info.domain_name,
                       IP address, vm.host_info.ip_address)

    zoe_two_column_row(Timezone, vm.host_info.timezone)

    zoe_two_column_row(Number of CPUs, vm.host_info.number_of_cpus,
                       CPU vendor, vm.host_info.cpu_vendor)

    zoe_two_column_row(CPU Model, vm.host_info.cpu_model,
                       CPU floating point operations/second, vm.host_info.cpu_fps_ops)

    zoe_two_column_row(CPU integer operations/second, vm.host_info.cpu_int_ops,
                       CPU memory bandwidth, vm.host_info.cpu_mem_bw)

    zoe_two_column_row(Operating system name, vm.host_info.os_name,
                       Operating system version, vm.host_info.os_version)

    zoe_two_column_row(Memory size, vm.host_info.memory_size,
                       Cache size, vm.host_info.cache_size)

    zoe_two_column_row(Swap size, vm.host_info.swap_size,
                       Disk size, vm.host_info.disk_size)

    zoe_two_column_row(Disk free, vm.host_info.disk_free)
  </div>
  zoe_show_raw_data(vm.host_info)
</div>
