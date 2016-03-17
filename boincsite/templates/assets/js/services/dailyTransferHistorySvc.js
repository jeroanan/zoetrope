angular.module('zoetropeServices')
  .factory('dailyTransferHistorySvc', DailyTransferHistoryService);

DailyTransferHistoryService.$inject = ['$http', '$resource'];

function DailyTransferHistoryService($http, $resource) {

  var offlineMode = window.location.hostname === 'localhost';

  if (offlineMode) {

  } else {

  }
}
