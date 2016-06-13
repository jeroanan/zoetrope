/**
 * Controller for the Add User screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('addUserCtrl', addUserController);

addUserController.$inject = ['userSvc'];

function addUserController(userSvc) {
  var vm = this;
  
  vm.title = 'Add User';
  vm.ready = true;
  vm.errorText = '';
  vm.success = true;
  
  vm.userId = '';
  vm.password = '';

  vm.submitClicked = submitClicked;
  
  function submitClicked() {
	 vm.errorText = '';
	 vm.success = true;
	 
    if (vm.userId==='' || vm.password==='') {
		vm.success = false;
		vm.errorText = 'Please enter a username and a password';
	 }

	 userSvc.addUser(vm.userId, vm.password)().query().$promise.then(
		function() {

		},
		function(d) {
		  vm.success = false;
		  vm.errorText = d.statusText;
		});	 
  }
}
