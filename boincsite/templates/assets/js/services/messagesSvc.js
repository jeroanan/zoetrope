angular.module('zoetropeServices')
  .factory('messagesSvc', MessagesSvc);

MessagesSvc.$inject = ['jsonSvc'];

function MessagesSvc(jsonSvc) {
  return jsonSvc.get('/static/json/messages.json', '/messages_json', true);
}
