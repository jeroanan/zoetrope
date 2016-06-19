/**
 * Controller for the tasks screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers').controller('tasksCtrl', TasksController);

TasksController.$inject = ['taskSvc', 'projectSvc'];

function TasksController(taskSvc, projectSvc) {

  var vm = this;
  vm.tasks = {};
  vm.projects = {};
  vm.sortProp = 'idx';
  vm.reverseSort = false;
  vm.ready = false;
  vm.sort = getSortFunc(vm, 'sortProp', 'reverseSort');
  vm.error = false;

  vm.load = load;
  vm.getDeadlineClass = getDeadlineClass;

  load();
  
  function load() {
	 vm.ready = false;
	 vm.error = false;
	 taskSvc.getAllTasks()().query().$promise.then(gotTasks, serviceError);
  }

  function gotTasks(tasks) {

	 if (tasks.length>0) {
		var t = tasks[0];
		
		if (t.error_message && t.error_message===-1414) {
		  document.location = '/#/login';
		  return;
		}
	 }
	 
	 vm.tasks = tasks;
	 projectSvc.getAttachedProjects()().query().$promise.then(gotProjects, serviceError);
  }

  function serviceError(xhr) {
	 vm.error = true;
	 vm.ready = true;
  }

  function gotProjects(projects) {
	 vm.projects = projects;

	 function padTime(timeIn) {
		var timeSplit = timeIn.split(':');
		var out = '';

		for (var t in timeSplit) {
		  if (timeSplit[t].length===1)
			 out += '0' + timeSplit[t];
		  else
			 out += timeSplit[t];
		  
		  out += ':';		  
		}
		return out.slice(0, out.length-1);
	 }

	 var idx = 0;
	 vm.tasks = vm.tasks.map(function(x) {
		idx++;

		x.idx = idx;
		x.project_name = get_project_name(x, vm.projects);
		x.state = get_state_string(x);
		x.estimated_cpu_time_remaining = padTime(x.estimated_cpu_time_remaining);
		x.time_so_far = padTime(get_time_so_far(x));
		
		var overdue = false;
		var deadlineApproaching = false;
		
		// Assume the date is something like 2016-06-09 21:08:00
		var deadlineSplit = x.report_deadline.split(' ')[0].split('-');
		
		if (deadlineSplit.length===3) {
		  var deadlineDate = new Date(deadlineSplit[0], deadlineSplit[1]-1, deadlineSplit[2]);
		  var now = new Date();

		  if (now>deadlineDate)
			 overdue = true;
		  else {
			 var oneDay = 86400000; // milliseconds/day
			 var numDays = 2;
			 var dateDiff = deadlineDate - now;
			 deadlineApproaching = dateDiff < (oneDay * numDays);
		  }
		}
		
		x.overdue = overdue;
		x.deadlineApproaching = deadlineApproaching;
		return x;
	 });
	 
    vm.ready = true;
    vm.showRawData = false;
    vm.title = 'BOINC Tasks';
    document.title = vm.title;
  }

  function getDeadlineClass(task) {
	 if (task.overdue) return 'text-danger';
	 if (task.deadlineApproaching) return 'text-warning';	 
  }
}
