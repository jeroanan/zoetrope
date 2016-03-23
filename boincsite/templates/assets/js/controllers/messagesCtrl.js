/**
 * Controller for the messages screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('MessagesCtrl', MessagesController);

MessagesController.$inject = ['messagesSvc'];

function MessagesController(messagesSvc) {

  var vm = this;

  messagesSvc.get()().query().$promise.then(function(d) {
    vm.messages = d;

    var project_names = Array.map(d, function(x) { return x.project_name});
    vm.unique_project_names = Array.filter(project_names, function(el,i,a) {
      return i==a.indexOf(el);
    });

    var count_project_name = function(pn) {
      var project_name_array = Array.filter(project_names, function(el) { return el == pn; });
      return project_name_array.length;
    };

    var tmp_name_counts = new Object();
    for (upn in vm.unique_project_names) {
      var pn = vm.unique_project_names[upn];
      tmp_name_counts[pn] = count_project_name(pn);
    }

    vm.project_name_counts = tmp_name_counts;
    vm.ready = true;
  })

  vm.get_project_name = function(pn) {
    return pn === '' ? '(no project)' : pn;
  };

  vm.orderProp = 'message_number';
  vm.reverseSort = true;
  vm.filterProp = '';
  vm.ready = false;
  vm.title = "Messages"
  document.title = vm.title;
}
