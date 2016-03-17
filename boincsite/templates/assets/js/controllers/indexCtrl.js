angular.module('zoetropeControllers').controller('IndexCtrl', IndexController);

IndexController.$inject = ['$http', 'taskSvc'];

function IndexController($http, taskSvc) {

  var vm = this;

  var ts = null;

  taskSvc().query().$promise.then(function(d) {
    vm.tasks = d;
  });

  $http.get('/tasks_json').success(function(tasks) {
    $http.get('/projects_json').success(function(projects) {

      vm.projects = projects;
      //vm.tasks = tasks;

      // We've got the tasks. But they need more info in them  in order for us to display.
      for (var i=0; i<tasks.length; i++) {
        tasks[i].idx = i + 1;
        tasks[i].project_name = get_project_name(tasks[i], vm.projects);
        tasks[i].state = get_state_string(tasks[i]);
        tasks[i].time_so_far = get_time_so_far(tasks[i]);
      }

      vm.ready = true;
      vm.showRawData = false;
      vm.title = 'BOINC Tasks';
    });
  });

  vm.sortProp = 'index';
  vm.reverseSort = false;
  vm.ready = false;
}
