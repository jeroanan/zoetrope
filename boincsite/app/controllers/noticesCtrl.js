/**
 * Controller for the notices screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('NoticesCtrl', NoticesController);

NoticesController.$inject = ['systemInfoSvc'];

function NoticesController(systemInfoSvc) {

  var vm = this;
  vm.notices = [];
  vm.title = 'Notices';
  vm.ready = false;
  document.title = vm.title;
  vm.error = false;
  vm.load = load;
  
  load();

  function load() {
    vm.ready = false;
    vm.error = false;
    systemInfoSvc.getNotices(gotNotices, serviceError);
  }

  function gotNotices(notices) {

    if (notices.length > 0 && notices[0].error_message && notices[0].error_message===-1414) {
      document.location = '/#/login';
      return;
    }
	 
    vm.notices = notices;
    vm.ready = true;
  }

  function serviceError() {
    vm.ready = true;
    vm.error = true;
  }
}
