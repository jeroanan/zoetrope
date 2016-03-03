angular.module('zoetropeControllers')
  .controller('HostInfoCtrl', HostInfoController);

zoetropeControllers.controller('HostInfoCtrl', HostInfoController);

HostInfoController.$inject = ['$scope', '$http']

function HostInfoController($scope, $http) {
  $http.get('/host_info_json').success(function(data) {
    $scope.host_info = data;
    $scope.ready = true;
  });

  $scope.ready = false;
  $scope.title = 'Host Info';
}
