divert(-1)
include(boincsite/m4/templates/assets/views/views_common.m4)
divert(0)dnl
zoe_page_title(vm.title)
zoe_loading_panel
zoe_error_panel(global preferences)
<div ng-show="vm.ready && !vm.error">

  <keyvalrow key="Run if computer in use" val="{{ vm.prefs.run_if_user_active }}" />

  <keyvalrow key="Use GPU if computer in use" val="{{ vm.prefs.run_gpu_if_user_active }}" />

  <keyvalrow key="Hangup if dialed" val="{{ vm.prefs.hangup_if_dialed }}" />

  <keyvalrow key="Maximum RAM to use when idle" val="{{ vm.prefs.ram_max_used_idle_pct }}%" />

  <keyvalrow key="Start Hour" val="{{ vm.prefs.start_hour }}" />

  <keyvalrow key="End Hour" val="{{ vm.prefs.run_if_user_active }}" />

  <keyvalrow key="Percentage of the CPUs to use" val="{{ vm.prefs.max_ncpus_pct }}%" />

  <keyvalrow key="Maximum battery temperature" val="{{ vm.prefs.battery_max_temperature }}&#176;C" />

  <keyvalrow key="Maximum CPU usage" val="{{ vm.prefs.suspend_cpu_usage }}%" />

  <keyvalrow key="Maximum % of RAM to use when in use" val="{{ vm.prefs.ram_max_used_busy_pct }}%" />

  <keyvalrow key="Minimum battery charge" val="{{ vm.prefs.battery_charge_min_pct }}%" />

  <keyvalrow key="Confirm Before Making an Internet Connection:" val="{{ vm.prefs.confirm_before_connecting }}" />

  <keyvalrow key="CPI Scheduling Period" val="{{ vm.prefs.cpu_scheduling_period_minutes }} minutes" />

  <keyvalrow key="CPU usage limit" val="{{ vm.prefs.cpu_usage_limit }}%" />

  <keyvalrow key="daily_xfer_period_days" val="{{ vm.prefs.daily_xfer_period_days }}" />

  <keyvalrow key="Make tasks checkpoint to disk every " val="{{ vm.prefs.disk_interval }} seconds" />

  <keyvalrow key="Maximum disk space to use" val="{{ vm.prefs.disk_max_used_gb }}GB" />

  <keyvalrow key="Maximum disk space to use" val="{{ vm.prefs.disk_max_used_pct }}%" />

  <keyvalrow key="Minimum disk space to leave free" val="{{ vm.prefs.disk_min_free_gb }}GB" />

  <keyvalrow key="Don't verify images" val="{{ vm.prefs.dont_verify_images }}" />

  <keyvalrow key="Run when idle for" val="{{ vm.prefs.idle_time_to_run }}" />

  <keyvalrow key="Leave apps in memory?" val="{{ vm.prefs.leave_apps_in_memory }}" />

  <keyvalrow key="Maximum download speed" val="{{ vm.prefs.max_bytes_sec_down }} bytes/second" />

  <keyvalrow key="Maximum upload speed" val="{{ vm.prefs.max_bytes_sec_up }} bytes/second" />

  <keyvalrow key="Maximum number of CPUs to use" val="{{ vm.prefs.max_cpus }}" />

  <keyvalrow key="mod_time" val="{{ vm.prefs.mod_time }}" />

  <keyvalrow key="Starting hour for network traffic" val="{{ vm.prefs.net_start_hour }}" />

  <keyvalrow key="Ending hour for network traffic" val="{{ vm.prefs.net_end_hour }}" />

  <keyvalrow key="WiFi only?" val="{{ vm.prefs.network_wifi_only }}" />

  <keyvalrow key="Override file present" val="{{ vm.prefs.override_file_present }}" />
  
  <keyvalrow key="Run on batteries?" val="{{ vm.prefs.run_on_batteries }}" />

  <keyvalrow key="Source project" val="{{ vm.prefs.source_project }}" />

  <keyvalrow key="suspend_if_no_recent_input" val="{{ vm.prefs.suspend_if_no_recent_input }}" />

  <keyvalrow key="vm_max_used_pct" val="{{ vm.prefs.vm_max_used_pct }}" />

  <keyvalrow key="Minimum work to buffer" val="{{ vm.prefs.work_buf_min_days }} days" />

  <keyvalrow key="Amount of extra work to buffer" val="{{ vm.prefs.work_buf_additional_days }} days" />
</div>
