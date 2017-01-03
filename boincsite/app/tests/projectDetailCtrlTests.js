/**
* Unit tests for projectDetailCtrl
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

describe('projectDetailCtrl', function() {
  beforeEach(module('zoetropeControllers'));
 
  var $controller;
  var $routeParams;
  var $document;
  var $location;
  var projectSvc;
  var systemInfoSvc;

  beforeEach(inject(function(_$controller_, _$routeParams_, _$document_, _$location_, _projectSvc_, _systemInfoSvc_) {

    $controller = _$controller_;
    $routeParams = _$routeParams_;
    $document = _$document_;
    $location = _$location_;
    projectSvc = _projectSvc_;
    systemInfoSvc = _systemInfoSvc_;
  }));

  describe('initialisation', function() {

    it('sets initial set correctly', function() {
      var vm = $controller('projectDetailCtrl', {});

      var expectedTitle = 'Project Details';

      expect(vm.ready).toBeFalsy();
      expect(vm.project).toEqual({});
      expect(vm.projectFound).toBeFalsy();
      expect(vm.error).toBeFalsy();
      expect(vm.gotProjects).toBeFalsy();
      expect(vm.title).toEqual(expectedTitle);
      expect($document[0].title).toEqual(expectedTitle);
    });

    it('calls project svc to get available projects', function() {
      
      spyOn(projectSvc, 'getAvailableProjects');

      var vm = $controller('projectDetailCtrl', {});

      expect(projectSvc.getAvailableProjects).toHaveBeenCalled();
    });
  });

  describe('get available projects', function() {

    describe('success', function() {

      var json;
      
      beforeEach(function() {
        json = readJSON('tests/json/allProjectList.json');
      });

      describe('unauthenticated', function() {

        it('redirects unauthenticated users to the login screen', function() {
          json = [{ error_message: -1414 }];

	  spyOn(projectSvc, 'getAvailableProjects').and.callFake(function(s,e) { s(json); });

	  var vm = $controller('projectDetailCtrl', {});

	  expect($location.path()).toEqual('/#/login');
	});
      });

      describe('authenticated', function() {

        beforeEach(function() {
	  spyOn(projectSvc, 'getAvailableProjects').and.callFake(function(s,e) { s(json); });
	  spyOn(projectSvc, 'getAttachedProjects');
	  spyOn(systemInfoSvc, 'getPlatform');
	  $routeParams.projectname = 'Asteroids@home';
	});

        it('sets the project correctly if found according to the routeParam', function() {
          var vm = $controller('projectDetailCtrl', {});
	  expect(vm.project).toBeDefined();
	});
        
	it('does not set the project if not found according to the routeParams', function() {

	  $routeParams.projectname = 'does not exit';

          var vm = $controller('projectDetailCtrl', {});
	  expect(vm.project).toBeUndefined();
	  expect(vm.projectFound).toBeFalsy();
	  expect(vm.ready).toBeTruthy();
	});
	
	it('calls project svc to get attached projects', function() {

          var vm = $controller('projectDetailCtrl', {});
	  expect(projectSvc.getAttachedProjects).toHaveBeenCalled();
	});

	it('calls systemInfoSvc to get the platform', function() {

          var vm = $controller('projectDetailCtrl', {});
	  expect(systemInfoSvc.getPlatform).toHaveBeenCalled();
	});

	it('sets the title appropriately', function() {

          var vm = $controller('projectDetailCtrl', {});
	  var expectedTitle = 'Project Details -- ' + vm.project.name;

	  expect(vm.title).toEqual(expectedTitle);
	  expect($document[0].title).toEqual(expectedTitle);
	});

	it('sets ready state', function() {

          var vm = $controller('projectDetailCtrl', {});
	  
	  expect(vm.projectFound).toBeTruthy();
	  expect(vm.ready).toBeTruthy();
	});
      });
    });

    describe('error', function() {

      it('sets error state', function() {

        spyOn(projectSvc, 'getAvailableProjects').and.callFake(function(s, e) { e(); });

	var vm = $controller('projectDetailCtrl', {});

        expect(vm.error).toBeTruthy();
	expect(vm.ready).toBeTruthy();
      });
    });
  });

  describe('get attached projects', function() {

    var allProjectsJson;
    var attachedProjectsJson;

    beforeEach(function() {
      $routeParams.projectname = 'Asteroids@home';
      allProjectsJson = readJSON('tests/json/allProjectList.json');
      spyOn(projectSvc, 'getAvailableProjects').and.callFake(function(s, e) { s(allProjectsJson); });
    });

    describe('success', function() {

      beforeEach(function() {
        attachedProjectsJson = readJSON('tests/json/attachedProjects.json');
	spyOn(projectSvc, 'getAttachedProjects').and.callFake(function(s, e) { s(attachedProjectsJson); });
      });

      it('sets attached to true if the current project is currenlty attached', function() {

        var vm = $controller('projectDetailCtrl', {});

	expect(vm.project.attached).toBeTruthy();
      });

      it('sets attached to false if the current project is not currenlty attached', function() {

        $routeParams.projectname = 'Enigma@Home';

        var vm = $controller('projectDetailCtrl', {});
	expect(vm.project.attached).toBeFalsy();
      });
    });

    describe('error', function() {

      it('sets error state', function() {

        spyOn(projectSvc, 'getAttachedProjects').and.callFake(function(s, e) { e(); });

	var vm = $controller('projectDetailCtrl', {});

	expect(vm.error).toBeTruthy();
	expect(vm.ready).toBeTruthy();
      });
    });
  });

  describe('getPlatform', function() {

    beforeEach(function() {
      $routeParams.projectname = 'Asteroids@home';
      allProjectsJson = readJSON('tests/json/allProjectList.json');
      spyOn(projectSvc, 'getAvailableProjects').and.callFake(function(s, e) { s(allProjectsJson); });
    });

    describe('success', function() {
      
      beforeEach(function() {
        var platformJson = readJSON('tests/json/platform.json');
      })

      it('sets platformSupported if the platform is supported', function() {

	spyOn(systemInfoSvc, 'getPlatform').and.callFake(function(s,e) { s(platformJson); });
        var vm = $controller('projectDetailCtrl', {});

	expect(vm.project.platformSupported).toBeTruthy();
      });

      it('sets platformSupported to false if the platform is not supported', function() {

	platformJson.platform = 'moo';
	spyOn(systemInfoSvc, 'getPlatform').and.callFake(function(s,e) { s(platformJson); });
        var vm = $controller('projectDetailCtrl', {});

	expect(vm.project.platformSupported).toBeFalsy();
      });

      it('sets gotPlatform', function() {
	spyOn(systemInfoSvc, 'getPlatform').and.callFake(function(s,e) { s(platformJson); });
        var vm = $controller('projectDetailCtrl', {});
        
	expect(vm.gotPlatform).toBeTruthy();
      });
    });

    describe('error', function() {

      it('sets error state', function() {

        spyOn(systemInfoSvc, 'getPlatform').and.callFake(function(s,e) { e(); });

	var vm = $controller('projectDetailCtrl', {});

	expect(vm.ready).toBeTruthy();
	expect(vm.error).toBeTruthy();
      });
    });
  });
});
