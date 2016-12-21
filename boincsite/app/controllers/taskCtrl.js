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
  vm.operationSuccess = false;
  vm.operationSuccessMessage = '';
  
  vm.load = load;
  vm.getDeadlineClass = getDeadlineClass;
  vm.taskNameClicked = taskNameClicked;

  vm.suspendClicked = getTaskOperation('suspendTask', 'Task suspended', 'suspended_via_gui', true);
  vm.resumeClicked = getTaskOperation('resumeTask', 'Task resumed', 'suspended_via_gui', false);
  vm.abortTaskLinkClicked = getTaskOperation('abortTask', 'Task Aborted');
  vm.abortButtonClicked = abortButtonClicked;

  document.title = vm.title;

  load();
  
  function load() {
    taskSvc.getTask($routeParams.task_name, gotTask, onError);
  }

  function abortButtonClicked() {
    vm.showConfirmAbort = !vm.showConfirmAbort;
  }

  function getTaskOperation(operationFunc, successMessage, propToChange, propValue) {
    return function() {
      resetOperationSuccess();
      taskSvc[operationFunc](vm.task.name, function() {
        operationSuccess(successMessage);
		  
        if (propToChange && propToChange) vm.task[propToChange] = propValue;		  
      });
    };
  }

  function resetOperationSuccess() {
    vm.operationSuccess = false;
    vm.operationSuccessMessage = '';
  }

  function operationSuccess(message) {
    vm.operationSuccess = true;
    vm.operationSuccessMessage = message;
  }

  function onError() {
    var errorText = 'Task not found';
    vm.ready = true;
    vm.error = true;
  }

  function gotTask(task) {

    if (task.error_message && task.error_message===-1414) {
      document.location = '/#/login';
      return;
    }

    task.truncatedName = task.name.substr(0, 20);

    if (task.name.length>20) task.truncatedName += '...';	 
	 
    task.displayName = task.truncatedName;
    task.active_task_state = task.active_task_state===0 ? 'Inactive' : 'Active';

    var overdue = false;
    var deadlineApproaching = false;

    // Assume the date is something like 2016-06-09 21:08:00
    var deadlineSplit = task.report_deadline.split(' ')[0].split('-');
	 
    if (deadlineSplit.length===3) {
      var deadlineDate = new Date(deadlineSplit[0], deadlineSplit[1]-1, deadlineSplit[2]);
      var now = new Date();
		
      if (now>deadlineDate) overdue = true;
      else {
        var oneDay = 86400000; // milliseconds/day
        var numDays = 2;
        var dateDiff = deadlineDate - now;
        deadlineApproaching = dateDiff < (oneDay * numDays);
      }
    }

    task.overdue = overdue;
    task.deadlineApproaching = deadlineApproaching;
    vm.task = task;	 
    projectSvc.getAttachedProjects2(gotProjects, onError);
  }

  function gotProjects(projects) {
    vm.task.project_name = get_project_name(vm.task, projects);
    vm.task.state = get_state_string(vm.task);
    vm.task.time_so_far = get_time_so_far(vm.task);
	 	 
    vm.ready = true;
  }

  function getDeadlineClass() {
    if (vm.task.overdue) return 'text-danger';
    if (vm.task.deadlineApproaching) return 'text-warning';	 
  }

  function taskNameClicked() {
    if (vm.task.displayName===vm.task.name) {
      vm.task.displayName = vm.task.truncatedName;
      return;
    }
    vm.task.displayName = vm.task.name;
  }
}
