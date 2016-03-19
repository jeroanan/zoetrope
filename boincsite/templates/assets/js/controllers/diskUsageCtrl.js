angular.module('zoetropeControllers')
  .controller('DiskUsageCtrl', DiskUsageController);

DiskUsageController.$inject = ['diskUsageSvc'];

function DiskUsageController(diskUsageSvc) {

  var vm = this;

  diskUsageSvc().query().$promise.then(function(d) {
    vm.disk_usages = d;
    vm.ready = true;
  })

  vm.orderProp = 'master_url';
  vm.reverseSort = false;
  vm.ready = false;
  vm.title = 'Disk Usage';
}
