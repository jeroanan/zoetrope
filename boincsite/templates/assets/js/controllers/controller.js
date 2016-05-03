angular.module('zoetropeControllers', ['ngRoute', 'ngSanitize', 'zoetropeServices']);

var get_project_name = function(task, projects) {

  for (p in projects) {
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
      break;
    case 3:
      return 'Computation error';
      break;
    case 5:
      return 'Ready to report';
      break;
    case 6:
      return 'Aborted by user';
      break;
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
		$scope.submitClicked = submitClicked;
		$scope.errorText = '';
		$scope.success = false;

		function submitClicked() {
		  $scope.errorText = '';
		  $scope.success = false;
		  
		  var hash_in = $scope.password + $scope.emailaddress;
		  var password_hash = md5Svc.query(hash_in)();
		  attachProjectSvc.query($scope.projecturl, $scope.emailaddress, password_hash)().query().$promise.then(function(d) {
			 if (d.error_message && d.error_message!=='') {
				$scope.errorText = d.error_message;
			 } else {
				$scope.success = true;
			 }
		  });
		}
	 }],
	 link: function(scope, element, attrs, ctrl) {

	 }
  };
});

angular.module('zoetropeControllers').directive('detachDialog', function() {
  return {
    restrict: 'E',
    scope: {
		projecturl: '@',
		projectname: '@'
    },
    templateUrl: '/static/directives/detachDialog.html',
	 controller: ['$scope', 'detachProjectSvc', function($scope, detachProjectSvc) {

		$scope.submitClicked = submitClicked;
		$scope.errorText = '';
		
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

	 }
  };
});
