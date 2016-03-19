angular.module('zoetropeServices')
  .factory('tasksSvc', TasksService);

TasksService.$inject = ['$resource', 'jsonPathSvc'];

function TasksService($resource, jsonPathSvc) {

  path = jsonPathSvc.getPath('/static/json/tasks.json', '/tasks_json');

  return function() {
    var res = $resource(path, {}, {
      query: {method: 'GET', isArray: true}
    });

    return res;
  }
}
