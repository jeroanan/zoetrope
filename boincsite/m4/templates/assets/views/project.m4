divert(-1)
changecom(@@)

include(boincsite/m4/templates/assets/views/views_common.m4)

define(zoe_sidebar_button, `dnl
<div class="row sidebar-button-row">
  <button class="btn $3 sidebar-button" ng-click="$1">$2</button>
</div>')

define(zoe_sidebar_button_show, `dnl
<button class="btn $4 sidebar-button" ng-click="$1" ng-show="$3">
  $2
</button>
')

divert(0)dnl
<div>
  zoe_page_title(vm.title)
  zoe_loading_panel  
  zoe_error_panel(project)

  <div ng-show="vm.ready && vm.projectFound">	 
	 <div class="container">
		<div class="col-xs-9 col-lg-11">
		  <a ng-href="/#/projectdetail/{{vm.project.name}}">Project Details</a> 

		  zoe_collapse_begin(currentStatusCollapse, Current Status)
		  <!--<h2><a href="javascript:" data-target="#currentStatusCollapse" data-toggle="collapse">Current Status</a></h2>
		  <div id="currentStatusCollapse" class="collapse">-->
		    <keyvallinkrow key="URL" link="{{vm.project.master_url}}" text="{{vm.project.master_url}}" />
		    <keyvalrow key="Username" val="{{ vm.project.user_name }}" />
		    <keyvalrow key="Team name" val="{{ vm.project.team_name }}" />
		    <keyvalrow key="Attached via account manager?" val="{{ vm.project.attached_via_account_manager }}" />
		    <keyvalrow key="Ended" val="{{ vm.project.ended }}" />
		    <keyvalrow key="Suspended via GUI?" val="{{ vm.project.suspended_via_gui }}" />
		    <keyvalrow key="Don't request more work" val="{{ vm.project.dont_request_more_work }}" />
		    <keyvalrow key="Detach project when all workunits done" val="{{ vm.project.detach_when_done }}" />
		    <keyvalrow key="Disk usage" val="{{ vm.project.disk_usage }}" />
		    <keyvalrow key="Resource share" val="{{ vm.project.resource_share }}" />

  		    <div class="row task-row" ng-hide="vm.project.upload_backoff===null">
			   <div class="col-lg-2" />
			   <div class="col-xs-3 col-lg-4"><span><strong>Upload Backoff</strong></span></div>
			   <div class="col-xs-3 col-lg-4">
				  <span ng-bind="vm.project.upload_backoff"></span>
			   </div>
			   <div class="col-xs-6 col-lg-2" />
		    </div>
		  zoe_collapse_end

		  zoe_collapse_begin(creditCollapse, Credit)
		    <keyvalrow key="User total credit" val="{{ vm.project.user_total_credit | number }}" />
		    <keyvalrow key="User recent average credit" val="{{ vm.project.user_expavg_credit | number }}" />
		    <keyvalrow key="Total credit for this host" val="{{ vm.project.host_total_credit | number }}" />
		    <keyvalrow key="Recent average credit for this host" val="{{ vm.project.host_expavg_credit | number }}" />
		  zoe_collapse_end

		  zoe_collapse_begin(project-additional, Additional)
			 <keyvalrow key="NRPC failures" val="{{ vm.project.nrpc_failures }}" />
			 <keyvalrow key="Master fetch failures" val="{{ vm.project.master_fetch_failures }}" />
			 <keyvalrow key="Master fetch pending?" val="{{ vm.project.master_fetch_pending }}" />
			 <keyvalrow key="Scheduler RPC pending?" val="{{ vm.project.scheduler_rpc_pending }}" />
			 <keyvalrow key="Trickle upload pending?" val="{{ vm.project.trickle_upload_pending }}" />
			 <keyvalrow key="Last RPC" val="{{ vm.project.last_rpc }}" />
			 <keyvalrow key="Project files downloaded" val="{{ vm.project.project_files_downloaded }}" />
			 
			 <div class="row">
				<div class="col-xs-3"></div>
				<div class="col-xs-3"></div>
				<div class="col-xs-3">&nbsp;</div>
				<div class="col-xs-3"></div>
			 </div>
		  zoe_collapse_end

		  zoe_collapse_begin(statsRow, Statistics)		  
		  zoe_collapse_end
		  
		  <div class="row">
			 <div class="col-xs-3"></div>
			 <div class="col-xs-3"></div>
			 <div class="col-xs-3"></div>
		  </div>
		</div> <!-- col-xs-9 -->

		<div class="col-xs-3 col-lg-1">
		  <div class="row sidebar-button-row">
			 <h4>Project Operations</h4>
		  </div>
		  zoe_sidebar_button(vm.detachClicked(), Detach Project, btn-warning)
		  <div class="row sidebar-button-row">
		  	 zoe_sidebar_button_show(vm.detachWhenDoneClicked(), Deatch When Done, !vm.project.detach_when_done, btn-warning)
			 zoe_sidebar_button_show(vm.dontDetachWhenDoneClicked(), Don't Detach When Done, vm.project.detach_when_done)
		  </div>
		  zoe_sidebar_button(vm.updateProject(), Update Project, btn-primary)
		  <div class="row sidebar-button-row">
		    zoe_sidebar_button_show(vm.noMoreWorkClicked(), No More Work, !vm.project.dont_request_more_work, btn-primary)
			 zoe_sidebar_button_show(vm.allowMoreWorkClicked(), Allow More Work, vm.project.dont_request_more_work, btn-primary)
		  </div>
		  <div class="row sidebar-button-row">
		    zoe_sidebar_button_show(vm.suspendClicked(), Suspend Project, !vm.project.suspended_via_gui, btn-primary)
			 zoe_sidebar_button_show(vm.resumeClicked(), Resume Project, vm.project.suspended_via_gui, btn-primary)
		  </div>
		</div>
    </div> <!-- container -->
	 
  </div>  
  <div class="row home-row text-center">
    <a href="/#/projects">Projects</a>
  </div>
  <detach-dialog projectname="{{vm.project.name}}" projecturl="{{vm.project.master_url}}" />
</div>
</div>
