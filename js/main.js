// Filename: main.js

'use strict';

require([
  // Load our app module and pass it to our definition function
  'application/app',

], function(App){
  // The "app" dependency is passed in as "App"
  // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
  App.initialize();
});