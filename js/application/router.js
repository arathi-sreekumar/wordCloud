// Filename: router.js
'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'views/cloud'
], function($, _, Backbone, CloudView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define cloud url route
      'cloud': 'showCloud',
      
      // Default route
      '*actions': 'defaultAction'
    }
  });
  
  var initialize = function(){

    var app_router = new AppRouter();
    
    app_router.on('route:showCloud', function(){
   
        // Call render on the module we loaded in via the dependency array
        var cloudView = new CloudView();
        cloudView.render();

    });

    app_router.on('route:defaultAction', function (actions) {
     
       // We have no matching route, lets display the cloud page 
        var cloudView = new CloudView();
        cloudView.render();
    });

    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});