describe('tasksCtrl', function() {
  beforeEach(module('zoetropeControllers'));

  var $controller;
  var $document;
  var taskSvc;
  var projectSvc;

  beforeEach(inject(function(_$controller_, _$document_, _taskSvc_, _projectSvc_) {
    $controller = _$controller_;
    $document = _$document_;
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

  describe('gets tasks', function() {

    it('loads the tasks', function() {
      
      var json = readJSON('tests/json/tasks.json');

      taskSvc.getAllTasks = function(success, error) {
        success(json, '200', '', '');
      };

      var vm = $controller('tasksCtrl', {});
      expect(vm.tasks).toBe(json);
    });
  });
});
