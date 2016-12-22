describe('tasksCtrl', function() {
  beforeEach(module('zoetropeControllers'));

  var $controller;
  var $document;
  var $log;
  var taskSvc;
  var projectSvc;

  beforeEach(inject(function(_$controller_, _$document_, _$location_, _$log_, _taskSvc_, _projectSvc_) {
    $controller = _$controller_;
    $document = _$document_;
    $location = _$location_;
    $log = _$log_;
    taskSvc = _taskSvc_;
    projectSvc = _projectSvc_;
  }));

  it('initialises correctly', function() {
    
    var vm = $controller('tasksCtrl', {});

    var expectedWindowTitle = 'BOINC Tasks';

    expect(vm.tasks).toEqual({});
    expect(vm.projects).toEqual({});
    expect(vm.sortProp).toBe('idx');
    expect(vm.reverseSort).toBe(false);
    expect(vm.ready).toBe(false);
    expect(vm.error).toBe(false);
    expect(vm.showRawData).toBe(false);
    expect(vm.title).toBe(expectedWindowTitle);
    expect($document.title).toBe(expectedWindowTitle);
  });

  describe('getTasks', function() {
    
    var json;
    var getAttachedProjectsCalled;

    beforeEach(function() {
      json = readJSON('tests/json/tasks.json');
      getAttachedProjectsCalled = false;

      taskSvc.getAllTasks = function(success, error) {
        success(json, '200', '', '');
      };

      projectSvc.getAttachedProjects = function(success, error) {
	getAttachedProjectsCalled = true;
      };
    });

    it('loads tasks correctly', function() {
      var vm = $controller('tasksCtrl', {});
      expect(vm.tasks).toBe(json);
    });

    it('gets attached projects after loading tasks', function() {

      var vm = $controller('tasksCtrl', {});
      expect(getAttachedProjectsCalled).toBeTruthy();
    });

    it('is not ready yet when there are tasks because it still has work to do', function() {

      var vm = $controller('tasksCtrl', {});
      expect(vm.ready).toBeFalsy();
    });

    it('sets ready if there are no tasks', function() {

      json = [];
      var vm = $controller('tasksCtrl', {});

      expect(vm.tasks).toEqual([]);
      expect(vm.ready).toBeTruthy();
    });

    it('redirects the user to the login page if not authenticated', function() {
      
      json = [{error_message: -1414}];

      var vm = $controller('tasksCtrl', {});
      expect($location.path()).toBe('/#/login');
    });

    it('handles errors', function() {

      var errorLogCalled = false;

      taskSvc.getAllTasks = function(success, error) {
        error({}, '500', '', '');
      };

      $log.error = function(msg) {
        errorLogCalled = true;
      };

      var vm = $controller('tasksCtrl', {});

      expect(errorLogCalled).toBeTruthy();
      expect(vm.ready).toBeTruthy();
      expect(vm.error).toBeTruthy();
    });
  });
});
