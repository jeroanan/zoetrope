/**
 * Controller for the task detail screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('TaskCtrl', TaskController);

TaskController.$inject = ['$http', '$routeParams', 'taskSvc', 'projectsSvc'];

function TaskController($http, $routeParams, taskSvc, projectsSvc) {

  var vm = this;
  vm.ready = false;
  vm.title = 'Task Summary';
  vm.task = {};
  vm.suspend_button_text = '';
  vm.error = '';
  vm.showConfirmAbort = false;
  vm.abortButtonClicked = abortButtonClicked;
  vm.load = load;
  
  document.title = vm.title;

  load();
  
  function load() {
	 taskSvc.get()().query().$promise.then(gotTask, onError);
  }

  function abortButtonClicked() {
	 vm.showConfirmAbort = !vm.showConfirmAbort;
  }

  function onError() {
	 var errorText = 'Task not found';
	 vm.ready = true;
	 vm.error = true;
  }

  function gotTask(task) {
	 vm.task = task;	 
	 projectsSvc.get()().query().$promise.then(gotProjects, onError);
  }

  function gotProjects(projects) {
	 vm.task.project_name = get_project_name(vm.task, projects);
	 vm.task.state = get_state_string(vm.task);
	 vm.task.time_so_far = get_time_so_far(vm.task);
	 	 
	 vm.suspend_button_text = vm.task.suspended_via_gui ? 'Resume' : 'Suspend';
	 vm.ready = true;
  }  
}
