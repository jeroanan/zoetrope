/**
 * Controller for the Attach project screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('attachProjectCtrl', AttachProjectController);

AttachProjectController.$inject = ['attachProjectSvc'];

function AttachProjectController(attachProjectSvc) {

  var vm = this;
  vm.projecturl = ''
  vm.emailaddress = ''
  vm.password = ''
  vm.submitClicked = submitClicked;

  function submitClicked() {
    var hash_in = vm.password + vm.emailaddress;
    var password_hash = hex_md5(hash_in);
    attachProjectSvc.query(vm.projecturl, vm.emailaddress, password_hash)().query();
  }



  vm.title = 'Attach Project';
  document.title = vm.title;
}
