/**
 * Controller for the Manage Users screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('manageUsersCtrl', ManageUsersController);

function ManageUsersController() {
  var vm = this;
  
  vm.title = 'Manage Users';
}
