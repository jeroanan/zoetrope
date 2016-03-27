# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import json

attrs = [
   'source_project',
   'mod_time',
   'battery_charge_min_pct',
   'battery_max_temperature',
   'run_on_batteries',
   'run_if_user_active',
   'run_gpu_if_user_active',
   'suspend_if_no_recent_input',
   'suspend_cpu_usage',
   'start_hour',
   'end_hour',
   'net_start_hour',
   'net_end_hour',
   'leave_apps_in_memory',
   'confirm_before_connecting',
   'hangup_if_dialed',
   'dont_verify_images',
   'work_buf_min_days',
   'work_buf_additional_days',
   'max_ncpus_pct',
   'cpu_scheduling_period_minutes',
   'disk_interval',
   'disk_max_used_gb',
   'disk_max_used_pct',
   'disk_min_free_gb',
   'vm_max_used_pct',
   'ram_max_used_busy_pct',
   'ram_max_used_idle_pct',
   'idle_time_to_run',
   'max_bytes_sec_up',
   'max_bytes_sec_down',
   'cpu_usage_limit',
   'daily_xfer_limit_mb',
   'daily_xfer_period_days',
   'override_file_present',
   'network_wifi_only',
   'max_cpus'
]

class GlobalPreferences(object):

    def __init__(self, global_preferences):
        for a in attrs:
            setattr(self, a, getattr(global_preferences, a))

    def __str__(self):
        return '''Source Project: {source_project}
Mod time: {mod_time}
Battery charge minimum%: {battery_charge_min_pct}
Battery Max Temprature: {battery_max_temperature}
Run on batteries: {run_on_batteries}
Run if user active: {run_if_user_active}
Run GPU if user active: {run_gpu_if_user_active}
Suspend if no recent input: {suspend_if_no_recent_input}
Suspend CPU usage: {suspend_cpu_usage}
Start hour: {start_hour}
End hour: {end_hour}
Net start hour: {net_start_hour}
Net end hour: {net_end_hour}
Leave apps in memory: {leave_apps_in_memory}
Confirm before connecting: {confirm_before_connecting}
Hangup if dialed: {hangup_if_dialed}
Don't verify images: {dont_verify_images}
Work buffer minimum days: {work_buf_min_days}
Work buffer additional days: {work_buf_additional_days}
max_ncpus_pct: {max_ncpus_pct}
CPU scheduling period minutes: {cpu_scheduling_period_minutes}
Disk interval: {disk_interval}
Disk max used gigabytes: {disk_max_used_gb}
Disk max used%: {disk_max_used_pct}
Disk min free gb: {disk_min_free_gb},
vm_max_used_pct: {vm_max_used_pct},
Ram max used busy pct: {ram_max_used_busy_pct}
Ram max used idle pct: {ram_max_used_idle_pct}
Idle time to run: {idle_time_to_run}
Max bytes/second up: {max_bytes_sec_up}
Max bytes/second down: {max_bytes_sec_down}
CPU usage limit: {cpu_usage_limit}
Daily transfer limit MB: {daily_xfer_limit_mb}
Daily transfer period (days): {daily_xfer_period_days}
Override file present: {override_file_present}
Network wifi only: {network_wifi_only}
Max CPUs: {max_cpus}
'''.format(source_project=self.source_project,
           mod_time=self.mod_time,
           battery_charge_min_pct=self.battery_charge_min_pct,
           battery_max_temperature=self.battery_max_temperature,
           run_on_batteries=self.run_on_batteries,
           run_if_user_active=self.run_if_user_active,
           run_gpu_if_user_active=self.run_gpu_if_user_active,
           suspend_if_no_recent_input=self.suspend_if_no_recent_input,
           suspend_cpu_usage=self.suspend_cpu_usage,
           start_hour=self.start_hour,
           end_hour=self.end_hour,
           net_start_hour=self.net_start_hour,
           net_end_hour=self.net_end_hour,
           leave_apps_in_memory=self.leave_apps_in_memory,
           confirm_before_connecting=self.confirm_before_connecting,
           hangup_if_dialed=self.hangup_if_dialed,
           dont_verify_images=self.dont_verify_images,
           work_buf_min_days=self.work_buf_min_days,
           work_buf_additional_days=self.work_buf_additional_days,
           max_ncpus_pct=self.max_ncpus_pct,
           cpu_scheduling_period_minutes=self.cpu_scheduling_period_minutes,
           disk_interval=self.disk_interval,
           disk_max_used_gb=self.disk_max_used_gb,
           disk_max_used_pct=self.disk_max_used_pct,
           disk_min_free_gb=self.disk_min_free_gb,
           vm_max_used_pct=self.vm_max_used_pct,
           ram_max_used_busy_pct=self.ram_max_used_busy_pct,
           ram_max_used_idle_pct=self.ram_max_used_idle_pct,
           idle_time_to_run=self.idle_time_to_run,
           max_bytes_sec_up=self.max_bytes_sec_up,
           max_bytes_sec_down=self.max_bytes_sec_down,
           cpu_usage_limit=self.cpu_usage_limit,
           daily_xfer_limit_mb=self.daily_xfer_limit_mb,
           daily_xfer_period_days=self.daily_xfer_period_days,
           override_file_present=self.override_file_present,
           network_wifi_only=self.network_wifi_only,
           max_cpus=self.max_cpus)


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        d = {}

        for a in attrs:
            d[a] = getattr(o, a)

        return d
