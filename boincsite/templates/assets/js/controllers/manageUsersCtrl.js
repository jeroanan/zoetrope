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
  vm.userToDelete = null;  
  
  vm.deleteClicked = deleteClicked;
  vm.doDelete = doDelete;

  userSvc.getUsers()().query().$promise.then(gotUsers);

  function gotUsers(users) {
	 vm.users = users;
	 vm.ready = true;
  }

  function deleteClicked(user, rownumber) {
	 vm.userToDelete = {
		userId: user.user_id,
		userNo: user.user_no,
		rowNo: rownumber
	 };
	 
	 $('#deleteUserModal').modal('show');	 
  }

  function doDelete() {
	 console.log('*BANG!*');
	 $('#deleteUserModal').modal('hide');	 
  }
}
