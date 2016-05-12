/**
 * Controller for the project detail screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('ProjectCtrl', ProjectController);

ProjectController.$inject = ['projectSvc', 'updateProjectSvc', 'statisicsSvc'];

function ProjectController(projectSvc, updateProjectSvc, statisicsSvc) {

  var vm = this;
  vm.ready = false;
  vm.title = 'Project Summary';  
  vm.projectFound = false;
  vm.project = {};
  vm.projectStats = [];
  vm.statsSortField = 'day';
  vm.statsReverseSort = true;
  vm.statsSort = getSortFunc(vm, 'statsSortField', 'statsReverseSort');
  vm.upArrow = upArrow;
  vm.downArrow = downArrow;
  vm.load = load;

  vm.updateProject = updateProjectClick;
  vm.detachClicked = detachClicked;
  vm.noMoreWorkClicked = noMoreWorkClicked;

  document.title = vm.title;

  load();
  
  function load() {
	 vm.ready = false;
	 projectSvc().query().$promise.then(gotProject, serviceError);
  }

  function gotProject(project) {
	 vm.project = project;
	 statisicsSvc.get(project.master_url)().query().$promise.then(gotStats, serviceError);		
  }

  function gotStats(stats) {

	 //TODO: probably need to make this stats control into a directive..
	 var ps = [];
	 
	 for (var p in stats[0]) {
		
		var o = stats[0][p];
		if (o.day) {
		  ps.push(o);
		}		  
	 }
	 
	 vm.projectStats = ps.map(function(x) {
		x.user_total_credit = parseFloat(x.user_total_credit);
		x.user_expavg_credit = parseFloat(x.user_expavg_credit);
		x.host_total_credit = parseFloat(x.host_total_credit);
		x.host_expavg_credit = parseFloat(x.host_expavg_credit);
		return x;		
	 });

	 vm.projectFound = true;
	 vm.ready = true;
  }

  function serviceError() {
	 vm.ready = true;
	 vm.projectFound = false;
  }  

  function updateProjectClick() {
    if (vm.ready!==true) {
      return;
    }

    updateProjectSvc.query(vm.project.master_url)().query();
  }
  
  function detachClicked() {
	 $('#detachModal').modal('show');
  }

  function noMoreWorkClicked() {
	 console.log('Ok. No more work for this project, boss!');
	 console.log(vm.project.master_url);
  }
}
