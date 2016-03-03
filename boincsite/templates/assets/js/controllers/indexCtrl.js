angular.module('zoetropeControllers').controller('IndexCtrl', IndexController);

IndexController.$inject = ['$scope', '$http'];

function IndexController($scope, $http) {
  $http.get('/tasks_json').success(function(tasks) {
    $http.get('/projects_json').success(function(projects) {

      $scope.projects = projects;
      $scope.tasks = tasks;

      // We've got the tasks. But they need more info in them  in order for us to display.
      for (var i=0; i<tasks.length; i++) {
        tasks[i].idx = i + 1;
        tasks[i].project_name = get_project_name(tasks[i], $scope.projects);
        tasks[i].state = get_state_string(tasks[i]);
        tasks[i].time_so_far = get_time_so_far(tasks[i]);
      }

      $scope.ready = true;
      $scope.showRawData = false;
      $scope.title = 'BOINC Tasks';
    });
  });

  $scope.sortProp = 'index';
  $scope.reverseSort = false;
  $scope.ready = false;
}
