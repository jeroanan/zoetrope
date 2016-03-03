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
          'boincsite/templates/assets/js/controllers/controller.min.js': 'boincsite/templates/assets/js/controllers/controller.js'
        }
      }
    },
    watch: {
      controllers: {
        files: ['boincsite/templates/assets/js/controllers/controller.js'],
        tasks: ['uglify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.registerTask('default', ['watch'])
}
