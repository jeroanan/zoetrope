/**
 * Controller for the attached projects screen.
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
angular.module('zoetropeControllers')
  .controller('ProjectsCtrl', ProjectsController);

ProjectsController.$inject = ['projectSvc', '$document', '$location'];

function ProjectsController(projectSvc, $document, $location) {

  var vm = this;
  vm.sortProp = 'name';
  vm.reverseSort = false;
  vm.ready = false;
  vm.showRawData = false;
  vm.title = "BOINC Projects";  
  vm.detachUrl = '';
  vm.detachName = '';
  vm.error = false;
  vm.operationSuccess = false;
  vm.operationSuccessMessage = '';
  
  vm.load = load;
  vm.sort = getSortFunc(vm, 'sortProp', 'reverseSort');

  vm.detachClicked = detachClicked;
  vm.updateClicked = getProjectOperation('updateProject', 'Project updated successfully');
  vm.noMoreWorkClicked = getProjectOperation('noMoreWork', 'New tasks disallowed', 'dont_request_more_work', true);
  vm.allowMoreWorkClicked = getProjectOperation('allowMoreWork', 'New tasks re-allowed', 'dont_request_more_work', false);
  vm.suspendProjectClicked = getProjectOperation('suspendProject', 'Project suspended', 'suspended_via_gui', true);
  vm.resumeProjectClicked = getProjectOperation('resumeProject', 'Project resumed', 'suspended_via_gui', false);
  
  $document[0].title = vm.title;

  load();
  
  function load() {
    vm.ready = false;
    vm.error = false;
    projectSvc.getAttachedProjects(gotProjects, serviceError);
  }

  function gotProjects(projects) {

    if (projects.length>0) {
      var p = projects[0];

      if (p.error_message && p.error_message===-1414) {
        $location.path('/#/login');
        return;
      }
    }

    vm.projects = projects.filter(function(x) { return x.project_name.length > 0; });
    vm.ready = true;
  }

  function serviceError(xhr) {
    vm.error = true;
    vm.ready = true;
  }

  function detachClicked(projectName, projectUrl) {
    //TODO: How to unit test the showing of the modal dialog?
    var dialog = $('#detachModal');
	 
    vm.detachUrl = projectUrl;
    vm.detachName = projectName;

    dialog.modal('show');
  }
  
  function getProjectOperation(operationFunc, successMessage, propToChange, propValue) {
    return function(projectUrl) {
      resetProjectOperationSuccess();
      projectSvc[operationFunc](projectUrl, function() { //TODO: Add operationError too.
        operationSuccess(successMessage);

        if (propToChange && propToChange) setProjectProperty(projectUrl, propToChange, propValue);
      });
    };
  }

  function resetProjectOperationSuccess() {
    vm.operationSuccess = false;
    vm.operationSuccessMessage = '';
  }

  function operationSuccess(message) {
    vm.operationSuccess = true;
    vm.operationSuccessMessage = message;
  }

  function setProjectProperty(projectUrl, propertyName, propertyValue) {
    vm.projects = vm.projects.map(function(x) {
      if (x.master_url!==projectUrl) return x;
      x[propertyName] = propertyValue;		
      return x;
    });
  }
}
