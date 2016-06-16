divert(-1)

define(zoe_uglify_task,`dnl
dnl $1: target name
dnl $2: map filename
dnl $3: minified filename
dnl $4: Array of files to minify
$1: {
  options: {
    sourceMap: true,
    sourceMapName: ''$2'`
  },
 files: {
   ''$3': $4
 }
})
define(zoe_watch_task,`dnl
dnl $1: target name,
dnl $2: files to watch,
dnl $3: tasks to run
$1: {
        files: $2,
		  tasks: $3
      }')

define(zoe_uglify_js_task, `zoe_uglify_task($1, zoe_js_dir/$1.js.map, zoe_js_dir/$1.min.js, $1)')

define(zoe_watch_js_task, `dnl
zoe_watch_task($1, $1, [''jshint:$1'``,' ''uglify:$1'`])')

define(zoe_watch_m4_task, `dnl
zoe_watch_task(m4_$1, [''zoe_m4_views_dir/$1.m4'`], [''m4:$1'``,' ''prettify:$1'`])')

define(zoe_m4_html, `zoe_src_dest_task($1, zoe_m4_root/templates/assets/views/$1.m4, zoe_views_dir/$1.html)')

define(zoe_prettify_html, `zoe_src_dest_task($1, zoe_views_dir/$1.html, zoe_views_dir/$1.html)')

define(zoe_src_dest_task, `dnl
$1: {
		  src: ''$2'`,
		  dest: ''$3'`
		}')

define(zoe_views_dir, boincsite/templates/assets/views)
define(zoe_m4_views_dir, boincsite/m4/templates/assets/views)
define(zoe_js_dir, boincsite/templates/assets/js)
define(zoe_m4_root, boincsite/m4)
divert(0)dnl
module.exports = function(grunt) {

  var app = ['boincsite/templates/assets/js/app.js'];

  var controllers= [
    'boincsite/templates/assets/js/controllers/*.js',
  ];

  var services = [
    'boincsite/templates/assets/js/services/*.js',    
  ];

  var directives = [
	 'boincsite/templates/assets/js/directives/*.js'
  ];
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
	 	zoe_uglify_js_task(app),	
		zoe_uglify_task(controllers, zoe_js_dir/controller.js.map, zoe_js_dir/controller.min.js, controllers),
		zoe_uglify_js_task(services),
		zoe_uglify_js_task(directives)
    },	 
    watch: {
	   zoe_watch_task(config, ['Gruntfile.js'], []),
		zoe_watch_task(app, app, ['jshint:app'`,' 'uglify:app']),
		zoe_watch_js_task(controllers),
		zoe_watch_js_task(services),
      zoe_watch_js_task(directives),
		zoe_watch_task(m4_config, ['boincsite/m4/Gruntfile.m4'], ['m4:config']),
		zoe_watch_task(m4_index,
							['boincsite/m4/templates/index.m4'`,' 'boincsite/m4/templates/navbar.m4'],
							['m4:index'`,' 'prettify:index']),
		zoe_watch_m4_task(tasks),
		zoe_watch_m4_task(task),
		zoe_watch_m4_task(projects),
		zoe_watch_m4_task(project),
		zoe_watch_m4_task(allprojectlist),
		zoe_watch_m4_task(projectdetail),
		zoe_watch_m4_task(messages),
		zoe_watch_m4_task(notices),
		zoe_watch_m4_task(diskusage),
		zoe_watch_m4_task(hostinfo),
		zoe_watch_m4_task(dailytransferhistory),
		zoe_watch_m4_task(globalpreferences),
		zoe_watch_m4_task(manageusers),
		zoe_watch_m4_task(adduser),
		zoe_watch_m4_task(login),
		m4_views_common: {
		  files: ['zoe_m4_views_dir/views_common.m4'],
		  tasks: ['m4:tasks',
					 'm4:projects',
					 'm4:task',
					 'm4:project',
					 'm4:allprojectlist',
					 'm4:projectdetail',
					 'm4:messsages']
		}		
    },
	 jshint: {
		controllers: controllers,
		services: services,
		directives: directives,
		app: app
	 },
	 m4: {
		options: {
		  prefix_builtins: false
		},		
		zoe_src_dest_task(config, zoe_m4_root/Gruntfile.m4, Gruntfile.js),
		zoe_src_dest_task(index, zoe_m4_root/templates/index.m4, boincsite/templates/index.html),
		zoe_m4_html(tasks),
		zoe_m4_html(task),
		zoe_m4_html(projects),
		zoe_m4_html(project),
		zoe_m4_html(allprojectlist),
		zoe_m4_html(projectdetail),
		zoe_m4_html(messages),
		zoe_m4_html(notices),
		zoe_m4_html(diskusage),
		zoe_m4_html(hostinfo),
		zoe_m4_html(dailytransferhistory),
		zoe_m4_html(globalpreferences),
		zoe_m4_html(manageusers),
		zoe_m4_html(adduser),
		zoe_m4_html(login)
	 },
	 prettify: {
		options: {
		  condense: false,
		},
		index: {
		  src: 'boincsite/templates/index.html',
		  dest: 'boincsite/templates/index.html'
		},
		zoe_prettify_html(tasks),
		zoe_prettify_html(task),
		zoe_prettify_html(projects),
		zoe_prettify_html(project),
		zoe_prettify_html(allprojectlist),
		zoe_prettify_html(projectdetail),
		zoe_prettify_html(messages),
		zoe_prettify_html(notices),
		zoe_prettify_html(diskusage),
		zoe_prettify_html(hostinfo),
		zoe_prettify_html(dailytransferhistory),
		zoe_prettify_html(globalpreferences),
		zoe_prettify_html(manageusers),
		zoe_prettify_html(adduser),
		zoe_prettify_html(login)
	 }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-m4');
  grunt.loadNpmTasks('grunt-prettify');

  grunt.registerTask('default', ['watch']);
}


