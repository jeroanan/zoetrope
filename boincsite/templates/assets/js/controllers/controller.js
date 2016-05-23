var upArrow = '&#x25B2;';
var downArrow = '&#x25BC;';

function getSortFunc(viewModel, sortFieldVar, reverseSortVar) {
  
  var currentSortField = viewModel[sortFieldVar];
  
  function sortFunc(field) {
	 viewModel[sortFieldVar] = field;
	 
	 if(field===currentSortField) {
		viewModel[reverseSortVar] = !viewModel[reverseSortVar];
		return;
	 }
	 
	 currentSortField = field;
	 viewModel[sortFieldVar] = field;
	 viewModel[reverseSortVar] = false;
  }
  
  return sortFunc;
}

var get_project_name = function(task, projects) {
  
  for (var p in projects) {
    var proj = projects[p];
	 
    if (proj.master_url == task.project_url){
		
      if (proj.name==='') {
        return task.project_url;
      }
      return proj.name;
    }
  }
  
  return task.project_url;
};

var get_time_so_far = function(task) {
  return task.ready_to_report ? task.final_cpu_time : task.current_cpu_time;
};

var get_state_string = function(task) {
  if (task.suspended_via_gui) return 'Task suspended by user';
  
  if (task.state === 2 && (task.scheduler_state === 1 || task.active_task_state === 0)) {
    return 'Waiting to run';
  }
  
  switch (task.state) {
  case 2:
    return 'Running';
  case 3:
    return 'Computation error';
  case 4:
	 return 'Uploading';
  case 5:
    return 'Ready to report';
  case 6:
    return 'Aborted by user';
  default:
    return task.state;
  }
};

function getQueryStrings() {
  var assoc  = {};
  var decode = function (s) { return decodeURIComponent(s.replace(/\+/g, " ")); };
  var queryString = location.search.substring(1);
  var keyValues = queryString.split('&');
  
  for(var i in keyValues) {
    var key = keyValues[i].split('=');
    if (key.length > 1) {
      assoc[decode(key[0])] = decode(key[1]);
    }
  }
  
  return assoc;
}
