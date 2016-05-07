/**
 * Service to get the main contents of the Global Preferences screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeServices')
  .factory('globalPreferencesSvc', GlobalPreferencesService);

GlobalPreferencesService.$inject = ['jsonSvc'];

function GlobalPreferencesService(jsonSvc) {
  var svc = {
    get: function() {
      return jsonSvc.get('', '/get_global_preferences_json', false);
    }
  };

  return svc;
}
