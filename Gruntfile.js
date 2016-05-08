module.exports = function(grunt) {

  var app = 'boincsite/templates/assets/js/app.js';

  var controllers= [
    'boincsite/templates/assets/js/controllers/controller.js',
    'boincsite/templates/assets/js/controllers/diskUsageCtrl.js',
    'boincsite/templates/assets/js/controllers/indexCtrl.js',
    'boincsite/templates/assets/js/controllers/taskCtrl.js',
    'boincsite/templates/assets/js/controllers/projectsCtrl.js',
    'boincsite/templates/assets/js/controllers/projectCtrl.js',
    'boincsite/templates/assets/js/controllers/hostInfoCtrl.js',
    'boincsite/templates/assets/js/controllers/dailyTransferCtrl.js',
    'boincsite/templates/assets/js/controllers/messagesCtrl.js',
    'boincsite/templates/assets/js/controllers/noticesCtrl.js',
    'boincsite/templates/assets/js/controllers/globalPreferencesCtrl.js',
    'boincsite/templates/assets/js/controllers/allProjectListCtrl.js',
    'boincsite/templates/assets/js/controllers/projectDetailCtrl.js',
    'boincsite/templates/assets/js/controllers/attachProjectCtrl.js',
    'boincsite/templates/assets/js/controllers/detachProjectCtrl.js'
  ];

  var services = [
    'boincsite/templates/assets/js/services/services.js',
    'boincsite/templates/assets/js/services/dailyTransferHistorySvc.js',
    'boincsite/templates/assets/js/services/tasksSvc.js',
    'boincsite/templates/assets/js/services/projectsSvc.js',
    'boincsite/templates/assets/js/services/projectSvc.js',
    'boincsite/templates/assets/js/services/messagesSvc.js',
    'boincsite/templates/assets/js/services/diskUsageSvc.js',
    'boincsite/templates/assets/js/services/hostInfoSvc.js',
    'boincsite/templates/assets/js/services/taskSvc.js',
    'boincsite/templates/assets/js/services/noticesSvc.js',
    'boincsite/templates/assets/js/services/globalPreferencesSvc.js',
    'boincsite/templates/assets/js/services/jsonServices.js',
    'boincsite/templates/assets/js/services/allProjectListSvc.js',
    'boincsite/templates/assets/js/services/attachProjectSvc.js',
    'boincsite/templates/assets/js/services/detachProjectSvc.js',
    'boincsite/templates/assets/js/services/updateProjectSvc.js',
    'boincsite/templates/assets/js/services/md5Svc.js',
	 'boincsite/templates/assets/js/services/statisticsSvc.js'
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
          sourceMapName: 'boincsite/templates/assets/js/controllers/controller.js.map'
        },
        files: {
          'boincsite/templates/assets/js/controllers/controller.min.js': controllers
        }
      },
      services: {
        options: {
          sourceMap: true,
          sourceMapName: 'boincsite/templates/assets/js/services/services.js.map'
        },
        files: {
          'boincsite/templates/assets/js/services/services.min.js': services
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
      }
    },
	 jshint: {
		controllers: controllers,
		services: services,
		app: app
	 }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['watch']);

}
