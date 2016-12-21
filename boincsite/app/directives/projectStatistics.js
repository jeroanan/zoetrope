/**
 * Code for the project statistics component.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeDirectives').directive('projectStatistics', function() {
  return {
    restrict: 'E',
    scope: {
      projectUrl: '@'
    },
    templateUrl: '/static/directives/projectStatistics.html',
    controller: ['$scope', 'projectSvc', function($scope, projectSvc) {
      $scope.sortField = 'day';
      $scope.reverseSort = true;
      $scope.sort = getSortFunc($scope, 'sortField', 'reverseSort');
      $scope.stats = {};
      $scope.upArrow = upArrow;
      $scope.downArrow = downArrow;

      projectSvc.getProjectStatistics2($scope.projectUrl, gotStats);
	
      function gotStats(stats) {

        if (stats.length>0 && stats.error_message && stats.error_message===-1414) {
          document.location = '/#/login';
          return;
        }

        var ps = [];
		  
        for (var p in stats[0]) {
			 
          var o = stats[0][p];
          if (o.day) {
            o.day = o.day.split(' ')[0];
            ps.push(o);
          }		  
        }
		  
        $scope.projectStats = ps.map(function(x) {
          x.user_total_credit = parseFloat(x.user_total_credit);
          x.user_expavg_credit = parseFloat(x.user_expavg_credit);
          x.host_total_credit = parseFloat(x.host_total_credit);
          x.host_expavg_credit = parseFloat(x.host_expavg_credit);
          return x;		
        });
      }
    }],
    link: function(scope, elem, attrs) {
    }	 
  };
});
