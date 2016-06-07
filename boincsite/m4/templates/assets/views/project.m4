divert(-1)
changecom(@@)

include(boincsite/m4/templates/assets/views/views_common.m4)

define(sidebar_button, `dnl
<div class="row sidebar-button-row">
  <button class="btn $3 sidebar-button" ng-click="$1">$2</button>
</div>')

define(sidebar_button_show, `dnl
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
		  
		  <h2>Current Status</h2>
		  
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
		  
		  <h2>Credit</h2>
		  
		  <keyvalrow key="User total credit" val="{{ vm.project.user_total_credit | number }}" />
		  <keyvalrow key="User recent average credit" val="{{ vm.project.user_expavg_credit | number }}" />
		  <keyvalrow key="Total credit for this host" val="{{ vm.project.host_total_credit | number }}" />
		  <keyvalrow key="Recent average credit for this host" val="{{ vm.project.host_expavg_credit | number }}" />
		  
		  <h2>Additional</h2>
		  
		  <div id="project-additional">
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
		  </div>	 

		  <h2>Statistics</h2>
		  
		  <div class="row" id="statsRow" />
		  
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
		  sidebar_button(vm.detachClicked(), Detach Project, btn-warning)
		  <div class="row sidebar-button-row">
		  	 sidebar_button_show(vm.detachWhenDoneClicked(), Deatch When Done, !vm.project.detach_when_done, btn-warning)
			 sidebar_button_show(vm.dontDetachWhenDoneClicked(), Don't Detach When Done, vm.project.detach_when_done)
		  </div>
		  sidebar_button(vm.updateProject(), Update Project, btn-primary)
		  <div class="row sidebar-button-row">
		    sidebar_button_show(vm.noMoreWorkClicked(), No More Work, !vm.project.dont_request_more_work, btn-primary)
			 sidebar_button_show(vm.allowMoreWorkClicked(), Allow More Work, vm.project.dont_request_more_work, btn-primary)
		  </div>
		  <div class="row sidebar-button-row">
		    sidebar_button_show(vm.suspendClicked(), Suspend Project, !vm.project.suspended_via_gui, btn-primary)
			 sidebar_button_show(vm.resumeClicked(), Resume Project, vm.project.suspended_via_gui, btn-primary)
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
