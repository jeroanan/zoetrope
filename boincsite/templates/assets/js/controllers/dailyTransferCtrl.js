angular.module('zoetropeControllers')
  .controller('DailyTransferCtrl', DailyTransferController);

DailyTransferController.$inject = ['$scope', '$http'];

function DailyTransferController($scope, $http) {
  $http.get('/daily_transfer_history_json').success(function(data) {

    for (var d in data) {
      var transfer = data[d];
      var dateSplit = transfer.date.split('-');
      var theDate = new Date(dateSplit[0], dateSplit[1]-1, dateSplit[2]);
      data[d].date = theDate;
    }


    var totalMegabytes = function(fieldName) {
      var megs = Array.map(data, function(x) { return x[fieldName]; });
      var total = Array.reduce(megs, function(a, b) { return a+b });
      return Math.round(total * 100) / 100;
    };

    $scope.daily_transfers = data;
    $scope.orderProp = 'date';
    $scope.reverseSort = true;
    $scope.totalUploaded = totalMegabytes('uploaded') + 'MB';
    $scope.totalDownloaded = totalMegabytes('downloaded') + 'MB';
    $scope.ready = true;
    $scope.title = 'Daily Transfer History';

  });
  $scope.ready = false;
}
