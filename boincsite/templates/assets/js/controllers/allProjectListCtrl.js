/**
 * Controller for the All Projects list screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('allProjectListCtrl', AllProjectListController);

AllProjectListController.$inject = ['projectSvc', 'systemInfoSvc'];

function AllProjectListController(projectSvc, systemInfoSvc) {

  var vm = this;

  vm.ready  = false;
  vm.title = 'All Projects';
  vm.sortProp = 'name';
  vm.reverseSort = false;
  vm.availableProjects = null;
  vm.sort = getSortFunc(vm, 'sortProp', 'reverseSort');
  vm.allProjects = [];
  vm.load = load;
  
  document.title = vm.title;

  load();

  function load() {
	 vm.ready = false;
	 vm.error = false;
	 projectSvc.getAvailableProjects()().query().$promise.then(gotAllProjects, serviceError);
  }

  function gotAllProjects(projects) {
	 vm.allProjects = projects;
	 projectSvc.getAttachedProjects()().query().$promise.then(gotAttachedProjects, serviceError);
	 systemInfoSvc.getPlatform()().query().$promise.then(gotPlatform, serviceError);
  }

  function serviceError() {
	 vm.ready = true;
	 vm.error = true;
  }  

  function gotAttachedProjects(projects) {
	 vm.ready = true;
	 
	 vm.availableProjects = vm.allProjects.map(function(x) {
		var thisProject = projects.filter(function(y) {
		  return y.name==x.name;
		});
		
		x.attached = thisProject.length>0;
		return x;
	 });
  }

  function gotPlatform(platform) {
	 var thisPlatform = platform.platform;

	 vm.allProjects = vm.allProjects.map(function(x) {
		var supportedPlatform = x.platforms.filter(function(y) {
		  return y.name===thisPlatform;		
		});

		x.supported = supportedPlatform.length > 0;

		return x;
	 });
  }  
}
