angular.module('zoetropeServices')
  .factory('tasksSvc', TasksService);

TasksService.$inject = ['jsonSvc'];

function TasksService(jsonSvc) {

  var svc = {
    get: function() {
      return jsonSvc.get('/static/json/tasks.json', '/tasks_json', true);
    }
  }

  return svc;
}
