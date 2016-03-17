angular.module('zoetropeServices')
  .factory('taskSvc', TaskService);

TaskService.$inject = ['$http', '$resource'];

function TaskService($http, $resource) {

  var offlineMode = window.location.hostname === 'localhost';

  var path = ''
  if (offlineMode) {
    path = '/static/json/tasks.json';
  } else {
    path = '/tasks_json';
  }

  return function() {
    var res = $resource(path, {}, {
      query: {method: 'GET', isArray: true}
    });

    return res;
  }
}
