/**
 * Service to get the platform name.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeServices')
  .factory('getPlatformSvc', GetPlatformService);

GetPlatformService.$inject = ['jsonSvc'];

function GetPlatformService(jsonSvc) {

  function getPlatform(projectUrl) {

	 return jsonSvc.getJson('/get_platform_json', false);
  }
  
  var svc = {	 
	 get: getPlatform
  };

  return svc;
}
