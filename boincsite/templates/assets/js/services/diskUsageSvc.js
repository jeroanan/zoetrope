/**
 * Service to get the main contents of the Disk Usage screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeServices')
  .factory('diskUsageSvc', DiskUsageService);

DiskUsageService.$inject = ['jsonSvc'];

function DiskUsageService(jsonSvc) {
  return jsonSvc.get('/static/json/disk_usage.json', '/disk_usage_json');
}
