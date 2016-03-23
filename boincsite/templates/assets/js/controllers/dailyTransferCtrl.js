/**
 * Controller for the Daily Transfer History screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('DailyTransferCtrl', DailyTransferController);

DailyTransferController.$inject = ['dailyTransferHistorySvc'];

function DailyTransferController(dailyTransferHistorySvc) {

  var vm = this;
  dailyTransferHistorySvc.get()().query().$promise.then(function(data) {
    for (var d in data) {
      var transfer = data[d];

      if (!transfer.date) {
        continue;
      }

      var dateSplit = transfer.date.split('-');
      var theDate = new Date(dateSplit[0], dateSplit[1]-1, dateSplit[2]);
      data[d].date = theDate;
    }


    var totalMegabytes = function(fieldName) {
      var megs = Array.map(data, function(x) { return x[fieldName]; });
      var total = Array.reduce(megs, function(a, b) { return a+b });
      return Math.round(total * 100) / 100;
    };

    vm.daily_transfers = data;
    vm.orderProp = 'date';
    vm.reverseSort = true;
    vm.totalUploaded = totalMegabytes('uploaded') + 'MB';
    vm.totalDownloaded = totalMegabytes('downloaded') + 'MB';
    vm.ready = true;
    vm.title = 'Daily Transfer History';
    document.title = vm.title;
  })

  vm.ready = false;
}
