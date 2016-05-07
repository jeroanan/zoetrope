/**
 * Service to handle requesting a project update.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */

 angular.module('zoetropeServices')
   .factory('updateProjectSvc', UpdateProjectService);

UpdateProjectService.$inject = ['$resource'];

function UpdateProjectService($resource) {
  var svc = {
    query: function(projectUrl) {

      data = {
        'projectUrl': projectUrl
      };

      return function() {
        var res = $resource('/update_project', data, {
          query: {method: 'POST'}
        });

        return res;
      };
    }
  };

  return svc;
}
