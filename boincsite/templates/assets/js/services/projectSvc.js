angular.module('zoetropeServices')
  .factory('projectSvc', ProjectSvc);

ProjectSvc.$inject = ['$resource', '$routeParams', 'jsonPathSvc'];

function ProjectSvc($resource, $routeParams, jsonPathSvc) {

  path = jsonPathSvc.getPath('/static/json/project.json', '/project_json?project=' + $routeParams.project);

  return function() {
    var res = $resource(path, {}, {
      query: {method: 'GET', isArray: false}
    });

    return res;
  }
}
