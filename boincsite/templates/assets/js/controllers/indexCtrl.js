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
  vm.sortProp = 'index';
  vm.reverseSort = false;
  vm.ready = false;
  vm.sort = getSortFunc(vm, 'sortProp', 'reverseSort');

  function gotTasks(tasks) {
	 vm.tasks = tasks;
	 projectsSvc.get()().query().$promise.then(gotProjects);
  }

  function gotProjects(projects) {
	 vm.projects = projects;
	 
    for (var i=0; i<vm.tasks.length; i++) {
      vm.tasks[i].idx = i + 1;
      vm.tasks[i].project_name = get_project_name(vm.tasks[i], vm.projects);
      vm.tasks[i].state = get_state_string(vm.tasks[i]);
      vm.tasks[i].time_so_far = get_time_so_far(vm.tasks[i]);
    }
	 
    vm.ready = true;
    vm.showRawData = false;
    vm.title = 'BOINC Tasks';
    document.title = vm.title;
  }
  
  tasksSvc.get()().query().$promise.then(gotTasks);    
}
