'use strict';
define([
  'underscore',
  'backbone',
  'models/quadTree'
], function(_, Backbone, ArchemedeanModel) {
  describe('Model: ArchemedeanModel', function() {

    it('should be defined', function() {
      expect(ArchemedeanModel).toBeDefined();
    });

    it('can be instantiated', function() {
      var rectBounds = { x: 10, y: 10, height: 100, width: 100 };
      var archemedeanModel = new ArchemedeanModel(rectBounds);
      expect(archemedeanModel).not.toBeNull();
    });

    it('generates valid points for case ', function() {
    	// To be done
    });
 
  });
});
