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
	 addUser: addUser,
	 getUsers: getUsers,
	 deleteUser: deleteUser,
	 changePassword: changePassword
  };

  function addUser(userId, password) {
	 var data = {
		'userId': userId,
		'password': password
	 };
	 
    return jsonSvc.sendJson('/add_user_json', data);
  }

  function getUsers() {
	 return jsonSvc.getJson('/get_users_json', true);
  }

  function deleteUser(user) {
	 return jsonSvc.sendJson('/delete_user_json', user);
  }

  function changePassword(user) {
	 return jsonSvc.sendJson('/change_password_json', user);
  }

  return svc;
}

