module.exports = function(config) {
  config.set({
    basePath: 'boincsite/app',
    files: ['../templates/assets/js/jquery.min.js', 
	    '../templates/assets/js/bootstrap.min.js',
            '../templates/assets/js/angular.min.js',
            '../templates/assets/js/angular-route.min.js',
	    '../templates/assets/js/angular-resource.min.js',
	    '../templates/assets/js/angular-sanitize.min.js',
	    '../templates/assets/js/angular-mocks.js',
	    '../../node_modules/karma-read-json/karma-read-json.js',
	    {pattern: 'tests/json/*.json', watched: true, served: true, included: false},
	    'app.js',
	    'services/*.js',
	    'controllers/*.js',
	    'tests/*.js'],
    autoWatch: true,
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    plugins: ['karma-phantomjs-launcher',
              'karma-jasmine',
	      'karma-read-json'],
    junitReporter: {
      outputFile: 'test_out/unit.xml'
    }
  });
};
