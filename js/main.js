// Filename: main.js

'use strict';

requirejs.config({
  config: {
      'collections/topics': {
        fontSizeCategories: ['xs', 's', 'm', 'l', 'xl', 'xxl'],
        TOPICS_URL: '/data/topics.json',
        NO_OF_GROUPS: 6,
        POSITIVE_SENTIMENT_THRESHHOLD: 60,
        NEGATIVE_SENTIMENT_THRESHHOLD: 40
      },
      'models/archemedean': {
        CONTAINER_BOUNDS: {x: 200, y: 200, width: 400, height: 400},
        STEP: 10,
        ROTATION: 0
      },
      'models/quadTree': {
        CONTAINER_BOUNDS: {x: 200, y: 200, width: 400, height: 400},
        MAX_OBJECTS: 50,
        MAX_LEVELS: 6
      }
  }
})

require([
  // Load our app module and pass it to our definition function
  'application/app',

], function(App){
  // The "app" dependency is passed in as "App"
  // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
  App.initialize();
});