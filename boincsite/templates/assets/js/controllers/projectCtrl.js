/**
 * Controller for the project detail screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('ProjectCtrl', ProjectController);

ProjectController.$inject = ['projectSvc', 'updateProjectSvc', 'statisicsSvc'];

function ProjectController(projectSvc, updateProjectSvc, statisicsSvc) {

  var vm = this;
  vm.ready = false;
  vm.title = 'Project Summary';
  vm.updateProject = updateProjectClick;
  vm.detachClicked = detachClicked;
  vm.projectFound = false;
  vm.project = {};
  vm.projectStats = [];
  vm.statsSortField = 'day';
  vm.statsReverseSort = true;

  function gotProject(project) {
	 vm.project = project;

	 statisicsSvc.get(project.master_url)().query().$promise.then(function(d) {
		vm.projectStats = d[0];
	 });

	 vm.projectFound = true;
	 vm.ready = true;
  }

  function gotProjectError() {
	 vm.ready = true;
	 vm.projectFound = false;
  }
  
  projectSvc().query().$promise.then(gotProject, gotProjectError);

  function updateProjectClick() {
    if (vm.ready!==true) {
      return;
    }

    updateProjectSvc.query(vm.project.master_url)().query();
  }
  
  function detachClicked() {
	 $('#detachModal').modal('show');
  }
  
  document.title = vm.title;
}
