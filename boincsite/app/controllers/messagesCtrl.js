/**
 * Controller for the messages screen.
 *
 * (c) David Wilson 2016, licensed under GPL V3.
 */
angular.module('zoetropeControllers')
  .controller('MessagesCtrl', MessagesController);

MessagesController.$inject = ['systemInfoSvc'];

function MessagesController(systemInfoSvc) {

  var vm = this;
  vm.sortProp = 'seqno';
  vm.reverseSort = true;
  vm.filterProp = '';
  vm.ready = false;
  vm.title = "Messages";  
  vm.messages = {};
  vm.project_name_counts = [];
  vm.get_project_name = getProjectName;
  vm.sort = getSortFunc(vm, 'sortProp', 'reverseSort');
  vm.error = false;
  vm.load = load;

  document.title = vm.title;
  load();

  function load() {
    vm.ready = false;
    vm.error = false;
    systemInfoSvc.getMessages(gotMessages, serviceError);
  }

  function gotMessages(messages) {
	 
    if (messages.length > 0 && messages[0].error_message && messages[0].error_message===-1414) {
      document.location = '/#/login';
      return;
    }

    vm.messages = messages;

    var project_names = messages.map(function(x) { return x.project_name; });

    var uniqueProjectNames = project_names.filter(function(el,i,a) {
      return i==a.indexOf(el);
    });

    function count_project_name(pn) {
      var project_name_array = project_names.filter(function(el) { return el == pn; });
      return project_name_array.length;
    }

    var tmp_name_counts = {};
    for (var upn in uniqueProjectNames) {
      var pn = uniqueProjectNames[upn];
      tmp_name_counts[pn] = count_project_name(pn);
    }

    vm.project_name_counts = tmp_name_counts;
    vm.ready = true;
  }

  function serviceError() {
    vm.ready = true;
    vm.error = true;
  }  

  function getProjectName(pn) {
    return pn === '' ? '(No project)' : pn;
  }
}
