'use strict';

define([
  'underscore',
  'backbone',
  'sinon',
  'collections/topics'
], function(_, Backbone, sinon, TopicsCollection) {

  var mockTopicsData = {topics: [
        {'label':'Berlin','volume':165,'sentimentScore':65,'sentiment':{'negative':3,'neutral':133,'positive':29}},
        {'label':'Kantine am Berghain','volume':11,'sentimentScore':59,'sentiment':{'neutral':10,'positive':1}},
        {'label':'London','volume':11,'sentimentScore':77,'sentiment':{'neutral':8,'positive':3}},
        {'label':'UK','volume':8,'sentimentScore':50,'sentiment':{'neutral':8}},
        {'label':'Marcel Dettmann','volume':8,'sentimentScore':87,'sentiment':{'neutral':5,'positive':3}},
        {'label':'Disco','volume':8,'sentimentScore':50,'sentiment':{'neutral':8}},
        {'label':'Barcelona','volume':7,'sentimentScore':50,'sentiment':{'neutral':7}},
        {'label':'D/B Presents','volume':3,'sentimentScore':50,'sentiment':{'neutral':3}},
        {'label':'Jun','volume':5,'sentimentScore':50,'sentiment':{'neutral':5}},
        {'label':'DJ','volume':48,'sentimentScore':54,'sentiment':{'neutral':46,'positive':2}},
        {'label':'Mixes','volume':5,'sentimentScore':50,'sentiment':{'neutral':5}},
        {'label':'Panorama Bar Music','volume':5,'sentimentScore':50,'sentiment':{'neutral':5}},
        {'label':'Terrace Sundae','volume':5,'sentimentScore':50,'sentiment':{'neutral':5}},
        {'label':'Berghain resident','volume':13,'sentimentScore':73,'sentiment':{'neutral':10,'positive':3}},
        {'label':'Germany','volume':13,'sentimentScore':80,'sentiment':{'neutral':9,'positive':4}},
        {'label':'Amsterdam','volume':12,'sentimentScore':91,'sentiment':{'neutral':7,'positive':5}},
        {'label':'Ostgut Ton','volume':24,'sentimentScore':58,'sentiment':{'neutral':22,'positive':2}},
        {'label':'Code','volume':16,'sentimentScore':68,'sentiment':{'neutral':13,'positive':3}},
        {'label':'Quantified Drunk','volume':14,'sentimentScore':50,'sentiment':{'neutral':14}},
        {'label':'Watergate','volume':7,'sentimentScore':64,'sentiment':{'neutral':6,'positive':1}},
        {'label':'debut LP','volume':6,'sentimentScore':100,'sentiment':{'neutral':3,'positive':3}},
        {'label':'Patrick Gräser','volume':6,'sentimentScore':100,'sentiment':{'neutral':3,'positive':3}},
        {'label':'Hammered','volume':48,'sentimentScore':20,'sentiment':{'neutral':18,'negative':30}},
        {'label':'Panorama Bar in Berlin','volume':6,'sentimentScore':83,'sentiment':{'neutral':4,'positive':2}},
        {'label':'San Soda\'s Panorama Bar','volume':13,'sentimentScore':50,'sentiment':{'neutral':13}},
        {'label':'legendary nightclub','volume':6,'sentimentScore':150,'sentiment':{'positive':6}},
        {'label':'Ben Klock','volume':5,'sentimentScore':50,'sentiment':{'neutral':5}},
        {'label':'club culture','volume':3,'sentimentScore':50,'sentiment':{'neutral':3}},
        {'label':'Live set','volume':4,'sentimentScore':75,'sentiment':{'neutral':3,'positive':1}},
        {'label':'dance music','volume':4,'sentimentScore':50,'sentiment':{'neutral':4}}
    ]};

  describe('Collections: TopicsCollection', function() {

    beforeEach(function () {
      this.topics = new TopicsCollection();
    });

    it('should be defined', function() {
      expect(TopicsCollection).toBeDefined();
    });

    it('can be instantiated', function() {
      expect(this.topics).not.toBeNull();
    });

    it('no of groups is defined', function () {
      expect(this.topics.noOfGroups).toBeDefined();
    });

    it('There to be font size categories', function () {
      expect(this.topics.hasFontCategory()).toBeTruthy();
    });

    describe('#fetch', function() {
      beforeEach(function () {
        this.server = sinon.fakeServer.create();
      });
      afterEach(function() {
        this.server.restore();
      });

      it ('server exists', function() {
        this.topics.fetch();
        expect(this.server.requests.length).toEqual(1);
        expect(this.server.requests[0].method).toEqual('GET');
        expect(this.server.requests[0].url).toEqual('/data/topics.json');
      });

      describe('request', function() {
        beforeEach(function() {
          this.server.respondWith('GET', '/data/topics.json', [
            200,
            { 'Content-Type': 'application/json' },
            JSON.stringify(mockTopicsData)
          ]);
          this.topics.fetch();
          this.server.respond();
        });

        it('check if topics were fetched', function() {
          expect(this.topics.models).toBeDefined();
          expect(this.topics.length).toEqual(mockTopicsData.topics.length);
        });

        it('check whether the result is ordered by volume in descending order', function () {
            var randomPosition = Math.floor(Math.random() * mockTopicsData.topics.length) - 1;
            if (randomPosition < 0) { randomPosition = 0; }
            expect(this.topics.at(randomPosition).get('volume')).not.toBeLessThan(this.topics.at(randomPosition + 1).get('volume'));
        });

        it('check whether the weight for the biggest volume word is highest', function () {
          expect(this.topics.at(0).get('cloudWeightGroup')).toEqual('xxl'); //get this value from settings
        });

        it('check whether the weight for the smallest volume word is lowest', function () {
          expect(this.topics.at(mockTopicsData.topics.length - 1).get('cloudWeightGroup')).toEqual('xs'); //get this value from settings
        });

        it('check whether the dominating sentiment is calculated correctly for a random sampling', function () {
          var randomPosition = Math.floor(Math.random() * mockTopicsData.topics.length);
          var sentimentScore = this.topics.at(randomPosition).get('sentimentScore');
          var dominating_sentiment = 'neutral';
          if (sentimentScore > 60) {
            dominating_sentiment = 'positive';
          } else if (sentimentScore <  40) {
            dominating_sentiment = 'negative';
          }
          expect(this.topics.at(randomPosition).get('dominatingSentiment')).toEqual(dominating_sentiment);
        });

      });

    });
  });

});