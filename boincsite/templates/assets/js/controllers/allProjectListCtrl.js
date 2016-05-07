/**
 * Controller for the All Projects list screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('allProjectListCtrl', AllProjectListController);

AllProjectListController.$inject = ['allProjectListSvc', 'projectsSvc'];

function AllProjectListController(allProjectListSvc, projectsSvc) {

  var vm = this;

  vm.ready  = false;
  vm.title = 'All Projects';
  vm.sortProp = 'name';
  vm.reverseSort = false;
  vm.availableProjects = null;
  vm.doSort = getSortFunc('name');
  vm.allProjects = [];
  
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
  
  function gotAllProjects(projects) {
	 vm.allProjects = projects;
	 projectsSvc.get()().query().$promise.then(gotAttachedProjects);    
  }
  
  function getSortFunc(defaultSortField) {
    var currentSortField = defaultSortField;

    function doSort(sortField) {
      if (sortField==currentSortField) {
        vm.reverseSort = !vm.reverseSort;
        return;
      }
      currentSortField = sortField;
      vm.sortProp = sortField;
      vm.reverseSort = false;
    }
    return doSort;
  }

  allProjectListSvc.get()().query().$promise.then(gotAllProjects);
}
