module.exports = function(grunt) {

  var app = 'boincsite/templates/assets/js/app.js';

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
          'boincsite/templates/assets/js/app.min.js': [app]
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
        files: ['Gruntfile.js']
      },
      app: {
        files: [app],
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
		}
    },
	 jshint: {
		controllers: controllers,
		services: services,
		directives: directives,
		app: app
	 }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['watch']);

}
