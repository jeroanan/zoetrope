/**
 * Service to get the main contents of the Projects screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
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
