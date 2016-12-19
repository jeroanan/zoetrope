/**
 * Controller for the project detail screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('ProjectCtrl', ProjectController);

ProjectController.$inject = ['$routeParams', '$compile', '$scope', 'projectSvc'];

function ProjectController($routeParams, $compile, $scope, projectSvc) {

  var vm = this;
  vm.ready = false;
  vm.title = '';  
  vm.projectFound = false;
  vm.project = {};
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

  document.title = vm.title;

  load();
  
  function load() {
    vm.ready = false;
    projectSvc.getProject2($routeParams.project, gotProject, serviceError);
  }

  function gotProject(project) {

    if (project.error_message && project.error_message===-1414) {
      document.location = '/#/login';
      return;
    }

    vm.project = project;
    setTitle('Project Summary -- ' + project.project_name);

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
    projectSvc.updateProject(vm.project.master_url)().query();
  }
  
  function detachClicked() {
    $('#detachModal').modal('show');
  }

  function noMoreWorkClicked() {
    projectSvc.noMoreWork2(vm.project.master_url, function() {
      vm.project.dont_request_more_work = true;
    });
  }

  function allowMoreWorkClicked() {
    projectSvc.allowMoreWork2(vm.project.master_url, function() {
      vm.project.dont_request_more_work = false;
    });
  }

  function suspendClicked() {
    projectSvc.suspendProject2(vm.project.master_url, function() {
      vm.project.suspended_via_gui = true;
    });
  }

  function resumeClicked() {
    projectSvc.resumeProject2(vm.project.master_url, function() {
      vm.project.suspended_via_gui = false;
    });
  }

  function detachWhenDoneClicked() {
    //TODO: Change screen state when this returns successfully
    projectSvc.detachWhenDone2(vm.project.master_url);
  }

  function dontDetachWhenDoneClicked() {
    //TODO: Change screen state when this returns successfully
    projectSvc.dontDetachWhenDone2(vm.project.master_url);
  }

  function setTitle(title) {
    vm.title = title;
    document.title = vm.title;
  }
}
