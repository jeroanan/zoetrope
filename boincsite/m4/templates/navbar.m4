divert(-1)
changecom(@@)

define(zoe_navbar_start, `dnl
<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="/#/">$1</a>
    </div>
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">')

define(zoe_begin_dropdown_menu, `dnl
        <li class="dropdown collapse">
          <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
            $1 <span class="caret"></span>
          </a>
          <ul class="dropdown-menu" role="menu">')

define(zoe_end_dropdown_menu, `dnl
          </ul>
        </li>')
		  
define(zoe_menu_item, `dnl
        <li><a href="$1">$2</a></li>')

define(zoe_dropdown_menu_item, `dnl
    zoe_menu_item(`$1', `$2')')

define(zoe_dropdown_menu_separator, `dnl
            <li role="separator" class="divider" />')

define(zoe_navbar_end, `dnl
      </ul>
    </div>
  </div>
</nav>')
divert(0)dnl
dnl
zoe_navbar_start(Zoetrope)
dnl
zoe_begin_dropdown_menu(Projects)
zoe_dropdown_menu_item(#/projects, Attached Projects)
zoe_dropdown_menu_item(#/getallprojectlist, All BOINC Projects)
zoe_dropdown_menu_separator
zoe_dropdown_menu_item(#/attachproject, Attach Project)
zoe_dropdown_menu_item(#/detachproject, Detach Project)
zoe_end_dropdown_menu
dnl
zoe_menu_item(#/messages, Messages)
zoe_menu_item(#/notices, Notices)
dnl
zoe_begin_dropdown_menu(System Info)
zoe_dropdown_menu_item(#/disk_usage, Disk Usage)
zoe_dropdown_menu_item(#/host_info, Host Info)
zoe_dropdown_menu_item(#/daily_transfer_history, Daily Transfer History)
zoe_dropdown_menu_item(#/globalpreferences, Global Preferences)
zoe_dropdown_menu_separator
zoe_dropdown_menu_item(#/about, About Zoetrope)
zoe_end_dropdown_menu
zoe_navbar_end
changecom dnl

