angular.module('zoetropeControllers')
  .controller('ProjectsCtrl', ProjectsController);

ProjectsController.$inject = ['projectsSvc'];

function ProjectsController(projectsSvc) {

  var vm = this;

  projectsSvc.get()().query().$promise.then(function(d) {
    vm.projects = d;
    vm.ready = true;
  })

  vm.orderProp = 'name';
  vm.reverseSort = false;
  vm.ready = false;
  vm.showRawData = false;
  vm.title = "BOINC Projects";
}
