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
		  src: 'boincsite/m4/templates/assets/views/index.m4',
		  dest: 'boincsite/templates/assets/views/index.html'
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
	 }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-m4');
  grunt.loadNpmTasks('grunt-prettify');

  grunt.registerTask('default', ['watch']);
}


