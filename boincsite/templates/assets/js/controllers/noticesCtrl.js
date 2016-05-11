/**
 * Controller for the notices screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('NoticesCtrl', NoticesController);

NoticesController.$inject = ['noticesSvc'];

function NoticesController(noticesSvc) {

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
	 noticesSvc.get()().query().$promise.then(gotNotices, serviceError);
  }

  function gotNotices(notices) {
	 vm.notices = notices;
    vm.ready = true;
  }

  function serviceError() {
	 vm.ready = true;
	 vm.error = true;
  }
}
