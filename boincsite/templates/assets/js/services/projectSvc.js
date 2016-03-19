angular.module('zoetropeServices')
  .factory('projectSvc', ProjectSvc);

ProjectSvc.$inject = ['$routeParams', 'jsonSvc'];

function ProjectSvc($routeParams, jsonSvc) {
  return jsonSvc.get('/static/json/project.json', '/project_json?project=' + $routeParams.project);
}
