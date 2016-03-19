angular.module('zoetropeControllers')
  .controller('TaskCtrl', TaskController);

TaskController.$inject = ['$http', '$routeParams', 'taskSvc', 'projectsSvc'];

function TaskController($http, $routeParams, taskSvc, projectsSvc) {

  var vm = this;

  taskSvc().query().$promise.then(function(d) {
    var task = d;

    projectsSvc.get()().query().$promise.then(function(d) {
      var projects = d;

      task.project_name = get_project_name(task, projects);
      task.state = get_state_string(task);
      task.time_so_far = get_time_so_far(task);
      vm.task = task;

      vm.suspend_button_text = task.suspended_via_gui ? 'Resume' : 'Suspend';
      vm.ready = true;
    })
  })


  vm.ready = false;
  vm.title = 'Task Summary';
}
