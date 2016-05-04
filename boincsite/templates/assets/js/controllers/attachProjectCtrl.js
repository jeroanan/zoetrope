/**
 * Controller for the Attach project screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('attachProjectCtrl', AttachProjectController);

AttachProjectController.$inject = ['attachProjectSvc', 'allProjectListSvc', 'md5Svc'];

function AttachProjectController(attachProjectSvc, allProjectListSvc, md5Svc) {

  var vm = this;
  vm.selectedProject = ''
  vm.emailaddress = ''
  vm.password = ''
  vm.submitClicked = submitClicked;
  vm.ready = false;
  vm.title = 'Attach Project';
  vm.errorText = '';
  vm.success = false;
  vm.loading = false;
  
  function submitClicked() {

	 vm.success = false;
	 vm.errorText = '';

	 if (vm.selectedProject==='' || vm.emailaddress==='' || vm.password==='') {
		vm.success = false;
		vm.errorText = 'Please enter an email address, password and select a project to attach to.';
		return;
	 }

    var hash_in = vm.password + vm.emailaddress;
	 var password_hash = md5Svc.query(hash_in)();
	 vm.loading = true;
	 
    attachProjectSvc.query(vm.selectedProject, vm.emailaddress, password_hash)().query().$promise.then(function(d) {
		vm.loading = false;
		vm.success = d.success;
		vm.errorText = d.error_message;
	 });
  }

  allProjectListSvc.get()().query().$promise.then(function(d) {
    vm.attachedProjects = d.filter(function(x) { return x.name.length > 0 });
    vm.ready = true;
  });  

  document.title = vm.title;
}
