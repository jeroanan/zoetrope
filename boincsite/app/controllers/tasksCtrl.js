/**
* Controller for the tasks screen.
*
* Copyright (c) David Wilson 2016, 2017
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
    
angular.module('zoetropeControllers').controller('tasksCtrl', TasksController);

TasksController.$inject = ['$document', '$location', '$log', '$rootScope', 'taskSvc', 'projectSvc'];

function TasksController($document, $location, $log, $rootScope, taskSvc, projectSvc) {

  var vm = this;
  vm.tasks = {};
  vm.projects = {};
  vm.sortProp = 'idx';
  vm.reverseSort = false;
  vm.ready = false;  
  vm.error = false;
  vm.showRawData = false;
  vm.title = 'BOINC Tasks';

  $document[0].title = vm.title;

  vm.load = load;
  vm.getDeadlineClass = getDeadlineClass;
  vm.sort = getSortFunc(vm, 'sortProp', 'reverseSort');

  load();

  /**
   * Initialise screen state
   */
  function load() {
    vm.ready = false;
    vm.error = false;
    taskSvc.getAllTasks(gotTasks, gotTasksError);
  }

  /**
   * Called when the taskSvc has successfully retrieved the list of tasks.
   *
   * Parameters:
   * tasks: The list of tasks that was retrieved
   */
  function gotTasks(tasks) {

    // If there were any tasks then go on processing. Otherwise,
    // just indicate that the screen is ready to stop any further
    // processing and display the "no tasks found" message
    if (tasks.length>0) {
      var t = tasks[0];
		
      if (!t.success && t.error_message==-1414) {
        document.location = '/#/login';
        return;
      }

      projectSvc.getAttachedProjects(gotProjects, serviceError);
      vm.ready = true;
      vm.tasks = tasks;
    }
  }

  /**
   * Called when there is an error getting the list of tasks
   */
  function gotTasksError() {
    $log.error('tasksCtrl: Error while getting tasks.');
    serviceError();
  }

  /**
   * Called when something goes wrong with a service call.
   *
   * Set the screen to its error state
   */  
  function serviceError() {
    vm.error = true;
    vm.ready = true;
  }

  /**
   * Called when projectSvc has successfully retrieved the list of projects.
   *
   * Parameters:
   * projects: The list of projects that were retrieved.
   */
  function gotProjects(projects) {
    vm.projects = projects;
    postProcessProjects();
  } 

  /**
   * Pads a time string so that each portion of it
   * contains two figures
   *
   * e.g. passing in 9:9 will return 09:09. 20:20 will give 20:20.
   *
   * Parameters:
   * @timeIn the time to perform padding on.
   *
   * Returns:
   * The correctly-padded time
   *
   * TODO: Move into a new timeSvc
   */
  function padTime(timeIn) {
    var timeSplit = timeIn.toString().split(':');
    var out = '';

    for (var t in timeSplit) {
      if (timeSplit[t].length===1) out += '0' + timeSplit[t];
      else out += timeSplit[t];
		  
      out += ':';		  
    }
    return out.slice(0, out.length-1);
  }

  /**
   * Perform extra work on the loaded tasks to put them into the format
   * to be seen on-screen. To be run only when tasks and projects have
   * both been loaded.
   */
  function postProcessProjects() {
    // Now we make the tasks into the format we want to see on-screen.
    var idx = 0;

    vm.tasks = vm.tasks.map(function(x) {
      idx++;
  
      x.idx = idx;
      x.project_name = get_project_name(x, vm.projects);
      x.state = get_state_string(x);
      x.estimated_cpu_time_remaining = padTime(x.estimated_cpu_time_remaining);
      x.time_so_far = padTime(get_time_so_far(x));
  		
      var overdue = false;
      var deadlineApproaching = false;
  
      // Assume the date is something like 2016-06-09 21:08:00
      // TODO: move this overdue/deadlineapproaching stuff into a service that can be tested.
      var deadlineSplit = x.report_deadline.toString().split(' ')[0].split('-');
  		
      if (deadlineSplit.length===3) {
        var deadlineDate = new Date(deadlineSplit[0], deadlineSplit[1]-1, deadlineSplit[2]);
        var now = new Date();
  
        if (now>deadlineDate) overdue = true;
        else {
          // If the deadline is less tha numDays in the future, we consider
          // the deadline to be approaching.
          var oneDay = 86400000; // milliseconds/day
          var numDays = 2;
          var dateDiff = deadlineDate - now;
          deadlineApproaching = dateDiff < (oneDay * numDays);
        }
      }
  		
      x.overdue = overdue;
      x.deadlineApproaching = deadlineApproaching;
      return x;
    });

    vm.ready = true;
  }
	 

  /**
   * Gives a css class for a task that is overdue has its deadline approaching
   *
   * Parameters:
   * task: The task object to determine the css class for
   *
   * Returns:
   * If the task is overdue or its deadline is approaching then the name of a
   * css class is returned. Otherwise, undefined.
   *
   * TODO: Move to taskSvc
   */
  function getDeadlineClass(task) {
	 if (task.overdue) return 'text-danger';
	 if (task.deadlineApproaching) return 'text-warning';	 
  }
}
