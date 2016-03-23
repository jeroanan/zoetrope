/**
 * Controller for the Host Info screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('HostInfoCtrl', HostInfoController);

HostInfoController.$inject = ['hostInfoSvc']

function HostInfoController(hostInfoSvc) {

  vm = this;

  hostInfoSvc.get()().query().$promise.then(function(d) {
    vm.host_info = d;
    vm.ready = true;
  })

  vm.ready = false;
  vm.title = 'Host Info';
  document.title = vm.title;
}
