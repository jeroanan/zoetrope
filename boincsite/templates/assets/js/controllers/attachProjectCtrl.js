/**
 * Controller for the All Projects list screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('attachProjectCtrl', AttachProjectController);

function AttachProjectController() {

  function submit_clicked() {
    console.log(vm.projecturl);
  }

  var vm = this;
  vm.submit_clicked = submit_clicked;

  vm.title = 'Attach Project';
  document.title = vm.title;
}
