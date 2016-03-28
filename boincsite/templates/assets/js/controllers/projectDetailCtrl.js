/**
 * Controller for the Project detail screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('projectDetailCrl', ProjectDetailController);

ProjectDetailController.$inject = ['$routeParams', 'allProjectListSvc'];

function ProjectDetailController($routeParams, allProjectListSvc) {
  var vm = this;

  vm.ready = false;

  function setTitle(title) {
    vm.title = title;
    document.title = vm.title;
  }

  allProjectListSvc.get()().query().$promise.then(function(d) {
    vm.project = d.filter(function(x) { return x.name===$routeParams.projectname })[0];

    setTitle('Project Details -- ' + vm.project.name);
    vm.ready = true;
  });

  setTitle('Project Details');
}
