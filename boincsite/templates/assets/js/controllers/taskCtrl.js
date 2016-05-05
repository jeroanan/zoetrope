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

  function onError() {
	 var errorText = 'Task not found';
	 vm.ready = true;
	 vm.error = true;
	 vm.errorMessage = errorText;	 
  }

  function gotTask(task) {
	 projectsSvc.get()().query().$promise.then(
		function(projects) {
		  gotProjects(projects, task);
		}, onError);
  }

  function gotProjects(projects, task) {
	 task.project_name = get_project_name(task, projects);
	 task.state = get_state_string(task);
	 task.time_so_far = get_time_so_far(task);
	 vm.task = task;
	 
	 vm.suspend_button_text = task.suspended_via_gui ? 'Resume' : 'Suspend';
	 vm.ready = true;
  }
  
  taskSvc.get()().query().$promise.then(gotTask, onError);
  
  document.title = vm.title;
}
