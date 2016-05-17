/**
 * Code for the attach project dialog.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */

angular.module('zoetropeDirectives').directive('attachDialog', function() {
  return {
    restrict: 'E',
    scope: {
		projecturl: '@',
		projectname: '@'
    },
    templateUrl: '/static/directives/attachDialog.html',
	 controller: ['$scope', 'attachProjectSvc', 'md5Svc', function($scope, attachProjectSvc, md5Svc) {

		$scope.emailaddress = '';
		$scope.password = '';
		$scope.username = '';
				
		$scope.errorText = '';
		$scope.success = false;
		$scope.loading = false;
		$scope.newAccountActive = false;
		
		$scope.submitClicked = submitClicked;
		$scope.existingAccountPillClicked = existingAccountPillClicked;
		$scope.newAccountPillClicked = newAccountPillClicked;

		function submitClicked() {
		  $scope.errorText = '';
		  $scope.success = false;

		  if (!validate()) {
			 return;
		  }
		  
		  var hash_in = $scope.password + $scope.emailaddress;
		  var password_hash = md5Svc.query(hash_in)();

		  $scope.loading = true;
		  
		  attachProjectSvc
			 .query($scope.projecturl, $scope.emailaddress, password_hash, $scope.username, $scope.newAccountActive)()
			 .query()
			 .$promise
			 .then(projectAttached);
		}

		function validate() {
		  if ($scope.newAccountActive) {
			 if ($scope.password === '' || $scope.emailaddress === '' || $scope.username === '') {
				$scope.errorText = 'Please enter an email address, password and username to attach to this project.';
				return false;
			 }
		  } else {
			 if ($scope.password === '' || $scope.emailaddress === '') {
				$scope.errorText = 'Please enter an email address and password to attach to this project.';
				return false;
			 }
		  }

		  return true;
		}

		function projectAttached(d) {
		  $scope.loading = false;
		  
		  if (d.error_message && d.error_message!=='') {
			 $scope.errorText = d.error_message;
		  } else {
			 $scope.success = true;
		  }
		}

		function existingAccountPillClicked() {
		  togglePills('existingAccountPill', 'newAccountPill');
		  $scope.newAccountActive = false;
		}

		function newAccountPillClicked() {
		  togglePills('newAccountPill', 'existingAccountPill');
		  $scope.newAccountActive = true;
		}

		function togglePills(activePillId, inactivePillId) {
		  var activePill = $('#' + activePillId);
		  var inactivePill = $('#' + inactivePillId);
		  var activeClass = 'active';
		  
		  activePill.addClass(activeClass);
		  inactivePill.removeClass(activeClass);
		}
	 }],
	 link: function(scope, element, attrs, ctrl) {

	 }
  };
});
