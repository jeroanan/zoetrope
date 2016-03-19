angular.module('zoetropeServices')
  .factory('projectsSvc', ProjectsService);

ProjectsService.$inject = ['jsonSvc'];

function ProjectsService(jsonSvc) {
  var svc = {
      get: function() {
        return jsonSvc.get('/static/json/projects.json', '/projects_json', true);
      }
  };

  return svc;

}
