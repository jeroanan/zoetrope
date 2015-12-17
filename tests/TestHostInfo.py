import unittest

import boincsite.status.HostInfo as hi


class TestHostInfo(unittest.TestCase):

    def setUp(self):
        data = \
"""  timezone: 0
  domain name: pi2
  IP addr: 127.0.1.1
  #CPUS: 4
  CPU vendor: chip vendor
  CPU model: ARMv7 Processor rev 5 (v7l)
  CPU FP OPS: 441871756.563648
  CPU int OPS: 1715324415.254421
  CPU mem BW: 1000000000.000000
  OS name: Linux
  OS version: 4.1.7-v7+
  mem size: 970874880.000000
  cache size: -1.000000
  swap size: 104853504.000000
  disk size: 15187017728.000000
  disk free: 7895998464.000000"""

        self.__target = hi.HostInfo(data)

    def test_timezone(self):
        expected_result = '0'
        self.assertEqual(expected_result, self.__target.timezone)

    def test_domain_name(self):
        expected_result = 'pi2'
        self.assertEqual(expected_result, self.__target.domain_name)

    def test_ip_address(self):
        expected_result = '127.0.1.1'
        self.assertEqual(expected_result, self.__target.ip_address)

    def test_number_of_cpus(self):
        expected_result = '4'
        self.assertEqual(expected_result, self.__target.number_of_cpus)

    def test_cpu_vendor(self):
        expected_result = 'chip vendor'
        self.assertEqual(expected_result, self.__target.cpu_vendor)

    def test_cpu_model(self):
        expected_result = 'ARMv7 Processor rev 5 (v7l)'
        self.assertEqual(expected_result, self.__target.cpu_model)

    def test_cpu_fps_ops(self):
        expected_result = '441871756.563648'
        self.assertEqual(expected_result, self.__target.cpu_fps_ops)

    def test_cpu_int_ops(self):
        expected_result = '1715324415.254421'
        self.assertEqual(expected_result, self.__target.cpu_int_ops)

    def test_cpu_mem_bw(self):
        expected_result = '1000000000.000000'
        self.assertEqual(expected_result, self.__target.cpu_mem_bw)

    def test_os_name(self):
        expected_result = 'Linux'
        self.assertEqual(expected_result, self.__target.os_name)

    def test_os_version(self):
        expected_result = '4.1.7-v7+'
        self.assertEqual(expected_result, self.__target.os_version)

    def test_mem_size(self):
        expected_result = '0.90GB'
        self.assertEqual(expected_result, self.__target.memory_size)

    def test_cache_size(self):
        expected_result = '-1.000000'
        self.assertEqual(expected_result, self.__target.cache_size)

    def test_swap_size(self):
        expected_result = '0.10GB'
        self.assertEqual(expected_result, self.__target.swap_size)

    def test_disk_size(self):
        expected_result = '14.14GB'
        self.assertEqual(expected_result, self.__target.disk_size)

    def test_disk_free(self):
        expected_result = '7.35GB'
        self.assertEqual(expected_result, self.__target.disk_free)
