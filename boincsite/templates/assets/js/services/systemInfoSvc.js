/**
 * Service to get various information about the connected BOINC client
 * and the computer that it is running on.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeServices')
  .factory('systemInfoSvc', SystemInfoService);


SystemInfoService.$inject = ['jsonSvc'];

function SystemInfoService(jsonSvc) {

  var svc = {
	 getDiskUsage: getDiskUsage,
	 getDailyTransferHistory: getDailyTransferHistory,
	 getGlobalPreferences: getGlobalPreferences,
	 getHostInfo: getHostInfo
  };

  /**
	* Get project-by-project disk usage and disk size/disk free details.
	*/
  function getDiskUsage() {
	 return jsonSvc.get('/static/json/disk_usage.json', '/disk_usage_json');
  }

  /**
	* Get upload/download figures for each day as well as total upload/download.
	*/
  function getDailyTransferHistory() {
	 return jsonSvc.get('/static/json/daily_transfer_history.json', '/daily_transfer_history_json', true);
  }

  /**
	* Get BOINC global preferences.
	*/
  function getGlobalPreferences() {
	 return jsonSvc.get('', '/get_global_preferences_json', false);
  }

  /**
	* Get information about the BOINC client and the computer it is running on.
	*/
  function getHostInfo() {
	 return jsonSvc.get('/static/json/host_info.json', '/host_info_json');
  }

  return svc;
}
