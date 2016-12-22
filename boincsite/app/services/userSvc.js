/**
 * Services to handle user account operations.
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
 * You should have received a copy of the GNU General Public Licensemenu-bar (new menu-bar%
 * along with Zoetrope.  If not, see <http://www.gnu.org/licenses/>.
 */
angular.module('zoetropeServices')
  .factory('userSvc', userSvc);

userSvc.$inject = ['jsonSvc'];

function userSvc(jsonSvc) {

  var svc = {
    addUser: addUser,
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
   * @success: callback to run on success
   * @error: callback to run on error
   *
   * Returns:
   * Any response that the server makes to the request
   */
  function addUser(userId, password, success, error) {
    var data = {
      'userId': userId,
      'password': password
    };
	 
    return jsonSvc.sendJson('/add_user_json', data).then(success, error);
  }

  /**
   * Request a list of all users
   *
   * Params:
   * @success: callback to run on success
   * @error: callback to run on error
   */
  function getUsers(success, error) {
    jsonSvc.getJson('/get_users_json', true).then(success, error);
  }

  /**
   * Delete the given user
   *
   * Params:
   * @user the number of the user to delete
   * @success: callback to run on success
   * @error: callback to run on error
  */
  function deleteUser(user, success, error) {
    return jsonSvc.sendJson('/delete_user_json', user).then(success, error);
  }

  /**
   * Change the user's password
   *
   * Params:
   * @user: The user's details
   * @success: callback to run on success
   * @error: callback to run on error
   */
  function changePassword(user, success, error) {
    return jsonSvc.sendJson('/change_password_json', user).then(success, error);
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
  function login(username, password, success, error) {
    var data = {
      username: username,
      password: password
    };
	 
    jsonSvc.sendJson('/login_json', data).then(success, error);
  }

  return svc;
}

