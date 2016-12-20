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
    getDiskUsage2: getDiskUsage2,
    getDailyTransferHistory: getDailyTransferHistory,
    getDailyTransferHistory2: getDailyTransferHistory2,
    getGlobalPreferences: getGlobalPreferences,
    getHostInfo: getHostInfo,
    getHostInfo2: getHostInfo2,
    getMessages: getMessages,
    getMessages2: getMessages2,
    getNotices: getNotices,
    getNotices2: getNotices2,
    getPlatform: getPlatform,
    getPlatform2: getPlatform2
  };

  /**
   * Get project-by-project disk usage and disk size/disk free details.
   *
   * TODO: Obsolete. This will be replaced by getDiskUsage2 when 
   *       migration to it has been completed.
   */
  function getDiskUsage() {
    return jsonSvc.getJson('/disk_usage_json', false);
  }

  /**
   * Get project-by-project disk usage and disk size/disk free details.
   *
   * Params:
   * @success: callback to run on success
   * @error: callback to run on error
   */
  function getDiskUsage2(success, error) {
    return jsonSvc.getJson2('/disk_usage_json', false).then(success, error);
  }

  /**
   * Get upload/download figures for each day as well as total upload/download.
   *
   * TODO: Obsolete. This will be replaced by getDailyTransferHistory2 when 
   *       migration to it has been completed.
   */
  function getDailyTransferHistory() {
    return jsonSvc.getJson('/daily_transfer_history_json', true);
  }

  /**
   * Get upload/download figures for each day as well as total upload/download.
   *
   * Params:
   * @success: callback to run on success
   * @error: callback to run on error
   */
  function getDailyTransferHistory2(success, error) {
    jsonSvc.getJson2('/daily_transfer_history_json', true).then(success, error);
  }

  /**
   * Get BOINC global preferences.
   */
  function getGlobalPreferences() {
    return jsonSvc.getJson('/get_global_preferences_json', false);
  }

  /**
   * Get information about the BOINC client and the computer it is running on.
   *
   * TODO: Obsolete. This will be replaced by getMessages2 when 
   *       migration to it has been completed.
   */
  function getHostInfo() {
    return jsonSvc.getJson('/host_info_json');
  }
  
  /**
   * Get information about the BOINC client and the computer it is running on.
   *
   * Params:
   * @success: callback to run on success
   * @error: callback to run on error
   */
  function getHostInfo2(success, error) {
    return jsonSvc.getJson2('/host_info_json').then(success, error);
  }

  /**
   * Get all operational and project-related messages generated by the BOINC client.
   *
   * TODO: Obsolete. This will be replaced by getMessages2 when 
   *       migration to it has been completed.
   */
  function getMessages() {
    return jsonSvc.getJson('/messages_json', true);
  }

  /**
   * Get all operational and project-related messages generated by the BOINC client.
   *
   * Params:
   * @success: callback to run on success
   * @error: callback to run on error
   */
  function getMessages2(success, error) {
    return jsonSvc.getJson2('/messages_json', true).then(success, error);
  }

  /**
   * Get notices sent by attached projects.
   *
   * TODO: Obsolete. This will be replaced by getNotices2 when 
   *       migration to it has been completed.
   */
  function getNotices() {
    return jsonSvc.getJson('/notices_json', true);
  }

  /**
   * Get notices sent by attached projects.
   *
   * Params:
   * @success: callback to run on success
   * @error: callback to run on error
   */
  function getNotices2(success, error) {
    return jsonSvc.getJson2('/notices_json', true).then(success, error);
  }

  /**
   * Get the name of the platform that the client is running on.
   *
   * TODO: Obsolete. This will be replaced by getPlatform2 when 
   *       migration to it has been completed.
   */
  function getPlatform() {
    return jsonSvc.getJson('/get_platform_json', false);
  }

  /**
   * Get the name of the platform that the client is running on.
   * 
   * Params:
   * @success: callback to run on success
   * @error: callback to run on error
   */
  function getPlatform2(success, error) {
    return jsonSvc.getJson2('/get_platform_json', false).then(success, error);
  }

  return svc;
}
