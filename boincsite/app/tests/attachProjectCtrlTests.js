/**
 * Unit tests for attachProjectCtrl
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

describe('attachProjectCtrl', function() {
  beforeEach(module('zoetropeControllers'));
 
  var $controller;
  var $location;
  var projectSvc;
  var md5Svc;

  beforeEach(inject(function(_$controller_, _$location_, _projectSvc_, _md5Svc_)  {

    $controller = _$controller_;
    $location = _$location_;
    projectSvc = _projectSvc_;
    md5Svc = _md5Svc_;
  }));

  describe('initialisation', function() {

    it('sets initial state correctly', function() {
      var vm = $controller('attachProjectCtrl', {});

      expect(vm.selectedProject).toEqual('');
      expect(vm.emailaddress).toEqual('');
      expect(vm.password).toEqual('');
      expect(vm.ready).toBeFalsy();
      expect(vm.title).toEqual('Attach Project');
      expect(vm.errorText).toEqual('');
      expect(vm.success).toBeFalsy();
      expect(vm.loading).toBeFalsy();
    });

    it('calls project svc to get the list of available projects', function() {

      spyOn(projectSvc, 'getAvailableProjects');

      var vm = $controller('attachProjectCtrl', {});
      expect(projectSvc.getAvailableProjects).toHaveBeenCalled();
    });
  })

  describe('getAvailableProjects', function() {

    describe('unauthenticated', function() {
      
      it('redirects unauthenticated users to the login page', function() {
      
        json = [{error_message: -1414}];

	spyOn(projectSvc, 'getAvailableProjects').and.callFake(function(s, e) { s(json); });
	var vm = $controller('attachProjectCtrl', {});

	expect($location.path()).toEqual('/#/login');
      });
    });

    describe('authenticated', function() {
    
      var json;

      beforeEach(function() {
	json = readJSON('tests/json/allProjectList.json');
	spyOn(projectSvc, 'getAvailableProjects').and.callFake(function(s,e) { s(json); });
      });

      it('sets ready state', function() {
        var vm = $controller('attachProjectCtrl', {});

	expect(vm.ready).toBeTruthy();
      });
    });
  });

  describe('submitClicked', function() {

      beforeEach(function() {
	json = readJSON('tests/json/allProjectList.json');
	spyOn(projectSvc, 'getAvailableProjects').and.callFake(function(s,e) { s(json); });
      });

      it('resets success', function() {

        var vm = $controller('attachProjectCtrl', {});
	vm.success = true;
	vm.errorText = 'test';

	vm.submitClicked();

	expect(vm.success).toBeFalsy();
      });

      describe('validation', function() {

	var vm;

        beforeEach(function() {
	  vm = $controller('attachProjectCtrl', {});
  	  vm.selectedProject = 'proj';
          vm.emailaddress = 'test@test.com';
          vm.password = 'mypassword';
	});

	it('succeeds and sets loading to true if all required parameters are in place', function() {
          vm.submitClicked();   
	  expect(vm.loading).toBeTruthy();
	});

	it('sets success flag to false if selectedProject is missing', function() {
	  vm.selectedProject = '';
	  vm.submitClicked();
	  expect(vm.success).toBeFalsy();
	});

	it('sets success flag to false if emailaddress is missing', function() {
	  vm.emailaddress = '';
	  vm.submitClicked();
	  expect(vm.success).toBeFalsy();
	});

	it('sets success flag to false if password is missing', function() {
	  vm.password = '';
	  vm.submitClicked();
	  expect(vm.success).toBeFalsy();
	});
      });

      it('calls the md5 service', function() {

	var vm = $controller('attachProjectCtrl', {});
	vm.selectedProject = 'proj';
        vm.emailaddress = 'test@test.com';
        vm.password = 'mypassword';

	spyOn(md5Svc, 'query');

        vm.submitClicked();

        expect(md5Svc.query).toHaveBeenCalledWith(vm.password + vm.emailaddress);
      });

      it('calls project svc to request to attach to the project', function() {

	var vm = $controller('attachProjectCtrl', {});
	vm.selectedProject = 'proj';
        vm.emailaddress = 'test@test.com';
        vm.password = 'mypassword';

	spyOn(projectSvc, 'attachProject');
	
	vm.submitClicked();

        expect(projectSvc.attachProject).toHaveBeenCalled();
      });

      describe('project attached', function() {
        
	var vm;

	beforeEach(function() {
  	  vm = $controller('attachProjectCtrl', {});
  	  vm.selectedProject = 'proj';
          vm.emailaddress = 'test@test.com';
          vm.password = 'mypassword';
	});
	
	describe('unauthenticated', function() {

	  it('redirects unauthenticated users to the login page', function() {
          
	    var json = {error_message: -1414};
	    spyOn(projectSvc, 'attachProject').and.callFake(function(proj, email, pass, a, b, s, e) { s(json); });
	    vm.submitClicked();

	    expect($location.path()).toEqual('/#/login');
	  });
	});

	it('sets success state when project has successfully attached', function() {

	    var json = {success: true, error_message: 'ready'};
	    spyOn(projectSvc, 'attachProject').and.callFake(function(proj, email, pass, a, b, s, e) { s(json); });
	    vm.submitClicked();

	    expect(vm.loading).toBeFalsy();
	    expect(vm.success).toBeTruthy();
	    expect(vm.errorText).toEqual('ready');
	});
      });
  });

  describe('selectedProjectChanged', function() {

    it('resets error text', function() {
      var vm = $controller('attachProjectCtrl', {});

      vm.errorText = 'test';
      vm.selectedProjectChanged();

      expect(vm.errorText).toEqual('');
    });
  });
});

