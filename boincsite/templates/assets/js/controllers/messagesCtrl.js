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
  vm.orderProp = 'message_number';
  vm.reverseSort = true;
  vm.filterProp = '';
  vm.ready = false;
  vm.title = "Messages";
  document.title = vm.title;
  vm.messages = {};
  vm.unique_project_names = [];
  vm.project_name_counts = [];
  vm.get_project_name = getProjectName;
  vm.sort = getSortFunc(vm, 'orderProp', 'reverseSort');

  messagesSvc.get()().query().$promise.then(gotMessages);

  function gotMessages(messages) {
	 vm.messages = messages;

    var project_names = messages.map(function(x) { return x.project_name; });

    vm.unique_project_names = project_names.filter(function(el,i,a) {
      return i==a.indexOf(el);
    });

    function count_project_name(pn) {
      var project_name_array = project_names.filter(function(el) { return el == pn; });
      return project_name_array.length;
    }

    var tmp_name_counts = {};

    for (var upn in vm.unique_project_names) {
      var pn = vm.unique_project_names[upn];
      tmp_name_counts[pn] = count_project_name(pn);
    }

    vm.project_name_counts = tmp_name_counts;
    vm.ready = true;
  }

  function getProjectName(pn) {
    return pn === '' ? '(no project)' : pn;
  }
}
