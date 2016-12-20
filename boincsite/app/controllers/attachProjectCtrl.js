/**
 * Controller for the Attach project screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('attachProjectCtrl', AttachProjectController);

AttachProjectController.$inject = ['projectSvc', 'md5Svc'];

function AttachProjectController(projectSvc, md5Svc) {

  var vm = this;
  vm.selectedProject = '';
  vm.emailaddress = '';
  vm.password = '';
  vm.submitClicked = submitClicked;
  vm.ready = false;
  vm.title = 'Attach Project';
  vm.errorText = '';
  vm.success = false;
  vm.loading = false;
  vm.selectedProjectChanged = selectedProjectChanged;
  
  projectSvc.getAvailableProjects2(gotProjects);  

  document.title = vm.title;

  function gotProjects(projects) {

    if (projects.length>0 && !loginCheck(projects[0])) return;
    vm.attachedProjects = projects.filter(function(x) { return x.name.length > 0; });
    vm.ready = true;
  }

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
	 
    projectSvc.attachProject2(vm.selectedProject, vm.emailaddress, password_hash, '', false, projectAttached);
  }

  function projectAttached(d) {

    if (!loginCheck(d)) return;
    vm.loading = false;
    vm.success = d.success;
    vm.errorText = d.error_message;
  }

  function loginCheck(xhr) {
    if (xhr.error_message && xhr.error_message===-1414) {
      document.location = '/#/login';
      return false;
    }
    return true;
  }

  function selectedProjectChanged() {
    vm.errorText = '';
  }
}
