divert(-1)
changecom(@@)

include(boincsite/m4/templates/assets/views/views_common.m4)

divert(0)dnl
zoe_page_title(vm.title)

<div class="alert alert-danger" ng-show="vm.operationSuccess==false && vm.errorText!=''">
    <span ng-bind="vm.errorText" />
</div>
zoe_success_panel  
<div class="row">
  <div class="col-xs-4" />
  <div class="col-xs-4 login-box">
    <form class="form-horizontal">
	   <div class="form-group">
	     <label for="username">Username</label>
		  <input type="text" name="username" ng-model="vm.username" class="form-control" />
		</div>
		<div class="form-group">
	     <label for="password">Password</label>
		  <input type="password" name="password" ng-model="vm.password" class="form-control" />
		</div>
		<div class="form-group">
		  <button class="btn form-control btn-primary" ng-click="vm.loginClicked()">Login</button>
      </div>
    </form>
  </div>
  <div class="col-xs-4" />

</div>

