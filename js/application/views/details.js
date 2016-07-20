'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!templates/details.html'
], function($, _, Backbone, hbs, detailsTemplate){

  var DetailsView = Backbone.View.extend({
    el: $('#details'),

    template: hbs.compile(detailsTemplate),

    initialize: function (args) {
        this.updateData(args.topic);
        this.listenTo( this.topic, 'change', this.updateData );
     },

    render: function(){
      var that = this;
      this.$el.html(this.template({topic: this.topic}));
    },

    /*
     * Update data function to set the latest clicked data to the view object
     * @param  topic  the topic object that is to be set to the view
    */
    updateData: function (topic) {
      this.topic = topic;
      this.topic.sentiment.positive = this.topic.sentiment.positive || 0;
      this.topic.sentiment.neutral = this.topic.sentiment.neutral || 0;
      this.topic.sentiment.negative = this.topic.sentiment.negative || 0;
    }



  });

  return DetailsView;
});