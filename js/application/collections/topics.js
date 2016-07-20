'use strict';
define([
  'jquery',
  'underscore',
  'backbone',
  'models/topic'
], function ( $, _, Backbone, TopicModel ) {

  //Private variables
  var maxVolume, minVolume;
  var fontSizeCategories = ['xs', 's', 'm', 'l', 'xl', 'xxl'];

  //Private functions
  /*
   * Function that gets n log intervals between a start value and an end value
   * @param totalIntervals   the total number of intervals we require
   * @param start   the starting point for our interval (lowest value of our data)
   * @param end   the last point for our interval (highest value in our data)
  */
  function getLogIntervals ( totalIntervals, start, end ) {
    start = start || 0.1;
    var startInterVal = 1, endInterval = totalIntervals,
        minLog = Math.log(start), maxLog = Math.log(end),
        scale = (maxLog-minLog) / (endInterval-startInterVal),
        result = [], logPoint, i;

    for (i = 1; i < totalIntervals; i++) {
      logPoint = Math.exp(minLog + scale*(i - startInterVal));
      result.push(Math.round(logPoint));
    }

    result.push(end);
    return result;
  }

  var ProjectsCollection = Backbone.Collection.extend({
    model: TopicModel,

    url: '/data/topics.json',

    parse: function ( data ) {
      var topics = this.orderTopicsByFrequency(data.topics);
      topics = this.addCloudWeightAndSentimentToTopics(topics);

      return topics;
    },
    
    initialize: function ( noOfGroups ) {
      this.noOfGroups = noOfGroups || 6;
    },

    /* 
     * Ordering topics by decreasing order of volume
     * @param: topics   list of all topics for the cloud
     * @return: topcis   sorted by volume
    */
    orderTopicsByFrequency: function ( topics ) {
      topics = _.sortBy(topics, function ( topic ) {
        return -topic.volume;
      });
    
      return topics;
    },

    /*
     * Add cloud weight to topics
     * @param: topics   list of all topics for the cloud sorted in descending order of frequency
    */
    addCloudWeightAndSentimentToTopics: function ( topics ) {
      var that = this;
      this.maxVolume = topics[0].volume;
      this.minVolume = topics[topics.length - 1].volume;

      _.each(topics, function (topic) {
          topic = that.addLogarithmicCloudWeightToTopics(topic);
          topic = that.addDominatingSentimentToTopic(topic);
      });
      return topics;
    },

    /*
     * Add dominating sentiment for each topic
     * @param topic  the topic for hich the dominating sentiment score will be calculated
    */
    addDominatingSentimentToTopic: function ( topic ) {
      //Adding a dominating setinment attribute to topic
      if (topic.sentimentScore > 60) {
        topic.dominatingSentiment = 'positive';
      } else if (topic.sentimentScore < 40) {
        topic.dominatingSentiment = 'negative';
      } else {
        topic.dominatingSentiment = 'neutral';
      }
      return topic;
    },

    /*
     * add linear cloud weight info for fontsizes to a topic
     * @param: topic   list of all topics for the cloud
     * @return topic   updated topic with cloud weight information
    */
    addLinearCloudWeightToTopic: function ( topic ) {
      var step = (this.maxVolume - this.minVolume) / (this.noOfGroups - 1),
          weightGroup = Math.floor((topic.volume - this.minVolume) / step);

      topic.cloudWeightGroup = fontSizeCategories[weightGroup];

      return topic;
    },

    /*
     * Add logarithmic weights for fontsizes
     * @param: topics   list of all topics for the cloud
     * @return topic   updated topic with cloud weight information
    */
    addLogarithmicCloudWeightToTopics: function ( topic ) {
      var logIntervals = getLogIntervals(this.noOfGroups, this.minVolume, this.maxVolume);
      var interval;
      for (interval = 0; interval < logIntervals.length; interval++) {
        if (topic.volume <= logIntervals[interval]) {
          topic.cloudWeightGroup = fontSizeCategories[interval];
          return topic;
        }
      }
      // If none match return topic as is 
      return topic;
    }


  });
 
  return ProjectsCollection;
});