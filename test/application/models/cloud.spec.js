'use strict';

define([
  'underscore',
  'backbone',
  'models/cloud'
], function(_, Backbone, CloudModel) {
  describe('Model: CloudModel', function() {

    it('should be defined', function() {
      expect(CloudModel).toBeDefined();
    });

    it('can be instantiated', function() {
      var rectBounds = { x: 10, y: 10, height: 100, width: 100 };
      var archemedeanModel = new CloudModel(rectBounds);
      expect(archemedeanModel).not.toBeNull();
    });

    it('check whether a word position is obtained when adding first node', function() {
      var rectBounds = { x: 10, y: 10, height: 100, width: 100 };
      var cloudModel = new CloudModel(rectBounds);
      var wordPosition = cloudModel.getWordPosition({ height: 10, width: 10 });
      expect(wordPosition.x).toBeDefined();
      expect(wordPosition.y).toBeDefined();
    });
 
  });
});


