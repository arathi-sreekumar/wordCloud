'use strict';

define([
  'underscore',
  'backbone',
  'models/archemedean'
], function(_, Backbone, ArchemedeanModel) {
  describe('Model: ArchemedeanModel', function() {
    var archemedeanModel;
    beforeEach(function () {
      var rectBounds = { x: 10, y: 10, height: 100, width: 100 };
      archemedeanModel = new ArchemedeanModel(rectBounds);
    });

    it('should be defined', function() {
      expect(ArchemedeanModel).toBeDefined();
    });

    it('can be instantiated', function() {
      expect(archemedeanModel).not.toBeNull();
    });

    it('gets a spiral position for first word', function() {
      var coordinates = archemedeanModel.getNextSpiralPosition();
      expect(coordinates.x).toBeDefined();
      expect(coordinates.y).toBeDefined();
    });

    describe('generates valid points for case ', function() {
      var rectBounds = { x: 10, y: 10, height: 100, width: 100 };
      archemedeanModel = new ArchemedeanModel(rectBounds);
      var i, spiralPoints = [], pointRadius = [], 
          centerX = archemedeanModel.centerX, centerY = archemedeanModel.centerY, netX, netY;

      it('Radius of archemedean spiral point is greater than its predecessor', function () {
      	for ( i = 0; i< 5; i++ ) {
          spiralPoints[i] = archemedeanModel.getNextSpiralPosition();
          netX = spiralPoints[i].x - centerX;
          netY = spiralPoints[i].y - centerY;
          // Calculating distance of point from center
          pointRadius[i] = Math.sqrt((netX * netX) + (netY * netY));
          if (i > 0) {
            expect(pointRadius[i]).toBeGreaterThan(pointRadius[i-1]);
          }
        }
      });
    });
 
  });
});

