angular.module('zoetropeControllers')
  .controller('ProjectCtrl', ProjectController);

ProjectController.$inject = ['$scope', '$http', '$routeParams'];

function ProjectController($scope, $http, $routeParams) {
  var project = $routeParams.project;
  $http.get('/project_json?project=' + project).then(function successCallback(response) {
    $scope.project = response.data;
    $scope.ready = true;
  }, function errorCallback(response){
    $scope.error = true;
    $scope.errorMessage = 'Project not found.'
    $scope.ready = true;
  });

  $scope.ready = false;
  $scope.title = 'Project Summary';
}
