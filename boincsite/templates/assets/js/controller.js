var zoetropeControllers = angular.module('zoetropeControllers', [])

zoetropeControllers.controller('DiskUsageCtrl', function($scope, $http) {
  $http.get('/disk_usage_json').success(function(data) {
    $scope.disk_usages = data;
    $scope.ready = true;
  });

  $scope.orderProp = 'master_url';
  $scope.reverseSort = false;
  $scope.ready = false;
});

zoetropeControllers.controller('IndexCtrl', function ($scope, $http, $routeParams) {
  $http.get('/tasks_json').success(function(data) {
    $http.get('/projects_json').success(function(projects) {

      $scope.projects = projects;
      $scope.tasks = data;

      for (var i=0; i<data.length; i++) {
        data[i].idx = i + 1;
        data[i].project_name = get_project_name(data[i], $scope.projects);
        data[i].state = get_state_string(data[i]);
        data[i].time_so_far = get_time_so_far(data[i]);
      }

      $scope.ready = true;
      $scope.showRawData = false;
    });
  });

  $scope.sortProp = 'index';
  $scope.reverseSort = false;
  $scope.ready = false;
});

zoetropeControllers.controller('TaskCtrl', function($scope, $http) {
  $http.get('/task_json?task_name=' + getQueryStrings()['task_name']).then(function successCallback(response) {

    var task = response.data;

    $http.get('/projects_json').then(function successCallback(response) {
      var projects = response.data;

      $scope.task = task;
      task.project_name = get_project_name(task, projects);
      task.state = get_state_string(task);
      task.time_so_far = get_time_so_far(task);

      $scope.suspend_button_text = task.suspended_via_gui ? 'Resume' : 'Suspend';
      $scope.ready = true;
    });
  }, function errorCallback(response) {
    $scope.error = true;
    if (response.status===500) $scope.errorMessage = "Task not found.";
    $scope.ready = true;
  });

  $scope.ready = false;
});

var get_project_name = function(task, projects) {

  for (p in projects) {
    var proj = projects[p];

    if (proj.master_url == task.project_url) return proj.name;
  }

  return '';
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
    case 6: 'Aborted by user';
    default:
      return task.state;
  }
};

zoetropeControllers.controller('ProjectsCtrl', function($scope, $http) {

    $http.get('/projects_json').success(function(data) {
      $scope.projects = data;
      $scope.ready = true;
    });

    $scope.orderProp = 'name';
    $scope.reverseSort = false;
    $scope.ready = false;
    $scope.showRawData = false;
});

zoetropeControllers.controller('ProjectCtrl', function($scope, $http) {

    var project = getQueryStrings()['project'];
    $http.get('/project_json?project=' + project).then(function successCallback(response) {
      $scope.project = response.data;
      $scope.ready = true;
    }, function errorCallback(response){
      $scope.error = true;
      $scope.errorMessage = 'Project not found.'
      $scope.ready = true;
    });

    $scope.ready = false;
});

zoetropeControllers.controller('HostInfoCtrl', function($scope, $http) {

    $http.get('/host_info_json').success(function(data) {
      $scope.host_info = data;
      $scope.ready = true;
    });

    $scope.ready = false;
});

zoetropeControllers.controller('DailyTransferCtrl', function($scope, $http) {
  $http.get('/daily_transfer_history_json').success(function(data) {

    for (var d in data) {
      var transfer = data[d];
      var dateSplit = transfer.date.split('-');
      var theDate = new Date(dateSplit[0], dateSplit[1]-1, dateSplit[2]);
      data[d].date = theDate;
    }


    var totalMegabytes = function(fieldName) {
      var megs = Array.map(data, function(x) { return x[fieldName]; });
      var total = Array.reduce(megs, function(a, b) { return a+b });
      return Math.round(total * 100) / 100;
    };

    $scope.daily_transfers = data;
    $scope.orderProp = 'date';
    $scope.reverseSort = true;
    $scope.totalUploaded = totalMegabytes('uploaded') + 'MB';
    $scope.totalDownloaded = totalMegabytes('downloaded') + 'MB';
    $scope.ready = true;

  });
  $scope.ready = false;
});

zoetropeControllers.controller('MessagesCtrl', function($scope, $http) {

    $http.get('/messages_json').success(function(data) {
        $scope.messages = data;

        var project_names = Array.map(data, function(x) { return x.project_name});
        $scope.unique_project_names = Array.filter(project_names, function(el,i,a) {
          return i==a.indexOf(el);
        });

        var count_project_name = function(pn) {
          var project_name_array = Array.filter(project_names, function(el) { return el == pn; });
          return project_name_array.length;
        };

        var tmp_name_counts = new Object();
        for (upn in $scope.unique_project_names) {
          var pn = $scope.unique_project_names[upn];
          tmp_name_counts[pn] = count_project_name(pn);
        }

        $scope.project_name_counts = tmp_name_counts;
        $scope.ready = true;
    });

    $scope.get_project_name = function(pn) {
      return pn === '' ? '(no project)' : pn;
    };

    $scope.orderProp = 'message_number';
    $scope.reverseSort = true;
    $scope.filterProp = '';
    $scope.ready = false;
});

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

zoetropeControllers.directive('keyvalrow', function() {
  return {
    restrict: 'E',
    scope: {
      key: '@',
      val: '@'
    },
    templateUrl: '/static/directives/keyvalrow.html'
  };
});
