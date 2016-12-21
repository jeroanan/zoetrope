/**
 * Code for the detach project dialog.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeDirectives').directive('detachDialog', function() {
  return {
    restrict: 'E',
    templateUrl: '/static/directives/detachDialog.html',
    controller: ['$scope', 'projectSvc', function($scope, projectSvc) {
		
      $scope.submitClicked = submitClicked;
      $scope.errorText = '';
      $scope.projecturl = '';
      $scope.projectname = '';
		
      function submitClicked() {
		  
        $scope.errorText = '';

        projectSvc.detachProject2($scope.projecturl, projectDetached);
      }

      function projectDetached(d) {
        if (d.error_message) {
			 
          if (d.error_message===-1414) {
            $('#detachModal').modal('hide');
            setTimeout(function() { document.location = '/#/login'; }, 500);
            return;
          }
			 
          $scope.errorText = d.error_message;
        } else
          $('#detachModal').modal('hide');			 
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
