/**
 * Controller for the project detail screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('ProjectCtrl', ProjectController);

ProjectController.$inject = ['projectSvc', 'updateProjectSvc'];

function ProjectController(projectSvc, updateProjectSvc) {

  var vm = this;
  vm.ready = false;
  vm.title = 'Project Summary';
  vm.updateProject = updateProjectClick;

  projectSvc().query().$promise.then(function(d) {
    vm.project = d;
    vm.ready = true;
  })

  function updateProjectClick() {
    if (vm.ready!==true) {
      return;
    }

    updateProjectSvc.query(vm.project.master_url)().query()
  }
  
  document.title = vm.title;
}
