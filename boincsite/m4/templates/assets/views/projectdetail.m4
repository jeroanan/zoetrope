divert(-1)
changecom(@@)

include(boincsite/m4/templates/assets/views/views_common.m4)
  
divert(0)dnl
zoe_page_title(vm.title)
zoe_loading_panel
<div ng-show="vm.ready && !vm.projectFound">
  <h2>Project not found</h2>
  <a href="/#/getallprojectlist">All Boinc Projects</a>
</div>
zoe_error_panel(project details)
<div ng-show="vm.ready && vm.projectFound && !vm.error">
  <p class="text-center">
    <img ng-src="{{vm.project.image}}" alt="{{vm.name}}" />
  </p>

  <p ng-show="vm.gotPlatform">
	 <span ng-show="vm.project.platformSupported">&#10004; This project is supported by the current platform</span>
	 <span ng-show="!vm.project.platformSupported" class="text-danger">&#x2717; This project is unsupported by the current platform</span>
  </p>
  <p ng-show="vm.project.attached">
	 <span>This client is already attached to the project.</span>
	 <a ng-href="/#/project/{{ vm.project.name }}">More information</a>
	 <br />
	 <button class="btn btn-warning" ng-click="vm.detachClicked()">Detach</button>
	 <detach-dialog projectname="{{vm.project.name}}" projecturl="{{vm.project.url}}" />	 
  </p>

  <p ng-show="!vm.project.attached">
	 <button class="btn btn-primary" ng-click="vm.attachClicked()">Attach</button>
	 <attach-dialog projectname="{{vm.project.name}}" projecturl="{{vm.project.url}}" />
  </p>
  <p>
    Computing for
    <span ng-bind="vm.project.general_area" />
    <span ng-show="vm.project.specific_area.length>0">(<span ng-bind="vm.project.specific_area" />)</span>
  </p>
  <p ng-bind="vm.project.description" />
  <p>
    <a ng-href="{{vm.project.url}}">Project homepage</a>
  </p>
  zoe_collapse_begin(supportedPlatformsCollapse, Supported Platforms)
    <ul id="supportedPlatforms">
      <li ng-repeat="p in vm.project.platforms" ng-bind="p.name" />
    </ul>
  zoe_collapse_end
</div>

