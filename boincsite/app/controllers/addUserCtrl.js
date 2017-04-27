/**
 * Controller for the Add User screen.
 *
 * (c) David Wilson 2016, 2017, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('addUserCtrl', addUserController);

addUserController.$inject = ['userSvc', 'zoetropeSvc'];

function addUserController(userSvc, zoetropeSvc) {
  var vm = this;
  
  vm.title = 'Add User';
  vm.ready = true;
  vm.errorText = '';
  vm.operationSuccess = null;
  vm.operationSuccessMessage = 'User added successfully';
  
  vm.userId = '';
  vm.password = '';
  vm.confirmPassword = '';

  vm.submitClicked = submitClicked;

  document.title = vm.title;

  load();
  
  function load() {
    function gotStatus(xhr) {
      if(!xhr.logged_in)
        document.location = '/#/login';
    }

    function gotStatusError(xhr) {
      document.location = '/#/login';
    }

    zoetropeSvc.getStatus(gotStatus, gotStatusError);
  }

  function submitClicked() {
    vm.errorText = '';
    vm.operationSuccess = null;

    if (vm.userId==='' || vm.password==='') {
      vm.operationSuccess = false;
      vm.errorText = 'Please enter a username and a password';
      return;
    }

    if (vm.userId.contains('|')) {
      vm.operationSuccess = false;
      vm.errorText = 'User names cannot contain the pipe (|) characer';
      return;
    }

    if (vm.password!==vm.confirmPassword) {
      vm.operationSuccess = false;
      vm.errorText = 'Password and Confirm Password must match.';
      return;
    }

    userSvc.addUser(vm.userId, vm.password,
      function(d) {
        if (!d.success && d.error_message) {
          vm.operationSuccess = false;
          vm.errorText = d.error_message;
          return;
        }
        vm.operationSuccess = true;
      },
      function(d) {
        vm.operationSuccess = false;
        vm.errorText = d.statusText;
      });	 
  }
}
