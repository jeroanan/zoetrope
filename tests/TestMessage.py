import unittest

import Message as m

class TestMessage(unittest.TestCase):

    def setUp(self):
        data = '30: 26-Nov-2015 20:25:45 (user notification) [Einstein@Home] This is my message'
        self.__target = m.Message(data)

    def test_message_number(self):
        expected_result = 30
        self.assertEqual(expected_result, self.__target.message_number)

    def test_date_time(self):
        expected_result = '26-Nov-2015 20:25:45'
        self.assertEqual(expected_result, self.__target.date_time)

    def test_message_type(self):
        expected_result = 'user notification'
        self.assertEqual(expected_result, self.__target.message_type)

    def test_project_name(self):
        expected_result = 'Einstein@Home'
        self.assertEqual(expected_result, self.__target.project_name)

    def test_message_text(self):
        expected_result = 'This is my message'
        self.assertEqual(expected_result, self.__target.message_text)
