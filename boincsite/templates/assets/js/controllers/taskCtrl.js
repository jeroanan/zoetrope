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
  
  vm.load = load;
  vm.getDeadlineClass = getDeadlineClass;

  vm.suspendClicked = suspendClicked;
  vm.resumeClicked = resumeClicked;
  vm.abortTaskLinkClicked = abortTaskLinkClicked;
  vm.abortButtonClicked = abortButtonClicked;

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
	 task.truncatedName = task.name.substr(0, 20);

	 var overdue = false;
	 var deadlineApproaching = false;

	 // Assume the date is something like 2016-06-09 21:08:00
	 var deadlineSplit = task.report_deadline.split(' ')[0].split('-');
	 
	 if (deadlineSplit.length===3) {
	 	var deadlineDate = new Date(deadlineSplit[0], deadlineSplit[1]-1, deadlineSplit[2]);
	 	var now = new Date();
		
	 	if (now>deadlineDate) {			 
	 	  overdue = true;
	 	} else {
	 	  var oneDay = 86400000; // milliseconds/day
	 	  var numDays = 2;
	 	  var dateDiff = deadlineDate - now;
	 	  deadlineApproaching = dateDiff < (oneDay * numDays);
	 	}
	 }

	 task.overdue = overdue;
	 task.deadlineApproaching = deadlineApproaching;
	 vm.task = task;	 
	 projectSvc.getAttachedProjects()().query().$promise.then(gotProjects, onError);
  }

  function gotProjects(projects) {
	 vm.task.project_name = get_project_name(vm.task, projects);
	 vm.task.state = get_state_string(vm.task);
	 vm.task.time_so_far = get_time_so_far(vm.task);
	 	 
	 vm.ready = true;
  }

  function getDeadlineClass(task) {
	 if (task.overdue) return 'text-danger';
	 if (task.deadlineApproaching) return 'text-warning';	 
  }
}
