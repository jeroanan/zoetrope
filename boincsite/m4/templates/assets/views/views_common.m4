define(zoe_page_title,`dnl
<h1 ng-bind="$1" />')

define(zoe_begin_table,`dnl
<table class="table table-striped">')

define(zoe_end_table,`dnl
</table>')

define(zoe_loading_panel,`dnl
<div ng-show="!vm.ready" class="text-center">
    <img src="/static/img/loading.gif" />
  </div>')

define(zoe_success_panel,`dnl
<div class="alert alert-success" ng-show="vm.operationSuccess">
  <span ng-bind="vm.operationSuccessMessage">
</div>')dnl

define(zoe_error_panel,dnl
<div ng-show="vm.ready && vm.error">
  An error occurred while loading the $1. <a title="Retry" href="javascript:" ng-click="vm.load();">Retry</a>
</div>)

changequote(||)
define(zoe_sorting_table_header,dnl
<th>
  <a ng-click="vm.sort('$1');">$2</a>
  <span ng-show="vm.sortProp==='$1' && !vm.reverseSort">&#x25B2;</span>
  <span ng-show="vm.sortProp==='$1' && vm.reverseSort">&#x25BC;</span>
</th>)
changequote

define(zoe_show_raw_data,dnl
<div class="row">
  <div class="col-xs-3"></div>
  <div class="col-xs-3"></div>
  <div class="col-xs-3"></div>
  <div class="col-xs-3">
    <input type="checkbox" ng-model="vm.showRawData">Show raw data</input>
  </div>
  </div>
  <div class="row" ng-show="vm.showRawData">
    {{ $1 }}
  </div>
</div>)dnl

define(zoe_collapse_begin, `dnl
<h2 class="$3"><a href="javascript:" data-target="#$1" data-toggle="collapse">$2</a></h2>
		  <div id="$1" class="collapse $3">
')

define(zoe_collapse_end, `dnl
</div>
')

define(zoe_sidebar_button, `dnl
<div class="row sidebar-button-row">
  <button class="btn $3 sidebar-button" ng-click="$1">$2</button>
</div>')

define(zoe_sidebar_button_show, `dnl
<button class="btn $4 sidebar-button" ng-click="$1" ng-show="$3">
  $2
</button>')

define(zoe_sidebar_row_begin, `dnl
<div class="row sidebar-button-row">')dnl

define(zoe_sidebar_row_end, `dnl
</div>')

define(zoe_sidebar_heading, `dnl
zoe_sidebar_row_begin
  <h4>$1</h4>
zoe_sidebar_row_end')

define(zoe_begin_dropdown, `dnl
<div class="dropdown">
  <button class="btn btn-default dropdown-toggle" type="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    $1
    <span class="caret"></span>
  </button>
  <ul class="dropdown-menu">')dnl

define(zoe_end_dropdown, `dnl
  </ul>
</div>')dnl

define(zoe_dropdown_action, `dnl
<li><a href="javascript:" ng-click="$1">$2</a></li>')dnl

define(zoe_two_column_row,
  <div class="row task-row">
    <div class="col-xs-3">
      <strong>$1</strong>
    </div>
    <div class="col-xs-3" ng-bind="$2" ng-show="$2!==''"  />
    <div class="col-xs-3" ng-show="$2===''">(no data)</div>
    <div class="col-xs-3">
      <strong>$3</strong> 
    </div>    
    `ifelse(len($3),0,, <div class="col-xs-3" ng-bind="$4" ng-show="$4.toString().length>0"></div>)'
    `ifelse(len($3),0,, <div class="col-xs-3" ng-show="$4.toString().length===0">(no data)</div>)'
  </div>)dnl


dnl BREADCRUMB FUNCTIONS 

define(zoe_begin_breadcrumb, `dnl
<ol class="breadcrumb">')dnl

define(zoe_breadcrumb_item, `dnl
<li><a href="$1">$2</a></li>')dnl

define(zoe_active_breadcrumb_item, `dnl
<li><a class="active">$1</a></li>')dnl

define(zoe_end_breadcrumb, `dnl
</ol>')dnl

define(zoe_level_one_breadcrumb, `dnl
  zoe_begin_breadcrumb
  zoe_breadcrumb_item(/`#'/, Home)
  zoe_active_breadcrumb_item($1)
  zoe_end_breadcrumb
')dnl
dnl END BREADCRUMBS
