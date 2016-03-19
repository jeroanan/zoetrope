angular.module('zoetropeServices')
  .factory('projectsSvc', ProjectsService);

ProjectsService.$inject = ['$resource', 'jsonPathSvc'];

function ProjectsService($resource, jsonPathSvc) {

  var path = jsonPathSvc.getPath('/static/json/projects.json', '/projects_json');

  return function() {
    var res = $resource(path, {}, {
      query: {method: 'GET', isArray: true}
    });

    return res;
  }
}
