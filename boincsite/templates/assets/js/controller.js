var zoetrope = angular.module('zoetrope', [])

zoetrope.controller('DiskUsageCtrl', function($scope, $http) {
  $http.get('/disk_usage_json').success(function(data) {
    $scope.disk_usages = data;
  });
  $scope.orderProp = "master_url";
  //$scope.reverseSort = false;
});
