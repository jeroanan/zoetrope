/**
 * tests for projectsCtrl
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

describe('ProjectsCtrl', function() {
  beforeEach(module('zoetropeControllers'));
 
  var $controller;
  var $document;
  var $location;
  var projectSvc;

  beforeEach(inject(function(_$controller_, _$document_, _$location_, _projectSvc_) {

    $controller = _$controller_;
    $document = _$document_;
    $location = _$location_;
    projectSvc = _projectSvc_;
  }));

  describe('initialisation', function() {

    var expectedTitle = 'BOINC Projects';

    it('is successful', function() {

      var vm = $controller('ProjectsCtrl', {});
      expect(vm.sortProp).toBe('name');
      expect(vm.reverseSort).toBeFalsy();
      expect(vm.ready).toBeFalsy();
      expect(vm.showRawData).toBeFalsy();
      expect(vm.title).toBe(expectedTitle);
      expect(vm.detachUrl).toBe('');
      expect(vm.detachUrl).toBe('');
      expect(vm.detachName).toBe('');
      expect(vm.error).toBeFalsy();
      expect(vm.operationSuccess).toBeFalsy();
      expect(vm.operationSuccessMessage).toBe('');
    });

    it('sets document title', function() {
      var vm = $controller('ProjectsCtrl', {});
      expect($document[0].title).toBe(expectedTitle);
    });

    it('calls the project svc to get the list of attached projects', function() {
      spyOn(projectSvc, 'getAttachedProjects');
      var vm = $controller('ProjectsCtrl', {});

      expect(projectSvc.getAttachedProjects).toHaveBeenCalled();
    });
  });

  describe('get projects', function() {

    var json;

    beforeEach(function() {
      json = readJSON('tests/json/projects.json');
    });

    describe('success', function() {
      it('redirects unauthenticated users to the login screen', function() {
        json = [{error_message: -1414}]; 
        spyOn(projectSvc, 'getAttachedProjects').and.callFake(function(s, e) { s(json); });
 
        vm = $controller('ProjectsCtrl', {});
        expect($location.path()).toEqual('/#/login');
      });

      it('makes the json into the projects for display', function() {

        spyOn(projectSvc, 'getAttachedProjects').and.callFake(function(s, e) { s(json); });

        vm = $controller('ProjectsCtrl', {});
        expect(vm.projects).toEqual(json); 
      });
      
      it('sets ready state', function() {

        spyOn(projectSvc, 'getAttachedProjects').and.callFake(function(s, e) { s(json); });

        vm = $controller('ProjectsCtrl', {});
	expect(vm.ready).toBeTruthy();
      });
    });

    describe('error', function() {
      
      it('sets ready and error states', function() {

        spyOn(projectSvc, 'getAttachedProjects').and.callFake(function(s, e) { e(); });
	var vm = $controller('ProjectsCtrl', {});

	expect(vm.ready).toBeTruthy();
	expect(vm.error).toBeTruthy();
      });
    });
  });

  describe('project operations', function() {

    var vm;
    var testUrl; 
    var projectsJson;

    beforeEach(function() {
      testUrl = 'http://asteroidsathome.net/boinc/';
      projectsJson = readJSON('tests/json/projects.json');

      spyOn(projectSvc, 'getAttachedProjects').and.callFake(function(s, e) { s(projectsJson); });
      spyOn(projectSvc, 'updateProject').and.callFake(function(url, s, e) { s(); });
      spyOn(projectSvc, 'noMoreWork').and.callFake(function(url, s, e) { s(); });
      spyOn(projectSvc, 'allowMoreWork').and.callFake(function(url, s, e) { s(); });
      spyOn(projectSvc, 'suspendProject').and.callFake(function(url, s, e) { s(); });
      spyOn(projectSvc, 'resumeProject').and.callFake(function(url, s, e) { s(); });
      vm = $controller('ProjectsCtrl', {});
    });

    describe('detach clicked', function() {
      it('sets detachUrl and detachName', function() {
      
	var expectedName = 'Test Project';

	vm.detachClicked(expectedName, testUrl);
        expect(vm.detachUrl).toEqual(testUrl);
	expect(vm.detachName).toEqual(expectedName);
      });
    });

    describe('update clicked', function() {

      beforeEach(function() {
        vm.updateClicked(testUrl);
      });

      it('calls project svc to request the project be updated', function() {
	expect(projectSvc.updateProject).toHaveBeenCalled();
      });

      it('sets successful state', function() {
	expect(vm.operationSuccess).toBeTruthy();
      });

      it('sets success message', function() {
        expect(vm.operationSuccessMessage).toBe('Project updated successfully');
      });
    });

    describe('no more work clicked', function() {

      beforeEach(function() {
        vm.noMoreWorkClicked(testUrl);
      });

      it('calls project svc to request that no more work be requested for the project', function() {
        expect(projectSvc.noMoreWork).toHaveBeenCalled();
      });
 
      it('sets the project\'s dont_request_more_work flag to true', function() {
        expect(vm.projects[0].dont_request_more_work).toBeTruthy();
      });

      it('sets successful state', function() {
	expect(vm.operationSuccess).toBeTruthy();
      });

      it('sets success message', function() {
        expect(vm.operationSuccessMessage).toBe('New tasks disallowed');
      });
    });

    describe('allow more work clicked', function() {

      beforeEach(function() {
        vm.allowMoreWorkClicked(testUrl);
      });

      it('calls project svc to request that more work can be requested for the project', function() {
	expect(projectSvc.allowMoreWork).toHaveBeenCalled();
      });

      it('sets the project\'s dont_request_more_work flag to false', function() {
        expect(vm.projects[0].dont_request_more_work).toBeFalsy();
      });

      it('sets successful state', function() {
	expect(vm.operationSuccess).toBeTruthy();
      });

      it('sets success message', function() {
        expect(vm.operationSuccessMessage).toBe('New tasks re-allowed');
      });
    });

    describe('suspend project clicked', function() {

      beforeEach(function() {
        vm.suspendProjectClicked(testUrl);
      });

      it('calls project svc to request that the project is suspended', function() {
        vm.suspendProjectClicked(testUrl);
	expect(projectSvc.suspendProject).toHaveBeenCalled();
      });

      it('sets the project\'s suspended_via_gui property to true', function() {
        vm.suspendProjectClicked(testUrl);
	expect(vm.projects[0].suspended_via_gui).toBeTruthy();
      });

      it('sets successful state', function() {
	expect(vm.operationSuccess).toBeTruthy();
      });

      it('sets success message', function() {
        expect(vm.operationSuccessMessage).toBe('Project suspended');
      });
    });

    describe('resume project clicked', function() {

      beforeEach(function() {
        vm.resumeProjectClicked(testUrl);
      });

      it('calls project svc to request that the project is resumed', function() {
	expect(projectSvc.resumeProject).toHaveBeenCalled();
      });

      it('sets the project\'s suspended_via_gui property to false', function() {
	expect(vm.projects[0].suspended_via_gui).toBeFalsy();
      });

      it('sets successful state', function() {
	expect(vm.operationSuccess).toBeTruthy();
      });

      it('sets success message', function() {
        expect(vm.operationSuccessMessage).toBe('Project resumed');
      });
    });
  });
});
