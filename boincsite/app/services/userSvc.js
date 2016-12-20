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
    addUser2: addUser2,
    getUsers: getUsers,
    deleteUser: deleteUser,
    changePassword: changePassword,
    login: login
  };

  /**
   * Request that a new user be added
   *
   * Params:
   * @userId: The user id of the new user
   * @password: The (plaintext) password of the new user
   *
   * Returns:
   * Any response that the server makes to the request
   *
   * TODO: Obsolete. This will be replaced by addUser2 when 
   *       migration to it has been completed.
   */
  function addUser(userId, password) {
    var data = {
      'userId': userId,
      'password': password
    };
	 
    return jsonSvc.sendJson('/add_user_json', data);
  }

  /**
   * Request that a new user be added
   *
   * Params:
   * @userId: The user id of the new user
   * @password: The (plaintext) password of the new user
   * @success: callback to run on success
   * @error: callback to run on error
   *
   * Returns:
   * Any response that the server makes to the request
   */
  function addUser2(userId, password, success, error) {
    var data = {
      'userId': userId,
      'password': password
    };
	 
    return jsonSvc.sendJson2('/add_user_json', data).then(success, error);
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

  function login(username, password) {
    var data = {
      username: username,
      password: password
    };
	 
    return jsonSvc.sendJson('/login_json', data);
  }

  return svc;
}

