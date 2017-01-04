/**
 * Controller for the Attach project screen.
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
  .controller('attachProjectCtrl', AttachProjectController);

AttachProjectController.$inject = ['$location', 'projectSvc', 'md5Svc'];

function AttachProjectController($location, projectSvc, md5Svc) {

  var vm = this;
  vm.selectedProject = '';
  vm.emailaddress = '';
  vm.password = '';
  vm.ready = false;
  vm.title = 'Attach Project';
  vm.errorText = '';
  vm.success = false;
  vm.loading = false;

  vm.submitClicked = submitClicked;
  vm.selectedProjectChanged = selectedProjectChanged;
  
  projectSvc.getAvailableProjects(gotProjects); //TODO: no error handling

  document.title = vm.title;

  function gotProjects(projects) {

    if (projects.length>0 && !loginCheck(projects[0])) return;
    vm.attachedProjects = projects.filter(function(x) { return x.name.length > 0; });
    vm.ready = true;
  }

  function submitClicked() {

    vm.success = false;
    vm.errorText = '';

    if (vm.selectedProject==='' || vm.emailaddress==='' || vm.password==='') {
      vm.success = false;
      vm.errorText = 'Please enter an email address, password and select a project to attach to.';
      return;
    }

    var hash_in = vm.password + vm.emailaddress;
    var password_hash = md5Svc.query(hash_in);
    vm.loading = true;
	 
    projectSvc.attachProject(vm.selectedProject, vm.emailaddress, password_hash, '', false, projectAttached); //TODO: no error handling
  }

  function projectAttached(d) {

    if (!loginCheck(d)) return;
    vm.loading = false;
    vm.success = d.success;
    vm.errorText = d.error_message;
  }

  function loginCheck(xhr) {
    if (xhr.error_message && xhr.error_message===-1414) {
      $location.path('/#/login');
      return false;
    }
    return true;
  }

  function selectedProjectChanged() {
    vm.errorText = '';
  }
}
