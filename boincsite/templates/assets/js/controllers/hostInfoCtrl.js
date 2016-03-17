angular.module('zoetropeControllers')
  .controller('HostInfoCtrl', HostInfoController);

HostInfoController.$inject = ['$http']

function HostInfoController($http) {

  vm = this;

  $http.get('/host_info_json').success(function(data) {
    vm.host_info = data;
    vm.ready = true;
  });

  vm.ready = false;
  vm.title = 'Host Info';
}
