# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import time


class Task(object):

    def __init__(self, task):
        self.fields = ['name',
                       'workunit_name',
                       'project_url',
                       'report_deadline',
                       'ready_to_report',
                       'got_server_ack',
                       'final_cpu_time',
                       'state',
                       'scheduler_state',
                       'exit_status',
                       'signal',
                       'suspended_via_gui',
                       'active_task_state',
                       'app_version_num',
                       'checkpoint_cpu_time',
                       'current_cpu_time',
                       'fraction_done',
                       'swap_size',
                       'working_set_size',
                       'estimated_cpu_time_remaining'
                       ]
        self.name = task.name
        self.workunit_name = task.wu_name
        self.project_url = task.project_url
        self.report_deadline = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(task.report_deadline))
        self.ready_to_report = task.ready_to_report
        self.got_server_ack = task.got_server_ack
        self.final_cpu_time = self.formatted_time_from_seconds(task.final_cpu_time)
        self.state = task.state
        self.scheduler_state = task.scheduler_state
        self.exit_status = task.exit_status
        self.signal = task.signal
        self.suspended_via_gui = task.suspended_via_gui
        self.active_task_state = task.active_task_state
        self.app_version_num = task.app_version_num
        self.checkpoint_cpu_time = task.checkpoint_cpu_time
        self.current_cpu_time = self.formatted_time_from_seconds(task.current_cpu_time)
        self.fraction_done = self.__get_fraction_done(task.fraction_done)
        self.swap_size = task.swap_size
        self.working_set_size = task.working_set_size
        self.estimated_cpu_time_remaining = self.formatted_time_from_seconds(task.estimated_cpu_time_remaining)

    def __get_fraction_done(self, fraction_done):
        if self.ready_to_report:
            percentage = 100.00
        else:
            percentage = round(fraction_done * 100, 2)
        return float('{0:.2f}'.format(percentage))

    def formatted_time_from_seconds(self, seconds):
        m, s = divmod(float(seconds), 60)
        h, m = divmod(m, 60)
        return "%d:%02d:%02d" % (h, m, s)

    def get_state_string(self):

        if self.suspended_via_gui:
            return 'Task suspended by user'

        if self.state == '2' and (self.scheduler_state == '1' or self.active_task_state == '0'):
            return 'Waiting to run'

        state_string_mappings = {
            '2': 'Running',
            '3': 'Computation error',
            '5': 'Ready to report',
            '6': 'Aborted by user'
        }

        return state_string_mappings.get(str(self.state), self.__state)
