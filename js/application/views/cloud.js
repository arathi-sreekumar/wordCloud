'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'models/cloud',
  'text!templates/cloud.html',
  'views/details'
], function( $, _, Backbone, hbs, CloudModel, cloudTemplate, DetailsView ){

  var CloudView = Backbone.View.extend({
    el: '#cloud',

    template: hbs.compile(cloudTemplate), 

    events: {
       'click .word' : 'renderDetails'
    },

    
    initialize: function () {

    },

    /*
     * Render the cloud view, process and create the cloud
    */
    render: function() {
      this.processTopics();
    },

    /*
     * Processing topics to a cloud
     * creates and displays the cloud
     * Also renders the details view initializing it with the word with most volume
    */
    processTopics: function () {

      this.createInitialTopicsHTML(this.collection);
      this.createTopicCloud();

      //Initialize details view with the detils of the most popular word
      this.initializeDetailsView(this.collection.getMostPopularTopic());

    },

    /*
     * Create an initial topics HTML with the topics being rendered out in the DOM 
     * Get the bounding values for the cloud container
     * @param  topicsCollection  the collection of all topics to form the cloud
    */
    createInitialTopicsHTML: function ( topicsCollection ) {
      var that = this;
      this.topics = topicsCollection.models;
      this.$el.html(that.template({topics: that.topics}));
      this.bounds = {
        height: this.$el.height(), 
        width: this.$el.width(), 
        x: this.$el.offset().left, 
        y: this.$el.offset().top
      };
    },

    /*
     * Create the topcs cloud by getting each word position and moving the words 
     * to those positions
    */
    createTopicCloud: function () {
      var dimensions = {};
      var coordinates = {};
      var cloudModel = new CloudModel(this.bounds);

      this.$el.find('li').each(function (index, el) {
          dimensions.height = $(this).height();
          dimensions.width = $(this).width();
          coordinates = cloudModel.getWordPosition(dimensions);
          if (coordinates) {
            $(this).offset({'top': coordinates.y, 'left': coordinates.x});
          }
      });
    },

    /*
     * Create and initialize the details view passing in a topic
    */
    initializeDetailsView: function ( topic ) {
      this.detailsView = new DetailsView({model: topic});
    },

    /*
     * render the details for the selected topic in the details view
     * @param  e  clicked event object
    */
    renderDetails: function ( e ) {
      var index = $(e.target).data('index');
      var topic = this.collection.at(index); 
      this.detailsView.updateModel(topic);
    }

  });

  return CloudView;
});