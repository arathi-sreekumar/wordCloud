// Filename: config.js

'use strict';

require.config({
  deps: ["main"],
  paths: {
    jquery: 'libs/jquery-3.0.0.min',
    underscore: 'libs/underscore.min',
    backbone: 'libs/backbone.min',
    handlebars: 'libs/handlebars.min',
    text : 'libs/text',
    router: 'application/router',
    templates: '../templates',
    views: 'application/views',
    models: 'application/models',
    collections: 'application/collections'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    handlebars: {
      exports: 'Handlebars'
    }
  },
  config: {
    'collections/topics': {
      fontSizeCategories: ['xs', 's', 'm', 'l', 'xl', 'xxl'],
      TOPICS_URL: '/data/topics.json',
      NO_OF_GROUPS: 6,
      POSITIVE_SENTIMENT_THRESHHOLD: 60,
      NEGATIVE_SENTIMENT_THRESHHOLD: 40
    },
    'models/archemedean': {
      CONTAINER_BOUNDS: {x: 200,y: 200, width: 400, height: 400},
      STEP: 10,
      ROTATION: 0
    },
    'models/quadTree': {
      CONTAINER_BOUNDS: {x: 200,y: 200, width: 400, height: 400},
      MAX_OBJECTS: 50,
      MAX_LEVELS: 6
    }
  }
});