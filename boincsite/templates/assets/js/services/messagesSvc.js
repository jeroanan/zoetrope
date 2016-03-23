/**
 * Service to get the main contents of the Messages screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeServices')
  .factory('messagesSvc', MessagesSvc);

MessagesSvc.$inject = ['jsonSvc'];

function MessagesSvc(jsonSvc) {

  var svc = {
    get: function() {
      return jsonSvc.get('/static/json/messages.json', '/messages_json', true);
    }
  }

  return svc;
}
