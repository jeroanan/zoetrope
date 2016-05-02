/**
 * Controller for the misc config screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('miscConfigCtrl', MiscConfigController);

MiscConfigController.$inject = ['messagesSvc', 'endpointSvc'];

function MiscConfigController(messagesSvc, endpointSvc) {

  var vm = this;  

  vm.ready = true;
  vm.title = 'Misc Config';
  document.title = vm.title;  
  vm.submitClicked = submitClicked;

  vm.endpoint = endpointSvc.get();
  
  function submitClicked() {
	 endpointSvc.set(vm.endpoint);
  }
}
