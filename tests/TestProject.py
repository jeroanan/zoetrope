import unittest

import boincsite.Project as p

class TestProject(unittest.TestCase):

    def setUp(self):
        self.__data = \
"""   name: Enigma@Home
   master URL: http://www.enigmaathome.net/
   user_name: David
   team_name: BOINC Synergy
   resource share: 100.000000
   user_total_credit: 143084.000000
   user_expavg_credit: 522.652482
   host_total_credit: 10541.000000
   host_expavg_credit: 54.262072
   nrpc_failures: 0
   master_fetch_failures: 1
   master fetch pending: no
   scheduler RPC pending: no
   trickle upload pending: no
   attached via Account Manager: yes
   ended: no
   suspended via GUI: no
   don't request more work: no
   disk usage: 10.000000
   last RPC: 20.000000
   project files downloaded: 30.000000
GUI URL:
   name: Your account
   description: View your account information and credit totals
   URL: http://www.enigmaathome.net/home.php
GUI URL:
   name: Forum
   description: Message boards
   URL: http://www.enigmaathome.net/forum_index.php
GUI URL:
   name: Team
   description: Info about BOINC Synergy
   URL: http://www.enigmaathome.net/team_display.php?teamid=12
GUI URL:
   name: Server status
   description: Server status, statistics
   URL: http://www.enigmaathome.net/server_status.php"""

        self.__target = p.Project(self.__data)

    def test_name(self):
        expected_result = 'Enigma@Home'
        self.assertEqual(expected_result, self.__target.name)

    def test_user_name(self):
        expected_result = 'David'
        self.assertEqual(expected_result, self.__target.user_name)

    def test_team_name(self):
        expected_result = 'BOINC Synergy'
        self.assertEqual(expected_result, self.__target.team_name)

    def test_resource_share(self):
        expected_result = '100.000000'
        self.assertEqual(expected_result, self.__target.resource_share)

    def test_user_total_credit(self):
        expected_result = '143084.000000'
        self.assertEqual(expected_result, self.__target.user_total_credit)

    def test_user_expavg_credit(self):
        expected_result = '522.652482'
        self.assertEqual(expected_result, self.__target.user_expavg_credit)

    def test_host_total_credit(self):
        expected_result = '10541.000000'
        self.assertEqual(expected_result, self.__target.host_total_credit)

    def test_host_expavg_credit(self):
        expected_result = '54.262072'
        self.assertEqual(expected_result, self.__target.host_expavg_credit)

    def test_nrpc_failures(self):
        expected_result = '0'
        self.assertEqual(expected_result, self.__target.nrpc_failures)

    def test_master_fetch_failures(self):
        expected_result ='1'
        self.assertEqual(expected_result, self.__target.master_fetch_failures)

    def test_master_fetch_pending(self):
        self.assertFalse(self.__target.master_fetch_pending)

    def test_scheduler_rpc_pending(self):
        self.assertFalse(self.__target.scheduler_rpc_pending)

    def test_trickle_upload_pending(self):
        self.assertFalse(self.__target.trickle_upload_pending)

    def test_attached_via_account_manager(self):
        self.assertTrue(self.__target.attached_via_account_manager)

    def test_ended(self):
        self.assertFalse(self.__target.ended)

    def test_suspended_via_gui(self):
        self.assertFalse(self.__target.suspended_via_gui)

    def test_dont_request_more_work(self):
        self.assertFalse(self.__target.dont_request_more_work)

    def test_disk_usage(self):
        expected_result = '10.000000'
        self.assertEqual(expected_result, self.__target.disk_usage)

    def test_last_rpc(self):
        expected_result = '20.000000'
        self.assertEqual(expected_result, self.__target.last_rpc)

    def test_project_files_downloaded(self):
        expected_result = '30.000000'
        self.assertEqual(expected_result, self.__target.project_files_downloaded)

    def test_correct_number_of_gui_urls(self):
        expected_result = 4
        self.assertEqual(expected_result, len(self.__target.gui_urls))

    def test_master_url(self):
        expected_result = 'http://www.enigmaathome.net/'
        self.assertEqual(expected_result, self.__target.master_url)
