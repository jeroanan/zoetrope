/**
 * Service to get the main contents of the All Projects List screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeServices')
  .factory('allProjectListSvc', AllProjectListService);

AllProjectListService.$inject = ['jsonSvc'];

function AllProjectListService(jsonSvc) {
  var svc = {
    get: function() {
      return jsonSvc.get('/static/json/allprojectslist.json', '/get_all_projects_list_json', true);
    }
  };

  return svc;
}
