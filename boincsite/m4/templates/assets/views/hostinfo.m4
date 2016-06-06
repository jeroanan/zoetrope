divert(-1)
include(boincsite/m4/templates/assets/views/views_common.m4)
divert(0)dnl
<div>
  zoe_page_title(vm.title)
  zoe_loading_panel
  zoe_error_panel(host info)
  <div ng-show="vm.ready && !vm.error">
    <keyvalrow key="System uptime" val="{{ vm.host_info.uptime }}" />

	 <keyvalrow key="CPU temperature" val="{{ vm.host_info.cpu_temperature }}&#176;C" />

    <keyvalrow key="Timezone" val="{{ vm.host_info.timezone  }}" />

    <keyvalrow key="Domain name" val="{{ vm.host_info.domain_name }}" />

    <keyvalrow key="IP address" val="{{ vm.host_info.ip_address }}" />

    <keyvalrow key="Number of CPUs" val="{{ vm.host_info.number_of_cpus }}" />

    <keyvalrow key="CPU vendor" val="{{ vm.host_info.cpu_vendor }}" />
	 
    <keyvalrow key="CPU Model" val="{{ vm.host_info.cpu_model }}" />

    <keyvalrow key="CPU floating point operations/second" val="{{ vm.host_info.cpu_fps_ops | number }}" />

    <keyvalrow key="CPU integer operations/second" val="{{ vm.host_info.cpu_int_ops | number }}"  />

    <keyvalrow key="CPU memory bandwidth" val="{{ vm.host_info.cpu_mem_bw | number }}" />

    <keyvalrow key="Operating system name" val="{{ vm.host_info.os_name }}" />

    <keyvalrow key="Operating system version" val="{{ vm.host_info.os_version }}" />

    <keyvalrow key="Memory size" val="{{ vm.host_info.memory_size }}" />

    <keyvalrow key="Cache size" val="{{ vm.host_info.cache_size }}" />

    <keyvalrow key="Swap size" val="{{ vm.host_info.swap_size }}" />

    <keyvalrow key="Disk size" val="{{ vm.host_info.disk_size }}"  />
	 
    <keyvalrow key="Disk free" val="{{ vm.host_info.disk_free }}" />
  </div>
  zoe_show_raw_data(vm.host_info)
</div>
