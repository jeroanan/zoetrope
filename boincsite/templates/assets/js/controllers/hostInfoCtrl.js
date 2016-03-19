angular.module('zoetropeControllers')
  .controller('HostInfoCtrl', HostInfoController);

HostInfoController.$inject = ['hostInfoSvc']

function HostInfoController(hostInfoSvc) {

  vm = this;

  hostInfoSvc().query().$promise.then(function(d) {
    vm.host_info = d;
    vm.ready = true;
  })

  vm.ready = false;
  vm.title = 'Host Info';
}
