var zoetrope = angular.module('zoetrope', [])

zoetrope.controller('DiskUsageCtrl', function($scope, $http) {
  $http.get('/disk_usage_json').success(function(data) {
    $scope.disk_usages = data;
  });
  $scope.orderProp = 'master_url';
  $scope.reverseSort = false;
});

zoetrope.controller('DailyTransferCtrl', function($scope, $http) {
  $http.get('/daily_transfer_history_json').success(function(data) {

    var dts = new Array()

    for (var d in data) {
      var transfer = data[d];

      var dateSplit = transfer.date.split('-');

      var theDate = new Date(dateSplit[0], dateSplit[1]-1, dateSplit[2]);

      var newObj = {
        'date': theDate,
        'uploaded': transfer.uploaded,
        'downloaded': transfer.downloaded
      };

      dts = dts.concat(newObj);
    }
    $scope.daily_transfers = dts;
    $scope.orderProp = 'date';
    $scope.reverseSort = true;
  });
});
