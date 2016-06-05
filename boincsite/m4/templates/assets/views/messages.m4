divert(-1)
changecom(@@)

include(boincsite/m4/templates/assets/views/views_common.m4)
  
divert(0)dnl
<div>
  zoe_page_title(vm.title)
  zoe_loading_panel
  zoe_error_panel(messages)
  <div ng-show="vm.ready && !vm.error">
    <h2>Filter</h2>
    <label for="selectProject">Project</label>
    <select ng-model="vm.filterProp" name="selectProject">
      <option ng-repeat="(k, v) in vm.project_name_counts" value="{{ k }}">
        {{ vm.get_project_name(k) }} ({{ v }} messages)
      </option>
    </select>

    <input type="text" ng-model="vm.filterProp" id="enterFilter" placeholder="Enter filter..." />

    <h2>Messages</h2>

    zoe_begin_table
      <thead>
		  zoe_sorting_table_header(message_number, #)
		  zoe_sorting_table_header(date_time, Message Date)
		  zoe_sorting_table_header(project_name, Project)
		  zoe_sorting_table_header(message_text, Message Text)
      </thead>
      <tr ng-repeat="m in vm.messages | orderBy:vm.sortProp:vm.reverseSort | filter:vm.filterProp">
        <td><span ng-bind="m.message_number" /></td>
        <td><span ng-bind="m.date_time" /></td>
        <td><span ng-bind="m.project_name" /></td>
        <td><span ng-bind="m.message_text" /></td>
      </tr>
    </table>
  </div>
</div>

