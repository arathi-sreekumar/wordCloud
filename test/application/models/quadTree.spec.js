'use strict';
define([
  'underscore',
  'backbone',
  'models/quadTree'
], function(_, Backbone, QuadTree) {
  describe('Model: quadTree', function() {

    it('should be defined', function() {
      expect(QuadTree).toBeDefined();
    });

    it('can be instantiated', function() {
      var rectBounds = { x: 10, y: 10, height: 100, width: 100 };
      var quadTree = new QuadTree(rectBounds);
      expect(quadTree).not.toBeNull();
    });

    it('check for no collisions when adding first node', function() {
      var rectBounds = { x: 10, y: 10, height: 100, width: 100 };
      var quadTree = new QuadTree(rectBounds);
      var hasCollition = quadTree.hasCollision({ x: 50, y: 50, height: 10, width: 10 });
      expect(hasCollition).toBeFalsy();
    });

    it('check for no collisions when adding two nodes that does not collide', function() {
      var rectBounds = { x: 10, y: 10, height: 100, width: 100 };
      var quadTree = new QuadTree(rectBounds);
      var hasCollition = quadTree.hasCollision({ x: 50, y: 50, height: 10, width: 10 });
      hasCollition = quadTree.hasCollision({ x: 70, y: 70, height: 10, width: 10 });
      expect(hasCollition).toBeFalsy();
    });

    it('check for collisions when adding two nodes that collides', function() {
      var rectBounds = { x: 10, y: 10, height: 100, width: 100 };
      var quadTree = new QuadTree(rectBounds);
      var hasCollition = quadTree.hasCollision({ x: 50, y: 50, height: 10, width: 10 });
      hasCollition = quadTree.hasCollision({ x: 45, y: 50, height: 10, width: 10 });
      expect(hasCollition).toBeTruthy();
    });

    it('check whether the quad tree can be cleared', function() {
      var rectBounds = { x: 10, y: 10, height: 100, width: 100 };
      var quadTree = new QuadTree(rectBounds);
      var hasCollition = quadTree.hasCollision({ x: 50, y: 50, height: 10, width: 10 });
      hasCollition = quadTree.hasCollision({ x: 90, y: 50, height: 10, width: 10 });
      quadTree.clear();
      expect(quadTree.tree.objects.length).toEqual(0);
      expect(quadTree.tree.nodes.length).toEqual(0);
    });

  });
});

