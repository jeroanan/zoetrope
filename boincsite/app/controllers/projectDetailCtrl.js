/**
* Controller for the Project detail screen.
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
  .controller('projectDetailCrl', ProjectDetailController);

ProjectDetailController.$inject = ['$routeParams', 'projectSvc', 'systemInfoSvc'];

function ProjectDetailController($routeParams, projectSvc, systemInfoSvc) {
  var vm = this;

  vm.ready = false;
  vm.project = {};
  vm.attachClicked = attachClicked;
  vm.detachClicked = detachClicked;
  vm.projectFound = false;
  vm.error = false;
  vm.load = load;
  vm.gotPlatform = false;
  
  setTitle('Project Details');

  load();

  /**
   * Initialise the display
   */
  function load() {
    vm.ready = false;
    vm.error = false;
    projectSvc.getAvailableProjects2(gotAllProjects, serviceError);
  }

  /**
   * Callback to be made when the getAvailableProjects service call has returned successfully
   *
   * Parameters:
   * projects: The xhr response provided with the callback
   */
  function gotAllProjects(projects) {
	 
    if (projects.length>0 && projects[0].error_message && projects[0].error_message===-1414) {
      document.location = '/#/login';
      return;
    }
	 
    vm.project = projects.filter(function(x) { return x.name===$routeParams.projectname; })[0];

    if (!vm.project) {
      vm.projectFound = false;
      vm.ready = true;
      return;
    }

    projectSvc.getAttachedProjects2(gotAttachedProjects, serviceError);
    systemInfoSvc.getPlatform2(gotPlatform, serviceError);

    setTitle('Project Details -- ' + vm.project.name);
    vm.projectFound = true;
    vm.ready = true;
  }

  /**
   * A callback to be made in the event of a service call encountering an error.
   *
   * Updtaes the display to an error state.
   */
  function serviceError() {
    vm.ready = true;
    vm.error = true;
  }

  /**
   * Called when the attach button is clicked
   */
  function attachClicked() {
    $('#attachModal').modal('show');
  }

  /**
   * Called when the detach button is clicked
   */
  function detachClicked() {
    $('#detachModal').modal('show');
  }

  /**
   * Set the document title and heading on the page
   *
   * Parameters:
   * title: The title text to set
   */
  function setTitle(title) {
    vm.title = title;
    document.title = vm.title;
  }  


  /**
   * Callback made when list list of currently-attched projects has been retrieved
   *
   * Parameters:
   * projects: The xhr response from the service call
   */
  function gotAttachedProjects(projects) {
    var attachedProject = projects.filter(function(x) { return x.project_name===vm.project.name; });

    vm.project.attached = attachedProject.length > 0;
  }

  /**
   * Callback made when the current platform has been retrieved
   *
   * Parameters:
   * projects: The xhr response from the service call
   */
  function gotPlatform(platform) {
    var supportedPlatform = vm.project.platforms.filter(function(x) {
      return x.name===platform.platform;
    });

    vm.project.platformSupported = supportedPlatform.length>0;
    vm.gotPlatform = true;

    var supportedPlatformListItems = $('#supportedPlatforms').children('li:contains(' + platform.platform + ')');

    for (var i=0;i<supportedPlatformListItems.length;i++) {
      var platformItem = $(supportedPlatformListItems[i]);
      platformItem.addClass('text-success');
      platformItem.text(platformItem.text() + ' ✔');
    }
  }
}
