angular.module('zoetropeControllers')
  .controller('TaskCtrl', TaskController);

TaskController.$inject = ['$http', '$routeParams'];

function TaskController($http, $routeParams) {

  var vm = this;

  $http.get('/task_json?task_name=' + $routeParams.task_name).then(
    function successCallback(response) {

      var task = response.data;

      $http.get('/projects_json').then(function successCallback(response) {
        var projects = response.data;

        task.project_name = get_project_name(task, projects);
        task.state = get_state_string(task);
        task.time_so_far = get_time_so_far(task);
        vm.task = task;

        vm.suspend_button_text = task.suspended_via_gui ? 'Resume' : 'Suspend';
        vm.ready = true;
      });
    },
    function errorCallback(response) {
      vm.error = true;
      if (response.status===500) vm.errorMessage = "Task not found.";
      vm.ready = true;
    });

  vm.ready = false;
  vm.title = 'Task Summary';
}
