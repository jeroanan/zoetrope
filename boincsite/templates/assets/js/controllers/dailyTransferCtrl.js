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
  vm.orderProp = 'date';
  vm.reverseSort = true;
  vm.sort = getSortFunc(vm, 'orderProp', 'reverseSort');
  vm.upArrow = upArrow;
  vm.downArrow = downArrow;
  vm.error = false;
  vm.load = load;
  
  document.title = vm.title;

  load();

  function load() {
	 vm.ready = false;
	 vm.error = false;
	 systemInfoSvc.getDailyTransferHistory()().query().$promise.then(gotDailyTransfers, serviceError);
  }

  function gotDailyTransfers(dailyTransfers) {
	 vm.daily_transfers = dailyTransfers.filter(function(transfer) {
		return transfer.date;
	 }).map(function(transfer) {
		var dateSplit = transfer.date.split('-');
      var theDate = new Date(dateSplit[0], dateSplit[1]-1, dateSplit[2]);
      transfer.date = theDate;
		return transfer;		
	 });

    function totalMegabytes(fieldName) {
      var megs = dailyTransfers.map(function(x) { return x[fieldName]; });
      var total = megs.reduce(function(a, b) { return a+b; });
      return Math.round(total * 100) / 100;
    }

    vm.totalUploaded = totalMegabytes('uploaded') + 'MB';
    vm.totalDownloaded = totalMegabytes('downloaded') + 'MB';
    vm.ready = true;
  }

  function serviceError() {
	 vm.ready = true;
	 vm.error = true;
  }
}
