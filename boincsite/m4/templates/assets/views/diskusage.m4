divert(-1)
include(boincsite/m4/templates/assets/views/views_common.m4)
divert(0)dnl
<div>
  zoe_level_one_breadcrumb(Disk Usage)
  zoe_page_title(vm.title)
  zoe_loading_panel
  zoe_error_panel(disk usages)
  <div ng-show="vm.ready && !vm.error">
    <keyvalrow key="Total Disk Space" val="{{ vm.disk_usages.total_disk_space }}" />
    <keyvalrow key="Free Disk Space" val="{{ vm.disk_usages.free_disk_space }}" />

    <h2>By project</h2>

    <div ng-show="vm.disk_usages.project_disk_usages.length>0">
      zoe_begin_table
        <thead>
          zoe_sorting_table_header(master_url, Project Url)
          zoe_sorting_table_header(disk_usage, Disk Usage)
        </thead>
        <tr ng-repeat="pdu in vm.disk_usages.project_disk_usages | orderBy:vm.sortProp:vm.reverseSort">
          <td><a ng-href="{{pdu.master_url}}"><span ng-bind="pdu.master_url" /></a></td>
          <td><span ng-bind="pdu.disk_usage + 'MB'" /></td>
        </tr>
      zoe_end_table
    </div>
    <div ng-show="vm.disk_usages.project_disk_usages.length===0">
      <p class="text-center">
        No attached projects found
      </p>
    </div>
  </div>
</div>
