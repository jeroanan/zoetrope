/**
 * Controller for the Global Preferences screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('globalPreferencesCtrl', GlobalPreferencesCtrl);

GlobalPreferencesCtrl.$inject = ['systemInfoSvc'];

function GlobalPreferencesCtrl(systemInfoSvc) {
  var vm = this;
  vm.ready = false;
  vm.title = 'Global Preferences';
  vm.prefs = {};
  vm.error = false;
  vm.load = load;
  
  document.title = vm.title;

  load();

  function load() {
	 vm.ready = false;
	 vm.error = false;
	 systemInfoSvc.getGlobalPreferences()().query().$promise.then(gotGlobalPreferences, serviceError);
  }

  function gotGlobalPreferences(preferences) {
	 vm.prefs = preferences;
    vm.ready = true;
  }

  function serviceError() {
	 vm.ready = true;
	 vm.error = true;
  }
}
