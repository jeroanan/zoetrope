# Copyright (c) David Wilson 2015, 2016
# This file is part of Zoetrope.
# 
# Zoetrope is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
# 
# Zoetrope is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
# 
# You should have received a copy of the GNU General Public License
# along with Zoetrope.  If not, see <http://www.gnu.org/licenses/>.

import lib.boincindicator.basetypes.Struct as struct

import boincsite.util.DateTimeUtil as dt


class GlobalPreferences(struct.Struct):

    def __init__(self):
        self.fields = [
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
        
        self.__battery_charge_min_pct = ''
        self.__battery_max_temperature = ''
        self.confirm_before_connecting = ''
        self.__cpu_scheduling_period_minutes = ''
        self.__cpu_usage_limit = ''
        self.daily_xfer_limit_mb = ''
        self.daily_xfer_period_days = ''
        self.__disk_interval = ''
        self.__disk_max_used_gb = ''
        self.__disk_max_used_pct = ''
        self.__disk_min_free_gb = ''
        self.dont_verify_images = ''
        self.__end_hour = ''
        self.hangup_if_dialed = ''
        self.__idle_time_to_run = ''
        self.leave_apps_in_memory = ''
        self.__max_bytes_sec_down = ''
        self.__max_bytes_sec_up = ''
        self.max_cpus = ''
        self.__max_ncpus_pct = ''
        self.__mod_time = ''
        self.__net_end_hour = ''
        self.__net_start_hour = ''
        self.network_wifi_only = ''
        self.override_file_present = ''
        self.__ram_max_used_busy_pct = ''
        self.__ram_max_used_idle_pct = ''
        self.run_gpu_if_user_active = ''
        self.run_if_user_active = ''
        self.run_on_batteries = ''
        self.__start_hour = ''
        self.__suspend_cpu_usage = ''
        self.suspend_if_no_recent_input = ''
        self.__vm_max_used_pct = ''
        self.__work_buf_additional_days = ''
        self.__work_buf_min_days = ''
        self.source_project = ''

        self.get_number = lambda x: 0 if str(x)=='' else x            
        self.round_number = lambda x: round(float(self.get_number(x)))
        self.round_2dp = lambda x: (round(float(self.get_number(x)), 2))
        self.get_date = lambda x: dt.get_date_from_epoch_seconds(round(float(self.get_number(x))))

    @property
    def battery_charge_min_pct(self):
        return self.round_number(self.__battery_charge_min_pct)

    @battery_charge_min_pct.setter
    def battery_charge_min_pct(self, val):
        self.__battery_charge_min_pct = val

    @property
    def battery_max_temperature(self):
        return self.round_number(self.__battery_max_temperature)

    @battery_max_temperature.setter
    def battery_max_temperature(self, val):
        self.__battery_max_temperature = val

    @property
    def cpu_scheduling_period_minutes(self):
        return self.round_number(self.__cpu_scheduling_period_minutes)

    @cpu_scheduling_period_minutes.setter
    def cpu_scheduling_period_minutes(self, val):
        self.__cpu_scheduling_period_minutes = val

    @property
    def cpu_usage_limit(self):
        return self.round_number(self.__cpu_usage_limit)

    @cpu_usage_limit.setter
    def cpu_usage_limit(self, val):
        self.__cpu_usage_limit = val

    @property
    def disk_interval(self):
        return self.round_number(self.__disk_interval)

    @disk_interval.setter
    def disk_interval(self, val):
        self.__disk_interval = val

    @property
    def disk_max_used_gb(self):
        return self.round_number(self.__disk_max_used_gb)

    @disk_max_used_gb.setter
    def disk_max_used_gb(self, val):
        self.__disk_max_used_gb = val

    @property
    def disk_max_used_pct(self):
        return self.round_number(self.__disk_max_used_pct)

    @disk_max_used_pct.setter
    def disk_max_used_pct(self, val):
        self.__disk_max_used_pct = val

    @property
    def disk_min_free_gb(self):
        return self.round_2dp(self.__disk_min_free_gb)

    @disk_min_free_gb.setter
    def disk_min_free_gb(self, val):
        self.__disk_min_free_gb = val

    @property
    def end_hour(self):
        return self.round_number(self.__end_hour)

    @end_hour.setter
    def end_hour(self, val):
        self.__end_hour = val

    @property
    def idle_time_to_run(self):
        return self.round_number(self.__idle_time_to_run)

    @idle_time_to_run.setter
    def idle_time_to_run(self, val):
        self.__idle_time_to_run = val

    @property
    def max_bytes_sec_down(self):
        return self.round_number(self.__max_bytes_sec_down)

    @max_bytes_sec_down.setter
    def max_bytes_sec_down(self, val):
        self.__max_bytes_sec_down = val

    @property
    def max_bytes_sec_up(self):
        return self.round_number(self.__max_bytes_sec_up)

    @max_bytes_sec_up.setter
    def max_bytes_sec_up(self, val):
        self.__max_bytes_sec_up = val

    @property
    def max_ncpus_pct(self):
        return self.round_number(self.__max_ncpus_pct)

    @max_ncpus_pct.setter
    def max_ncpus_pct(self, val):
        self.__max_ncpus_pct = val

    @property
    def mod_time(self):
        return self.get_date(self.__mod_time)

    @mod_time.setter
    def mod_time(self, val):
        self.__mod_time = val

    @property
    def net_end_hour(self):
        return self.round_number(self.__net_end_hour)

    @net_end_hour.setter
    def net_end_hour(self, val):
        self.__net_end_hour = val

    @property
    def net_start_hour(self):
        return self.round_number(self.__net_start_hour)

    @net_start_hour.setter
    def net_start_hour(self, val):
        self.__net_start_hour = val

    @property
    def ram_max_used_busy_pct(self):
        return self.round_number(self.__ram_max_used_busy_pct)

    @ram_max_used_busy_pct.setter
    def ram_max_used_busy_pct(self, val):
        self.__ram_max_used_busy_pct = val

    @property
    def start_hour(self):
        return self.round_number(self.__start_hour)

    @start_hour.setter
    def start_hour(self, val):
        self.__start_hour = val

    @property
    def suspend_cpu_usage(self):
        return self.round_number(self.__suspend_cpu_usage)

    @suspend_cpu_usage.setter
    def suspend_cpu_usage(self, val):
        self.__suspend_cpu_usage = val

    @property
    def suspend_if_no_recent_input(self):
        return self.round_number(self.__suspend_if_no_recent_input)

    @suspend_if_no_recent_input.setter
    def suspend_if_no_recent_input(self, val):
        self.__suspend_if_no_recent_input = val

    @property
    def vm_max_used_pct(self):
        return self.round_number(self.__vm_max_used_pct)

    @vm_max_used_pct.setter
    def vm_max_used_pct(self, val):
        self.__vm_max_used_pct = val

    @property
    def work_buf_additional_days(self):
        return self.round_2dp(self.__work_buf_additional_days)

    @work_buf_additional_days.setter
    def work_buf_additional_days(self, val):
        self.__work_buf_additional_days = val

    @property
    def work_buf_min_days(self):
        return self.round_2dp(self.__work_buf_min_days)

    @work_buf_min_days.setter
    def work_buf_min_days(self, val):
        self.__work_buf_min_days = val

    @property
    def ram_max_used_idle_pct(self):
        return self.round_number(self.__ram_max_used_idle_pct)

    @ram_max_used_idle_pct.setter
    def ram_max_used_idle_pct(self, val):
        self.__ram_max_used_idle_pct = val
