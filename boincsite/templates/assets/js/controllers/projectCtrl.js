/**
 * Controller for the project detail screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('ProjectCtrl', ProjectController);

ProjectController.$inject = ['projectSvc'];

function ProjectController(projectSvc) {

  var vm = this;

  projectSvc().query().$promise.then(function(d) {
    vm.project = d;
    vm.ready = true;
  })

  vm.ready = false;
  vm.title = 'Project Summary';
  document.title = vm.title;
}
