/**
 * Controller for the project detail screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('ProjectCtrl', ProjectController);

ProjectController.$inject = ['$routeParams', '$compile', '$scope', 'projectSvc'];

function ProjectController($routeParams, $compile, $scope, projectSvc) {

  var vm = this;
  vm.ready = false;
  vm.title = '';  
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
  vm.allowMoreWorkClicked = allowMoreWorkClicked;
  vm.suspendClicked = suspendClicked;
  vm.resumeClicked = resumeClicked;
  vm.detachWhenDoneClicked = detachWhenDoneClicked;
  vm.dontDetachWhenDoneClicked = dontDetachWhenDoneClicked;

  document.title = vm.title;

  load();
  
  function load() {
	 vm.ready = false;
	 projectSvc.getProject($routeParams.project)().query().$promise.then(gotProject, serviceError);
  }

  function gotProject(project) {
	 vm.project = project;
	 setTitle('Project Summary -- ' + project.name);

	 console.log(vm);
	 $('#statsRow').append($compile('<project-statistics project-url="' + project.master_url + '" />')($scope));

	 vm.projectFound = true;
	 vm.ready = true;
  }

  // function gotStats(stats) {

  // 	 //TODO: probably need to make this stats control into a directive..
  // 	 var ps = [];
	 
  // 	 for (var p in stats[0]) {
		
  // 		var o = stats[0][p];
  // 		if (o.day) {
  // 		  ps.push(o);
  // 		}		  
  // 	 }
	 
  // 	 vm.projectStats = ps.map(function(x) {
  // 		x.user_total_credit = parseFloat(x.user_total_credit);
  // 		x.user_expavg_credit = parseFloat(x.user_expavg_credit);
  // 		x.host_total_credit = parseFloat(x.host_total_credit);
  // 		x.host_expavg_credit = parseFloat(x.host_expavg_credit);
  // 		return x;		
  // 	 });

	 
  // }

  function serviceError() {
	 vm.ready = true;
	 vm.projectFound = false;
  }  

  function updateProjectClick() {
    if (vm.ready!==true) {
      return;
    }
	 projectSvc.updateProject(vm.project.master_url)().query();
  }
  
  function detachClicked() {
	 $('#detachModal').modal('show');
  }

  function noMoreWorkClicked() {
	 projectSvc.noMoreWork(vm.project.master_url)().query().$promise.then(function() {
		vm.project.dont_request_more_work = true;
	 });
  }

  function allowMoreWorkClicked() {
	 projectSvc.allowMoreWork(vm.project.master_url)().query().$promise.then(function() {
		vm.project.dont_request_more_work = false;
	 });
  }

  function suspendClicked() {
	 projectSvc.suspendProject(vm.project.master_url)().query().$promise.then(function() {
		vm.project.suspended_via_gui = true;
	 });
  }

  function resumeClicked() {
	 projectSvc.resumeProject(vm.project.master_url)().query().$promise.then(function() {
		vm.project.suspended_via_gui = false;
	 });
  }

  function detachWhenDoneClicked() {
	 projectSvc.detachWhenDone(vm.project.master_url)().query();
  }

  function dontDetachWhenDoneClicked() {
	 projectSvc.dontDetachWhenDone(vm.project.master_url)().query();
  }

  function setTitle(title) {
	 vm.title = title;
	 document.title = vm.title;
  }
}
