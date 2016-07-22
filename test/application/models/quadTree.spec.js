'use strict';

define([
  'underscore',
  'backbone',
  'models/quadTree'
], function(_, Backbone, QuadTree) {
  describe('Model: quadTree', function() {

    var quadTree;
    beforeEach(function () {
      var rectBounds = { x: 10, y: 10, height: 100, width: 100 };
      quadTree = new QuadTree(rectBounds);
    });

    it('should be defined', function() {
      expect(QuadTree).toBeDefined();
    });

    it('can be instantiated', function() {
      expect(quadTree).not.toBeNull();
    });

    it('check for no collisions when adding first node', function() {
      var hasCollition = quadTree.hasCollision({ x: 50, y: 50, height: 10, width: 10 });
      expect(hasCollition).toBeFalsy();
    });

    it('check for no collisions when adding two nodes that does not collide', function() {
      var hasCollition = quadTree.hasCollision({ x: 50, y: 50, height: 10, width: 10 });
      hasCollition = quadTree.hasCollision({ x: 70, y: 70, height: 10, width: 10 });
      expect(hasCollition).toBeFalsy();
    });

    it('check for collisions when adding two nodes that collides', function() {
      var hasCollition = quadTree.hasCollision({ x: 50, y: 50, height: 10, width: 10 });
      hasCollition = quadTree.hasCollision({ x: 45, y: 50, height: 10, width: 10 });
      expect(hasCollition).toBeTruthy();
    });

    it('check for collition for multiple node addition', function () {
      var hasCollition = quadTree.hasCollision({ x: 10, y: 10, height: 20, width: 20 });
      expect(hasCollition).toBeFalsy();
      hasCollition = quadTree.hasCollision({ x: 40, y: 10, height: 20, width: 20 });
      expect(hasCollition).toBeFalsy();
      hasCollition = quadTree.hasCollision({ x: 20, y: 30, height: 20, width: 20 });
      expect(hasCollition).toBeTruthy();
      hasCollition = quadTree.hasCollision({ x: 30, y: 40, height: 50, width: 50 });
      expect(hasCollition).toBeFalsy();
      //Check whther only the non colliding three elements got added
      expect(quadTree.tree.objects.length).toEqual(3);
    });

    it('check whether the quad tree can be cleared', function() {
      var hasCollition = quadTree.hasCollision({ x: 50, y: 50, height: 10, width: 10 });
      hasCollition = quadTree.hasCollision({ x: 90, y: 50, height: 10, width: 10 });
      quadTree.clear();
      expect(quadTree.tree.objects.length).toEqual(0);
      expect(quadTree.tree.nodes.length).toEqual(0);
    });

    it('check whether the word node is out of bounds', function () {
      //Making sure not having any nodes wouldnt affect the outcome
      expect(quadTree.isOutOfBounds({ x: 50, y: 50, height: 10, width: 10 })).toBeFalsy();
      //Making sure adding a node would not affect the outcomes
      var hasCollition = quadTree.hasCollision({ x: 10, y: 10, height: 20, width: 20 });
      expect(quadTree.isOutOfBounds({ x: 70, y: 70, height: 10, width: 10 })).toBeFalsy();
      expect(quadTree.isOutOfBounds({ x: 110, y: 110, height: 10, width: 10 })).toBeTruthy();
      expect(quadTree.isOutOfBounds({ x: 0, y: 0, height: 10, width: 10 })).toBeTruthy();
    });

  });
});
