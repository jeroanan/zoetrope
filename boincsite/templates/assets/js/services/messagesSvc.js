angular.module('zoetropeServices')
  .factory('messagesSvc', MessagesSvc);

MessagesSvc.$inject = ['$resource', 'jsonPathSvc'];

function MessagesSvc($resource, jsonPathSvc) {
  var path = jsonPathSvc.getPath('/static/json/messages.json', '/messages_json');

  return function() {
    var res = $resource(path, {}, {
      query: {method: 'GET', isArray: true}
    });

    return res;
  }
}
