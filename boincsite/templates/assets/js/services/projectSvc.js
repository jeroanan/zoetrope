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

  /**
  * Get details of an individual project
  *
  * Params:
  * @projectName: The name of the project, e.g. asteroids@home
  */
  function getProject(projectName) {
	 return jsonSvc.get('/static/json/project.json', '/project_json?project=' + projectName);
  }

  /**
	* Request that no more work is requested for the given project
	*
	* Workunits for the project that are in progress or waiting to be processed
	* will be completed even when the project is set to request no more work.
	*
	* Params:
	* @projectUrl: The url of the project to perform the request on
	*/
  function noMoreWork(projectUrl) {
	 return projectOperation('/no_more_work', projectUrl);
  }

  /**
	* Request that work is requested for the given project
	*
	* To be called for projects that are currently set not to request more work.
	*
	* Params:
	* @projectUrl: The url of the project to perform the request on
	*/
  function allowMoreWork(projectUrl) {
	 return projectOperation('/allow_more_work', projectUrl);
  }

  /**
	* Request that work is suspended for the given project
	*
	* Workunits for the project that are currently in progress or waiting to processed will be paused.
	*
	* Params:
	* @projectUrl: The url of the project to perform the request on
	*/
  function suspendProject(projectUrl) {
	 return projectOperation('/suspend_project', projectUrl);
  }

  /**
	* Request that work is resumed for the given project
	*
	* Existing workunits for the project will be resumed.
	*
	* Params:
	* @projectUrl: The url of the project to perform the request on
	*/
  function resumeProject(projectUrl) {
	 return projectOperation('/resume_project', projectUrl);
  }

  /**
	* Request that the given project is updated.
	*
	* This can entail uploading results and downloading new workunits and project settings.
	*
	* Params:
	* @projectUrl: The url of the project to perform the request on
	*/
  function updateProject(projectUrl) {
	 return projectOperation('/update_project', projectUrl);
  }

  /**
	* Do a generic operation on a project where that operation only requires the project's url
	*
	* This method is internal to this service and isn't exposed by default.
	*
	* Params:
	* @endpoint: The endpoint on the webserver to call in order to complete the operation, e.g. '/update_project'
	* @projectUrl: The url of the project to perform the request on
	*/
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


