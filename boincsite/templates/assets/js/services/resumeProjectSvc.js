/**
 * Service to handle allowing no more work for a project.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */

 angular.module('zoetropeServices')
   .factory('resumeProjectSvc', ResumeProjectService);

ResumeProjectService.$inject = ['$resource'];

function ResumeProjectService($resource) {
  var svc = {
    query: function(projectUrl) {

      data = {
        'projectUrl': projectUrl
      };

      return function() {
        var res = $resource('/resume_project', data, {
          query: {method: 'POST'}
        });

        return res;
      };
    }
  };

  return svc;
}
