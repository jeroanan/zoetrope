/**
 * Service to handle suspending the processing project.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */

 angular.module('zoetropeServices')
   .factory('suspendProjectSvc', SuspendProjectService);

SuspendProjectService.$inject = ['$resource'];

function SuspendProjectService($resource) {
  var svc = {
    query: function(projectUrl) {

      data = {
        'projectUrl': projectUrl
      };

      return function() {
        var res = $resource('/suspend_project', data, {
          query: {method: 'POST'}
        });

        return res;
      };
    }
  };

  return svc;
}
