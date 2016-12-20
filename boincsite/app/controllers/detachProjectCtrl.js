/**
 * Controller for the detach project screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */

angular.module('zoetropeControllers')
 .controller('detachProjectCtrl', DetachProjectController);

DetachProjectController.$inject = ['projectSvc'];

function DetachProjectController(projectSvc) {

  var vm = this;
  vm.attachedProjects = null;
  vm.ready = false;
  vm.showConfirmDetach = false;
  vm.selectedProject = null;
  vm.detachButtonClicked = confirmDetach;
  vm.detachLinkClicked = detachLinkClicked;
  vm.title = 'Detach Project';
  vm.detachSuccessful = false;
  vm.detachClicked = false;
  vm.detachErrorMessage = '';
  vm.selectedProjectChanged = selectedProjectChanged;

  projectSvc.getAttachedProjects2(gotProjects);
  
  document.title = vm.title;

  function gotProjects(projects) {

    if (projects.length>0 && projects[0].error_message && projects[0].error_message===-1414)
    {
      document.location = '/#/login';
      return;
    }

    vm.attachedProjects = projects.filter(function(x) { return x.project_name.length > 0; });
    vm.ready = true;
  }

  // When the initial detach button is clicked it shows
  // a div with hyperlinks so the user can confirm that
  // they really wish to detach from the project.
  function confirmDetach() {
    if (vm.selectedProject) {
      vm.showConfirmDetach = true;
      return;
    }

    vm.detachClicked = true;
    vm.detachSuccessful = false;
    vm.detachErrorMessage = 'Select a project to detach from first.';
  }

  // When we get here the user has clicked the secondary
  // hyperlinks to confirm that they really want to deatch
  // from the project.
  function detachLinkClicked() {
    vm.detachClicked = true;
    projectSvc.detachProject2(vm.selectedProject, projectDetached);
  }

  function projectDetached(d) {

    if (d.error_message===-1414) {
      document.location = '/#/login';
      return;
    }

    vm.detachErrorMessage = d.error_message;
    vm.detachSuccessful = d.success;
  }

  function selectedProjectChanged() {
    vm.detachErrorMessage = '';
    vm.detachClicked = false;
    vm.showConfirmDetach=false;
  }
}
