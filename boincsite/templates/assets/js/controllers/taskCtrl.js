/**
 * Controller for the task detail screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('TaskCtrl', TaskController);

TaskController.$inject = ['$http', '$routeParams', 'taskSvc', 'projectSvc'];

function TaskController($http, $routeParams, taskSvc, projectSvc) {

  var vm = this;
  vm.ready = false;
  vm.title = 'Task Summary';
  vm.task = {};
  vm.error = '';
  vm.showConfirmAbort = false;
  vm.abortButtonClicked = abortButtonClicked;
  vm.load = load;

  vm.suspendClicked = suspendClicked;
  vm.resumeClicked = resumeClicked;
  vm.abortTaskLinkClicked = abortTaskLinkClicked;

  document.title = vm.title;

  load();
  
  function load() {
	 taskSvc.getTask($routeParams.task_name)().query().$promise.then(gotTask, onError);
  }

  function abortButtonClicked() {
	 vm.showConfirmAbort = !vm.showConfirmAbort;
  }

  function suspendClicked() {
	 taskSvc.suspendTask(vm.task.name)().query().$promise.then(function(d) {
		vm.task.suspended_via_gui = true;
	 });
  }

  function resumeClicked() {
	 taskSvc.resumeTask(vm.task.name)().query().$promise.then(function(d) {
		vm.task.suspended_via_gui = false;
	 });
  }

  function abortTaskLinkClicked() {
	 taskSvc.abortTask(vm.task.name)().query().$promise.then(function(d) {
		window.location.href = '/';
	 });
  }

  function onError() {
	 var errorText = 'Task not found';
	 vm.ready = true;
	 vm.error = true;
  }

  function gotTask(task) {
	 vm.task = task;	 
	 projectSvc.getAttachedProjects()().query().$promise.then(gotProjects, onError);
  }

  function gotProjects(projects) {
	 vm.task.project_name = get_project_name(vm.task, projects);
	 vm.task.state = get_state_string(vm.task);
	 vm.task.time_so_far = get_time_so_far(vm.task);
	 	 
	 vm.ready = true;
  }  
}
