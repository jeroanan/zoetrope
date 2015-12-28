# Copyright (c) David Wilson 2015
#
# Licensed under the GPL version 3

import time

import boincsite.status.Task as t


class Task(t.Task):

    def __init__(self, task):
        super().__init__(task)

        '''
        We don't seem to get the following fields from rpc.GetTasks which we did from commandline.GetTasks:

          * project_name

        So it's down to whatever has brought about the instantiation of an object of this type to subsequently populate
        these fields as required.
        '''

        # These fields all have the same name from src->dest.
        fields = [
            'name',
            'wu_name',
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

        # The fields in this dictionary have different src->dest names.
        different_fields = {'wu_name': 'workunit_name'}

        # Map src->dest field values
        for f in fields:
            src_value = getattr(task, f)
            dest_field = different_fields[f] if f in different_fields else f
            setattr(self, dest_field, src_value)

    @property
    def ready_to_report(self):
        return self._ready_to_report

    @ready_to_report.setter
    def ready_to_report(self, val):
        self._ready_to_report = val

    @property
    def suspended_via_gui(self):
        return self._suspended_via_gui

    @suspended_via_gui.setter
    def suspended_via_gui(self, val):
        self._suspended_via_gui = val

    @property
    def report_deadline(self):
        return time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(self._report_deadline))
        return self._report_deadline

    @report_deadline.setter
    def report_deadline(self, val):
        self._report_deadline = val
