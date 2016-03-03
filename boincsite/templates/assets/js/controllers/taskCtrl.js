angular.module('zoetropeControllers')
  .controller('TaskCtrl', TaskController);

TaskController.$inject = ['$scope', '$http', '$routeParams'];

function TaskController($scope, $http, $routeParams) {
  $http.get('/task_json?task_name=' + $routeParams.task_name).then(
    function successCallback(response) {

      var task = response.data;

      $http.get('/projects_json').then(function successCallback(response) {
        var projects = response.data;

        $scope.task = task;
        task.project_name = get_project_name(task, projects);
        task.state = get_state_string(task);
        task.time_so_far = get_time_so_far(task);

        $scope.suspend_button_text = task.suspended_via_gui ? 'Resume' : 'Suspend';
        $scope.ready = true;
      });
    },
    function errorCallback(response) {
      $scope.error = true;
      if (response.status===500) $scope.errorMessage = "Task not found.";
      $scope.ready = true;
    });

  $scope.ready = false;
  $scope.title = 'Task Summary';
}
