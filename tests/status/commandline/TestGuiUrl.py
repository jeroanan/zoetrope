import unittest

import boincsite.status.commandline.Project as p

class TestGuiUrl(unittest.TestCase):

    def setUp(self):
        self.__data = \
"""   name: Your account
   description: View your account information and credit totals
   URL: http://www.enigmaathome.net/home.php"""

        self.__target = p.GuiUrl(self.__data)

    def test_name(self):
        expected_result = 'Your account'
        self.assertEqual(expected_result, self.__target.name)

    def test_description(self):
        expected_result = 'View your account information and credit totals'
        self.assertEqual(expected_result, self.__target.description)

    def test_url(self):
        expected_result = 'http://www.enigmaathome.net/home.php'
        self.assertEqual(expected_result, self.__target.url)
