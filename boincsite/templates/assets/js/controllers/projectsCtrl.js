/**
 * Controller for the attached projects screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('ProjectsCtrl', ProjectsController);

ProjectsController.$inject = ['projectSvc'];

function ProjectsController(projectSvc) {

  var vm = this;
  vm.sortProp = 'name';
  vm.reverseSort = false;
  vm.ready = false;
  vm.showRawData = false;
  vm.title = "BOINC Projects";  
  vm.detachUrl = '';
  vm.detachName = '';
  vm.sort = getSortFunc(vm, 'sortProp', 'reverseSort');
  vm.error = false;
  vm.load = load;
  vm.projectOperationSuccess = false;
  vm.projectOperationSuccessMessage = '';
  
  vm.detachClicked = detachClicked;
  vm.updateClicked = getProjectOperation('updateProject', 'Project updated successfully');
  vm.noMoreWorkClicked = getProjectOperation('noMoreWork', 'New tasks disallowed', 'dont_request_more_work', true);
  vm.allowMoreWorkClicked = getProjectOperation('allowMoreWork', 'New tasks re-allowed', 'dont_request_more_work', false);
  vm.suspendProjectClicked = getProjectOperation('suspendProject', 'Project suspended', 'suspended_via_gui', true);
  vm.resumeProjectClicked = getProjectOperation('resumeProject', 'Project resumed', 'suspended_via_gui', false);
  
  document.title = vm.title;
  load();
  
  function load() {
	 vm.ready = false;
	 vm.error = false;
	 projectSvc.getAttachedProjects()().query().$promise.then(gotProjects, serviceError);
  }

  function gotProjects(projects) {
	 vm.projects = projects.filter(function(x) { return x.name.length > 0; });
    vm.ready = true;
  }

  function serviceError(xhr) {
	 vm.error = true;
	 vm.ready = true;
  }

  function detachClicked(projectName, projectUrl) {
	 var dialog = $('#detachModal');
	 
	 vm.detachUrl = projectUrl;
	 vm.detachName = projectName;

	 dialog.modal('show');
  }
  
  function getProjectOperation(operationFunc, successMessage, propToChange, propValue) {
	 return function(projectUrl) {
		console.log(operationFunc);
		resetProjectOperationSuccess();
		projectSvc[operationFunc](projectUrl)().query().$promise.then(function() {
		  projectOperationSuccess(successMessage);

		  if (propToChange && propToChange) {
			 setProjectProperty(projectUrl, propToChange, propValue);
		  }
		});
	 };
  }

  function suspendProjectClicked(projectUrl) {
	 projectSvc.suspendProject(projectUrl)().query().$promise.then(
		setProjectProperty(projectUrl, 'suspended_via_gui', true));	 
  }

  function resumeProjectClicked(projectUrl) {
	 projectSvc.resumeProject(projectUrl)().query().$promise.then(
		setProjectProperty(projectUrl, 'suspended_via_gui', false));
  }

  function resetProjectOperationSuccess() {
	 vm.projectOperationSuccess = false;
	 vm.projectOperationSuccessMessage = '';
  }

  function projectOperationSuccess(message) {
	 vm.projectOperationSuccess = true;
	 vm.projectOperationSuccessMessage = message;
  }

  function setProjectProperty(projectUrl, propertyName, propertyValue) {
	 vm.projects = vm.projects.map(function(x) {
		if (x.master_url!==projectUrl) return x;
		x[propertyName] = propertyValue;		
		return x;
	 });
  }
}
