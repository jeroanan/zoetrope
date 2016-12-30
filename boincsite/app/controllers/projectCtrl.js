/**
 * Controller for the project detail screen.
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
  .controller('ProjectCtrl', ProjectController);

ProjectController.$inject = ['$routeParams', '$compile', '$scope', '$document', '$location', 'projectSvc'];

function ProjectController($routeParams, $compile, $scope, $document, $location, projectSvc) {

  var vm = this;
  vm.ready = false;
  vm.title = '';  
  vm.projectFound = false;
  vm.project = {};

  // TODO: get upArrow and downArrow from a service
  vm.upArrow = upArrow;
  vm.downArrow = downArrow;

  vm.load = load;

  vm.updateProject = updateProjectClick;
  vm.detachClicked = detachClicked;
  vm.noMoreWorkClicked = noMoreWorkClicked;
  vm.allowMoreWorkClicked = allowMoreWorkClicked;
  vm.suspendClicked = suspendClicked;
  vm.resumeClicked = resumeClicked;
  vm.detachWhenDoneClicked = detachWhenDoneClicked;
  vm.dontDetachWhenDoneClicked = dontDetachWhenDoneClicked;

  $document[0].title = vm.title;

  load();
  
  function load() {
    vm.ready = false;
    projectSvc.getProject($routeParams.project, gotProject, serviceError);
  }

  function gotProject(project) {

    if (project.error_message && project.error_message===-1414) {
      $location.path('/#/login');
      return;
    }

    vm.project = project;
    setTitle('Project Summary -- ' + project.project_name);

    //TODO: how do i unit test the following?
    $('#statsRow').append($compile('<project-statistics project-url="' + project.master_url + '" />')($scope));

    vm.projectFound = true;
    vm.ready = true;
  }

  function serviceError() {
    vm.ready = true;
    vm.projectFound = false;
  }  

  function updateProjectClick() {
    if (vm.ready!==true) return;
    //TODO: handle success/error better
    projectSvc.updateProject(vm.project.master_url);
  }
  
  function detachClicked() {
    $('#detachModal').modal('show'); //TODO: How do I unit test this?
  }

  function noMoreWorkClicked() {
    //TODO: Handle errors
    projectSvc.noMoreWork(vm.project.master_url, function() {
      vm.project.dont_request_more_work = true;
    });
  }

  function allowMoreWorkClicked() {
    //TODO: Handle errors
    projectSvc.allowMoreWork(vm.project.master_url, function() {
      vm.project.dont_request_more_work = false;
    });
  }

  function suspendClicked() {
    //TODO: Handle errors
    projectSvc.suspendProject(vm.project.master_url, function() {
      vm.project.suspended_via_gui = true;
    });
  }

  function resumeClicked() {
    //TODO: Handle errors
    projectSvc.resumeProject(vm.project.master_url, function() {
      vm.project.suspended_via_gui = false;
    });
  }

  function detachWhenDoneClicked() {
    //TODO: Change screen state when this returns successfully
    projectSvc.detachWhenDone(vm.project.master_url);
  }

  function dontDetachWhenDoneClicked() {
    //TODO: Change screen state when this returns successfully
    projectSvc.dontDetachWhenDone(vm.project.master_url);
  }

  function setTitle(title) {
    vm.title = title;
    $document[0].title = vm.title;
  }
}
