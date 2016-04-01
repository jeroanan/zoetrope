/**
 * Controller for the detach project screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */

angular.module('zoetropeControllers')
 .controller('detachProjectCtrl', DetachProjectController);

DetachProjectController.$inject = ['projectsSvc'];

function DetachProjectController(projectsSvc) {

  var vm = this;
  vm.attachedProjects = null;
  vm.ready = false;
  vm.showConfirmDetach = false;
  vm.selectedProject = null;

  vm.detachButtonClicked = confirmDetach;
  
  function confirmDetach() {
    if (vm.selectedProject) {
      vm.showConfirmDetach = true;
    }
  }

  projectsSvc.get()().query().$promise.then(function(d) {
    vm.attachedProjects = d.filter(function(x) { return x.name.length > 0 });
    vm.ready = true;
  });

  vm.title = 'Detach Project';
  document.title = vm.title;
}
