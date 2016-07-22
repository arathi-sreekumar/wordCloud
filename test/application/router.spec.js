'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'sinon',
  'router'
], function($, _, Backbone, sinon, Router) {  

	describe('Application routes', function() {
	    beforeEach(function() {
	        //Router.initialize();
	        this.router = new Router.initialize();
		    try {
		      Backbone.history.start({silent:true, pushState:true});
		    } catch(e) {}
	    });

	    it('should exist', function () {
	    	expect(this.router).toBeDefined();
	    });

	    //to do test different routes

	    afterEach(function() {
	        Backbone.history.stop();
	    });

	});
});