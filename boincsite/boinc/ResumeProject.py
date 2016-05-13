# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import lib.boincindicator.client as client


class ResumeProject(object):

    def execute(self, project_url):
        client.BoincClient().project_resume(project_url)

