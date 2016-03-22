/**
 * Service to get the main contents of the Daily Transfer History screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeServices')
  .factory('dailyTransferHistorySvc', DailyTransferHistoryService);

DailyTransferHistoryService.$inject = ['jsonSvc'];

function DailyTransferHistoryService(jsonSvc) {
  return jsonSvc.get('/static/json/daily_transfer_history.json', '/daily_transfer_history_json', true);
}
