/**
 * Service to get the main contents of the Task Detail screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeServices')
  .factory('taskSvc', TaskService);

TaskService.$inject = ['$routeParams', 'jsonSvc'];

function TaskService($routeParams, jsonSvc) {
  return jsonSvc.get('/static/json/task.json', '/task_json?task_name=' + $routeParams.task_name)
}
