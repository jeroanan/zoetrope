angular.module('zoetropeServices')
  .factory('dailyTransferHistorySvc', DailyTransferHistoryService);

DailyTransferHistoryService.$inject = ['$resource', 'jsonPathSvc'];

function DailyTransferHistoryService($resource, jsonPathSvc) {

  var path = jsonPathSvc.getPath('/static/json/daily_transfer_history.json', '/daily_transfer_history_json');

  return function() {
    var res = $resource(path, {}, {
      query: {method: 'GET', isArray: true}
    });

    return res;
  }
}
