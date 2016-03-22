/**
 * Service to get the main contents of the Host Info screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeServices')
  .factory('hostInfoSvc', HostInfoService);

HostInfoService.$inject = ['jsonSvc'];

function HostInfoService(jsonSvc) {
  return jsonSvc.get('/static/json/host_info.json', '/host_info_json')
}
