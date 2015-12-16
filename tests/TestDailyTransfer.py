import unittest

import boincsite.DailyTransfer as dt


class TestDailyTransfer(unittest.TestCase):

    def setUp(self):
        data = '12-Jun-2015: 193908 bytes uploaded, 936639 bytes downloaded'

        self.__target = dt.DailyTransfer(data)

    def test_date(self):
        expected_result = '12-Jun-2015'
        self.assertEqual(expected_result, self.__target.date)

    def test_uploaded(self):
        expected_result = '0.18MB'
        self.assertEqual(expected_result, self.__target.uploaded)

    def test_downloaded(self):
        expected_result = '0.89MB'
        self.assertEqual(expected_result, self.__target.downloaded)
