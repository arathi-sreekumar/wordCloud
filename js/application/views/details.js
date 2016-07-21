'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!templates/details.html'
], function( $, _, Backbone, hbs, detailsTemplate ) {

  var DetailsView = Backbone.View.extend({
    el: '#details',

    template: hbs.compile(detailsTemplate),

    initialize: function () {
      this.render();
    },

    /*
     * Render function sets the default sentiments and renders the template
    */
    render: function(){
      this.model.setSentimentDefaults();
      this.$el.html(this.template({topic: this.model.toJSON()}));
    },

    /*
     * Update Model to the latest clicked data topic model
     * @param  model  the topic model that is to be set to the view
    */
    updateModel: function ( model ) {
      this.model = model;
      this.render();
    }



  });

  return DetailsView;
});