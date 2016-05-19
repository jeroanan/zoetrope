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
	 return jsonSvc.getJson('/disk_usage_json', false);
  }

  /**
	* Get upload/download figures for each day as well as total upload/download.
	*/
  function getDailyTransferHistory() {
	 return jsonSvc.getJson('/daily_transfer_history_json', true);
  }

  /**
	* Get BOINC global preferences.
	*/
  function getGlobalPreferences() {
	 return jsonSvc.getJson('/get_global_preferences_json', false);
  }

  /**
	* Get information about the BOINC client and the computer it is running on.
	*/
  function getHostInfo() {
	 return jsonSvc.getJson('/host_info_json');
  }

  return svc;
}
