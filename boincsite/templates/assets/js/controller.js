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
      data[d].date = theDate;
    }

    $scope.daily_transfers = data;
    $scope.orderProp = 'date';
    $scope.reverseSort = true;

    var totalMegabytes = function(fieldName) {
      var megs = Array.map(data, function(x) { return x[fieldName]; });
      var total = Array.reduce(megs, function(a, b) { return a+b });
      return Math.round(total * 100) / 100;
    };

    //var uploads = Array.map(data, function(x) { return x['uploaded']; });
    $scope.totalUploaded = totalMegabytes('uploaded') + 'MB';
    $scope.totalDownloaded = totalMegabytes('downloaded') + 'MB';

  });
});
