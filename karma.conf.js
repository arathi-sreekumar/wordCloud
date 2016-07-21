module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine-jquery', 'jasmine', 'requirejs'],
    files: [
      'test/test-main.js',
      'js/compiled/compiled.min.js',
      { pattern: 'js/application/**/*.js', included: false },
      { pattern: 'templates/**/*.html', included: false },
      { pattern: 'js/libs/**/*.js', included: false },
      { pattern: 'test/**/*.spec.js', included: false }
    ],
    exclude: [ 'js/main.js' ],
    preprocessors: {
      'app/**/*.js': ['coverage']
    },
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    coverageReporter: {
      type: 'html',
      dir: 'test/coverage/'
    }
  });
};
