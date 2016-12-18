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
    getTask2: getTask2,
    getAllTasks: getAllTasks,
    suspendTask: suspendTask,
    suspendTask2: suspendTask2,
    resumeTask: resumeTask,
    resumeTask2: resumeTask2,
    abortTask: abortTask,
    abortTask2: abortTask2
  };

  /**
   * Get details of a specific task
   *
   * Params:
   * @taskName: The name of the task to get details for
   *
   * TODO: Obsolete. Will be replaced by getTask2 when all call to
   *       this function have been replaced with calls to that one.
   */
  function getTask(taskName) {
    return jsonSvc.getJson('/task_json?task_name=' + taskName, false);
  }

  /**
   * Get details of a specific task
   *
   * Params:
   * @taskName: The name of the task to get details for
   * @success: callback to run on success
   * @error: callback to run on error
   */
  function getTask2(taskName, success, error) {
    return jsonSvc.getJson2('/task_json?task_name=' + taskName, false).then(success, error);
  }

  /**
   * Get all tasks:
   *
   * This includes running tasks, tasks waiting to run or that are suspended,
   * and tasks that have been completed or aborted but haven't been uploaded yet.
   * 
   * Params:
   * @success: callback to run on success
   * @error: callback to run on error
   */
  function getAllTasks(success, error) {
    jsonSvc.getJson2('/tasks_json', true).then(success,error);
  }

  /**
   * Suspend processing of the given task
   *
   * Params:
   * @taskName: The name of the task to suspend
   *
   * TODO: Obsolete. Will be replaced by suspendTask2 when all call to
   *       this function have been replaced with calls to that one.
   */
  function suspendTask(taskName) {
    return taskNameOperation(taskName, '/suspend_task');
  }

  /**
   * Suspend processing of the given task
   *
   * Params:
   * @taskName: The name of the task to suspend
   * @success: callback to run on success
   * @error: callback to run on error
   */
  function suspendTask2(taskName, success, error) {
    return taskNameOperation2(taskName, '/suspend_task', success, error);
  }

  /**
   * Resume processing of the given task
   *
   * Params:
   * @taskName: The name of the task to resume
   *
   * TODO: Obsolete. Will be replaced by resumeTask2 when all call to
   *       this function have been replaced with calls to that one.
   */
  function resumeTask(taskName) {
    return taskNameOperation(taskName, '/resume_task');
  }

  /**
   * Resume processing of the given task
   *
   * Params:
   * @taskName: The name of the task to resume
   * @success: callback to run on success
   * @error: callback to run on error
   */
  function resumeTask2(taskName, success, error) {
    return taskNameOperation2(taskName, '/resume_task', success, error);
  }

  /**
   * Abort processing of the given task
   *
   * Params:
   * @taskName: The name of the task to abort
   *
   * TODO: Obsolete. Will be replaced by abortTask2 when all call to
   *       this function have been replaced with calls to that one.
   */
  function abortTask(taskName) {
    return taskNameOperation(taskName, '/abort_task');
  }

  /**
   * Abort processing of the given task
   *
   * Params:
   * @taskName: The name of the task to abort
   * @success: callback to run on success
   * @error: callback to run on error
   */
  function abortTask2(taskName, success, error) {
    return taskNameOperation2(taskName, '/abort_task', success, error);
  }

  /**
   * Send the task name to the given endpoint
   *
   * This method is not exposed for use outside of this service.
   *
   * Params:
   * @taskName: The name of the task to abort
   * @endpoint: The endpoint on the server to send the task name to
   *
   * TODO: Obsolete. Will be replaced by sendJson2 when all call to
   *       this function have been replaced with calls to that one.
   */
  function taskNameOperation(taskName, endpoint) {
    var data = {
    task_name: taskName
    };

    return jsonSvc.sendJson(endpoint, data);
  }

  /**
   * Send the task name to the given endpoint
   *
   * This method is not exposed for use outside of this service.
   *
   * Params:
   * @taskName: The name of the task to abort
   * @endpoint: The endpoint on the server to send the task name to
   * @success: callback to run on success
   * @error: callback to run on error
   */
  function taskNameOperation2(taskName, endpoint, success, error) {
    var data = {
    task_name: taskName
    };

    console.log(jsonSvc.sendJson2(endpoint, data));
    return jsonSvc.sendJson2(endpoint, data).then(success, error);
  }

  return svc;
}
