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
        conroller: 'IndexCtrl'
      }).
      when('/daily_transfer_history', {
        templateUrl: '/static/views/dailytransferhistory.html',
      }).
      when('/disk_usage', {
        templateUrl: '/static/views/diskusage.html',
        controller: 'DiskUsageCtrl',
        controllerAs: 'duvm'
      }).
      when('/host_info', {
        templateUrl: '/static/views/hostinfo.html'
      }).
      when('/messages', {
        templateUrl: '/static/views/messages.html'
      }).
      when('/project', {
        templateUrl: '/static/views/project.html'
      }).
      when('/projects', {
        templateUrl: '/static/views/projects.html'
      }).
      when('/task', {
        templateUrl: '/static/views/task.html',
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
      otherwise({
        redirectTo: '/'
      });
  }]);
