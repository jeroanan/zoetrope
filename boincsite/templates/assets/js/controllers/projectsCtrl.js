angular.module('zoetropeControllers')
  .controller('ProjectsCtrl', ProjectsController);

ProjectsController.$inject = ['$scope', '$http'];

function ProjectsController($scope, $http) {
  $http.get('/projects_json').success(function(data) {
    $scope.projects = data;
    $scope.ready = true;
  });

  $scope.orderProp = 'name';
  $scope.reverseSort = false;
  $scope.ready = false;
  $scope.showRawData = false;
  $scope.title = "BOINC Projects";
}
