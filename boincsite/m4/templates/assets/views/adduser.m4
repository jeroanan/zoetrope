divert(-1)
changecom(@@)

include(boincsite/m4/templates/assets/views/views_common.m4)

divert(0)dnl
zoe_page_title(vm.title)
zoe_loading_panel
zoe_error_panel
<div ng-show="vm.ready">
  <div class="alert alert-danger" ng-show="vm.operationSuccess==false && vm.errorText!=''">
    <span ng-bind="vm.errorText" />
  </div>
  zoe_success_panel
  <form class="form-horizontal">

    <div class="row">
	    <div class="col-xs-2"></div>

        <div class="col-xs-8">
          <div class="form-group">
			   <label for="userid">User Id</label>
				<input type="text" name="userid" ng-model="vm.userId" class="form-control" />
			 </div>
			 <div class="form-group">
			   <label for="password">Password</label>
				<input type="password" name="password" ng-model="vm.password" class="form-control" />
			 </div>			 
		  </div>
		 </div>	 	 
    </div>

	 <div class="row">
      <div class="col-xs-2"></div>
      <div class="col-xs-7"></div>
		<div class="col-xs-2">			 
        <button type="button" name="submit" class="btn btn-primary" ng-click="vm.submitClicked()" ng-disabled="vm.loading">
          Submit
        </button>
		  <img src="/static/img/loading.gif" alt="loading" class="button-loading" ng-show="vm.loading" />
      </div>
      <div class="col-xs-1"></div>
    </div>
  </form>
</div>
