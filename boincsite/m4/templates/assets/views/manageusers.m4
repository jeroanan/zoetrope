divert(-1)
changecom(@@)

include(boincsite/m4/templates/assets/views/views_common.m4)

divert(0)dnl
zoe_page_title(vm.title)

zoe_loading_panel
zoe_error_panel(users)

<div ng-show="vm.ready">
  <div class="alert alert-danger" ng-show="vm.operationSuccess==false && vm.errorText!=''">
    <span ng-bind="vm.errorText" />
  </div>
  zoe_success_panel
  zoe_begin_table
     <thead>
	    zoe_sorting_table_header(user_id, User Id)
		 <th>Actions</th>
	  </thead>
	  <tbody>
	    <tr ng-repeat="(k, u) in vm.users | orderBy:vm.sortProp:vm.reverseSort">
		    <td>
			   <span ng-bind="u.user_id"/>
				<input type="hidden" id="userRow-{{k}}" value="{{k}}" />
			 </td>
			 <td>
			   zoe_begin_dropdown(Actions)
				zoe_dropdown_action(vm.deleteClicked(u,k), Delete User)
				zoe_end_dropdown
			 </td>
		 </tr>		 
	  </tbody>
  zoe_end_table
  <div ng-show="vm.users.length===0">
    <strong>No users exist</strong>
  </div> 


  <div id="deleteUserModal" class="modal fade">
    <div class="modal-dialog">
      <div class="modal-content">
		
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title">Delete User</h4>
        </div>		
        <div class="modal-body">
		  <span>Are you sure you want to delete </span><span ng-bind="vm.userToDelete.userId" />?
		  </div>
		  <div class="modal-footer">
			 <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
			 <button type="button" class="btn btn-primary" ng-click="vm.doDelete()" ng-disabled="loading">Delete</button>
			 <img src="/static/img/loading.gif" alt="loading" class="button-loading" ng-show="loading" />
        </div>
		</div>
    </div>
  </div>

</div>
