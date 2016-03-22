/**
 * Controller for the projects screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('ProjectsCtrl', ProjectsController);

ProjectsController.$inject = ['projectsSvc'];

function ProjectsController(projectsSvc) {

  var vm = this;

  projectsSvc.get()().query().$promise.then(function(d) {
    vm.projects = d.filter(function(x) { return x.name.length > 0 });
    vm.ready = true;
  })

  vm.orderProp = 'name';
  vm.reverseSort = false;
  vm.ready = false;
  vm.showRawData = false;
  vm.title = "BOINC Projects";
  document.title = vm.title;
}
