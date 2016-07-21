'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'sinon',
  'collections/topics',
  'views/cloud'
], function($, _, Backbone, sinon, TopicsCollection, CloudView) {

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
	describe('Views: Cloud ', function() {

    beforeEach(function () {
      this.topics = new TopicsCollection();
      this.server = sinon.fakeServer.create();
    });

    afterEach(function() {
      this.server.restore();
    });

    describe('pass data to cloud view', function () {
      beforeEach(function () {
        this.server.respondWith('GET', '/data/topics.json',
          [ 200, { 'Content-Type': 'application/json' },
          JSON.stringify(mockTopicsData)
          ]);
        this.topics.fetch();
        this.server.respond();
      });

      it('check if topics were fetched', function() {
        expect(this.topics.models).toBeDefined();
        expect(this.topics.length).toEqual(mockTopicsData.topics.length);
      });

      describe('when retreiving topics for cloud', function () {
          beforeEach(function() {
            $('body').append('<div id="cloud"></div>');
            this.view = new CloudView({collection: this.topics});
          });

          it ('view should exist', function () {
            expect(this.view).toBeDefined();
          });

          it('should have topics collection', function () {
            expect(this.view.collection).toBeDefined();
            expect(this.view.collection.length).toEqual(mockTopicsData.topics.length);
          });

          it('should have element defined', function () {
            expect(this.view.el).toBeDefined();
          });

          describe('when rendering the view', function () {
            beforeEach(function () {
              spyOn(this.view, 'createTopicCloud').and.callThrough();
              spyOn(this.view, 'createInitialTopicsHTML').and.callThrough();
              spyOn(this.view, 'initializeDetailsView').and.callThrough();
              this.view.render();
            });

            it('should have rendered the list elements to el', function () {
              expect(this.view.$el.find('li').length).toEqual(mockTopicsData.topics.length);
            });

            it('should call createInitialTopicsHTML', function () {
              expect(this.view.createInitialTopicsHTML).toHaveBeenCalled();
            });

            it('should call createTopicCloud', function () {
              expect(this.view.createTopicCloud).toHaveBeenCalled();
            });

            it('should call initializeDetailsView', function () {
              expect(this.view.initializeDetailsView).toHaveBeenCalled();
            });

            it('has details view model set to collection[0]', function () {
              expect(this.view.detailsView.model).toEqual(this.view.collection.at(0));
            });
          });

          describe('triggering word click', function () {
            beforeEach(function() {
              spyOn(this.view, 'renderDetails').and.callThrough();
              this.view.render();
              this.word = $('#cloud .word').eq(5);
              this.index = this.word.data('index');
              this.word.trigger('click');
            });
            it('should call renderDetails when a word element is clicked', function () {
              expect(this.view.detailsView.model).toEqual(this.view.collection.at(this.index));
            });
          });

          afterEach(function() {
            this.view.remove();
            $('#cloud').remove();
          });
      });

    });

	});
});

