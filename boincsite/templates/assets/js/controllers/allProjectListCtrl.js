/**
 * Controller for the All Projects list screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('allProjectListCtrl', AllProjectListController);

AllProjectListController.$inject = ['allProjectListSvc', 'projectsSvc', 'getPlatformSvc'];

function AllProjectListController(allProjectListSvc, projectsSvc, getPlatformSvc) {

  var vm = this;

  vm.ready  = false;
  vm.title = 'All Projects';
  vm.sortProp = 'name';
  vm.reverseSort = false;
  vm.availableProjects = null;
  vm.doSort = getSortFunc(vm, 'sortProp', 'reverseSort');
  vm.allProjects = [];
  vm.upArrow = upArrow;
  vm.downArrow = downArrow;
  
  document.title = vm.title;

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

  function gotAllProjects(projects) {
	 vm.allProjects = projects;
	 projectsSvc.get()().query().$promise.then(gotAttachedProjects);
	 getPlatformSvc.get()().query().$promise.then(gotPlatform);
  }
  
  allProjectListSvc.get()().query().$promise.then(gotAllProjects);
}
