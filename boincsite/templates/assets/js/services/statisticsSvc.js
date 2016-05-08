/**
 * Service to get statisics for a given project.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeServices')
  .factory('statisicsSvc', StatisticsService);

StatisticsService.$inject = ['jsonSvc'];

function StatisticsService(jsonSvc) {

  function getStatistics(projectUrl) {

	 var data = {
		projectUrl: projectUrl
	 };
	 return jsonSvc.get('', '/get_statistics_json', true, data);
  }
  
  var svc = {	 
	 get: getStatistics
  };

  return svc;
}
