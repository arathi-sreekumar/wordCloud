'use strict';

define([
  'underscore',
  'backbone',
  'models/topic'
], function(_, Backbone, TopicModel) {

  describe('Model: TopicModel', function() {

    it('should be defined', function() {
      expect(TopicModel).toBeDefined();
    });

    it('can be instantiated', function() {
      var topic = {'label':'Berlin','volume':165,'sentimentScore':65,'sentiment':{'negative':3,'neutral':133,'positive':29}};
      var topicModel = new TopicModel(topic);
      expect(topicModel).not.toBeNull();
    });

    it('check whether a topic with 0 volume gets all sentiments defaulted to 0', function() {
      var topic = {'label':'Berlin','volume':0,'sentimentScore':0,'sentiment':{}};
      var topicModel = new TopicModel(topic);
      topicModel.setSentimentDefaults();
      var sentiment = topicModel.get('sentiment');
      expect(sentiment.positive).toEqual(0);
      expect(sentiment.neutral).toEqual(0);
      expect(sentiment.negative).toEqual(0);
    });

    it('check whether a topic with all sentiments gets none defaulted to 0', function() {
      var topic = {'label':'Berlin','volume':10,'sentimentScore':5,'sentiment':{'positive': 3, 'neutral': 5, 'negative': 2}};
      var topicModel = new TopicModel(topic);
      topicModel.setSentimentDefaults();
      var sentiment = topicModel.get('sentiment');
      expect(sentiment.positive).toEqual(3);
      expect(sentiment.neutral).toEqual(5);
      expect(sentiment.negative).toEqual(2);
    });

    it('check whether a topic with no positive sentiments gets positive sentiment defaulted to 0', function() {
      var topic = {'label':'Berlin','volume':10,'sentimentScore':5,'sentiment':{'neutral': 8, 'negative': 2}};
      var topicModel = new TopicModel(topic);
      topicModel.setSentimentDefaults();
      var sentiment = topicModel.get('sentiment');
      expect(sentiment.positive).toEqual(0);
      expect(sentiment.neutral).toEqual(8);
      expect(sentiment.negative).toEqual(2);
    });
 
  });

});