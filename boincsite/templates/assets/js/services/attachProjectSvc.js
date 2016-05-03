/**
 * Service handle attaching to a project.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */

 angular.module('zoetropeServices')
   .factory('attachProjectSvc', AttachProjectService);

AttachProjectService.$inject = ['$resource'];

function AttachProjectService($resource) {
  var svc = {
    query: function(projectUrl, email, password) {

      data = {
        'projectUrl': projectUrl,
        'email': email,
        'password': password
      }

      return function() {
        var res = $resource('/attach_project', data, {
          query: {method: 'POST'}
        })
        return res;
      }
    }
  };

  return svc;
}
