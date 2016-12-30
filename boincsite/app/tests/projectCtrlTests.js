/**
 * tests for projectCtrl
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

describe('ProjectCtrl', function() {
  beforeEach(module('zoetropeControllers'));
 
  var $controller;
  var $routeParams;
  var $compile;
  var $scope;
  var $document;
  var $location;
  var projectSvc;

  beforeEach(inject(function($rootScope, _$controller_, _$routeParams_, _$compile_, _$document_, _$location_, _projectSvc_) {

    $controller = _$controller_;
    $routeParams = _$routeParams_;
    $compile = _$compile_;
    $document = _$document_;
    $location = _$location_;
    projectSvc = _projectSvc_;
    $scope = $rootScope.$new();
  }));

  describe('initialisation', function() {

    it('initialises controller state', function() {
      var vm = $controller('ProjectCtrl', {$scope: $scope});
      expect(vm.ready).toBeFalsy();
      expect(vm.title).toBe('');
      expect(vm.projectFound).toBeFalsy();
      expect(vm.project).toEqual({});
      expect($document[0].title).toEqual(vm.title);
    });

    it('calls the project svc to get the project', function() {

      spyOn(projectSvc, 'getProject');
      var vm = $controller('ProjectCtrl', {$scope: $scope});
      
      expect(projectSvc.getProject).toHaveBeenCalled();
    });
  });

  describe('get project', function() {

    it('redirects unauthenticated users to the login screen', function() {
      
      spyOn(projectSvc, 'getProject').and.callFake(function(pid, s, e) {
        var data = {
          error_message: -1414
	}

	s(data);
      });

      var vm = $controller('ProjectCtrl', {$scope: $scope});
      expect($location.path()).toEqual('/#/login');
    });
    
    describe('success', function() {

      var json;
      var vm;

      beforeEach(function() {
        json = readJSON('tests/json/project.json');
        spyOn(projectSvc, 'getProject').and.callFake(function(pid, s, e) {
  	s(json);
        });
        
        vm = $controller('ProjectCtrl', {$scope: $scope});
      });

      it('gets the project correctly', function() {
        expect(vm.project).toEqual(json);
      });

      it('sets the title correctly', function() {

	var expectedTitle = 'Project Summary -- ' + json.project_name;
        expect(vm.title).toEqual(expectedTitle);
	expect($document[0].title).toEqual(expectedTitle);
      });

      it('updates other controller state correctly', function() {

        expect(vm.projectFound).toBeTruthy();
	expect(vm.ready).toBeTruthy();
      });
    });

    describe('error', function() {

      it('causes controller state to be updated accordingly.', function() {
  
        spyOn(projectSvc, 'getProject').and.callFake(function(pid, s, e) { e() });
        
        var vm = $controller('ProjectCtrl', {$scope: $scope});
        
        expect(vm.ready).toBeTruthy();
        expect(vm.projectFound).toBeFalsy();
      });
    });
  });

  describe('project operations', function() {

   var vm;

   beforeEach(function() {
     spyOn(projectSvc, 'updateProject');
     spyOn(projectSvc, 'noMoreWork').and.callFake(function(url, s, e) { s(); });
     spyOn(projectSvc, 'allowMoreWork').and.callFake(function(url, s, e) { s(); });
     spyOn(projectSvc, 'suspendProject').and.callFake(function(url, s, e) { s(); });
     spyOn(projectSvc, 'resumeProject').and.callFake(function(url, s, e) { s(); });
     spyOn(projectSvc, 'detachWhenDone');
     spyOn(projectSvc, 'dontDetachWhenDone');
     vm = $controller('ProjectCtrl', {$scope: $scope});  
   });

   describe('update project', function() {
     
     it('does not call project svc to update the project if the controller is not in the ready state', function() {
       vm.updateProject();
       expect(projectSvc.updateProject).not.toHaveBeenCalled();
     });

     it('calls project svc to update the project if the controller is in the ready state', function() {
       vm.ready = true;
       vm.updateProject();
       expect(projectSvc.updateProject).toHaveBeenCalled();
     });
   });

   describe('no more work clicked', function() {
     it('calls the project svc to indicate no more work is to be requested', function() {
       vm.noMoreWorkClicked();
       expect(vm.project.dont_request_more_work).toBeTruthy();
     });
   });

   describe('allow more work clicked', function() {
     it('calls the project svc to indicate that a project can now request more work', function() {
       vm.noMoreWorkClicked();
       vm.allowMoreWorkClicked();
       expect(vm.project.dont_request_more_work).toBeFalsy();
     });
   });

   describe('suspend project clicked', function() {

     it('calls the project svc to indicate that a project is to be suspended', function() {
       vm.suspendClicked();
       expect(vm.project.suspended_via_gui).toBeTruthy();
     });
   });

   describe('resume project clicked', function() {

     it('calls project svc to indicate that a suspended project should be resumed', function() {

       vm.suspendClicked();
       vm.resumeClicked();
       expect(vm.project.suspended_via_gui).toBeFalsy();
     });
   });

   describe('detach when done clicked', function() {

     it('calls project svc to indicate that a project should be detached when outstanding workunits are done', function() {

       vm.detachWhenDoneClicked();
       expect(projectSvc.detachWhenDone).toHaveBeenCalled();
     });
   });

   describe('don\'t detach when done clicked', function() {

     it('calls project svc to indicate that a project should not be detached when outstanding workunits are done', function() {
       vm.dontDetachWhenDoneClicked();
       expect(projectSvc.dontDetachWhenDone).toHaveBeenCalled();
     });
   });
  });
});
