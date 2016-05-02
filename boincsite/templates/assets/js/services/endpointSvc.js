/**
 * Get the web service endpoint.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeServices')
  .factory('endpointSvc', EndpointService);

EndpointService.$inject = ['$resource']

function EndpointService($resource) {

  function validateEndpoint(endpoint) {
	 var defaultEndpoint = 'http://localhost';	 
	 
	 if (!endpoint || endpoint==='') {
		endpoint = defaultEndpoint;
		return endpoint;
	 }

	 if (!endpoint.startsWith('http')) {
		endpoint = 'http://' + endpoint;
	 }

	 endpoint = endpoint.replace(/\/+$/, '')

	 return endpoint;
  }

  var svc = {

	 get: function() {
		return validateEndpoint(localStorage.endpoint);
	 },

	 set: function(value) {
		localStorage.endpoint = validateEndpoint(value);
	 }
  };

  return svc;
}
