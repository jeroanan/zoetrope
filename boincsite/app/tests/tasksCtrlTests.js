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

    beforeEach(function() {
      json = readJSON('tests/json/tasks.json');

      taskSvc.getAllTasks = function(success, error) {
        success(json, '200', '', '');
      };
    });

    it('loads tasks correctly', function() {
      var vm = $controller('tasksCtrl', {});
      expect(vm.tasks).toBe(json);
    });

    it('gets attached projects after loading tasks', function() {
      spyOn(projectSvc, 'getAttachedProjects');

      var vm = $controller('tasksCtrl', {});
      expect(projectSvc.getAttachedProjects).toHaveBeenCalled();
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

      taskSvc.getAllTasks = function(success, error) {
        error({}, '500', '', '');
      };

      spyOn($log, 'error');

      var vm = $controller('tasksCtrl', {});

      expect($log.error).toHaveBeenCalled();
      expect(vm.ready).toBeTruthy();
      expect(vm.error).toBeTruthy();
    });
  });

  describe('getAttachedProjects', function() {

    var tasksJson;
    var projectsJson;

    beforeEach(function() {
      tasksJson = readJSON('tests/json/tasks.json');
      projectsJson = readJSON('tests/json/attachedProjects.json');
    });

    it('Gets the right amount of projects', function() {
      
      spyOn(taskSvc, 'getAllTasks').and.callFake(function(s,e) { s(tasksJson, '200', '', ''); });
      spyOn(projectSvc, 'getAttachedProjects').and.callFake(function(s,e) { s(projectsJson, '200', '', ''); });

      var vm = $controller('tasksCtrl', {});
      expect(vm.projects.length).toEqual(projectsJson.length);
    });
    
    it('Properly post-processes tasks based on the projects', function() {

      var projectsJson = [{
                            "user_total_credit": "3840.000000", 
			    "host_expavg_credit": "0.000000", 
			    "suspended_via_gui": false, 
			    "master_url": "http://asteroidsathome.net/boinc/", 
			    "project_files_downloaded_time": "0.000000", 
			    "user_name": "pi", 
			    "dont_request_more_work": false, 
			    "user_expavg_credit": "0.099184", 
			    "gui_urls": [{
			                   "description": "View your account information and credit totals", 
					   "name": "Your account", 
					   "url": "http://asteroidsathome.net/boinc/home.php"
					 }], 
                            "last_rpc_time": "1482090820.985531", 
			    "host_total_credit": "0.000000", 
			    "project_name": "Asteroids@home", 
			    "team_name": "", 
			    "attached_via_acct_mgr": false, 
			    "detach_when_done": true, 
			    "master_fetch_failures": "0", 
			    "nrpc_failures": "0", 
			    "resource_share": "100.000000", 
			    "upload_backoff": null, 
			    "sched_rpc_pending": "0"
			  }];
      
      var tasksJson = [{
                         "report_deadline": "2016-12-18 07:56:36", 
			 "app_version_num": 10210, 
			 "final_cpu_time": "0:09:40", 
			 "name": "ps_161130_input_58973_13_0", 
			 "scheduler_state": 2, 
			 "ready_to_report": false, 
			 "swap_size": 22532096, 
			 "project_url": "http://asteroidsathome.net/boinc/", 
			 "got_server_ack": false, 
			 "signal": 0, 
			 "working_set_size": 7720960, 
			 "state": 2, 
			 "exit_status": 0, 
			 "checkpoint_cpu_time": 564.012, 
			 "wu_name": "ps_161130_input_58973_13", 
			 "suspended_via_gui": false, 
			 "active_task_state": 0,
			 "estimated_cpu_time_remaining": "2:59:24",
			 "fraction_done": 2.63,
			 "current_cpu_time": "0:09:40"
                       }];

      spyOn(taskSvc, 'getAllTasks').and.callFake(function(s,e) { s(tasksJson, '200', '', ''); });
      spyOn(projectSvc, 'getAttachedProjects').and.callFake(function(s,e) { s(projectsJson, '200', '', ''); });

      var vm = $controller('tasksCtrl', {}); 

      expect(vm.tasks.length).toBe(1);
      expect(vm.projects.length).toBe(1);

      var task = vm.tasks[0];
      var project = vm.projects[0];
      
      expect(task.idx).toBe(1);
      expect(task.project_name).toBe(project.project_name);
      expect(task.state).toBe('Waiting to run');
      expect(task.time_so_far).toBe('00:09:40');
      expect(task.overdue).toBeTruthy();
      expect(task.deadlineApproaching).toBeFalsy();
      expect(vm.ready).toBeTruthy();
    });
  });
});
