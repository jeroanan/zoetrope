/**
 * Controller for the Manage Users screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('manageUsersCtrl', ManageUsersController);

ManageUsersController.$inject = ['userSvc'];

function ManageUsersController(userSvc) {
  var vm = this;

  vm.title = 'Manage Users';
  vm.ready = false;

  vm.sortProp = 'user_id';
  vm.reverseSort = false;
  vm.sort = getSortFunc(vm, 'sortProp', 'reverseSort');  

  vm.users = [];
  vm.userOperationUser = null;  

  vm.operationSuccess = false;
  vm.operationSuccessMessage = '';
  vm.errorText = '';
  
  vm.deleteClicked = deleteClicked;
  vm.addUserClicked = addUserClicked;
  vm.changePasswordClicked = changePasswordClicked;

  vm.doDelete = doDelete;
  vm.load = load;
  
  document.title = vm.title;

  load();
  
  function load() {
    userSvc.getUsers(gotUsers);
  }

  function gotUsers(users) {

    if (users.length>0 && users[0].error_message && users[0].error_message===-1414) {
      document.location = '/#/login';
      return;
    }
	 
    vm.users = users;
    vm.ready = true;
  }

  function deleteClicked(user, rownumber) {
    vm.userOperationUser = {
      userId: user.user_id,
      userNo: user.user_no,
      rowNo: rownumber
    };
	 
    $('#deleteUserModal').modal('show');	 
  }

  function doDelete() {
    vm.operationSuccess = false;
    vm.operationSuccessMessage = '';

    $('#deleteUserModal').modal('hide');
    userSvc.deleteUser(vm.userOperationUser, userDeleted);
  }

  function userDeleted(d) {

    if (!d.success && d.error_message) {
      vm.operationSuccess = false;
      vm.errorText = d.error_message;
      return;
    }

    var messageSplit = d.error_message.split('|');
    var userId = messageSplit[1];
    var rowNum = messageSplit[2];
	 
    vm.operationSuccess = true;
    vm.operationSuccessMessage = 'User ' + userId + ' deleted successfully';
    $('#userRow-' + rowNum).parents('tr').hide();
  }

  function addUserClicked() {
    $('#addUserModal').modal('show');
  }

  function changePasswordClicked(user, rowNumber) {
    vm.userOperationUser = {
      userId: user.user_id,
      userNo: user.user_no,
      rowNo: rowNumber
    };

    $('#changePasswordModal').modal('show');	 
  }
}
