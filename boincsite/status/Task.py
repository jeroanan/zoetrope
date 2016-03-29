# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import time


class Task(object):

    def __init__(self, task):
        self.__name = task.name
        self.__workunit_name = task.wu_name
        self.__project_url = task.project_url
        self._report_deadline = task.report_deadline
        self._ready_to_report = task.ready_to_report
        self.__got_server_ack = task.got_server_ack
        self.__final_cpu_time = task.final_cpu_time
        self.__state = task.state
        self.__scheduler_state = task.scheduler_state
        self.__exit_status = task.exit_status
        self.__signal = task.signal
        self._suspended_via_gui = task.suspended_via_gui
        self.__active_task_state = task.active_task_state
        self.__app_version_num = task.app_version_num
        self.__checkpoint_cpu_time = task.checkpoint_cpu_time
        self.__current_cpu_time = task.current_cpu_time
        self.__fraction_done = task.fraction_done
        self.__swap_size = task.swap_size
        self.__working_set_size = task.working_set_size
        self.__estimated_cpu_time_remaining = task.estimated_cpu_time_remaining

    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, val):
        self.__name = val

    @property
    def workunit_name(self):
        return self.__workunit_name

    @workunit_name.setter
    def workunit_name(self, val):
        self.__workunit_name = val

    @property
    def project_url(self):
        return self.__project_url

    @project_url.setter
    def project_url(self, val):
        self.__project_url = val

    @property
    def report_deadline(self):
        return time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(self._report_deadline))
        return self._report_deadline

    @report_deadline.setter
    def report_deadline(self, val):
        self._report_deadline = val

    @property
    def ready_to_report(self):
        return self._ready_to_report

    @ready_to_report.setter
    def ready_to_report(self, val):
        self._ready_to_report = val

    @property
    def got_server_ack(self):
        return self.__got_server_ack

    @got_server_ack.setter
    def got_server_ack(self, val):
        self.__got_server_ack = val

    @property
    def final_cpu_time(self):
        return self.formatted_time_from_seconds(self.__final_cpu_time)

    @final_cpu_time.setter
    def final_cpu_time(self, val):
        self.__final_cpu_time = val

    @property
    def state(self):
        return self.__state

    @state.setter
    def state(self, val):
        self.__state = val

    @property
    def scheduler_state(self):
        return self.__scheduler_state

    @scheduler_state.setter
    def scheduler_state(self, val):
        self.__scheduler_state = val

    @property
    def exit_status(self):
        return self.__exit_status

    @exit_status.setter
    def exit_status(self, val):
        self.__exit_status = val

    @property
    def signal(self):
        return self.__signal

    @signal.setter
    def signal(self, val):
        self.__signal = val

    @property
    def suspended_via_gui(self):
        return self._suspended_via_gui

    @suspended_via_gui.setter
    def suspended_via_gui(self, val):
        self._suspended_via_gui = val

    @property
    def active_task_state(self):
        return self.__active_task_state

    @active_task_state.setter
    def active_task_state(self, val):
        self.__active_task_state = val

    @property
    def app_version_num(self):
        return self.__app_version_num

    @app_version_num.setter
    def app_version_num(self, val):
        self.__app_version_num = val

    @property
    def checkpoint_cpu_time(self):
        return self.__checkpoint_cpu_time

    @checkpoint_cpu_time.setter
    def checkpoint_cpu_time(self, val):
        self.__checkpoint_cpu_time = val

    @property
    def current_cpu_time(self):
        return self.formatted_time_from_seconds(self.__current_cpu_time)

    @current_cpu_time.setter
    def current_cpu_time(self, val):
        self.__current_cpu_time = val

    @property
    def fraction_done(self):
        if self.ready_to_report:
            percentage = 100.00
        else:
            percentage = round(self.__fraction_done * 100, 2)
        return float('{0:.2f}'.format(percentage))

    @fraction_done.setter
    def fraction_done(self, val):
        self.__fraction_done = float(val)

    @property
    def swap_size(self):
        return self.__swap_size

    @swap_size.setter
    def swap_size(self, val):
        self.__swap_size = val

    @property
    def working_set_size(self):
        return self.__working_set_size

    @working_set_size.setter
    def working_set_size(self, val):
        self.__working_set_size = val

    @property
    def estimated_cpu_time_remaining(self):
        return self.formatted_time_from_seconds(self.__estimated_cpu_time_remaining)
    
    def formatted_time_from_seconds(self, seconds):
        m, s = divmod(float(seconds), 60)
        h, m = divmod(m, 60)
        return "%d:%02d:%02d" % (h, m, s)

    @estimated_cpu_time_remaining.setter
    def estimated_cpu_time_remaining(self, val):
        self.__estimated_cpu_time_remaining = val

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
