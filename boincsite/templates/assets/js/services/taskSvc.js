angular.module('zoetropeServices')
  .factory('taskSvc', TaskService);

TaskService.$inject = ['$routeParams', 'jsonSvc'];

function TaskService($routeParams, jsonSvc) {
  return jsonSvc.get('/static/json/task.json', '/task_json?task_name=' + $routeParams.task_name)
}
