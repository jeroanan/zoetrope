angular.module('zoetropeServices')
  .factory('hostInfoSvc', HostInfoService);

HostInfoService.$inject = ['jsonSvc'];

function HostInfoService(jsonSvc) {
  return jsonSvc.get('/static/json/host_info.json', '/host_info_json')  
}
