angular.module('zoetropeServices')
  .factory('hostInfoSvc', HostInfoService);

HostInfoService.$inject = ['$resource', 'jsonPathSvc'];

function HostInfoService($resource, jsonPathSvc) {
  var path = jsonPathSvc.getPath('/static/json/host_info.json', '/host_info_json');

  return function() {
    var res = $resource(path, {}, {
      query: {method: 'GET', isArray: false}
    });

    return res;
  }
}
