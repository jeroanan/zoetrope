/**
 * Service to get the main contents of the Project Detail screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeServices')
  .factory('projectSvc', ProjectSvc);

ProjectSvc.$inject = ['$resource', 'jsonSvc'];

function ProjectSvc($resource, jsonSvc) {  

  var svc = {
	 getProject: getProject,
	 noMoreWork: noMoreWork,
	 allowMoreWork: allowMoreWork,
	 suspendProject: suspendProject,
	 resumeProject: resumeProject,
	 updateProject: updateProject
  };

  function getProject(projectName) {
	 return jsonSvc.get('/static/json/project.json', '/project_json?project=' + projectName);
  }

  function noMoreWork(projectUrl) {
	 return projectOperation('/no_more_work', projectUrl);
  }
  
  function allowMoreWork(projectUrl) {
	 return projectOperation('/allow_more_work', projectUrl);
  }

  function suspendProject(projectUrl) {
	 return projectOperation('/suspend_project', projectUrl);
  }

  function resumeProject(projectUrl) {
	 return projectOperation('/resume_project', projectUrl);
  }

  function updateProject(projectUrl) {
	 return projectOperation('/update_project', projectUrl);
  }

  function projectOperation(endpoint, projectUrl) {
	 var data = {
      'projectUrl': projectUrl
    };
	 
    return function() {
      var res = $resource(endpoint, data, {
        query: {method: 'POST'}
      });
		
      return res;
    };
  }
  
  return svc;
}


