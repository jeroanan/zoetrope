/**
 * Controller for the index screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers').controller('IndexCtrl', IndexController);

IndexController.$inject = ['tasksSvc', 'projectsSvc'];

function IndexController(tasksSvc, projectsSvc) {

  var vm = this;
  vm.tasks = {};
  vm.projects = {};
  vm.sortProp = 'idx';
  vm.reverseSort = false;
  vm.ready = false;
  vm.sort = getSortFunc(vm, 'sortProp', 'reverseSort');
  vm.upArrow = upArrow;
  vm.downArrow = downArrow;

  function gotTasks(tasks) {
	 vm.tasks = tasks;
	 projectsSvc.get()().query().$promise.then(gotProjects);
  }

  function gotProjects(projects) {
	 vm.projects = projects;

	 function padTime(timeIn) {
		var timeSplit = timeIn.split(':');
		var out = '';

		for (var t in timeSplit) {
		  if (timeSplit[t].length===1) {
			 out += '0' + timeSplit[t];
		  } else {
			 out += timeSplit[t];
		  }

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
		return x;
	 });
	 
    vm.ready = true;
    vm.showRawData = false;
    vm.title = 'BOINC Tasks';
    document.title = vm.title;
  }
  
  tasksSvc.get()().query().$promise.then(gotTasks);    
}
