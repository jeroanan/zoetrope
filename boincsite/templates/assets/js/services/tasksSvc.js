/**
 * Service to get the main contents of the Tasks screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
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
