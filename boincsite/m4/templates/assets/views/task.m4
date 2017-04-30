divert(-1)
changecom(@@)

include(boincsite/m4/templates/assets/views/views_common.m4)
  
divert(0)dnl
<div>
  zoe_level_one_breadcrumb(Task Summary)
  zoe_page_title(vm.title)
  zoe_loading_panel
  zoe_error_panel(task)
  zoe_success_panel
  <div ng-show="vm.ready && !vm.error">
    <div class="col-xs-9 col-lg-11">
  	   <div class="row task-row">
        <div class="col-xs-1 col-lg-2" />
        <div class="col-xs-5 col-lg-4 keyvalrowcol">
  		  <span><strong>Workunit name</strong></span>
  		</div>
        <div class="col-xs-5 col-lg-4 keyvalrowcol">
          <span ng-bind="vm.task.displayName" ng-click="vm.taskNameClicked()"></span>
        </div>
        <div class="col-xs-6 col-lg-2" />
      </div>
  
      <keyvallinkrow key="Project name" text="{{vm.task.project_name}}" link="/#/project/{{ vm.task.project_name }}" />
    
      <keyvalrow key="Percent done" val="{{vm.task.fraction_done}}%" />
    
    	<keyvalrow key="Time elapsed" val="{{vm.task.time_so_far}}" />
    
    	<keyvalrow key="Time Remaining" val="{{vm.task.estimated_cpu_time_remaining}}" />
    
    	<div class="row task-row">
        <div class="col-xs-1 col-lg-2" />
        <div class="col-xs-5 col-lg-4 keyvalrowcol">
    	    <span><strong>Report Deadline</strong></span>
		  </div>
        <div class="col-xs-5 col-lg-4 keyvalrowcol">
          <span ng-bind="vm.task.report_deadline" ng-class="vm.getDeadlineClass(vm.task)"></span>
        </div>
        <div class="col-xs-6 col-lg-2" />
      </div>
  
  	   <keyvalrow key="Ready to report?" val="{{vm.task.ready_to_report}}" />
  
  	   <keyvalrow key="State" val="{{vm.task.state}}" />
  	 
  	   <keyvalrow key="Suspended via gui?" val="{{vm.task.suspended_via_gui}}" />
  
  	   <keyvalrow key="Active task state" val="{{vm.task.active_task_state}}" />

		zoe_collapse_begin(xsTaskOperations, Task Operations, hidden-lg)
        <div class="col-xs-3"></div>
        <div class="col-xs-3">
  		  <a class="btn btn-primary pull-right" ng-show="!vm.task.suspended_via_gui" ng-click="vm.suspendClicked()">
  			 Suspend Task
  		  </a>
  		  <a class="btn btn-primary pull-right" ng-show="vm.task.suspended_via_gui" ng-click="vm.resumeClicked()">
  			 Resume Task
  		  </a>
        </div>
        <div class="col-xs-3"><a class="btn btn-warning" ng-click="vm.abortButtonClicked()">Abort</a></div>
        <div class="col-xs-3"></div>
      zoe_collapse_end

		<div class="row confirm-row" ng-show="vm.showConfirmAbort">
        <div class="col-xs-3"></div>
        <div class="col-xs-3"></div>
        <div class="col-xs-3">Confirm task abort: <a ng-click="vm.abortTaskLinkClicked()">OK</a></div>
        <div class="col-xs-3"></div>
      </div>
		<div class="row home-row text-center">
        <a href="/#/">Home</a></div>
      </div>
    </div> <!-- column -->
	 
	 <div class="hidden-xs col-lg-1">

	 	zoe_sidebar_heading(Task Operations)

		zoe_sidebar_row_begin
		  zoe_sidebar_button_show(vm.suspendClicked(), Suspend Task, !vm.task.suspended_via_gui, btn-primary)
		  zoe_sidebar_button_show(vm.resumeClicked(), Resume Task, vm.task.suspended_via_gui, btn-primary)
		zoe_sidebar_row_end

		zoe_sidebar_button(vm.abortButtonClicked(), Abort Task, btn-warning)
	 </div>
  </div>    
</div>
