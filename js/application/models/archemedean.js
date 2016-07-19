'use strict';
define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var ArchemedeanModel = Backbone.Model.extend({
    
    /* 
     * Archemedes spiral (Archimedean spiral with polar equation )is expressed as  r = a * theta . 
     * Convert that into x, y coordinate, it will be expressed as 
     * x=(center_x_coordinate + (Math.cos(theta) * horizontal_distance_from_center * theta)), 
     * y=(center_y_coordinate + (Math.sin(theta) * vertical_distance_from_center * theta))
     * @return Object array  the array of {x,y} coordinates in the archimedian spiral
    */
    getNextSpiralPosition: function () {

      if (this.theta > this.thetaMax) {
          //Todo: handle boundary exceeded case
      }

      var away = this.awayStep * this.theta;
      var around = this.theta + this.rotation;
      var x = this.centerX + Math.cos(around) * away;
      var y = this.centerY + Math.sin(around) * away;

      this.theta += this.step / away;

      return {x: x, y: y};
    },


    /*
     * Initialize the archimedes modal with the necessary bounds and initial values
     * @param Object bounds   bounds of the node, object with x, y, width, height 
     * @param step  the custom distance between points
     * @param rotation   the custom value for rotation
    */
    initialize: function (bounds, step, rotation) {
      bounds = bounds || {x: 200,y: 200, width: 400, height: 400}; //setting some defaults if bounds are missing
      this.centerX = bounds.x + (bounds.width / 2);
      this.centerY = bounds.y + (bounds.height / 2);
      this.containerHeight = bounds.height;
      this.containerWidth = bounds.width;
      var diameter = (this.containerWidth > this.containerHeight ? this.containerWidth : this.containerHeight);
      //Maximum outer radius for the spiral
      this.radius = diameter / 2;
      //The interval between points
      this.step = step || 10;
      //Maximum allowed value for angle
      this.thetaMax = ((2 * this.radius) / this.step) * Math.PI;
      // How far to step away from center for each side.
      this.awayStep = this.radius / this.thetaMax;
      // Overall rotation of the spiral. ('0'=no rotation, '1'=360 degrees, '180/360'=180 degrees)
      this.rotation = rotation || 0;
      //Initial value of theta
      this.theta = this.step / this.awayStep;
    }


  });

  return ArchemedeanModel;

});