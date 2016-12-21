module.exports = function(grunt) {

  var app = ['boincsite/app/app.js'];

  var controllers= [
    'boincsite/app/controllers/*.js',
  ];

  var services = [
    'boincsite/app/services/*.js',    
  ];

  var directives = [
    'boincsite/app/directives/*.js'
  ];
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
	 	app: {
  options: {
    sourceMap: true,
    sourceMapName: 'boincsite/templates/assets/js/app.js.map'
  },
 files: {
   'boincsite/templates/assets/js/app.min.js': app
 }
},	
		controllers: {
  options: {
    sourceMap: true,
    sourceMapName: 'boincsite/templates/assets/js/controller.js.map'
  },
 files: {
   'boincsite/templates/assets/js/controller.min.js': controllers
 }
},
		services: {
  options: {
    sourceMap: true,
    sourceMapName: 'boincsite/templates/assets/js/services.js.map'
  },
 files: {
   'boincsite/templates/assets/js/services.min.js': services
 }
},
		directives: {
  options: {
    sourceMap: true,
    sourceMapName: 'boincsite/templates/assets/js/directives.js.map'
  },
 files: {
   'boincsite/templates/assets/js/directives.min.js': directives
 }
}
    },	 
    watch: {
	        config: {
        files: ['Gruntfile.js'],
		  tasks: []
      },
		app: {
        files: app,
		  tasks: ['jshint:app', 'uglify:app']
      },
		controllers: {
        files: controllers,
		  tasks: ['jshint:controllers', 'uglify:controllers']
      },
		services: {
        files: services,
		  tasks: ['jshint:services', 'uglify:services']
      },
                directives: {
        files: directives,
		  tasks: ['jshint:directives', 'uglify:directives']
      },
		m4_config: {
        files: ['boincsite/m4/Gruntfile.m4'],
		  tasks: ['m4:config']
      },
		m4_index: {
        files: ['boincsite/m4/templates/index.m4', 'boincsite/m4/templates/navbar.m4'],
		  tasks: ['m4:index', 'prettify:index']
      },
		m4_tasks: {
        files: ['boincsite/m4/templates/assets/views/tasks.m4'],
		  tasks: ['m4:tasks', 'prettify:tasks']
      },
		m4_task: {
        files: ['boincsite/m4/templates/assets/views/task.m4'],
		  tasks: ['m4:task', 'prettify:task']
      },
		m4_projects: {
        files: ['boincsite/m4/templates/assets/views/projects.m4'],
		  tasks: ['m4:projects', 'prettify:projects']
      },
		m4_project: {
        files: ['boincsite/m4/templates/assets/views/project.m4'],
		  tasks: ['m4:project', 'prettify:project']
      },
		m4_allprojectlist: {
        files: ['boincsite/m4/templates/assets/views/allprojectlist.m4'],
		  tasks: ['m4:allprojectlist', 'prettify:allprojectlist']
      },
		m4_projectdetail: {
        files: ['boincsite/m4/templates/assets/views/projectdetail.m4'],
		  tasks: ['m4:projectdetail', 'prettify:projectdetail']
      },
		m4_messages: {
        files: ['boincsite/m4/templates/assets/views/messages.m4'],
		  tasks: ['m4:messages', 'prettify:messages']
      },
		m4_notices: {
        files: ['boincsite/m4/templates/assets/views/notices.m4'],
		  tasks: ['m4:notices', 'prettify:notices']
      },
		m4_diskusage: {
        files: ['boincsite/m4/templates/assets/views/diskusage.m4'],
		  tasks: ['m4:diskusage', 'prettify:diskusage']
      },
		m4_hostinfo: {
        files: ['boincsite/m4/templates/assets/views/hostinfo.m4'],
		  tasks: ['m4:hostinfo', 'prettify:hostinfo']
      },
		m4_dailytransferhistory: {
        files: ['boincsite/m4/templates/assets/views/dailytransferhistory.m4'],
		  tasks: ['m4:dailytransferhistory', 'prettify:dailytransferhistory']
      },
		m4_globalpreferences: {
        files: ['boincsite/m4/templates/assets/views/globalpreferences.m4'],
		  tasks: ['m4:globalpreferences', 'prettify:globalpreferences']
      },
		m4_manageusers: {
        files: ['boincsite/m4/templates/assets/views/manageusers.m4'],
		  tasks: ['m4:manageusers', 'prettify:manageusers']
      },
		m4_adduser: {
        files: ['boincsite/m4/templates/assets/views/adduser.m4'],
		  tasks: ['m4:adduser', 'prettify:adduser']
      },
		m4_login: {
        files: ['boincsite/m4/templates/assets/views/login.m4'],
		  tasks: ['m4:login', 'prettify:login']
      },
		m4_views_common: {
		  files: ['boincsite/m4/templates/assets/views/views_common.m4'],
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
		config: {
      src: 'boincsite/m4/Gruntfile.m4',
      dest: 'Gruntfile.js'
},
		index: {
      src: 'boincsite/m4/templates/index.m4',
      dest: 'boincsite/templates/index.html'
},
		tasks: {
      src: 'boincsite/m4/templates/assets/views/tasks.m4',
      dest: 'boincsite/templates/assets/views/tasks.html'
},
		task: {
      src: 'boincsite/m4/templates/assets/views/task.m4',
      dest: 'boincsite/templates/assets/views/task.html'
},
		projects: {
      src: 'boincsite/m4/templates/assets/views/projects.m4',
      dest: 'boincsite/templates/assets/views/projects.html'
},
		project: {
      src: 'boincsite/m4/templates/assets/views/project.m4',
      dest: 'boincsite/templates/assets/views/project.html'
},
		allprojectlist: {
      src: 'boincsite/m4/templates/assets/views/allprojectlist.m4',
      dest: 'boincsite/templates/assets/views/allprojectlist.html'
},
		projectdetail: {
      src: 'boincsite/m4/templates/assets/views/projectdetail.m4',
      dest: 'boincsite/templates/assets/views/projectdetail.html'
},
		messages: {
      src: 'boincsite/m4/templates/assets/views/messages.m4',
      dest: 'boincsite/templates/assets/views/messages.html'
},
		notices: {
      src: 'boincsite/m4/templates/assets/views/notices.m4',
      dest: 'boincsite/templates/assets/views/notices.html'
},
		diskusage: {
      src: 'boincsite/m4/templates/assets/views/diskusage.m4',
      dest: 'boincsite/templates/assets/views/diskusage.html'
},
		hostinfo: {
      src: 'boincsite/m4/templates/assets/views/hostinfo.m4',
      dest: 'boincsite/templates/assets/views/hostinfo.html'
},
		dailytransferhistory: {
      src: 'boincsite/m4/templates/assets/views/dailytransferhistory.m4',
      dest: 'boincsite/templates/assets/views/dailytransferhistory.html'
},
		globalpreferences: {
      src: 'boincsite/m4/templates/assets/views/globalpreferences.m4',
      dest: 'boincsite/templates/assets/views/globalpreferences.html'
},
		manageusers: {
      src: 'boincsite/m4/templates/assets/views/manageusers.m4',
      dest: 'boincsite/templates/assets/views/manageusers.html'
},
		adduser: {
      src: 'boincsite/m4/templates/assets/views/adduser.m4',
      dest: 'boincsite/templates/assets/views/adduser.html'
},
		login: {
      src: 'boincsite/m4/templates/assets/views/login.m4',
      dest: 'boincsite/templates/assets/views/login.html'
}
	 },
	 prettify: {
		options: {
		  condense: false,
		},
		index: {
		  src: 'boincsite/templates/index.html',
		  dest: 'boincsite/templates/index.html'
		},
		tasks: {
      src: 'boincsite/templates/assets/views/tasks.html',
      dest: 'boincsite/templates/assets/views/tasks.html'
},
		task: {
      src: 'boincsite/templates/assets/views/task.html',
      dest: 'boincsite/templates/assets/views/task.html'
},
		projects: {
      src: 'boincsite/templates/assets/views/projects.html',
      dest: 'boincsite/templates/assets/views/projects.html'
},
		project: {
      src: 'boincsite/templates/assets/views/project.html',
      dest: 'boincsite/templates/assets/views/project.html'
},
		allprojectlist: {
      src: 'boincsite/templates/assets/views/allprojectlist.html',
      dest: 'boincsite/templates/assets/views/allprojectlist.html'
},
		projectdetail: {
      src: 'boincsite/templates/assets/views/projectdetail.html',
      dest: 'boincsite/templates/assets/views/projectdetail.html'
},
		messages: {
      src: 'boincsite/templates/assets/views/messages.html',
      dest: 'boincsite/templates/assets/views/messages.html'
},
		notices: {
      src: 'boincsite/templates/assets/views/notices.html',
      dest: 'boincsite/templates/assets/views/notices.html'
},
		diskusage: {
      src: 'boincsite/templates/assets/views/diskusage.html',
      dest: 'boincsite/templates/assets/views/diskusage.html'
},
		hostinfo: {
      src: 'boincsite/templates/assets/views/hostinfo.html',
      dest: 'boincsite/templates/assets/views/hostinfo.html'
},
		dailytransferhistory: {
      src: 'boincsite/templates/assets/views/dailytransferhistory.html',
      dest: 'boincsite/templates/assets/views/dailytransferhistory.html'
},
		globalpreferences: {
      src: 'boincsite/templates/assets/views/globalpreferences.html',
      dest: 'boincsite/templates/assets/views/globalpreferences.html'
},
		manageusers: {
      src: 'boincsite/templates/assets/views/manageusers.html',
      dest: 'boincsite/templates/assets/views/manageusers.html'
},
		adduser: {
      src: 'boincsite/templates/assets/views/adduser.html',
      dest: 'boincsite/templates/assets/views/adduser.html'
},
		login: {
      src: 'boincsite/templates/assets/views/login.html',
      dest: 'boincsite/templates/assets/views/login.html'
}
	 }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-m4');
  grunt.loadNpmTasks('grunt-prettify');

  grunt.registerTask('default', ['watch']);
}


