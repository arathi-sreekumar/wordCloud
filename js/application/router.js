// Filename: router.js
'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'views/cloud',
  'collections/topics'
], function ( $, _, Backbone, CloudView, TopicsCollection) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define cloud url route
      'cloud': 'showCloud',
      
      // Default route
      '*actions': 'defaultAction'
    }
  });
  
  var initialize = function () {

    var app_router = new AppRouter();
    
    app_router.on('route:showCloud', function(){
      // We have no matching route, lets display the cloud page 
      var topicsCollection = new TopicsCollection();
      topicsCollection.fetch().done(function(collection, response) {
        var cloudView = new CloudView({collection: topicsCollection});
        cloudView.render();
      });

    });

    app_router.on('route:defaultAction', function ( actions ) {
      // We have no matching route, lets display the cloud page 
      var topicsCollection = new TopicsCollection();
      topicsCollection.fetch().done(function(collection, response) {
        var cloudView = new CloudView({collection: topicsCollection});
        cloudView.render();
      });

    });

    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});