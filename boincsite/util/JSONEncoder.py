# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import inspect
import json


class JSONEncoder(json.JSONEncoder):

    def default(self, o):
        props = inspect.getmembers(o.__class__, lambda p: isinstance(p, property))

        dict = {}
        for pname, x in props:
            dict[pname] = getattr(o, pname)
        return dict
