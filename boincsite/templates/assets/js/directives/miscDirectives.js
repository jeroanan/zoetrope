/**
 * Some small directives.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeDirectives').directive('keyvalrow', function() {
  return {
    restrict: 'E',
    scope: {
      key: '@',
      val: '@'
    },
    templateUrl: '/static/directives/keyvalrow.html'
  };
});

angular.module('zoetropeDirectives').directive('keyvallinkrow', function() {
  return {
    restrict: 'E',
    scope: {
      key: '@',
      link: '@',
		text: '@'
    },
    templateUrl: '/static/directives/keyvallinkrow.html'
  };
});
