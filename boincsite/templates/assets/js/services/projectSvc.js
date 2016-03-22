/**
 * Service to get the main contents of the Project Detail screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeServices')
  .factory('projectSvc', ProjectSvc);

ProjectSvc.$inject = ['$routeParams', 'jsonSvc'];

function ProjectSvc($routeParams, jsonSvc) {
  return jsonSvc.get('/static/json/project.json', '/project_json?project=' + $routeParams.project);
}
