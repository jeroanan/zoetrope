/**
 * Controller for the attached projects screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('ProjectsCtrl', ProjectsController);

ProjectsController.$inject = ['projectsSvc'];

function ProjectsController(projectsSvc) {

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

  function detachClicked(projectName, projectUrl) {
	 var dialog = $('#dDialog');
	 
	 vm.detachUrl = projectUrl;
	 vm.detachName = projectName;

	 //dialog.modal('show');
  }

  function updateClicked() {

  }

  document.title = vm.title;
  
  projectsSvc.get()().query().$promise.then(function(d) {
    vm.projects = d.filter(function(x) { return x.name.length > 0 });
    vm.ready = true;
  })  
}
