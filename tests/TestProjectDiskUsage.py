import unittest

import boincsite.status.DiskUsage as du

class TestProjectDiskUsage(unittest.TestCase):

    def setUp(self):
        test_data = \
"""4) -----------
   master URL: http://setiathome.berkeley.edu/
   disk usage: 0.11MB
"""
        self.__target = du.ProjectDiskUsage(test_data)

    def test_master_url(self):
        expected_value = 'http://setiathome.berkeley.edu/'
        self.assertEqual(expected_value, self.__target.master_url)

    def test_disk_usage(self):
        expected_value = '0.11MB'
        self.assertEqual(expected_value, self.__target.disk_usage)
