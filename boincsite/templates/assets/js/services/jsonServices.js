angular.module('zoetropeServices')
  .factory('jsonSvc', JsonService);

JsonService.$inject = ['$resource', 'jsonPathSvc']

function JsonService($resource, jsonPathSvc) {
  var svc = {
    get: function(offlinePath, onlinePath, isArray) {

      path = jsonPathSvc.getPath(offlinePath, onlinePath);

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
