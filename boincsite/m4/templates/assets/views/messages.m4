divert(-1)
changecom(@@)

include(boincsite/m4/templates/assets/views/views_common.m4)
  
divert(0)dnl
<div>
  zoe_level_one_breadcrumb(Messages)
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
		  zoe_sorting_table_header(seqno, #)
		  zoe_sorting_table_header(time, Message Date)
		  zoe_sorting_table_header(project, Project)
		  zoe_sorting_table_header(body, Message Text)
      </thead>
      <tr ng-repeat="m in vm.messages | orderBy:vm.sortProp:vm.reverseSort | filter:vm.filterProp">
        <td><span ng-bind="m.seqno" /></td>
        <td><span ng-bind="m.time" /></td>
        <td><span ng-bind="m.project" /></td>
        <td><span ng-bind="m.body" /></td>
      </tr>
    </table>
  </div>
</div>
dnl
changecom
