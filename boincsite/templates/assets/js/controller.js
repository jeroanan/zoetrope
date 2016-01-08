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

zoetrope.controller('MessagesCtrl', function($scope, $http) {

    $http.get('/messages_json').success(function(data) {
        $scope.messages = data;

        var project_names = Array.map(data, function(x) { return x.project_name});
        $scope.unique_project_names = Array.filter(project_names, function(el,i,a) {
          return i==a.indexOf(el);
        });

        var count_project_name = function(pn) {
          var project_name_array = Array.filter(project_names, function(el) { return el == pn; });
          return project_name_array.length;
        };

        var tmp_name_counts = new Object();
        for (upn in $scope.unique_project_names) {
          var pn = $scope.unique_project_names[upn];
          tmp_name_counts[pn] = count_project_name(pn);
        }

        $scope.project_name_counts = tmp_name_counts;
    });

    $scope.get_project_name = function(pn) {
      return pn === '' ? '(no project)' : pn;
    };

    $scope.orderProp = 'message_number';
    $scope.reverseSort = true;
    $scope.filterProp = '';
});
