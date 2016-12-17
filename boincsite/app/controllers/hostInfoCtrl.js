/**
 * Controller for the Host Info screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('HostInfoCtrl', HostInfoController);

HostInfoController.$inject = ['systemInfoSvc'];

function HostInfoController(systemInfoSvc) {

  vm = this;
  vm.ready = false;
  vm.title = 'Host Info';
  vm.host_info = {};
  vm.error = false;
  vm.load = load;

  document.title = vm.title;

  load();

  function load() {
	 vm.ready = false;
	 vm.error = false;
	 systemInfoSvc.getHostInfo()().query().$promise.then(gotHostInfo, serviceError);
  }

  function gotHostInfo(hostInfo) {

	 if (hostInfo.error_message && hostInfo.error_message===-1414) {
		document.location = '/#/login';
		return;
	 }
	 
	 hostInfo.uptime = hostInfo.uptime.split('.')[0];
	 vm.host_info = hostInfo;
    vm.ready = true;
  }

  function serviceError() {
	 vm.ready = true;
	 vm.error = true;
  }
}
