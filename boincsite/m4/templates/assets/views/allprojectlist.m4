divert(-1)
changecom(@@)

include(boincsite/m4/templates/assets/views/views_common.m4)
  
divert(0)dnl
zoe_page_title(vm.title)
zoe_loading_panel
zoe_error_panel(projects)
<div ng-show="vm.ready && !vm.error">
  <p>
    <input type="text" ng-model="vm.filterProp" id="enterFilter" placeholder="Enter filter..." />
  </p>
  zoe_begin_table
    <tr>
		zoe_sorting_table_header(name, Project Name)
		zoe_sorting_table_header(general_area, Research Area)
		zoe_sorting_table_header(summary, Summary)
    </tr>
    <tr ng-repeat="ap in vm.availableProjects | orderBy:vm.sortProp:vm.reverseSort | filter:vm.filterProp">
      <td>
		  <a ng-href="/#/projectdetail/{{ap.name}}"><span ng-bind="ap.name" /></a>
		  <span title="This client is attached to this project." ng-show="ap.attached">&#9733;</span>
		  <span title="This project is supported by the current platform." ng-show="ap.supported">&#10004;</span>
		</td>
      <td>
        <span ng-bind="ap.general_area" />
        <span ng-show="ap.specific_area.length>0">(<span ng-bind="ap.specific_area" />)</span>
      </td>
      <td><span ng-bind="ap.summary" /></td>
    </tr>
  </table>
</div>
