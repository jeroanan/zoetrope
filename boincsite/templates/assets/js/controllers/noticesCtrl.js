/**
 * Controller for the notices screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('NoticesCtrl', NoticesController);

NoticesController.$inject = ['noticesSvc']

function NoticesController(noticesSvc) {

  var vm = this;
  vm.notices = [];
  vm.title = 'Notices';
  vm.ready = false;
  document.title = vm.title;

  noticesSvc.get()().query().$promise.then(function(d) {
    vm.notices = d;
    vm.ready = true;
  });  
}
