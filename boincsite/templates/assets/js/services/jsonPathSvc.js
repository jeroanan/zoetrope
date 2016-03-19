angular.module('zoetropeServices')
  .factory('jsonPathSvc', JsonPathSvc);

function JsonPathSvc() {
  var svc = {
    getPath: function(offlinePath, onlinePath) {
      var offlineMode = window.location.hostname === 'localhost';

      var path = ''
      if (offlineMode===true) {
        return offlinePath;
      } else {
        return onlinePath;
      }
    }
  }

  return svc;
}
