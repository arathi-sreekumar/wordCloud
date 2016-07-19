'use strict';
define([
  'underscore',
  'backbone',
  'models/quadTree',
  'models/archemedean'
], function(_, Backbone, QuadTree, ArchemedeanModel) {
  
  var CloudModel = Backbone.Model.extend({

  	/*
	 * Get the coordinates for the word 
	 * @param Object dimensions   contains the {width, height} of the word element
	 * @return Object coordinates   contains the {x,y} coordinates for placing the word on the container
  	*/
  	getWordPosition: function (dimensions) {
  		var hasCollition = false;
  		var wordObj = { width: dimensions.width, height: dimensions.height };
  		var coordinates;

  		do {
  			coordinates = this.archemedean.getNextSpiralPosition();
  			if (!coordinates.x) {
  				return;
  			}
  			wordObj.x = coordinates.x;
  			wordObj.y = coordinates.y;

  			hasCollition = this.quadTree.hasCollision(wordObj);
  		} while (hasCollition);

  		return coordinates;
  	},

  	/*
	 * Get font classes
  	*/

  	/*
	 * Initialize the container metrix to the quad tree
	 * @param Object bounds   bounds of the node, object with x, y, width, height 
  	*/
  	initialize: function (bounds) {
  		this.quadTree = new QuadTree(bounds);
  		//this.quadTree.createQuadTree(bounds);
  		this.archemedean = new ArchemedeanModel(bounds);
  	}


  });

  return CloudModel;

});