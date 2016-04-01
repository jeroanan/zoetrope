/**
 * Controller for the Attach project screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('attachProjectCtrl', AttachProjectController);

AttachProjectController.$inject = ['attachProjectSvc', 'allProjectListSvc'];

function AttachProjectController(attachProjectSvc, allProjectListSvc) {

  var vm = this;
  vm.selectedProject = ''
  vm.emailaddress = ''
  vm.password = ''
  vm.submitClicked = submitClicked;
  vm.ready = false;

  function submitClicked() {
    var hash_in = vm.password + vm.emailaddress;
    var password_hash = hex_md5(hash_in);
    attachProjectSvc.query(vm.selectedProject, vm.emailaddress, password_hash)().query();
  }

  allProjectListSvc.get()().query().$promise.then(function(d) {
    vm.attachedProjects = d.filter(function(x) { return x.name.length > 0 });
    vm.ready = true;
  });

  vm.title = 'Attach Project';
  document.title = vm.title;
}
