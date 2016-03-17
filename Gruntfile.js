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
            'boincsite/templates/assets/js/controllers/messagesCtrl.js'
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
            'boincsite/templates/assets/js/services/taskSvc.js'
          ]
        }
      }
    },
    watch: {
      app: {
        files: ['boincsite/templates/assets/js/app.js'],
        tasks: ['uglify']
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
          'boincsite/templates/assets/js/controllers/messagesCtrl.js'
        ],
        tasks: ['uglify']
      },
      services: {
        files: [
          'boincsite/templates/assets/js/services/dailyTransferHistorySvc.js',
          'boincsite/templates/assets/js/services/taskSvc.js'
        ],
        tasks: ['uglify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.registerTask('default', ['watch'])
}
