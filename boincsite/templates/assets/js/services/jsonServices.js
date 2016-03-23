/**
 * Get JSON data.
 *
 * When getting the JSON data, two paths are supplied: one to a JSON file stored
 * locally to the website and another that is a webservice endpoint. If the website
 * is running in "offline" mode (i.e. the user is accessing it via localhost) then
 * the locally-held JSON file is returned. Otherwise, it's the webservice endpoint.
 *
 * The rationale behind this is to allow for rapid development on a local development
 * environment without having to run boinc on it.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeServices')
  .factory('jsonSvc', JsonService);

JsonService.$inject = ['$resource']

function JsonService($resource) {

  var svc = {
    get: function(offlinePath, onlinePath, isArray) {


      function getPath(offlinePath, onlinePath) {
        var offlineMode = window.location.hostname === 'localhost';

        var path = ''
        if (offlineMode===true) {
          return offlinePath;
        } else {
          return onlinePath;
        }
      }

      path = getPath(offlinePath, onlinePath);

      return function() {
        var res = $resource(path, {}, {
          query: {method: 'GET', isArray: isArray}
        });

        return res;
      }
    }
  };

  return svc;
}
