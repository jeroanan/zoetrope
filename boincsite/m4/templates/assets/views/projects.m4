divert(-1)

include(boincsite/m4/templates/assets/views/views_common.m4)

divert(0)dnl
<div>
  zoe_page_title(vm.title)
  zoe_loading_panel
  zoe_error_panel(project)
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
			 <div class="dropdown">
				<button class="btn btn-default dropdown-toggle" type="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
				  Actions
				  <span class="caret"></span>
				</button>
				<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
				  <li><a href="" ng-click="vm.detachClicked(p.name, p.master_url)">Detach</a></li>
				  <li><a href="" ng-click="vm.updateClicked()">Update</a></li>
				</ul>
			 </div>
		  </td>
      </tr>		
    </table>

    zoe_show_raw_data(vm.projects)
  <detach-dialog id="dDialog" projecturl="{{vm.detachUrl}}" projectname="{{vm.detachName}}"></detach-dialog>
</div>
