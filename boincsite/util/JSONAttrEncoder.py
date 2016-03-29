# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import json

class JSONEncoder(json.JSONEncoder):

    def default(self, o):
        dict = {}

        for a in o.fields:
            dict[a] = getattr(o, a)
        return dict
