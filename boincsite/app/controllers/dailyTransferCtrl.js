/**
 * Controller for the Daily Transfer History screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('DailyTransferCtrl', DailyTransferController);

DailyTransferController.$inject = ['systemInfoSvc'];

function DailyTransferController(systemInfoSvc) {

  var vm = this;
  vm.daily_transfers = {};
  vm.totalUploaded = '';
  vm.totalDownloaded = '';
  vm.ready = false;
  vm.title = 'Daily Transfer History';
  vm.sortProp = 'when';
  vm.reverseSort = true;
  vm.sort = getSortFunc(vm, 'sortProp', 'reverseSort');
  vm.error = false;
  vm.load = load;
  
  document.title = vm.title;

  load();

  function load() {
    vm.ready = false;
    vm.error = false;
    systemInfoSvc.getDailyTransferHistory2(gotDailyTransfers, serviceError);
  }

  function gotDailyTransfers(dailyTransfers) {

    if (dailyTransfers.length > 0 && dailyTransfers[0].error_message && dailyTransfers[0].error_message===-1414) {
      document.location = '/#/login';
      return;
    }

    vm.daily_transfers = dailyTransfers.filter(function(transfer) {
      return transfer.when;
    }).map(function(transfer) {
      var dateSplit = transfer.when.split('-');
      var theDate = new Date(dateSplit[0], dateSplit[1]-1, dateSplit[2]);
      transfer.when = theDate;
      return transfer;		
    });

    function totalMegabytes(fieldName) {
      var megs = dailyTransfers.map(function(x) { return x[fieldName]; });
      var total = megs.reduce(function(a, b) { return a+b; });
      return Math.round(total * 100) / 100;
    }

    vm.totalUploaded = totalMegabytes('up') + 'MB';
    vm.totalDownloaded = totalMegabytes('down') + 'MB';
    vm.ready = true;
  }

  function serviceError() {
    vm.ready = true;
    vm.error = true;
  }
}
