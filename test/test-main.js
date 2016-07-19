var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

var pathToModule = function(path) {
  var returnValue = path.replace(/^\/base\//, '').replace(/\.js$/, '');
  return returnValue;
};

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    allTestFiles.push(pathToModule(file));
  }
});

require.config({
  baseUrl: '/base/application',
  urlArgs: 'cb=' + Math.random(),
  paths: {
    text: '../js/libs/text',
    jquery: '../js/libs/jquery-3.0.0.min',
    underscore: '../js/libs/underscore.min',
    backbone: '../js/libs/backbone.min',
    sinon: '../js/libs/sinon',
    handlebars: '../js/libs/handlebars.min',
    router: '../js/application/router',
    templates: '../templates',
    views: '../js/application/views',
    models: '../js/application/models',
    collections: '../js/application/collections',
    //helper: '../test/helpers',
    test: '../test'
  },
  shim: {
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  },
  deps: allTestFiles,
  callback: window.__karma__.start
});

