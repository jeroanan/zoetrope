/**
 * Code for the change user password dialog.
 *
 * (c) David Wilson 2016, licensed under GPL V3 (or at your choice, a later version of the GPL).
 */
angular.module('zoetropeDirectives').directive('zoeChangePasswordDialog', function() {
  return {
    restrict: 'E',
    scope: {
      user: '@'
    },
    templateUrl: '/static/directives/changePasswordDialog.html',
    controller: ['$scope', 'userSvc', function($scope, userSvc) {

    $scope.password = '';
    $scope.confirmPassword = '';
    $scope.operationSuccess = false;
    $scope.operationSuccessMessage = '';
    $scope.errorText = '';
		
    $scope.submitClicked = submitClicked;

    function submitClicked() {
      if ($scope.password==='' || $scope.confirmPassword==='') {
        $scope.operationSuccess = false;
        $scope.errorText = 'Please enter a password and confirmation password';
        return;
      }

      if ($scope.password!==$scope.confirmPassword) {
        $scope.operationSuccess = false;
        $scope.errorText = 'Password and confirmation password must match';
        return;
      }
		  
      $scope.user.password = $scope.password;
      $scope.user.confirmPassword = $scope.confirmPassword;
      userSvc.changePassword($scope.user, passwordChanged, passwordChangeError);
    }

    function passwordChanged(data) {

      if (!data.success) {
        $scope.operationSuccess = false;
        $scope.errorText = data.error_message.split('|')[0];
        return;
      }
		  
      $scope.operationSuccess = true;
      $scope.operationSuccessMessage = 'Password changed successfully';
    }

    function passwordChangeError(data) {
      $scope.operationSuccess = false;
      $scope.errorText = data.statusText;
    }
  }],
  link: function(scope, element, attrs, ctrl) {
    attrs.$observe('user', function(val) {
      if (val!=='') scope.user = JSON.parse(val);
    });
  }	 
 };

});
