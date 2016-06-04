divert(-1)
define(zoe_stylesheet, `dnl
<link rel="stylesheet" href="$1" />')

define(zoe_external_script, `dnl
<script src="$1"></script>')

divert(0)dnl
<!DOCTYPE html>
 <html lang="en" ng-app="zoetrope">
   <head>
     <meta charset="utf-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1">

     zoe_stylesheet(/static/css/bootstrap.min.css)
     zoe_stylesheet(/static/css/style.css)

     zoe_external_script(https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js)
     zoe_external_script(https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js)
     zoe_external_script(/static/js/angular.min.js)
     zoe_external_script(/static/js/angular-route.min.js)
     zoe_external_script(/static/js/angular-resource.min.js)
     zoe_external_script(/static/js/angular-sanitize.min.js)
     zoe_external_script(/static/js/app.min.js)
     zoe_external_script(/static/js/services.min.js)
     zoe_external_script(/static/js/directives.min.js)
     zoe_external_script(/static/js/controller.min.js)
   </head>
   <body>
     include(boincsite/m4/templates/navbar.m4)dnl
     <div class="container main-container">
       <div ng-view></div>
     </div>
   </body>
 </html>
dnl 
