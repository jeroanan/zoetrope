/**
 * Controller for the login screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('loginCtrl', LoginController);

LoginController.$inject = ['userSvc'];

function LoginController(userSvc) {
  var vm = this;

  vm.username = '';
  vm.password = '';
  vm.title = 'Login';

  vm.operationSuccess = false;
  vm.errorText = '';

  vm.loginClicked = loginClicked;

  document.title = vm.title;

  function loginClicked() {

	 vm.operationSuccess = false;
	 vm.operationSuccessMessage = '';
	 vm.errorText = '';

	 if (vm.username==='' || vm.password==='') {
	 	vm.operationSuccess = false;
	 	vm.errorText = 'Please enter a username and password';
	 	return;
	 }

	 userSvc.login(vm.username, vm.password)().query().$promise.then(loginSuccess, loginError);
  }

  function loginSuccess(data) {

	 if (!data.success) {
		vm.operationSuccess = false;
		vm.errorText = data.error_message;
		return;
	 }

	 vm.operationSuccess = true;
	 vm.operationSuccessMessage = 'Login successful';
  }

  function loginError(data) {
	 vm.operationSuccess = false;
	 vm.errorText = data.statusText;
  }
}
