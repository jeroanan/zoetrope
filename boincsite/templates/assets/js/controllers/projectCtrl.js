angular.module('zoetropeControllers')
  .controller('ProjectCtrl', ProjectController);

ProjectController.$inject = ['projectSvc'];

function ProjectController(projectSvc) {

  var vm = this;

  projectSvc().query().$promise.then(function(d) {
    vm.project = d;
    console.log(d);
    vm.ready = true;
  })

  vm.ready = false;
  vm.title = 'Project Summary';
}
