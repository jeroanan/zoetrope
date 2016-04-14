/**
 * Service handle detaching from a project.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */

angular.module('zoetropeServices')
  .factory('detachProjectSvc', DetachProjectService);

DetachProjectService.$inject = ['$resource'];

function DetachProjectService($resource) {
  var svc = {
    query: function(projectUrl) {
      data = {
        'projectUrl': projectUrl
      };

      return function() {
        var res = $resource('/detach_project', data, {
          query: {method: 'POST'}
        })

        return res;
      }
    }
  }

  return svc;
}
