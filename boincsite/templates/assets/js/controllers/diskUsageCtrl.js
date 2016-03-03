angular.module('zoetropeControllers')
  .controller('DiskUsageCtrl', DiskUsageController);

DiskUsageController.$inject = ['$http'];

function DiskUsageController($http) {

  var vm = this;

  $http.get('/disk_usage_json').success(function(data) {
    vm.disk_usages = data;
    vm.ready = true;
  });

  vm.orderProp = 'master_url';
  vm.reverseSort = false;
  vm.ready = false;
  vm.title = 'Disk Usage';
}
