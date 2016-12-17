/**
 * Controller for the Disk Usage screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('DiskUsageCtrl', DiskUsageController);

DiskUsageController.$inject = ['systemInfoSvc'];

function DiskUsageController(systemInfoSvc) {

  var vm = this;
  vm.sortProp = 'master_url';
  vm.reverseSort = false;
  vm.ready = false;
  vm.title = 'Disk Usage';
  vm.disk_usages = {};
  vm.sort = getSortFunc(vm, 'sortProp', 'reverseSort');
  vm.error = false;
  vm.load = load;

  document.title = vm.title;

  load();

  function load() {
	 vm.ready = false;
	 vm.error = false;
	 systemInfoSvc.getDiskUsage()().query().$promise.then(gotDiskUsages, serviceError);
  }

  function gotDiskUsages(diskUsages) {

	 if (diskUsages.error_message && diskUsages.error_message===-1414) {
		document.location = '/#/login';
		return;
	 }
	 
	 vm.disk_usages = diskUsages;
    vm.ready = true;
  }

  function serviceError() {
	 vm.ready = true;
	 vm.error = true;
  }
}
