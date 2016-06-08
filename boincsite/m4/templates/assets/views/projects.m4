divert(-1)

include(boincsite/m4/templates/assets/views/views_common.m4)

define(zoe_begin_dropdown, `dnl
<div class="dropdown">
  <button class="btn btn-default dropdown-toggle" type="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    $1
    <span class="caret"></span>
  </button>
  <ul class="dropdown-menu">')dnl

define(zoe_end_dropdown, `dnl
  </ul>
</div>')dnl

define(zoe_dropdown_action, `dnl
<li><a href="javascript:" ng-click="$1">$2</a></li>')dnl

define(zoe_dropdown_action_show, `dnl
<li ng-show="$3"><a href="javascript:" ng-click="$1">$2</a></li>')dnl

divert(0)dnl
<div>
  zoe_page_title(vm.title)
  zoe_loading_panel
  zoe_error_panel(project)
  <div class="alert alert-success" ng-show="vm.projectOperationSuccess">
   <span ng-bind="vm.projectOperationSuccessMessage">
  </div>
  <div ng-show="vm.ready && !vm.error">
    zoe_begin_table
      <thead>
		  zoe_sorting_table_header(name, Project Name)
		  zoe_sorting_table_header(user_total_credit, Total Credit)
		  zoe_sorting_table_header(user_expavg_credit, Recent Average Credit)
		  <th>Actions</th>
      </thead>
      <tr ng-repeat="p in vm.projects | orderBy:vm.sortProp:vm.reverseSort">
        <td><a href="#/project/{{ p.name }}"><span ng-bind="p.name" /></a></td>
        <td><span ng-bind="p.user_total_credit | number" /></td>
        <td><span ng-bind="p.user_expavg_credit | number" /></td>
		  <td ng-show="true">
			 zoe_begin_dropdown(Actions)
				  zoe_dropdown_action(vm.detachClicked(p.name, p.master_url), Detach)
				  zoe_dropdown_action(vm.updateClicked(p.master_url), Update)
				  zoe_dropdown_action_show(vm.noMoreWorkClicked(p.master_url), No More Work, !p.dont_request_more_work)
				  zoe_dropdown_action_show(vm.allowMoreWorkClicked(p.master_url), Allow More Work, p.dont_request_more_work)
				  zoe_dropdown_action_show(vm.suspendProjectClicked(p.master_url), Suspend Project, !p.suspended_via_gui)
				  zoe_dropdown_action_show(vm.resumeProjectClicked(p.master_url), Resume Project, p.suspended_via_gui)
          zoe_end_dropdown
		  </td>
      </tr>		
    zoe_end_table

    zoe_show_raw_data(vm.projects)
  <detach-dialog id="dDialog" projecturl="{{vm.detachUrl}}" projectname="{{vm.detachName}}"></detach-dialog>
</div>
