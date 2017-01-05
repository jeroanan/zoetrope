/**
 * Unit tests for detachProjectCtrl
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

describe('detachProjectCtrl', function() {
  beforeEach(module('zoetropeControllers'));
 
  var $controller;
  var $location;
  var $document;
  var projectSvc;

  beforeEach(inject(function(_$controller_, _$location_, _$document_, _projectSvc_)  {

    $controller = _$controller_;
    $location = _$location_;
    $document = _$document_;
    projectSvc = _projectSvc_;
  }));

  describe('initialisation', function() {

    it('sets initial state correctly', function() {

      var expectedTitle = 'Detach Project';

      var vm = $controller('detachProjectCtrl', {});

      expect(vm.attachedProjects).toBeNull();
      expect(vm.ready).toBeFalsy();
      expect(vm.showConfirmDetach).toBeFalsy();
      expect(vm.selectedProject).toBeNull();
      expect(vm.title).toEqual(expectedTitle);
      expect(vm.detachSuccessful).toBeFalsy();
      expect(vm.detachClicked).toBeFalsy();
      expect(vm.detachErrorMessage).toEqual('');
      expect($document[0].title).toEqual(expectedTitle);
    });

    it('calls project svc to get the list of attached projects', function() {

      spyOn(projectSvc, 'getAttachedProjects');

      var vm = $controller('detachProjectCtrl', {});

      expect(projectSvc.getAttachedProjects).toHaveBeenCalled();
    });

  });
  
  describe('got attached projects', function() {

    describe('unauthenticated', function() {

      it('redirects unauthenticated users to the login page', function() {

        var json = [{error_message: -1414}];

	spyOn(projectSvc, 'getAttachedProjects').and.callFake(function(s,e) { s(json); });

	var vm = $controller('detachProjectCtrl', {});

        expect($location.path()).toEqual('/#/login');
      });
    });

    describe('authenticated', function() {

      it('sets attached projects to the returned json', function() {

        json = readJSON('tests/json/attachedProjects.json');

	spyOn(projectSvc, 'getAttachedProjects').and.callFake(function(s,e) { s(json); });

	var vm = $controller('detachProjectCtrl', {});

	expect(vm.attachedProjects).toEqual(json);
	expect(vm.ready).toBeTruthy();
      });
    });
  });

  describe('detach button clicked', function() {

    it('sets error state if no project is selected', function() {

      var vm = $controller('detachProjectCtrl', {});
      vm.detachButtonClicked();

      expect(vm.detachClicked).toBeTruthy();
      expect(vm.detachSuccessful).toBeFalsy();
      expect(vm.detachErrorMessage).toEqual('Select a project to detach from first.');
    });

    it('shows detach confirmation if selected project is something', function() {

      var vm = $controller('detachProjectCtrl', {});
      vm.selectedProject = {};
      vm.detachButtonClicked();

      expect(vm.showConfirmDetach).toBeTruthy();
    });
  });
  
  describe('detach confirmation clicked', function() {

    it('calls project svc to request project detachment', function() {
    
      spyOn(projectSvc, 'detachProject');

      var vm = $controller('detachProjectCtrl', {});
      vm.detachLinkClicked();

      expect(vm.detachClicked).toBeTruthy();
      expect(projectSvc.detachProject).toHaveBeenCalled();
    });

    it('redirects unauthenticated users to the login page', function() {

      var json = {error_message: -1414};
      spyOn(projectSvc, 'detachProject').and.callFake(function(project, s, e) { s(json); });

      var vm = $controller('detachProjectCtrl', {});
      vm.detachLinkClicked();

      expect($location.path()).toEqual('/#/login');
    });

    it('sets success state when project has successfully detached', function() {
      var json = {error_message: 'ok', success: true};
      spyOn(projectSvc, 'detachProject').and.callFake(function(project, s, e) { s(json); });

      var vm = $controller('detachProjectCtrl', {});
      vm.detachLinkClicked();

      expect(vm.detachErrorMessage).toEqual('ok');
      expect(vm.detachSuccessful).toBeTruthy();
    });
  });

  describe('selected project changed', function() {

    it('sets state appropriately', function() {

      var vm = $controller('detachProjectCtrl', {});
      vm.detachErrorMessage = 'test';
      vm.detachClicked = true;
      vm.showConfirmDetach = true;

      vm.selectedProjectChanged();

      expect(vm.detachErrorMessage).toEqual('');
      expect(vm.detachClicked).toBeFalsy();
      expect(vm.showConfirmDetach).toBeFalsy();
    });
  });
});

