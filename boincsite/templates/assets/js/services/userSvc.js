/**
 * Services to handle user account operations.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeServices')
  .factory('userSvc', userSvc);

userSvc.$inject = ['jsonSvc'];

function userSvc(jsonSvc) {

  var svc = {
	 addUser: addUser
  };

  function addUser(userId, password) {
	 var data = {
		'userId': userId,
		'password': password
	 };
	 
    return jsonSvc.sendJson('/add_user_json', data);
  }

  return svc;
}

