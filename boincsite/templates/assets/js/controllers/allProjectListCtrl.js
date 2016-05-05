/**
 * Controller for the All Projects list screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('allProjectListCtrl', AllProjectListController);

AllProjectListController.$inject = ['allProjectListSvc', 'projectsSvc']

function AllProjectListController(allProjectListSvc, projectsSvc) {

  var vm = this;

  vm.ready  = false;
  vm.title = 'All Projects';
  vm.sortProp = 'name';
  vm.reverseSort = false;
  vm.availableProjects = null;
  vm.doSort = getSortFunc('name');

  document.title = vm.title;

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

  allProjectListSvc.get()().query().$promise.then(function(d) {

	 projectsSvc.get()().query().$promise.then(function(e) {
		vm.ready = true;

		vm.availableProjects = d.map(function(x) {
		  var thisProject = e.filter(function(y) {
			 return y.name==x.name;
		  });

		  x.attached = thisProject.length>0;
		  return x;
		});
	 });    
  })
}
