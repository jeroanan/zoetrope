/**
 * Service to perform task-related operations
 *
 * Copyright (c) David Wilson 2016
 * This file is part of Zoetrope.
 * 
 * Zoetrope is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * Zoetrope is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with Zoetrope.  If not, see <http://www.gnu.org/licenses/>.
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
   * @success: callback to run on success
   * @error: callback to run on error
   */
  function getTask(taskName, success, error) {
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
   * @success: callback to run on success
   * @error: callback to run on error
   */
  function suspendTask(taskName, success, error) {
    return taskNameOperation2(taskName, '/suspend_task', success, error);
  }

  /**
   * Resume processing of the given task
   *
   * Params:
   * @taskName: The name of the task to resume
   * @success: callback to run on success
   * @error: callback to run on error
   */
  function resumeTask(taskName, success, error) {
    return taskNameOperation2(taskName, '/resume_task', success, error);
  }

  /**
   * Abort processing of the given task
   *
   * Params:
   * @taskName: The name of the task to abort
   * @success: callback to run on success
   * @error: callback to run on error
   */
  function abortTask(taskName, success, error) {
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
   * @success: callback to run on success
   * @error: callback to run on error
   */
  function taskNameOperation2(taskName, endpoint, success, error) {
    var data = {
    task_name: taskName
    };

    return jsonSvc.sendJson2(endpoint, data).then(success, error);
  }

  return svc;
}
