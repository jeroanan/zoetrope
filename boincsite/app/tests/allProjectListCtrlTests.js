/**
 * Unit tests for allProjectListCtrl
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

describe('allProjectListCtrl', function() {
  beforeEach(module('zoetropeControllers'));
 
  var $controller;
  var $document;
  var $location;
  var projectSvc;
  var systemInfoSvc;

  beforeEach(inject(function(_$controller_, _$document_, _$location_, _projectSvc_, _systemInfoSvc_) {

    $controller = _$controller_;
    $document = _$document_;
    $location = _$location_;
    projectSvc = _projectSvc_;
    systemInfoSvc = _systemInfoSvc_;
  }));

  describe('initialisation', function() {

    it('sets initial set correctly', function() {
      var vm = $controller('allProjectListCtrl', {});
      var expectedTitle = 'All Projects';

      expect(vm.ready).toBeFalsy();
      expect(vm.error).toBeFalsy();
      expect(vm.title).toEqual(expectedTitle);
      expect(vm.sortProp).toEqual('name');
      expect(vm.reverseSort).toBeFalsy();
      expect(vm.availableProjects).toBeNull();
      expect(vm.allProjects).toEqual([]);
      expect($document[0].title).toEqual(expectedTitle);
    });
    
    it('calls project svc to get the available projects', function() {
      
      spyOn(projectSvc, 'getAvailableProjects');
      var vm = $controller('allProjectListCtrl', {});
      
      expect(projectSvc.getAvailableProjects).toHaveBeenCalled();
    });
  });

  describe('get availalble projects', function() {

    describe('success', function() {

      describe('unauthenticated', function() {
        it('redirects unathenticated users to the login page', function() {
  
          var json = [{error_message: -1414}];
          spyOn(projectSvc, 'getAvailableProjects').and.callFake(function (s, e) { s(json); });
  
          var vm = $controller('allProjectListCtrl', {});
          expect($location.path()).toEqual('/#/login');
        });
      });

      describe('authenticated', function() {
        
        var allProjectsJson;
	var vm;

	beforeEach(function() {
          allProjectsJson = readJSON('tests/json/allProjectList.json');
	  attachedProjectsJson = readJSON('tests/json/attachedProjects.json');
	  platformJson = readJSON('tests/json/platform.json');

          spyOn(projectSvc, 'getAvailableProjects').and.callFake(function (s, e) { s(allProjectsJson); });
          spyOn(projectSvc, 'getAttachedProjects').and.callFake(function (s, e) { s(attachedProjectsJson); });
	  spyOn(systemInfoSvc, 'getPlatform').and.callFake(function(s, e) { s(platformJson); });
  
          vm = $controller('allProjectListCtrl', {});
	});

        it('sets allProjects to the json returned from projectSvc.getAvailableProjects', function() {
          expect(vm.allProjects).toEqual(allProjectsJson);
        });

	it('calls project svc to get attached projects', function() {
	  expect(projectSvc.getAttachedProjects).toHaveBeenCalled();
	});

	it('calls system info svc to get platform information', function() {
	  expect(systemInfoSvc.getPlatform).toHaveBeenCalled();
	});
      });
    });
    
    describe('error', function() {

      it('sets error state correctly', function() {
        
	spyOn(projectSvc, 'getAvailableProjects').and.callFake(function(s, e) { e(); });

	var vm = $controller('allProjectListCtrl', {});

        expect(vm.ready).toBeTruthy();
	expect(vm.error).toBeTruthy();
      });
    });
  });

  describe('get attached projects', function() {

    var allProjectsJson;
    var attachedProjectsJson;

    beforeEach(function() {
      allProjectsJson = readJSON('tests/json/allProjectList.json');
      attachedProjectsJson = readJSON('tests/json/attachedProjects.json');
      
      spyOn(projectSvc, 'getAvailableProjects').and.callFake(function (s, e) { s(allProjectsJson); });
    });

    describe('success', function() {

      describe('unauthenticated', function() {
        it('redirects unathenticated users to the login page', function() {
  
          var json = [{error_message: -1414}];
          spyOn(projectSvc, 'getAttachedProjects').and.callFake(function (s, e) { s(json); });
  
          var vm = $controller('allProjectListCtrl', {});
          expect($location.path()).toEqual('/#/login');
        });
      });

      describe('authenticated', function() {

        it('flags available projects as attached if they appear in the json from getAttachedProjects', function() {
        
	  spyOn(projectSvc, 'getAttachedProjects').and.callFake(function (s, e) { s(attachedProjectsJson); });

          var vm = $controller('allProjectListCtrl', {});

	  var theProject = vm.availableProjects.filter(function(x) {
            return x.name===attachedProjectsJson[0].project_name;
	  });

	  expect(theProject.length).toBe(1);
	  expect(theProject[0].attached).toBeTruthy();
	});
      });
    });

    describe('error', function() {

      it('sets error state', function() {

        spyOn(projectSvc, 'getAttachedProjects').and.callFake(function(s, e) { e(); });

        var vm = $controller('allProjectListCtrl', {});
        expect(vm.ready).toBeTruthy();
	expect(vm.error).toBeTruthy();
      });
    });
  });

  describe('get platform', function() {

    var allProjectsJson;

    beforeEach(function() {
      allProjectsJson = readJSON('tests/json/allProjectList.json');
      plastformJson = readJSON('tests/json/platform.json');
      
      spyOn(projectSvc, 'getAvailableProjects').and.callFake(function (s, e) { s(allProjectsJson); });
    });

    describe('success', function() {

      var vm;

      beforeEach(function() {
        spyOn(systemInfoSvc, 'getPlatform').and.callFake(function (s, e) { s(platformJson); });
        vm = $controller('allProjectListCtrl', {});
      });

      it('sets compatible projects to as supported', function() {

        var theProject = vm.allProjects.filter(function(x) {
          return x.name===attachedProjectsJson[0].project_name;
        });

	expect(theProject.length).toBe(1);
	expect(theProject[0].supported).toBeTruthy();
      });

      it('does not set incompatible projects as supported', function() {

        var theProject = vm.allProjects.filter(function(x) {
          return x.name==='Climateprediction.net';
        });

	expect(theProject.length).toBe(1);
	expect(theProject[0].supported).toBeFalsy();

      });
//Climateprediction.net
    });

    describe('error', function() {

      it('sets error state', function() {

        spyOn(systemInfoSvc, 'getPlatform').and.callFake(function(s, e) { e(); });

        var vm = $controller('allProjectListCtrl', {});
        expect(vm.ready).toBeTruthy();
	expect(vm.error).toBeTruthy();
      });
    });
  });
});
