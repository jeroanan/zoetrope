angular.module('zoetropeServices', ['ngRoute', 'ngResource']);
angular.module('zoetropeDirectives', ['zoetropeServices']);
angular.module('zoetropeControllers', ['ngRoute', 'ngSanitize', 'zoetropeDirectives', 'zoetropeServices']);

angular.module('zoetrope', [
  'ngRoute',
  'ngResource',
  'ngSanitize',
  'zoetropeControllers',
  'zoetropeServices'
])
.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/static/views/tasks.html',
        controller: 'tasksCtrl',
		  controllerAs: 'vm'
      }).
      when('/daily_transfer_history', {
        templateUrl: '/static/views/dailytransferhistory.html',
		  controller: 'DailyTransferCtrl',
		  controllerAs: 'vm'
      }).
      when('/disk_usage', {
        templateUrl: '/static/views/diskusage.html',
        controller: 'DiskUsageCtrl',
        controllerAs: 'vm'
      }).
      when('/host_info', {
        templateUrl: '/static/views/hostinfo.html',
		  controller: 'HostInfoCtrl',
		  controllerAs: 'vm'
      }).
      when('/messages', {
        templateUrl: '/static/views/messages.html',
		  controller: 'MessagesCtrl',
		  controllerAs: 'vm'
      }).
      when('/project/:project', {
			 templateUrl: '/static/views/project.html',
			 controller: 'ProjectCtrl',
			 controllerAs: 'vm'
      }).
      when('/projects', {
        templateUrl: '/static/views/projects.html',
		  controller: 'ProjectsCtrl',
		  controllerAs: 'vm'		  
      }).
      when('/task/:task_name', {
        templateUrl: '/static/views/task.html',
		  controller: 'TaskCtrl',
		  controllerAs: 'vm'
      }).
      when('/notices', {
        templateUrl: '/static/views/notices.html',
        controller: 'NoticesCtrl',
        controllerAs: 'vm'
      }).
      when('/globalpreferences', {
        templateUrl: '/static/views/globalpreferences.html',
        controller: 'globalPreferencesCtrl',
        controllerAs: 'vm'
      }).
      when('/getallprojectlist', {
        templateUrl: '/static/views/allprojectlist.html',
        controller: 'allProjectListCtrl',
        controllerAs: 'vm'
      }).
      when('/projectdetail/:projectname', {
        templateUrl: '/static/views/projectdetail.html',
        controller: 'projectDetailCrl',
        controllerAs: 'vm'
      }).
      when('/attachproject', {
        templateUrl: '/static/views/attachproject.html',
        controller: 'attachProjectCtrl',
        controllerAs: 'vm'
      }).
      when('/detachproject', {
        templateUrl: '/static/views/detachproject.html',
        controller: 'detachProjectCtrl',
        controllerAs: 'vm'
      }).
		when('/about', {
		  templateUrl: '/static/views/about.html'
		}).
		when('/manageusers', {
		  templateUrl: '/static/views/manageusers.html',
		  controller: 'manageUsersCtrl',
		  controllerAs: 'vm'
		}).
		when('/adduser', {
		  templateUrl: '/static/views/adduser.html',
		  controller: 'addUserCtrl',
		  controllerAs: 'vm'
		}).
		when('/login', {
		  templateUrl: '/static/views/login.html',
		  controller: 'loginCtrl',
		  controllerAs: 'vm'
		}).
      otherwise({
        redirectTo: '/'
      });
  }]);
