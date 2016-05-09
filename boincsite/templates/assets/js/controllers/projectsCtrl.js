/**
 * Controller for the attached projects screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('ProjectsCtrl', ProjectsController);

ProjectsController.$inject = ['projectsSvc', 'updateProjectSvc'];

function ProjectsController(projectsSvc, updateProjectSvc) {

  var vm = this;
  vm.orderProp = 'name';
  vm.reverseSort = false;
  vm.ready = false;
  vm.showRawData = false;
  vm.title = "BOINC Projects";
  vm.detachClicked = detachClicked;
  vm.updateClicked = updateClicked;
  vm.detachUrl = '';
  vm.detachName = '';
  vm.sort = getSortFunc(vm, 'orderProp', 'reverseSort');
  vm.upArrow = upArrow;
  vm.downArrow = downArrow;

  document.title = vm.title;
  
  projectsSvc.get()().query().$promise.then(gotProjects);  

  function gotProjects(projects) {
	 vm.projects = projects.filter(function(x) { return x.name.length > 0; });
    vm.ready = true;
  }

  function detachClicked(projectName, projectUrl) {
	 var dialog = $('#detachModal');
	 
	 vm.detachUrl = projectUrl;
	 vm.detachName = projectName;

	 dialog.modal('show');
  }

  function updateClicked() {
	 updateProjectSvc.query(vm.project.master_url)().query();
  }  
}
