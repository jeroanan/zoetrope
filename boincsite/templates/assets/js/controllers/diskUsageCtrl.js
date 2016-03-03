angular.module('zoetropeControllers')
  .controller('DiskUsageCtrl', DiskUsageController);
 
DiskUsageController.$inject = ['$scope', '$http'];

function DiskUsageController($scope, $http) {
  $http.get('/disk_usage_json').success(function(data) {
    $scope.disk_usages = data;
    $scope.ready = true;
  });

  $scope.orderProp = 'master_url';
  $scope.reverseSort = false;
  $scope.ready = false;
  $scope.title = 'Disk Usage';
}
