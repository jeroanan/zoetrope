/**
 * Services to do with getting and sending JSON data in and out of Zoetrope
 *
 * Copyright (c) David Wilson 2016
 * This file is part of Zoetrope.
 * 
 * Zoetrope is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * Zoetrope is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with Zoetrope.  If not, see <http://www.gnu.org/licenses/>.
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
   *
   * Returns:
   * A promise relating to the request that was made to get the data.
   */
  function getJson(endpoint, isArray, data) {

    if (!data) data = {};
	
    var res = $resource(endpoint, data, { query: {method: 'GET', isArray: isArray} });
	
    return res.query().$promise;
  }

  /**
   * Post the given data to the given endpoint
   *
   * Params:
   * @endpoint: The endpoint on the webserver to send the data to
   * @data: The data to send to the endpoint
   *
   * Returns: 
   * A promise of the server's response
   */
  function sendJson(endpoint, data) {
    var res = $resource(endpoint, data, {
      query: {method: 'POST'}
    });
		
    return res.query().$promise;
  }

  return svc;
}
