/**
 * Service to handle project operastions
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
	 updateProject: updateProject,
	 attachProject: attachProject,
	 detachProject: detachProject,
	 getAvailableProjects: getAvailableProjects,
	 getAttachedProjects: getAttachedProjects
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
	* Request to attach to a project
	*
	* Params:
	* @projectUrl: The url of the proejct to attach to
	* @email: The email address to use to sign into the project account
	* @password: The MD5-hash of password + email address
	* @username: If signing up for a new account, the username of the acount
	* @newAccount: If true, sign up for a new account before attaching. 
	*              Otherwise sign into an existing account to attach.
	*/
  function attachProject(projectUrl, email, password, username, newAcccount) {
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

	 return sendProjectData(endpoint, data);
  }

  /**
	* Request to detach from a project
	*
	* Detaching causes any queued or in-progress workunits for that project to be aborted.
	*
	* Params:
	* @projectUrl: The url of the project to detach from
	*/
  function detachProject(projectUrl) {
	 data = {
      'projectUrl': projectUrl
    };

	 return sendProjectData('/detach_project', data);
  }

  /**
	* Get a list of all public projects
	*/
  function getAvailableProjects() {
	 return jsonSvc.get('/static/json/allprojectslist.json', '/get_all_projects_list_json', true);
  }

  function getAttachedProjects() {
	 return jsonSvc.get('/static/json/projects.json', '/projects_json', true);
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

	 return sendProjectData(endpoint, data);
  }

  /**
	* Post the given data to the given endpoint
	*
	* This method is internal to this service and isn't exposed by default.
	*
	* Params:
	* @endpoint: The endpoint on the webserver to send the data to
	* @data: The data to send to the endpoint
	*
	* Returns: 
	* A $resource that will promise the server's response
	*/
  function sendProjectData(endpoint, data) {
	 return function() {
      var res = $resource(endpoint, data, {
        query: {method: 'POST'}
      });
		
      return res;
    };
  }
  
  return svc;
}


