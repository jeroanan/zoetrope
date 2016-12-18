/**
 * Services to do with getting and sending JSON data in and out of Zoetrope
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeServices')
  .factory('jsonSvc', JsonService);

JsonService.$inject = ['$resource'];

function JsonService($resource) {

  var svc = {
	 getJson: getJson,
	 sendJson: sendJson
  };

  /**
	* Get json from the given endpoint.
	* 
	* Params:
	* @endpoint: The path on the webserver to be called to retrieve the json
	* @isArray: If true, expect a list of objects to be returned by the call.
	*           Otherwise, it will just be a single object.
	* @data: If supplied, a json object to send as a parameter to the endpoint.
	*        If it isn't supplied then an empty json object is sent.
	*/
  function getJson(endpoint, isArray, data) {

	 if (!data) {
		data = {};
	 }
		
	 return function() {
      var res = $resource(endpoint, data, {
        query: {method: 'GET', isArray: isArray}
      });

      return res;
    };	 
  }

  /**
	* Post the given data to the given endpoint
	*
	* Params:
	* @endpoint: The endpoint on the webserver to send the data to
	* @data: The data to send to the endpoint
	*
	* Returns: 
	* A $resource that will promise the server's response
	*/
  function sendJson(endpoint, data) {
	 return function() {
      var res = $resource(endpoint, data, {
        query: {method: 'POST'}
      });
		
      return res;
    };
  }

  return svc;
}