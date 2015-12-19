import boincsite.status.Task as t


class Task(t.Task):

    def __init__(self, task):
        super().__init__(task)

        tasks = task.split('\n')

        line_mappings = {'name': 'name',
                         'WU name': 'workunit_name',
                         'project URL': 'project_url',
                         'report deadline': 'report_deadline',
                         'ready to report': 'ready_to_report',
                         'got server ack': 'got_server_ack',
                         'final CPU time': 'final_cpu_time',
                         'state': 'state',
                         'scheduler state': 'scheduler_state',
                         'exit_status': 'exit_status',
                         'signal': 'signal',
                         'suspended via GUI': 'suspended_via_gui',
                         'active_task_state': 'active_task_state',
                         'app version num': 'app_version_num',
                         'checkpoint CPU time': 'checkpoint_cpu_time',
                         'current CPU time': 'current_cpu_time',
                         'fraction done': 'fraction_done',
                         'swap size': 'swap_size',
                         'working set size': 'working_set_size',
                         'estimated CPU time remaining': 'estimated_cpu_time_remaining'}

        for ts in tasks:
            line_split = ts.split(':')
            line_split.reverse()
            key = line_split.pop().strip()
            if key in line_mappings:
                line_split.reverse()
                setattr(self, line_mappings[key], str.join(':', line_split).strip())
