/**
 * Controller for the detach project screen.
 *
 * Copyright (c) David Wilson 2016-2017
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
 .controller('detachProjectCtrl', DetachProjectController);

DetachProjectController.$inject = ['projectSvc', '$document', '$location'];

function DetachProjectController(projectSvc, $document, $location) {

  var vm = this;
  vm.attachedProjects = null;
  vm.ready = false;
  vm.showConfirmDetach = false;
  vm.selectedProject = null;
  vm.title = 'Detach Project';
  vm.detachSuccessful = false;
  vm.detachClicked = false;
  vm.detachErrorMessage = '';

  vm.detachButtonClicked = confirmDetach;
  vm.detachLinkClicked = detachLinkClicked;
  vm.selectedProjectChanged = selectedProjectChanged;

  projectSvc.getAttachedProjects(gotProjects); //TODO: No error handler here
  
  $document[0].title = vm.title;

  function gotProjects(projects) {

    if (projects.length>0 && projects[0].error_message && projects[0].error_message===-1414)
    {
      $location.path('/#/login');
      return;
    }

    vm.attachedProjects = projects.filter(function(x) { return x.project_name.length > 0; });
    vm.ready = true;
  }

  // When the initial detach button is clicked it shows
  // a div with hyperlinks so the user can confirm that
  // they really wish to detach from the project.
  function confirmDetach() {
    if (vm.selectedProject) {
      vm.showConfirmDetach = true;
      return;
    }

    vm.detachClicked = true;
    vm.detachSuccessful = false;
    vm.detachErrorMessage = 'Select a project to detach from first.';
  }

  // When we get here the user has clicked the secondary
  // hyperlinks to confirm that they really want to deatch
  // from the project.
  function detachLinkClicked() {
    vm.detachClicked = true;
    projectSvc.detachProject(vm.selectedProject, projectDetached); //TODO: No error handling
  }

  function projectDetached(d) {

    if (d.error_message===-1414) {
      $location.path('/#/login');
      return;
    }

    vm.detachErrorMessage = d.error_message;
    vm.detachSuccessful = d.success;
  }

  function selectedProjectChanged() {
    vm.detachErrorMessage = '';
    vm.detachClicked = false;
    vm.showConfirmDetach=false;
  }
}
