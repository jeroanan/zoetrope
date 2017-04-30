divert(-1)
include(boincsite/m4/templates/assets/views/views_common.m4)
divert(0)dnl
<div>
  zoe_level_one_breadcrumb(Daily Transfer History)
  zoe_page_title(vm.title)
  zoe_loading_panel
  zoe_error_panel(daily transfer history)
  <div ng-show="vm.ready && !vm.error">
    <keyvalrow key="Total uploaded" val="{{ vm.totalUploaded }}" />
    <keyvalrow key="Total downloaded" val="{{ vm.totalDownloaded }}" />

    <br />

    zoe_begin_table
      <thead>
		  zoe_sorting_table_header(when, Date)
		  zoe_sorting_table_header(up, Uploaded)
		  zoe_sorting_table_header(down, Downloaded)
      </thead>
      <tr ng-repeat="dt in vm.daily_transfers | orderBy:vm.sortProp:vm.reverseSort">
        <td><span ng-bind="dt.when.toDateString()" /></td>
        <td><span ng-bind="dt.up + 'MB'" /></td>
        <td><span ng-bind="dt.down + 'MB'" /></td>
      </tr>
    </table>
  </div>
</div>
