angular.module('zoetropeServices')
  .factory('dailyTransferHistorySvc', DailyTransferHistoryService);

DailyTransferHistoryService.$inject = ['jsonSvc'];

function DailyTransferHistoryService(jsonSvc) {
  return jsonSvc.get('/static/json/daily_transfer_history.json', '/daily_transfer_history_json', true);
}
