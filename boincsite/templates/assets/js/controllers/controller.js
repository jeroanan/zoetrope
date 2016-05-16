angular.module('zoetropeControllers', ['ngRoute', 'ngSanitize', 'zoetropeServices']);

var upArrow = '&#x25B2;';
var downArrow = '&#x25BC;';

function getSortFunc(viewModel, sortFieldVar, reverseSortVar) {

  var currentSortField = viewModel[sortFieldVar];
  
  function sortFunc(field) {
	 viewModel[sortFieldVar] = field;

	 if(field===currentSortField) {
		viewModel[reverseSortVar] = !viewModel[reverseSortVar];
		return;
	 }

	 currentSortField = field;
	 viewModel[sortFieldVar] = field;
	 viewModel[reverseSortVar] = false;
  }
  
  return sortFunc;
}

var get_project_name = function(task, projects) {

  for (var p in projects) {
    var proj = projects[p];

    if (proj.master_url == task.project_url){

      if (proj.name==='') {
        return task.project_url;
      }
      return proj.name;
    }
  }

  return task.project_url;
};

var get_time_so_far = function(task) {
  return task.ready_to_report ? task.final_cpu_time : task.current_cpu_time;
};

var get_state_string = function(task) {
  if (task.suspended_via_gui) return 'Task suspended by user';

  if (task.state === 2 && (task.scheduler_state === 1 || task.active_task_state === 0)) {
    return 'Waiting to run';
  }

  switch (task.state) {
    case 2:
      return 'Running';
    case 3:
      return 'Computation error';
    case 5:
      return 'Ready to report';
    case 6:
      return 'Aborted by user';
    default:
      return task.state;
  }
};

function getQueryStrings() {
  var assoc  = {};
  var decode = function (s) { return decodeURIComponent(s.replace(/\+/g, " ")); };
  var queryString = location.search.substring(1);
  var keyValues = queryString.split('&');

  for(var i in keyValues) {
    var key = keyValues[i].split('=');
    if (key.length > 1) {
      assoc[decode(key[0])] = decode(key[1]);
    }
  }

  return assoc;
}

angular.module('zoetropeControllers').directive('keyvalrow', function() {
  return {
    restrict: 'E',
    scope: {
      key: '@',
      val: '@'
    },
    templateUrl: '/static/directives/keyvalrow.html'
  };
});

angular.module('zoetropeControllers').directive('keyvallinkrow', function() {
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

angular.module('zoetropeControllers').directive('attachDialog', function() {
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

angular.module('zoetropeControllers').directive('detachDialog', function() {
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
