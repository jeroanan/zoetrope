angular.module('zoetropeServices')
  .factory('diskUsageSvc', DiskUsageService);

DiskUsageService.$inject = ['jsonSvc'];

function DiskUsageService(jsonSvc) {
  return jsonSvc.get('/static/json/disk_usage.json', '/disk_usage_json');
}
