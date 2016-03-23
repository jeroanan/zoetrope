# Copyright (c) David Wilson 2015, 2016
#
# Licensed under the GPL version 3

import unittest

import boincsite.boinc.commandline.DoNetworkCommunication as dnc
import boincsite.boinc.commandline.GetMessages as gm

import boincsite.boinc.CommandLineFactory as clf


class TestCommandLineFactory(unittest.TestCase):

    def test_create(self):
        mappings = {
            'DoNetworkCommunication': dnc.DoNetworkCommunication,
            'GetMessages': gm.GetMessages,
        }

        for type_string, return_type in mappings.items():
            result = clf.CommandLineFactory.create(type_string)
            self.assertIsInstance(result,
                return_type,
                'Did not get instance of {instance} when trying to create {type_string}. Got {result}.'.format(
                    instance=return_type,
                    type_string=type_string,
                    result=result))

    def test_unknown_command_raises_command_unknown_command_exception(self):
        self.assertRaises(clf.UnknownCommandException, clf.CommandLineFactory.create, 'SomeUnknownCommand')
