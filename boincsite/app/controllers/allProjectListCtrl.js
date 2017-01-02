/**
 * Controller for the All Projects list screen.
 *
 * Copyright (c) David Wilson 2016-2017
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
angular.module('zoetropeControllers')
  .controller('allProjectListCtrl', AllProjectListController);

AllProjectListController.$inject = ['$document', '$location', 'projectSvc', 'systemInfoSvc'];

function AllProjectListController($document, $location, projectSvc, systemInfoSvc) {

  var vm = this;

  vm.ready  = false;
  vm.error = false;
  vm.title = 'All Projects';
  vm.sortProp = 'name';
  vm.reverseSort = false;
  vm.availableProjects = null;
  vm.allProjects = [];

  vm.sort = getSortFunc(vm, 'sortProp', 'reverseSort'); //TODO: This (and similar functions in other controller)
                                                        //      should be moved to a svc.
  vm.load = load;
  
  $document[0].title = vm.title;

  load();

  function load() {
    vm.ready = false;
    vm.error = false;
    //TODO: The names in this controller around getting available/attahced projects seem to be a mess.
    projectSvc.getAvailableProjects(gotAllProjects, serviceError);
  }

  function gotAllProjects(projects) {

    if (projects.length>0 && projects[0].error_message && projects[0].error_message===-1414)
    {
      $location.path('/#/login');
      return;
    }

    vm.allProjects = projects;
    projectSvc.getAttachedProjects(gotAttachedProjects, serviceError);
    systemInfoSvc.getPlatform(gotPlatform, serviceError);
  }

  function serviceError() {
    vm.ready = true;
    vm.error = true;
  }  

  function gotAttachedProjects(projects) {
    vm.ready = true;

    if (projects.length>0 && projects[0].error_message && projects[0].error_message===-1414)
    {
      $location.path('/#/login');
      return;
    }		
	 
    vm.availableProjects = vm.allProjects.map(function(x) {
      var thisProject = projects.filter(function(y) {
        return y.project_name==x.name;
      });
		
      x.attached = thisProject.length>0;
      return x;
    });
  }

  function gotPlatform(platform) {

    var thisPlatform = platform.platform;

    vm.allProjects = vm.allProjects.map(function(x) {
      var supportedPlatform = x.platforms.filter(function(y) {
        return y.name===thisPlatform;		
      });
      x.supported = supportedPlatform.length > 0;

      return x;
    });
  }  
}
