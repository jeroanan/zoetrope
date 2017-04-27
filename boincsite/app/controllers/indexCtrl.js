/**
 * Copyright (c) David Wilson 2017
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
angular.module('zoetropeControllers').controller('indexCtrl', IndexController);

IndexController.$inject = ['$scope', 'zoetropeSvc'];

function IndexController($scope, zoetropeSvc) {

  loggedIn = false;

  load();

  function load() {
    function gotStatus(xhr) {
    }

    function gotStatusError() {
    }

    zoetropeSvc.getStatus(gotStatus, gotStatusError);
  }
}

