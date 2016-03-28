/**
 * Controller for the All Projects list screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('allProjectListCtrl', AllProjectListController);

AllProjectListController.$inject = ['allProjectListSvc']

function AllProjectListController(allProjectListSvc) {

  var vm = this;

  vm.ready  = false;
  vm.title = 'All Projects';
  document.title = vm.title;

  allProjectListSvc.get()().query().$promise.then(function(d) {
    vm.ready = true;
    vm.availableProjects = d;
  })
}
