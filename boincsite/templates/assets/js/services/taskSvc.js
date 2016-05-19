/**
 * Service to perform task-related operations
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeServices')
  .factory('taskSvc', TaskService);

TaskService.$inject = ['$resource', 'jsonSvc'];

function TaskService($resource, jsonSvc) {

  var svc = {
	 getTask: getTask,
	 getAllTasks: getAllTasks,
	 suspendTask: suspendTask,
	 resumeTask: resumeTask,
	 abortTask: abortTask
  };

  /**
	* Get details of a specific task
	*
	* Params:
	* @taskName: The name of the task to get details for
	*/
  function getTask(taskName) {
	 return jsonSvc.getJson('/task_json?task_name=' + taskName, false);
  }

  /**
	* Get all tasks:
	*
	* This includes running tasks, tasks waiting to run or that are suspended,
	* and tasks that have been completed or aborted but haven't been uploaded yet.
	*/
  function getAllTasks() {
	 return jsonSvc.getJson('/tasks_json', true);
  }

  /**
	* Suspend processing of the given task
	*
	* Params:
	* @taskName: The name of the task to suspend
	*/
  function suspendTask(taskName) {
	 return taskNameOperation(taskName, '/suspend_task');
  }

  /**
	* Resume processing of the given task
	*
	* Params:
	* @taskName: The name of the task to resume
	*/
  function resumeTask(taskName) {
	 return taskNameOperation(taskName, '/resume_task');
  }

  /**
	* Abort processing of the given task
	*
	* Params:
	* @taskName: The name of the task to abort
	*/
  function abortTask(taskName) {
	 return taskNameOperation(taskName, '/abort_task');
  }

  /**
	* Send the task name to the given endpoint
	*
	* This method is not exposed for use outside of this service.
	*
	* Params:
	* @taskName: The name of the task to abort
	* @endpoint: The endpoint on the server to send the task name to
	*/
  function taskNameOperation(taskName, endpoint) {
	 var data = {
		task_name: taskName
	 };

	 return jsonSvc.sendJson(endpoint, data);
  }

  return svc;
}
