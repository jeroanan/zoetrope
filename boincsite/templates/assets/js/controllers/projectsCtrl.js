angular.module('zoetropeControllers')
  .controller('ProjectsCtrl', ProjectsController);

ProjectsController.$inject = ['$http'];

function ProjectsController($http) {

  var vm = this;

  $http.get('/projects_json').success(function(data) {
    vm.projects = data;
    vm.ready = true;
  });

  vm.orderProp = 'name';
  vm.reverseSort = false;
  vm.ready = false;
  vm.showRawData = false;
  vm.title = "BOINC Projects";
}
