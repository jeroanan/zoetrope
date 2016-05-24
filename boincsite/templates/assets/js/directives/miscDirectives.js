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
      val: '@',
	 	col1LgWidth: '@',
	 	col1XsWidth: '@',
	 	col2LgWidth: '@',
	 	col2XsWidth: '@',
	 	col3LgWidth: '@',
	 	col3XsWidth: '@',
	 	col4LgWidth: '@',
	 	col4XsWidth: '@'
    },
	 replace: true,
    templateUrl: '/static/directives/keyvalrow.html',
	 controller: ['$scope', function($scope) {

		if (!$scope.col1LgWidth) {
		  $scope.col1LgWidth = '2';
		}

		if (!$scope.col1XsWidth) {
		  //$scope.col1XsWidth = '0';
		  $scope.col1XsWidth = '1';
		}

		if (!$scope.col2LgWidth) {
		  $scope.col2LgWidth = '4';
		}

		if (!$scope.col2XsWidth) {
		  // $scope.col2XsWidth = '3';
		  $scope.col2XsWidth = '5';
		}

		if (!$scope.col3LgWidth) {
		  $scope.col3LgWidth = '4';
		}

		if (!$scope.col3XsWidth) {
		  // $scope.col3XsWidth = '3';
		  $scope.col3XsWidth = '5';
		}

		if (!$scope.col4LgWidth) {
		  $scope.col4LgWidth = '2';
		}

		if (!$scope.col4XsWidth) {
		  // $scope.col4XsWidth = '6';
		  $scope.col4XsWidth = '1'
		}
	 }],
	 link: function(scope, elem, attrs) {
		scope.key = attrs.key;

		attrs.$observe('val', function(value) {
		  scope.val = value;
		});
	 }
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
