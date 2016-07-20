'use strict';

define([
  'underscore',
  'backbone',
], function( _, Backbone ) {
  
  var TopicModel = Backbone.Model.extend({

    initialize: function () {

    },

    /*
     * Setting sentiment default to 0 if there is no value present for a given sentiment
    */
    setSentimentDefaults: function () {
      var sentiment = this.get('sentiment');
      sentiment.positive = sentiment.positive || 0;
      sentiment.neutral = sentiment.neutral || 0;
      sentiment.negative = sentiment.negative || 0;
      this.set('sentiment', sentiment);
    }

  });

  return TopicModel;

});