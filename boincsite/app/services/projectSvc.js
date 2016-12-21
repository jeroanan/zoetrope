/**
* Service to handle project operastions
*
* Copyright (c) David Wilson 2016
* This file is part of Zoetrope.
* 
* Zoetrope is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
* 
* Zoetrope is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
* 
* You should have received a copy of the GNU General Public License
* along with Zoetrope.  If not, see <http://www.gnu.org/licenses/>.
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
    getAttachedProjects: getAttachedProjects,
    getProjectStatistics: getProjectStatistics,
    detachWhenDone: detachWhenDone,
    dontDetachWhenDone: dontDetachWhenDone
  };

  /**
   * Get details of an individual project
   *
   * Params:
   * @projectName: The name of the project, e.g. asteroids@home
   * @success: callback to run on success
   * @error: callback to run on error
   */
  function getProject(projectName, success, error) {
    jsonSvc.getJson2('/project_json?project=' + projectName, false).then(success, error);
  }

  /**
   * Request that no more work is requested for the given project
   *
   * Workunits for the project that are in progress or waiting to be processed
   * will be completed even when the project is set to request no more work.
   *
   * Params:
   * @projectUrl: The url of the project to perform the request on
   * @success: callback to run on success
   * @error: callback to run on error
   */
  function noMoreWork(projectUrl, success, error) {
    projectOperation2('/no_more_work', projectUrl).then(success, error);
  }

  /**
   * Request that work is requested for the given project
   *
   * To be called for projects that are currently set not to request more work.
   *
   * Params:
   * @projectUrl: The url of the project to perform the request on
   * @success: callback to run on success
   * @error: callback to run on error
   */
  function allowMoreWork(projectUrl, success, error) {
    return projectOperation2('/allow_more_work', projectUrl).then(success, error);
  }

  /**
   * Request that work is suspended for the given project
   *
   * Workunits for the project that are currently in progress or waiting to processed will be paused.
   *
   * Params:
   * @projectUrl: The url of the project to perform the request on
   * @success: callback to run on success
   * @error: callback to run on error
   */
  function suspendProject(projectUrl, success, error) {
    projectOperation2('/suspend_project', projectUrl).then(success, error);
  }

  /**
   * Request that work is resumed for the given project
   *
   * Existing workunits for the project will be resumed.
   *
   * Params:
   * @projectUrl: The url of the project to perform the request on
   * @success: callback to run on success
   * @error: callback to run on error
   */
  function resumeProject(projectUrl, success, error) {
    projectOperation2('/resume_project', projectUrl).then(success, error);
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
   * @success: callback to run on success
   * @error: callback to run on error
   */
  function attachProject(projectUrl, email, password, username, newAcccount, success, error) {
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

    return jsonSvc.sendJson2(endpoint, data).then(success, error);
  }

  /**
   * Request to detach from a project
   *
   * Detaching causes any queued or in-progress workunits for that project to be aborted.
   *
   * Params:
   * @projectUrl: The url of the project to detach from
   * @success: callback to run on success
   * @error: callback to run on error
   */
  function detachProject(projectUrl, success, error) {
    var data = {
      'projectUrl': projectUrl
    };

    return jsonSvc.sendJson2('/detach_project', data).then(success, error);
  }

  /**
   * Get a list of all public projects
   * 
   * Params:
   * @success: callback to run on success
   * @error: callback to run on error
   */
  function getAvailableProjects(success, error) {
    return jsonSvc.getJson2('/get_all_projects_list_json', true).then(success, error);
  }

  /**
   * Get a list of currently-attached projects
   * 
   * Params:
   * @success: callback to run on success
   * @error: callback to run on error
   */
  function getAttachedProjects(success, error) {
    return jsonSvc.getJson2('/projects_json', true).then(success, error);
  }

  /**
   * Get daily statistics for the given project.
   *
   * Params:
   * @projectUrl: The url of the project to get statistics for.
   * @success: callback to run on success
   * @error: callback to run on error
   */ 
  function getProjectStatistics(projectUrl, success, error) {
	 
    var data = {
      'projectUrl': projectUrl
    };
	 
    return jsonSvc.getJson2('/get_statistics_json', true, data).then(success, error);
  }

  /**
   * Request that when all outstanding workunits have been completed for the
   * given project, it is detached.
   *
   * Params:
   * @projectUrl: The url of the project to detach from
   * @success: callback to run on success
   * @error: callback to run on error
   */
  function detachWhenDone(projectUrl, success, error) {
    projectOperation2('/detach_project_when_done', projectUrl).then(success,error);
  }

  /**
   * Cancel a previous request that a project be detached when all of its outstanding workunits 
   * have been completed.
   *
   * Params:
   * @projectUrl: The url of the project to detach from
   * @success: callback to run on success
   * @error: callback to run on error
   */
  function dontDetachWhenDone(projectUrl, success, error) {
    projectOperation2('/dont_detach_project_when_done', projectUrl).then(success, error);
  }

  /**
   * Do a generic operation on a project where that operation only requires the project's url
   *
   * This method is internal to this service and isn't exposed by default.
   *
   * Params:
   * @endpoint: The endpoint on the webserver to call in order to complete the operation, e.g. '/update_project'
   * @projectUrl: The url of the project to perform the request on
   *
   * TODO: Obsolete. This will be replaced by projectOperation2 when 
   *       migration to it has been completed.
   */
  function projectOperation(endpoint, projectUrl) {
    var data = {
      'projectUrl': projectUrl
    };

    return jsonSvc.sendJson(endpoint, data);
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
  function projectOperation2(endpoint, projectUrl) {
    var data = {
      'projectUrl': projectUrl
    };

    return jsonSvc.sendJson2(endpoint, data);
  }

  return svc;
}
