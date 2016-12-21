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
    getUsers2: getUsers2,
    deleteUser: deleteUser,
    deleteUser2: deleteUser2,
    changePassword: changePassword,
    changePassword2: changePassword2,
    login: login,
    login2: login2
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

  /**
   * Request a list of all users
   *
   * TODO: Obsolete. This will be replaced by getUsers2 when 
   *       migration to it has been completed.
   */
  function getUsers() {
    return jsonSvc.getJson('/get_users_json', true);
  }

  /**
   * Request a list of all users
   *
   * Params:
   * @success: callback to run on success
   * @error: callback to run on error
   */
  function getUsers2(success, error) {
    jsonSvc.getJson2('/get_users_json', true).then(success, error);
  }

  /**
   * Delete the given user
   *
   * Params:
   * @user the number of the user to delete
   *
   * TODO: Obsolete. This will be replaced by deleteUser2 when 
   *       migration to it has been completed.
  */
  function deleteUser(user) {
    return jsonSvc.sendJson('/delete_user_json', user);
  }

  /**
   * Delete the given user
   *
   * Params:
   * @user the number of the user to delete
   * @success: callback to run on success
   * @error: callback to run on error
  */
  function deleteUser2(user, success, error) {
    return jsonSvc.sendJson2('/delete_user_json', user).then(success, error);
  }

  /**
   * Change the user's password
   *
   * Params:
   * @user: The user's details
   *
   * TODO: Obsolete. This will be replaced by changePassword2 when 
   *       migration to it has been completed.
   */
  function changePassword(user) {
    return jsonSvc.sendJson('/change_password_json', user);
  }

  /**
   * Change the user's password
   *
   * Params:
   * @user: The user's details
   * @success: callback to run on success
   * @error: callback to run on error
   */
  function changePassword2(user, success, error) {
    return jsonSvc.sendJson2('/change_password_json', user).then(success, error);
  }

  /**
   * Login as the given username and password
   *
   * Params:
   * @username: The username to login as
   * @password: The user's plaintext password
   *
   * TODO: Obsolete. This will be replaced by login2 when 
   *       migration to it has been completed.
   */
  function login(username, password) {
    var data = {
      username: username,
      password: password
    };
	 
    return jsonSvc.sendJson('/login_json', data);
  }

  /**
   * Login as the given username and password
   *
   * Params:
   * @username: The username to login as
   * @password: The user's plaintext password
   * @success: callback to run on success
   * @error: callback to run on error
   */
  function login2(username, password, success, error) {
    var data = {
      username: username,
      password: password
    };
	 
    jsonSvc.sendJson2('/login_json', data).then(success, error);
  }

  return svc;
}

