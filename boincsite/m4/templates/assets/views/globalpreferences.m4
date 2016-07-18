divert(-1)
include(boincsite/m4/templates/assets/views/views_common.m4)
divert(0)dnl
zoe_page_title(vm.title)
zoe_loading_panel
zoe_error_panel(global preferences)
<div ng-show="vm.ready && !vm.error">

  <h2>CPU/GPU</h2>
  zoe_two_column_row(Percentage of the CPUS to use, vm.prefs.max_ncpus_pct + '%',
                       Maximum CPU uage, vm.prefs.suspend_cpu_usage + `''%`'')

  zoe_two_column_row(Maximum number of CPUs to use, vm.prefs.max_cpus,
                       Use GPU if computer in use, vm.prefs.run_gpu_if_user_active)

  zoe_two_column_row(CPU Scheduling Period, vm.prefs.cpu_scheduling_period_minutes)

  <h2>Memory</h2>
  zoe_two_column_row(Maximum RAM to use when idle, vm.prefs.ram_max_used_idle_pct + '%',
                       Maximum % of RAM to use when in use, vm.prefs.ram_max_used_busy_pct + '%')

  zoe_two_column_row(Leave apps in memory?, vm.prefs.leave_apps_in_memory)
  
  <h2>When to run</h2>
  zoe_two_column_row(Start Hour, vm.prefs.start_hour, End Hour, vm.prefs.end_hour)
  
  zoe_two_column_row(Run if computer in use, vm.prefs.run_if_user_active,
                       Run when idle for, vm.prefs.idle_time_to_run)

  <h2>Network</h2>
  zoe_two_column_row(Hangup if dialed, vm.prefs.hangup_if_dialed,
                       Confirm Before Making an Internet Connection, vm.prefs.confirm_before_connecting)

  zoe_two_column_row(Maximum download speed, vm.prefs.max_bytes_sec_down,
                       Maximum upload speed, vm.prefs.max_bytes_sec_up)

  zoe_two_column_row(Starting hour for network traffic, vm.prefs.net_start_hour,
                       Ending hour for network traffic, vm.prefs.net_end_hour)

  zoe_two_column_row(WiFi only?, vm.prefs.network_wifi_only)

  <h2>Battery</h2>
  zoe_two_column_row(Maximum battery temperature, vm.prefs.battery_max_temperature,
                       Minimum battery charge, vm.prefs.battery_charge_min_pct + '%')

  zoe_two_column_row(Run on batteries?, vm.prefs.run_on_batteries)

  <h2>Disk</h2>
  zoe_two_column_row(Maximum disk space to use, vm.prefs.disk_max_used_gb + 'GB',
                       Maximum percentage disk space to use, vm.prefs.disk_max_used_pct + '%')
                       

  zoe_two_column_row(Make tasks checkpoint to disk every, vm.prefs.disk_interval + ' seconds',
                       Minimum disk space to leave free, vm.prefs.disk_min_free_gb)
                       
  <h2>Misc. Settings</h2>
  zoe_two_column_row(daily_xfer_period_days, vm.prefs.daily_xfer_period_days,
                       Don't verify images, vm.prefs.dont_verify_images)

  zoe_two_column_row(mod_time, vm.prefs.mod_time,
                       Override file present, vm.prefs.override_file_present)

  zoe_two_column_row(Source Project, vm.prefs.source_project,
                       suspend_if_no_recent_input, vm.prefs.suspend_if_no_recent_input)

  zoe_two_column_row(Amount of extra work to buffer, vm.prefs.work_buf_additional_days,
                       Minimum work to buffer, vm.prefs.work_buf_min_days)
                       
  zoe_two_column_row(vm_max_used_pct, vm.prefs.vm_max_used_pct)
</div>
