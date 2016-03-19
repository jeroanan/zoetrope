angular.module('zoetropeServices')
  .factory('diskUsageSvc', DiskUsageService);

DiskUsageService.$inject = ['$resource', 'jsonPathSvc'];

function DiskUsageService($resource, jsonPathSvc) {

  var path = jsonPathSvc.getPath('/static/json/disk_usage.json', '/disk_usage_json');

  return function() {
    var res = $resource(path, {}, {
      query: {method: 'GET', isArray: false}
    });

    return res;
  }
}
