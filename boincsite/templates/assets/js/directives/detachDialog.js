/**
 * Code for the detach project dialog.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeDirectives').directive('detachDialog', function() {
  return {
    restrict: 'E',
    templateUrl: '/static/directives/detachDialog.html',
	 controller: ['$scope', 'detachProjectSvc', function($scope, detachProjectSvc) {
		
		$scope.submitClicked = submitClicked;
		$scope.errorText = '';
		$scope.projecturl = '';
		$scope.projectname = '';
		
		function submitClicked() {
		  
		  $scope.errorText = '';
		  
		  detachProjectSvc.query($scope.projecturl)().query().$promise.then(function(d) {
			 if (d.error_message) {
				$scope.errorText = d.error_message;
			 } else {
				$('#detachModal').modal('hide');
			 }
		  });
		}
	 }],
	 link: function(scope, element, attrs, ctrl) {
		
		attrs.$observe('projecturl', function(val) {
		  scope.projecturl = val;
		  
		});
		
		attrs.$observe('projectname', function(val) {
		  scope.projectname = val;
		});
	 }
  };
});
