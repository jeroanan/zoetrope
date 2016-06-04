divert(-1)
changecom(@@)

include(boincsite/m4/templates/assets/views/views_common.m4)
  
divert(0)dnl
<div>
  <h1 ng-bind="vm.title" />
  zoe_loading_panel
  zoe_error_panel(task)
  <div ng-show="vm.ready && !vm.error">

	 <keyvalrow key="Workunit name" val="{{vm.task.name}}" />

	 <keyvalrow key="Project name" val="{{vm.task.project_name}}" />

	 <keyvalrow key="Percent done" val="{{vm.task.fraction_done}}%" />

	 <keyvalrow key="Time elapsed" val="{{vm.task.time_so_far}}" />

	 <keyvalrow key="Time Remaining" val="{{vm.task.estimated_cpu_time_remaining}}" />

	 <keyvalrow key="Report Deadline" val="{{vm.task.report_deadline}}" />

	 <keyvalrow key="Ready to report?" val="{{vm.task.ready_to_report}}" />

	 <keyvalrow key="State" val="{{vm.task.state}}" />
	 
	 <keyvalrow key="Suspended via gui?" val="{{vm.task.suspended_via_gui}}" />

	 <keyvalrow key="Active task state" val="{{vm.task.active_task_state}}" />
	 
    <div class="row task-controls">
      <div class="col-xs-3"></div>
      <div class="col-xs-3">
		  <a class="btn btn-primary pull-right" ng-show="!vm.task.suspended_via_gui" ng-click="vm.suspendClicked()">
			 Suspend Task
		  </a>
		  <a class="btn btn-primary pull-right" ng-show="vm.task.suspended_via_gui" ng-click="vm.resumeClicked()">
			 Resume Task
		  </a>
      </div>
      <div class="col-xs-3"><a class="btn btn-danger" ng-click="vm.abortButtonClicked()">Abort</a></div>
      <div class="col-xs-3"></div>
    </div>

    <div class="row confirm-row" ng-show="vm.showConfirmAbort">
      <div class="col-xs-3"></div>
      <div class="col-xs-3"></div>
      <div class="col-xs-3">Confirm task abort: <a ng-click="vm.abortTaskLinkClicked()">OK</a></div>
      <div class="col-xs-3"></div>
    </div>
  </div>
  <div class="row home-row text-center">
    <a href="/#/">Home</a></div>
  </div>
</div>
