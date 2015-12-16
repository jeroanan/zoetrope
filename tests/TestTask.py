import boincsite.Task as t
import unittest

class tests(unittest.TestCase):

    def setUp(self):
        self.__test_data = \
"""   name: p2030.20141112.G191.15-00.25.S.b2s0g0.00000_528_0
   WU name: p2030.20141112.G191.15-00.25.S.b2s0g0.00000_528
   project URL: http://einstein.phys.uwm.edu/
   report deadline: Tue Dec  8 15:33:47 2015
   ready to report: no
   got server ack: no
   final CPU time: 1000.000000
   state: 2
   scheduler state: 0
   exit_status: 0
   signal: 0
   suspended via GUI: no
   active_task_state: 0
   app version num: 0
   checkpoint CPU time: 1330.000000
   current CPU time: 1414.000000
   fraction done: 0.8800000
   swap size: 10.000000
   working set size: 11.000000
   estimated CPU time remaining: 74181.872265"""

        self.__target = t.Task(self.__test_data)

    def test_name(self):
        expected_value = 'p2030.20141112.G191.15-00.25.S.b2s0g0.00000_528_0'
        self.assertEqual(expected_value, self.__target.name)

    def test_workunit_name(self):
        expected_value = 'p2030.20141112.G191.15-00.25.S.b2s0g0.00000_528'
        self.assertEqual(expected_value, self.__target.workunit_name)

    def test_project_url(self):
        expected_value = 'http://einstein.phys.uwm.edu/'
        self.assertEqual(expected_value, self.__target.project_url)

    def test_report_deadline(self):
        expected_value = 'Tue Dec  8 15:33:47 2015'
        self.assertEqual(expected_value, self.__target.report_deadline)

    def test_ready_to_report(self):
        expected_value = False
        self.assertEqual(expected_value, self.__target.ready_to_report)

    def test_got_server_ack(self):
        expected_value = 'no'
        self.assertEqual(expected_value, self.__target.got_server_ack)

    def test_final_cpu_time(self):
        expected_value = '0:16:40'
        self.assertEqual(expected_value, self.__target.final_cpu_time)

    def test_state(self):
        expected_value = '2'
        self.assertEqual(expected_value, self.__target.state)

    def test_scheduler_state(self):
        expected_value = '0'
        self.assertEqual(expected_value, self.__target.scheduler_state)

    def test_exit_status(self):
        expected_value = '0'
        self.assertEqual(expected_value, self.__target.exit_status)

    def test_signal(self):
        expected_value = '0'
        self.assertEqual(expected_value, self.__target.signal)

    def test_suspended_via_gui(self):
        expected_value = False
        self.assertEqual(expected_value, self.__target.suspended_via_gui)

    def test_active_task_state(self):
        expected_value = '0'
        self.assertEqual(expected_value, self.__target.active_task_state)

    def test_app_version_num(self):
        expected_value = '0'
        self.assertEqual(expected_value, self.__target.app_version_num)

    def test_checkpoint_cpu_time(self):
        expected_value = '1330.000000'
        self.assertEqual(expected_value, self.__target.checkpoint_cpu_time)

    def test_current_cpu_time(self):
        expected_value = '0:23:34'
        self.assertEqual(expected_value, self.__target.current_cpu_time)

    def test_fraction_done(self):
        expected_value = '88.00'
        self.assertEqual(expected_value, self.__target.fraction_done)

    def test_swap_size(self):
        expected_value = '10.000000'
        self.assertEqual(expected_value, self.__target.swap_size)

    def test_working_set_size(self):
        expected_value = '11.000000'
        self.assertEqual(expected_value, self.__target.working_set_size)

    def test_estimated_cpu_time_remaining(self):
        expected_value = '20:36:21'
        self.assertEqual(expected_value, self.__target.estimated_cpu_time_remaining)

    def test_completed_task_has_fracion_done_100(self):
        expected_value = '100.00'

        target = t.Task(self.__test_data)
        target.ready_to_report = 'yes'

        self.assertEqual(expected_value, target.fraction_done)

    def test_state_string(self):
        self.__target.active_task_state = '1'

        state_mappings = {
            '2': 'Running',
            '5': 'Ready to report',
            '6': 'Aborted by user',
            '-99': '-99'
        }

        for state, state_string in state_mappings.items():
            self.__target.state = state
            result = self.__target.get_state_string()

            self.assertEqual(state_string,
                             result,
                             "Expected state string of {state_string} for state {state}. Got {result}"
                             .format(state_string=state_string, state=state, result=result))

    def test_state_string_task_suspended_via_gui(self):
        self.__target.suspended_via_gui = 'yes'
        expected_result = 'Task suspended by user'
        self.assertEqual(expected_result, self.__target.get_state_string())

    def test_state_string_waiting_to_run(self):
        self.__target.state = '2'
        self.__target.scheduler_state = '1'
        expected_result = 'Waiting to run'
        self.assertEqual(expected_result, self.__target.get_state_string())

    def test_state_string_waiting_to_run_when_state_2_and_active_task_0(self):
        self.__target.state = '2'
        self.__target.active_task = '0'
        expected_result = 'Waiting to run'
        self.assertEqual(expected_result, self.__target.get_state_string())
