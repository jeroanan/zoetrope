/**
 * Controller for the attached projects screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('ProjectsCtrl', ProjectsController);

ProjectsController.$inject = ['projectSvc'];

function ProjectsController(projectSvc) {

  var vm = this;
  vm.sortProp = 'name';
  vm.reverseSort = false;
  vm.ready = false;
  vm.showRawData = false;
  vm.title = "BOINC Projects";
  vm.detachClicked = detachClicked;
  vm.updateClicked = updateClicked;
  vm.detachUrl = '';
  vm.detachName = '';
  vm.sort = getSortFunc(vm, 'sortProp', 'reverseSort');
  vm.upArrow = upArrow;
  vm.downArrow = downArrow;
  vm.error = false;
  vm.load = load;
  
  document.title = vm.title;
  load();
  
  function load() {
	 vm.ready = false;
	 vm.error = false;
	 projectSvc.getAttachedProjects()().query().$promise.then(gotProjects, serviceError);
  }

  function gotProjects(projects) {
	 vm.projects = projects.filter(function(x) { return x.name.length > 0; });
    vm.ready = true;
  }

  function serviceError(xhr) {
	 vm.error = true;
	 vm.ready = true;
  }

  function detachClicked(projectName, projectUrl) {
	 var dialog = $('#detachModal');
	 
	 vm.detachUrl = projectUrl;
	 vm.detachName = projectName;

	 dialog.modal('show');
  }

  function updateClicked() {
	 projectSvc.updateProject.query(vm.project.master_url)().query();
  }  
}
