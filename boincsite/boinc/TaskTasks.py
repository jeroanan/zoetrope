# Copyright (c) David Wilson 2016
#
# Licensed under the GPL version 3

import lib.boincindicator.client as client

import config as c

import boincsite.boinc.AuthorizedTask as at
import boincsite.boinc.exceptions.TaskNotFoundException as tnfe
import boincsite.status.Task as t


class TaskTasks(object):

    def get_tasks(self):
        try:
            results = client.BoincClient().get_results(False)
            return map(lambda r: t.Task(r), results)
        except ConnectionRefusedError:
            # ConnectionRefusedError will happen if the site is running on a box with no boinc installation.
            return []

    def get_task(self, task_name):
        all_tasks = self.get_tasks()

        ts = [t for t in all_tasks if t.name==task_name]

        if not any(ts):
            raise tnfe.TaskNotFoundException()

        return ts.pop()

    def suspend_task(self, task_name):
        task = self.get_task(task_name)
        at.do_authorized_task(lambda cl: cl.suspend_result(task.name, task.project_url))

    def resume_task(self, task_name):
        task = self.get_task(task_name)
        at.do_authorized_task(lambda cl: cl.resume_result(task.name, task.project_url))

    def abort_task(self, task_name):
        task = self.get_task(task_name)
        at.do_authorized_task(lambda cl: cl.abort_result(task.name, task.project_url))
