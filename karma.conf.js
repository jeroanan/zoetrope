module.exports = function(config) {
  config.set({
    basePath: './boincsite/app',
    files: ['../templates/assets/js/jquery.min.js', 
            '../templates/assets/js/angular.min.js',
            '../templates/assets/js/angular-route.min.js',
	    '../templates/assets/js/angular-resource.min.js',
	    '../templates/assets/js/angular-sanitize.min.js',
	    '../templates/assets/js/angular-mocks.js',
	    'app.js',
	    'services/*.js',
	    'controllers/*.js',
	    'tests/*.js'],
    autoWatch: true,
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    plugins: ['karma-phantomjs-launcher',
              'karma-jasmine'],
    junitReporter: {
      outputFile: 'test_out/unit.xml'
    }
  });
};
