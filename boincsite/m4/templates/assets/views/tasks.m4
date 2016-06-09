divert(-1)
changecom(@@)

include(boincsite/m4/templates/assets/views/views_common.m4)
  
divert(0)dnl
<div>
  zoe_page_title(vm.title)
  zoe_loading_panel
  zoe_error_panel(tasks)
  <div ng-show="vm.ready && vm.error===false">
    zoe_begin_table
      <thead>
         zoe_sorting_table_header(idx, #)
         zoe_sorting_table_header(project_name, Project Name)
         zoe_sorting_table_header(fraction_done, Progress)
         zoe_sorting_table_header(state, State)
         zoe_sorting_table_header(time_so_far, Time So Far)
         zoe_sorting_table_header(estimated_cpu_time_remaining, Est. Time Remaining)
         zoe_sorting_table_header(report_deadline, Deadline)
      </thead>
      <tbody>
        <tr ng-repeat="task in vm.tasks | orderBy:vm.sortProp:vm.reverseSort">
          <td><a ng-href="#/task/{{ task.name }}"><span ng-bind="task.idx" /></a></td>
          <td><a ng-href="#/project/{{ task.project_name }}"><span ng-bind="task.project_name" /></a></td>
          <td>
            <div class="progress">
              <div class="progress-bar" role="progressbar" aria-valuenow="{{task.fraction_done}}" aria-valuemin="0"
                aria-valuemax="100" style="width: {{task.fraction_done}}%;">
              </div>
            </div>
            <div>
              <span><small ng-bind="task.fraction_done + '%'" /></span>
            </div>
          </td>
          <td><span ng-bind="task.state" /></td>
          <td><span ng-bind="task.time_so_far" /></td>
          <td><span ng-bind="task.estimated_cpu_time_remaining" /></td>
          <td><span ng-bind="task.report_deadline" ng-class="vm.getDeadlineClass(task)"></span></td>
        </tr>
      </tbody>
    </table>

	 zoe_show_raw_data(vm.tasks)
</div>
dnl 
changecom
