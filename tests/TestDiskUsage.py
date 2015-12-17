import unittest

import boincsite.status.DiskUsage as du


class TestDiskUsage(unittest.TestCase):

    def setUp(self):
        test_data = \
"""======== Disk usage ========
total: 15187017728.000000
free: 7903444992.000000
1) -----------
   master URL: http://einstein.phys.uwm.edu/
   disk usage: 9.39MB
2) -----------
   master URL: http://www.enigmaathome.net/
   disk usage: 1.46MB
3) -----------
   master URL: http://www.vdwnumbers.org/
   disk usage: 0.00MB
4) -----------
   master URL: http://setiathome.berkeley.edu/
   disk usage: 0.11MB
"""
        self.__target = du.DiskUsage(test_data)

    def test_total_disk_space(self):
        expected_value = '14.14GB'
        self.assertEqual(expected_value, self.__target.total_disk_space)

    def test_free_disk_space(self):
        expected_value = '7.36GB'
        self.assertEqual(expected_value, self.__target.free_disk_space)

    def test_number_of_project_disk_usages(self):
        self.assertEqual(4, len(self.__target.project_disk_usages))
