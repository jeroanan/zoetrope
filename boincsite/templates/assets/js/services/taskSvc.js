angular.module('zoetropeServices')
  .factory('taskSvc', TaskService);

TaskService.$inject = ['$resource', '$routeParams', 'jsonPathSvc'];

function TaskService($resource, $routeParams, jsonPathSvc) {

  path = jsonPathSvc.getPath('/static/json/task.json', '/task_json?task_name=' + $routeParams.task_name);

  return function() {
    var res = $resource(path, {}, {
      query: {method: 'GET', isArray: false}
    });

    return res;
  }
}
