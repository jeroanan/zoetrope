module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
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
      }
    },
    watch: {
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
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.registerTask('default', ['watch'])
}
