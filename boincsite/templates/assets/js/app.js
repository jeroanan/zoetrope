var zoetrope = angular.module('zoetrope', [
  'ngRoute',
  'zoetropeControllers'
])

zoetrope.config(['$routeProvider',
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
        templateUrl: '/static/views/diskusage.html'
      }).
      when('/host_info', {
        templateUrl: '/static/views/hostinfo.html'
      }).
      when('/messages', {
        templateUrl: '/static/views/messages.html'
      }).
      when('/projects', {
        templateUrl: '/static/views/projects.html',
        controller: 'ProjectsCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
