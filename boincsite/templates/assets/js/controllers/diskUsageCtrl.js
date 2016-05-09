/**
 * Controller for the Disk Usage screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('DiskUsageCtrl', DiskUsageController);

DiskUsageController.$inject = ['diskUsageSvc'];

function DiskUsageController(diskUsageSvc) {

  var vm = this;
  vm.orderProp = 'master_url';
  vm.reverseSort = false;
  vm.ready = false;
  vm.title = 'Disk Usage';
  vm.disk_usages = {};
  vm.sort = getSortFunc(vm, 'orderProp', 'reverseSort');
  
  document.title = vm.title;

  diskUsageSvc.get()().query().$promise.then(gotDiskUsages);

  function gotDiskUsages(diskUsages) {
	 vm.disk_usages = diskUsages;
    vm.ready = true;
  }
}
