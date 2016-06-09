divert(-1)
include(boincsite/m4/templates/assets/views/views_common.m4)
divert(0)dnl
<div>
  zoe_page_title(vm.title)
  zoe_loading_panel
  zoe_error_panel(daily transfer history)
  <div ng-show="vm.ready && !vm.error">
    <keyvalrow key="Total uploaded" val="{{ vm.totalUploaded }}" />
    <keyvalrow key="Total downloaded" val="{{ vm.totalDownloaded }}" />

    <br />

    zoe_begin_table
      <thead>
		  zoe_sorting_table_header(date, Date)
		  zoe_sorting_table_header(uploaded, Uploaded)
		  zoe_sorting_table_header(downloaded, Downloaded)
      </thead>
      <tr ng-repeat="dt in vm.daily_transfers | orderBy:vm.sortProp:vm.reverseSort">
        <td><span ng-bind="dt.date.toDateString()" /></td>
        <td><span ng-bind="dt.uploaded + 'MB'" /></td>
        <td><span ng-bind="dt.downloaded + 'MB'" /></td>
      </tr>
    </table>
  </div>
</div>