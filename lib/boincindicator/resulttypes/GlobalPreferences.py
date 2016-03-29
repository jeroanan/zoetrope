# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import lib.boincindicator.basetypes.Struct as struct


class GlobalPreferences(struct.Struct):

    def __init__(self):
        self.source_project = ''
        self.mod_time = ''
        self.battery_charge_min_pct = ''
        self.battery_max_temperature = ''
        self.run_on_batteries = ''
        self.run_if_user_active = ''
        self.run_gpu_if_user_active = ''
        self.suspend_if_no_recent_input = ''
        self.suspend_cpu_usage = ''
        self.start_hour = ''
        self.end_hour = ''
        self.net_start_hour = ''
        self.net_end_hour = ''
        self.leave_apps_in_memory = ''
        self.confirm_before_connecting = ''
        self.hangup_if_dialed = ''
        self.dont_verify_images = ''
        self.work_buf_min_days = ''
        self.work_buf_additional_days = ''
        self.max_ncpus_pct = ''
        self.cpu_scheduling_period_minutes = ''
        self.disk_interval = ''
        self.disk_max_used_gb = ''
        self.disk_max_used_pct = ''
        self.disk_min_free_gb = ''
        self.vm_max_used_pct = ''
        self.ram_max_used_busy_pct = ''
        self.ram_max_used_idle_pct = ''
        self.idle_time_to_run = ''
        self.max_bytes_sec_up = ''
        self.max_bytes_sec_down = ''
        self.cpu_usage_limit = ''
        self.daily_xfer_limit_mb = ''
        self.daily_xfer_period_days = ''
        self.override_file_present = ''
        self.network_wifi_only = ''
        self.max_cpus = ''
