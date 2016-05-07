/**
 * Controller for the Global Preferences screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('globalPreferencesCtrl', GlobalPreferencesCtrl);

GlobalPreferencesCtrl.$inject = ['globalPreferencesSvc'];

function GlobalPreferencesCtrl(globalPreferencesSvc) {
  var vm = this;
  vm.ready = false;
  vm.title = 'Global Preferences';
  vm.prefs = {};

  document.title = vm.title;

  globalPreferencesSvc.get()().query().$promise.then(function(d) {
    vm.prefs = d;
    vm.ready = true;
  });  
}
