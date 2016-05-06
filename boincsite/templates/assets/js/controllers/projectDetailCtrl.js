/**
 * Controller for the Project detail screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('projectDetailCrl', ProjectDetailController);

ProjectDetailController.$inject = ['$routeParams', 'allProjectListSvc', 'projectsSvc'];

function ProjectDetailController($routeParams, allProjectListSvc, projectsSvc) {
  var vm = this;

  vm.ready = false;
  vm.project = {};
  vm.attachClicked = attachClicked;
  vm.detachClicked = detachClicked;
  vm.projectFound = false;
  
  function attachClicked() {
	 $('#attachModal').modal('show');
  }

  function detachClicked() {
	 $('#detachModal').modal('show');
  }

  function setTitle(title) {
    vm.title = title;
    document.title = vm.title;
  }  

  function gotAttachedProjects(projects) {
	 var attachedProject = projects.filter(function(x) { return x.name==vm.project.name });
	 vm.project.attached = attachedProject.length > 0;
  }

  function gotAllProjects(projects) {
	 vm.project = projects.filter(function(x) { return x.name===$routeParams.projectname })[0];

	 if (!vm.project) {
		vm.projectFound = false;
		vm.ready = true;
		return;
	 }

	 projectsSvc.get()().query().$promise.then(gotAttachedProjects);

    setTitle('Project Details -- ' + vm.project.name);
	 vm.projectFound = true;
    vm.ready = true;
  }

  allProjectListSvc.get()().query().$promise.then(gotAllProjects);

  setTitle('Project Details');
}
