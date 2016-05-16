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
    query: function(projectUrl, email, password, username, newAcccount) {

		var endpoint = '/attach_project';
		
      data = {
        'projectUrl': projectUrl,
        'email': email,
        'password': password
      };

		if (newAcccount) {
		  endpoint = '/create_account';
		  data.username = username;
		}

      return function() {
        var res = $resource(endpoint, data, {
          query: {method: 'POST'}
        });
        return res;
      };
    }
  };

  return svc;
}
