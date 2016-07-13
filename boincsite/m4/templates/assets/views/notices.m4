divert(-1)
include(boincsite/m4/templates/assets/views/views_common.m4)
divert(0)dnl
zoe_page_title(vm.title)
zoe_loading_panel
zoe_error_panel(notices)
<div ng-show="vm.ready && !vm.error">
  <div ng-repeat="(i, notice) in vm.notices | orderBy:seqNo" ng-show="vm.notices.length>0">
	 zoe_collapse_begin(noticeCollapse-{{i}}, {{notice.title}})
      <p>
        <small>
          From <span ng-bind="notice.project_name" />.
          Published <span ng-bind="notice.create_time" />
          and received <span ng-bind="notice.arrival_time" />
        </small>
      </p>
      <p ng-bind-html="notice.description" />
	 zoe_collapse_end
  </div>
  <div ng-show="vm.notices.length===0">
    <p class="text-center">
    No notices found
    </p>
  </div>
</div>
