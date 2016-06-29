/**
 * Controller for the Project detail screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('projectDetailCrl', ProjectDetailController);

ProjectDetailController.$inject = ['$routeParams', 'projectSvc', 'systemInfoSvc'];

function ProjectDetailController($routeParams, projectSvc, systemInfoSvc) {
  var vm = this;

  vm.ready = false;
  vm.project = {};
  vm.attachClicked = attachClicked;
  vm.detachClicked = detachClicked;
  vm.projectFound = false;
  vm.error = false;
  vm.load = load;
  vm.gotPlatform = false;
  
  setTitle('Project Details');

  load();

  function load() {
	 vm.ready = false;
	 vm.error = false;
	 projectSvc.getAvailableProjects()().query().$promise.then(gotAllProjects, serviceError);
  }

  function gotAllProjects(projects) {
	 
	 if (projects.length>0 && projects[0].error_message && projects[0].error_message===-1414) {
		document.location = '/#/login';
		return;
	 }
	 
	 vm.project = projects.filter(function(x) { return x.name===$routeParams.projectname; })[0];

	 if (!vm.project) {
		vm.projectFound = false;
		vm.ready = true;
		return;
	 }

	 projectSvc.getAttachedProjects()().query().$promise.then(gotAttachedProjects, serviceError);
	 systemInfoSvc.getPlatform()().query().$promise.then(gotPlatform, serviceError);

    setTitle('Project Details -- ' + vm.project.name);
	 vm.projectFound = true;
    vm.ready = true;
  }

  function serviceError() {
	 vm.ready = true;
	 vm.error = true;
  }

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
	 var attachedProject = projects.filter(function(x) { return x.project_name===vm.project.name; });
	 vm.project.attached = attachedProject.length > 0;
  }

  function gotPlatform(platform) {
	 var supportedPlatform = vm.project.platforms.filter(function(x) {
		return x.name===platform.platform;
	 });

	 vm.project.platformSupported = supportedPlatform.length>0;
	 vm.gotPlatform = true;

	 var supportedPlatformListItems = $('#supportedPlatforms').children('li:contains(' + platform.platform + ')');

	 for (var i=0;i<supportedPlatformListItems.length;i++) {
		var platformItem = $(supportedPlatformListItems[i]);
		platformItem.addClass('text-success');
		platformItem.text(platformItem.text() + ' ✔');
	 }
  }
}
