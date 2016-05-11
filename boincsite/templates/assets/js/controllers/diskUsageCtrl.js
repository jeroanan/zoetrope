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
  vm.upArrow = upArrow;
  vm.downArrow = downArrow;
  vm.error = false;
  vm.load = load;

  document.title = vm.title;

  load();

  function load() {
	 vm.ready = false;
	 vm.error = false;
	 diskUsageSvc.get()().query().$promise.then(gotDiskUsages, serviceError);
  }

  function gotDiskUsages(diskUsages) {
	 vm.disk_usages = diskUsages;
    vm.ready = true;
  }

  function serviceError() {
	 vm.ready = true;
	 vm.error = true;
  }
}
