angular.module('zoetropeControllers')
  .controller('ProjectCtrl', ProjectController);

ProjectController.$inject = ['$http', '$routeParams'];

function ProjectController($http, $routeParams) {

  var vm = this;

  var project = $routeParams.project;
  $http.get('/project_json?project=' + project).then(function successCallback(response) {
    vm.project = response.data;
    vm.ready = true;
  }, function errorCallback(response){
    vm.error = true;
    vm.errorMessage = 'Project not found.'
    vm.ready = true;
  });

  vm.ready = false;
  vm.title = 'Project Summary';
}
