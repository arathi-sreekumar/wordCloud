'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'sinon',
  'views/details',
  'models/topic'
], function($, _, Backbone, sinon, DetailsView, TopicModel) {
  describe('Views: Details', function() {

    it('should be defined', function () {
      expect(DetailsView).toBeDefined();
    });

    beforeEach(function () {
      var topic = {'label':'Berlin','volume':165,'sentimentScore':65,'sentiment':{'negative':3,'neutral':133,'positive':29}};
      this.topicModel = new TopicModel(topic);
    });

    describe('Instantiating topics view', function () {
      beforeEach(function () {
        $('body').append('<div id="details"></div>');
        this.detailsView = new DetailsView({model: this.topicModel});
      });

      it('can be instantiated', function() {
        expect(this.detailsView).not.toBeNull();
      });

      it('has model equal to input topic', function() {
        expect(this.detailsView.model).toEqual(this.topicModel);
      });

      it('should have element defined', function () {
        expect(this.detailsView.el).toBeDefined();
      });

      it('has label as provided in model', function () {
        expect($(this.detailsView.el).text()).toContain('Berlin');
      });

      it('has the volume provided by model', function () {
        expect($(this.detailsView.el).text()).toContain('Total mentions: 165');
      });

      it('has positive mentions provided by model', function () {
        expect($(this.detailsView.el).find('.positive').text()).toContain('29');
      });

      it('has neutral mentions provided by model', function () {
        expect($(this.detailsView.el).find('.neutral').text()).toContain('133');
      });

      it('has negative mentions provided by model', function () {
        expect($(this.detailsView.el).find('.negative').text()).toContain('3');
      });

      it('can update modal', function () {
        var model = {'label':'dance music','volume':4,'sentimentScore':50,'sentiment':{'neutral':4}};
        var newTopicsModel = new TopicModel(model);
        this.detailsView.updateModel(newTopicsModel);
        expect(this.detailsView.model).toEqual(newTopicsModel);
      });

      afterEach(function () {
        this.detailsView.remove();
        $('#details').remove();
      });
    });
  });
});