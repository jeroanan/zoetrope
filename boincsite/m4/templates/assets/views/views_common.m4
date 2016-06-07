define(zoe_page_title,`dnl
<h1 ng-bind="$1" />')

define(zoe_begin_table,`dnl
<table class="table table-striped">')

define(zoe_loading_panel,`dnl
<div ng-show="!vm.ready" class="text-center">
    <img src="/static/img/loading.gif" />
  </div>')

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
