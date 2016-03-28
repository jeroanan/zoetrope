# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import json

import lib.boincindicator.client as client

attrs = [
    'name',
    'url',
    'general_area',
    'specific_area',
    'description',
    'home',
    'platforms',
    'image',
    'summary'
]


class JSONEncoder(json.JSONEncoder):
    def default(self, o):

        if isinstance(o, client.AvailableProjectPlatform):
            return {
                'name': o.name
            }


        d = {}

        for a in attrs:
            if isinstance(a, str):
                d[a] = getattr(o, a)

        return d
