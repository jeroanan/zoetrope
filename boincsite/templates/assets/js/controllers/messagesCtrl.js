angular.module('zoetropeControllers')
  .controller('MessagesCtrl', MessagesController);

MessagesController.$inject = ['$scope', '$http'];

function MessagesController($scope, $http) {
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
  $scope.title = "Messages"
}
