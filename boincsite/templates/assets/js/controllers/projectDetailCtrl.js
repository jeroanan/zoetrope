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

  function attachClicked() {
	 $('#attachModal').modal('show');
  }

  function setTitle(title) {
    vm.title = title;
    document.title = vm.title;
  }  

  allProjectListSvc.get()().query().$promise.then(function(d) {
	 	 
    vm.project = d.filter(function(x) { return x.name===$routeParams.projectname })[0];

	 projectsSvc.get()().query().$promise.then(function(e) {
		var attachedProject = e.filter(function(x) { return x.name==vm.project.name });
		vm.project.attached = attachedProject.length > 0;
	 });

    setTitle('Project Details -- ' + vm.project.name);
    vm.ready = true;
  });

  setTitle('Project Details');
}
