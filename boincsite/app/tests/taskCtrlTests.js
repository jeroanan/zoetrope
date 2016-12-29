/**
 * Unit tests for taskCtrl
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
describe('taskCtrl', function() {
  beforeEach(module('zoetropeControllers'));

  var $controller;
  var $routeParams;
  var $document;
  var $location;
  var taskSvc;
  var projectSvc;

  beforeEach(inject(function(_$controller_, _$routeParams_, _$document_, _$location_, _taskSvc_, _projectSvc_) {
    $controller = _$controller_;
    $routeParams = _$routeParams_;
    $document = _$document_;
    $location = _$location_;
    taskSvc = _taskSvc_;
    projectSvc = _projectSvc_;
  }));

  describe('initialisation', function() {

    it('is done correctly', function() {

      var vm = $controller('TaskCtrl', {});
      var expectedTitle = 'Task Summary';
      expect(vm.ready).toBeFalsy();
      expect(vm.title).toBe(expectedTitle);
      expect(vm.task).toEqual({});
      expect(vm.error).toBe('');
      expect(vm.showConfirmAbort).toBeFalsy();
      expect(vm.operationSuccess).toBeFalsy();
      expect(vm.operationSuccessMessage).toBe('');
      expect($document[0].title).toBe(expectedTitle);
    });
  });

  describe('getTask', function() {

    it('sets its task to the data from taskSvc.getTask', function() {

      var json = readJSON('tests/json/task.json');

      spyOn(taskSvc, 'getTask').and.callFake(function(tid, s, e) { s(json); });
      var vm = $controller('TaskCtrl', {});

      expect(vm.task).toEqual(json);
    });

    it('redirects unathenticated users to the login page', function() {
    
      var json = {error_message: -1414};

      spyOn(taskSvc, 'getTask').and.callFake(function(tid, s, e) { s(json); });
      var vm = $controller('TaskCtrl', {});

      expect($location.path()).toBe('/#/login');
    });

    it('calls projectSvc.getAttachedProjects when successful', function() {

      var json = readJSON('tests/json/task.json');

      spyOn(taskSvc, 'getTask').and.callFake(function(tid, s, e) { s(json); });
      spyOn(projectSvc, 'getAttachedProjects');

      var vm = $controller('TaskCtrl', {});
      expect(projectSvc.getAttachedProjects).toHaveBeenCalled();
    });

    it('sets ready and error states in the case of error', function() {

      spyOn(taskSvc, 'getTask').and.callFake(function(tid, s, e) { e(); });

      var vm = $controller('TaskCtrl', {});
      expect(vm.error).toBeTruthy();
      expect(vm.ready).toBeTruthy();
    });

    describe('task name truncation', function() {

      it('does not add elipses to task names that are less than twenty characters long', function() {

        var json = readJSON('tests/json/task.json');
	var taskName = 'My Task';
        json.name = taskName;

        spyOn(taskSvc, 'getTask').and.callFake(function(tid, s, e) { s(json); });
        var vm = $controller('TaskCtrl', {});
	expect(vm.task.truncatedName).toEqual(taskName);
	expect(vm.task.displayName).toEqual(taskName);
      });

      it('adds elipses to task names that are greater than twenty chracters long', function() {

        var json = readJSON('tests/json/task.json');
	var taskName = 'My Task with a really long name';
	var expectedTaskName = 'My Task with a reall...';
        json.name = taskName;

        spyOn(taskSvc, 'getTask').and.callFake(function(tid, s, e) { s(json); });
        var vm = $controller('TaskCtrl', {});
	expect(vm.task.truncatedName).toEqual(expectedTaskName);
	expect(vm.task.displayName).toEqual(expectedTaskName);
      });
    });

    describe('active_task_state', function() {

      it('is set to "Inactive" if active_task_state is zero', function() {

        var json = readJSON('tests/json/task.json');
	json.active_task_state = 0;

        spyOn(taskSvc, 'getTask').and.callFake(function(tid, s, e) { s(json); });
        var vm = $controller('TaskCtrl', {});
	expect(vm.task.active_task_state).toEqual('Inactive');
      });

      it('is set to "Active" if active_task_state is non-zero', function() {

        var json = readJSON('tests/json/task.json');
	json.active_task_state = 1;

        spyOn(taskSvc, 'getTask').and.callFake(function(tid, s, e) { s(json); });
        var vm = $controller('TaskCtrl', {});
	expect(vm.task.active_task_state).toEqual('Active');
      });
    });
  });

  describe('get project', function() {

    describe('successfully', function() {
      var taskJson;
      var projectJson;
      var vm;

      beforeEach(function() {

        taskJson = readJSON('tests/json/task.json');
        projectJson = readJSON('tests/json/attachedProjects.json');
  
        spyOn(taskSvc, 'getTask').and.callFake(function(tid, s, e) { s(taskJson); });
        spyOn(projectSvc, 'getAttachedProjects').and.callFake(function(s, e) { s(projectJson); });
        vm = $controller('TaskCtrl', {});
      });
      
      it('sets the task project name correctly', function() {
        expect(vm.task.project_name).toEqual(projectJson[0].project_name);
      });

      it('sets the task state correctly', function() {

        //TODO: See target. This seems to be more appropriate with the getTask code.
        expect(vm.task.state).toEqual('Running');
      });

      it('sets time so far correctly', function() {
        expect(vm.task.time_so_far).toEqual('0:09:23'); //TODO This is wrong - the leading zero should be padded
      });

      it('sets ready state', function() {

        expect(vm.ready).toBeTruthy();
      });
    });

    describe('unsuccessfully', function() {

      it('sets ready and error state in the case of error', function() {

        taskJson = readJSON('tests/json/task.json');
        spyOn(taskSvc, 'getTask').and.callFake(function(tid, s, e) { s(taskJson); });
        spyOn(projectSvc, 'getAttachedProjects').and.callFake(function(s, e) { e(); });
        vm = $controller('TaskCtrl', {});

	expect(vm.ready).toBeTruthy();
	expect(vm.error).toBeTruthy();
      });
    });
  });

  describe('getDeadlineCLass', function() {

    //TODO: See target, which will be moved into a svc.
    describe('getDeadlineClass', function() {
  
      it('returns text-danger class if task is overdue', function() {
  
        var task = { overdue: true };
        var vm = $controller('TaskCtrl', {});
        var result = vm.getDeadlineClass(task);
  
        expect(result).toBe('text-danger');
      });
  
      it('returns text-warning if task is approaching deadline', function() {
  
        var task = { deadlineApproaching: true };
  
        var vm = $controller('tasksCtrl', {});
        var result = vm.getDeadlineClass(task);
  
        expect(result).toBe('text-warning');
      });
  
      it('returns undefined if task is neither overdue nor approaching deadline', function() {
  
        var task = { deadlineApproaching: false, overdue: false };
  
        var vm = $controller('tasksCtrl', {});
        var result = vm.getDeadlineClass(task);
  
        expect(result).toBeUndefined();
      });
    });
  });

  describe('taskNameClicked', function() {

    var task;
    var vm;
    
    var taskName;
    var truncatedTaskName;

    beforeEach(function() {

      task = readJSON('tests/json/task.json');
      taskName = 'My Task with a really long name';
      task.name = taskName;
      truncatedTaskName = 'My Task with a reall...';

      spyOn(taskSvc, 'getTask').and.callFake(function(tid, s, e) { s(task); });;
      vm = $controller('TaskCtrl', {});
    });

    it('sets task displayName to taskName if truncatedTaskName is currently displayed', function() {

      vm.task.displayName = truncatedTaskName;
      vm.taskNameClicked();
      expect(vm.task.displayName).toEqual(taskName);
    });

    it('sets task displayName to truncatedTaskName if taskName is currently displayed', function() {

      vm.task.displayName = taskName;
      vm.taskNameClicked();
      expect(vm.task.displayName).toEqual(truncatedTaskName);
    });
  });

 describe('task operations', function() {

   var vm;

   beforeEach(function() {

     var taskJson = readJSON('tests/json/task.json');
     var projectsJson = readJSON('tests/json/attachedProjects.json');
     vm = $controller('TaskCtrl', {});
   });

   it('taskSvc is called to suspend the task when suspendClicked is invoked', function() {

     spyOn(taskSvc, 'suspendTask');
     vm.suspendClicked();
     expect(taskSvc.suspendTask).toHaveBeenCalled();
   });

   it('taskSvc is called to resume the task when resumeClicked is invoked', function() {

     spyOn(taskSvc, 'resumeTask');
     vm.resumeClicked();
     expect(taskSvc.resumeTask).toHaveBeenCalled();
   });

   it('taskSvc is called to abort the task when abortTaskLinkClicked is invoked', function() {

     spyOn(taskSvc, 'abortTask');
     vm.abortTaskLinkClicked();
     expect(taskSvc.abortTask).toHaveBeenCalled();
   });

   describe('abort button clicked', function() {

     it('shows the abort confirmation link if it\'s not currenlty visible', function() {

       vm.abortButtonClicked();
       expect(vm.showConfirmAbort).toBeTruthy();
     });

     it('hides the abort confirmation link if it\'s currenlty visible', function() {

       vm.showConfirmAbort = true;
       vm.abortButtonClicked();
       expect(vm.showConfirmAbort).toBeFalsy();
     });
   });
 });
});
