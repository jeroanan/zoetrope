/**
 * Controller for the detach project screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */

angular.module('zoetropeControllers')
 .controller('detachProjectCtrl', DetachProjectController);

DetachProjectController.$inject = ['projectsSvc', 'detachProjectSvc'];

function DetachProjectController(projectsSvc, detachProjectSvc) {

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
    
    detachProjectSvc.query(vm.selectedProject)().query().$promise.then(function(d) {
      vm.detachSuccessful = d.success;
      vm.detachErrorMessage = d.error_message;
    });
  }

  projectsSvc.get()().query().$promise.then(function(d) {
    vm.attachedProjects = d.filter(function(x) { return x.name.length > 0; });
    vm.ready = true;
  });
  
  document.title = vm.title;
}
