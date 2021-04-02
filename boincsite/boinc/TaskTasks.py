# Copyright (c) David Wilson 2016, 2021
#
# Licensed under the GPL version 3

import lib.boincindicator.resulttypes.Result as r

import config as c

import boincsite.boinc.AuthorizedTask as at
import boincsite.boinc.exceptions.TaskNotFoundException as tnfe


class TaskTasks(object):
    """
    Handles tasks that perform Task operations
    """


    def __init__(self, client):
        """
        Constructor

        Params:

        client - an instance of lib.boincindicator.client
        """
        self.__client = client

    def get_tasks(self):
        """
        Get all tasks

	This includes running tasks, tasks waiting to run or that are suspended,
	and tasks that have been completed or aborted but haven't been uploaded yet.
        """
        try:
            return self.__client.get_results(False)
        except ConnectionRefusedError:
            # ConnectionRefusedError will happen if the site is running on a box with no boinc installation.
            return []

    def get_task(self, task_name):
        """
        Get details of a specific task
	
	Params:
	  taskName: The name of the task to get details for
        """
        all_tasks = self.get_tasks()

        ts = [t for t in all_tasks if t.name==task_name]

        if not any(ts):
            raise tnfe.TaskNotFoundException()

        return ts.pop()

    def suspend_task(self, task_name):
        """
        Suspend processing of the given task
	
	Params:
	  taskName: The name of the task to suspend
        """
        task = self.get_task(task_name)
        at.do_authorized_task(lambda cl: cl.suspend_result(task.name, task.project_url))

    def resume_task(self, task_name):
        """
        Resume processing of the given task
        
	Params:
	  taskName: The name of the task to resume
        """
        task = self.get_task(task_name)
        at.do_authorized_task(lambda cl: cl.resume_result(task.name, task.project_url))

    def abort_task(self, task_name):
        """
        Abort processing of the given task
	
	Params:
	  taskName: The name of the task to abort
        """
        task = self.get_task(task_name)
        at.do_authorized_task(lambda cl: cl.abort_result(task.name, task.project_url))
