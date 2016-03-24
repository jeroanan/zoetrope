module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      app: {
        options: {
          sourceMap: true,
          sourceMapName: 'boincsite/templates/assets/js/app.js.map'
        },
        files: {
          'boincsite/templates/assets/js/app.min.js': ['boincsite/templates/assets/js/app.js']
        }
      },
      controllers: {
        options: {
          sourceMap: true,
          sourceMapName: 'boincsite/templates/assets/js/controllers/controller.js.map'
        },
        files: {
          'boincsite/templates/assets/js/controllers/controller.min.js': [
            'boincsite/templates/assets/js/controllers/controller.js',
            'boincsite/templates/assets/js/controllers/diskUsageCtrl.js',
            'boincsite/templates/assets/js/controllers/indexCtrl.js',
            'boincsite/templates/assets/js/controllers/taskCtrl.js',
            'boincsite/templates/assets/js/controllers/projectsCtrl.js',
            'boincsite/templates/assets/js/controllers/projectCtrl.js',
            'boincsite/templates/assets/js/controllers/hostInfoCtrl.js',
            'boincsite/templates/assets/js/controllers/dailyTransferCtrl.js',
            'boincsite/templates/assets/js/controllers/messagesCtrl.js',
            'boincsite/templates/assets/js/controllers/noticesCtrl.js'
            ]
        }
      },
      services: {
        options: {
          sourceMap: true,
          sourceMapName: 'boincsite/templates/assets/js/services/services.js.map'
        },
        files: {
          'boincsite/templates/assets/js/services/services.min.js': [
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
            'boincsite/templates/assets/js/services/jsonServices.js'
          ]
        }
      }
    },
    watch: {
      config: {
        files: ['Gruntfile.js']
      },
      app: {
        files: ['boincsite/templates/assets/js/app.js'],
        tasks: ['uglify:app']
      },
      controllers: {
        files: [
          'boincsite/templates/assets/js/controllers/controller.js',
          'boincsite/templates/assets/js/controllers/diskUsageCtrl.js',
          'boincsite/templates/assets/js/controllers/indexCtrl.js',
          'boincsite/templates/assets/js/controllers/taskCtrl.js',
          'boincsite/templates/assets/js/controllers/projectsCtrl.js',
          'boincsite/templates/assets/js/controllers/projectCtrl.js',
          'boincsite/templates/assets/js/controllers/hostInfoCtrl.js',
          'boincsite/templates/assets/js/controllers/dailyTransferCtrl.js',
          'boincsite/templates/assets/js/controllers/messagesCtrl.js',
          'boincsite/templates/assets/js/controllers/noticesCtrl.js'
        ],
        tasks: ['uglify:controllers']
      },
      services: {
        files: [
          'boincsite/templates/assets/js/services/dailyTransferHistorySvc.js',
          'boincsite/templates/assets/js/services/tasksSvc.js',
          'boincsite/templates/assets/js/services/projectsSvc.js',
          'boincsite/templates/assets/js/services/projectSvc.js',
          'boincsite/templates/assets/js/services/messagesSvc.js',
          'boincsite/templates/assets/js/services/diskUsageSvc.js',
          'boincsite/templates/assets/js/services/hostInfoSvc.js',
          'boincsite/templates/assets/js/services/taskSvc.js',          
          'boincsite/templates/assets/js/services/noticesSvc.js',
          'boincsite/templates/assets/js/services/jsonServices.js'
        ],
        tasks: ['uglify:services']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.registerTask('default', ['watch'])
}
