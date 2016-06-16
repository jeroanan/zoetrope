/**
 * Controller for the login screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('loginCtrl', LoginController);

function LoginController() {
  var vm = this;

  vm.title = 'Login';

  document.title = vm.title;
}
