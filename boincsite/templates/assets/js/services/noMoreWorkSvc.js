/**
 * Service to handle allowing no more work for a project.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */

 angular.module('zoetropeServices')
   .factory('noMoreWorkSvc', NoMoreWorkService);

NoMoreWorkService.$inject = ['$resource'];

function NoMoreWorkService($resource) {
  var svc = {
    query: function(projectUrl) {

      data = {
        'projectUrl': projectUrl
      };

      return function() {
        var res = $resource('/no_more_work', data, {
          query: {method: 'POST'}
        });

        return res;
      };
    }
  };

  return svc;
}
