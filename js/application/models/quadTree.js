'use strict';
define([
  'module',
  'underscore',
  'backbone'
], function ( module, _, Backbone ) {

  //Private variables and Objects 
  var defaults = {
    CONTAINER_BOUNDS: module.config().CONTAINER_BOUNDS,
    MAX_OBJECTS: module.config().MAX_OBJECTS,
    MAX_LEVELS: module.config().MAX_LEVELS
  };
  var maxObjects, maxLevels;
  var QuadTreeNode = function ( level, bounds ) {
      this.level = level || 0;
      this.objects = [];
      this.nodes = [];
      this.bounds = bounds;
  };

  //Private functions
  /*
   * Check if two rectangular objects collide
   * @param Object rectObj1    bounds of the area of first element to be checked, with x, y, width, height
   * @param Object rectObj2    bounds of the area of second element to be checked, with x, y, width, height
   * @return boolean   true if the two elements collide, else false
  */
  function isCollide( rectObj1, rectObj2 ) {
    return !(
        ((rectObj1.y + rectObj1.height) < (rectObj2.y)) ||
        (rectObj1.y > (rectObj2.y + rectObj2.height)) ||
        ((rectObj1.x + rectObj1.width) < rectObj2.x) ||
        (rectObj1.x > (rectObj2.x + rectObj2.width))
    );
  }

  /*
   * Split the node into 4 subnodes
   * @param QuadTreeNode Object tree  the quad tree node that needs to be split
   * @return QuadTreeNode Object tree  the quad tree node that was modified
  */
  function split ( tree ) {
    var nextLevel = tree.level + 1,
        subWidth = Math.round( tree.bounds.width / 2 ),
        subHeight = Math.round( tree.bounds.height / 2 ),
        x = Math.round( tree.bounds.x ),
        y = Math.round( tree.bounds.y );
   
    //top right node
    tree.nodes[0] = new QuadTreeNode(nextLevel, {
      x : x + subWidth, 
      y : y, 
      width : subWidth, 
      height  : subHeight
    });
    
    //top left node
    tree.nodes[1] = new QuadTreeNode(nextLevel, {
      x : x, 
      y : y, 
      width : subWidth, 
      height  : subHeight
    });
    
    //bottom left node
    tree.nodes[2] = new QuadTreeNode(nextLevel, {
      x : x, 
      y : y + subHeight, 
      width : subWidth, 
      height  : subHeight
    });
    
    //bottom right node
    tree.nodes[3] = new QuadTreeNode(nextLevel, {
      x : x + subWidth, 
      y : y + subHeight, 
      width : subWidth, 
      height  : subHeight
    });

    return tree;
  }

  /*
   * Determine which node the object belongs to
   * @param Object rectObj    bounds of the area to be checked, with x, y, width, height
   * @param QuadTreeNode Object tree  the quad tree node in whose index we require
   * @return Integer    index of the subnode (0-3), or -1 if rectObj cannot completely fit within a subnode and is part of the parent node
  */
  function getIndex ( rectObj, tree ) {
    var index = -1,
        verticalMidpoint  = tree.bounds.x + (tree.bounds.width / 2),
        horizontalMidpoint  = tree.bounds.y + (tree.bounds.height / 2),

        //rectObj can completely fit within the top quadrants
        topQuadrant = (rectObj.y < horizontalMidpoint && rectObj.y + rectObj.height < horizontalMidpoint),

        //rectObj can completely fit within the bottom quadrants
        bottomQuadrant = (rectObj.y > horizontalMidpoint);

    //rectObj can completely fit within the left quadrants
    if( rectObj.x < verticalMidpoint && rectObj.x + rectObj.width < verticalMidpoint ) {
      if( topQuadrant ) {
        index = 1;
      } else if( bottomQuadrant ) {
        index = 2;
      }

    //rectObj can completely fit within the right quadrants 
    } else if( rectObj.x > verticalMidpoint ) {
      if( topQuadrant ) {
        index = 0;
      } else if( bottomQuadrant ) {
        index = 3;
      }
    }
   
    return index;
  }


  /*
   * Insert the object into the node. If the node
   * exceeds the capacity, it will split and add all
   * objects to their corresponding subnodes.
   * @param Object rectObj    bounds of the object to be added, with x, y, width, height
   * @param QuadTreeNode Object tree  the quad tree node that is the target for insertion
   * @return QuadTreeNode Object tree  the quad tree node that was modified
  */
  function insert ( rectObj, tree ) {
    
    var i = 0, index;
    
    //if we have subnodes ...
    if( tree.nodes[0] && typeof tree.nodes[0] !== 'undefined' ) {
      index = getIndex( rectObj, tree );
   
      if( index !== -1 ) {
        tree = insert( rectObj, tree.nodes[index] );   
        return;
      }
    }
   
    tree.objects.push( rectObj );
    
    if( tree.objects.length > maxObjects && tree.level < maxLevels ) {
      
      //split if we don't already have subnodes
      if( tree.nodes[0] && typeof tree.nodes[0] === 'undefined' ) {
        tree = split(tree);
      }
      
      //add all objects to there corresponding subnodes
      while( i < tree.objects.length ) {
        
        index = getIndex( tree.objects[ i ] );
        
        if( index !== -1 ) {          
          tree = insert( tree.objects.splice(i, 1)[0], tree.nodes[index] );
        } else {
          i = i + 1;
        }
      }
    }

    return tree;
  }


  /*
   * Return all objects that could collide with the given object
   * @param Object rectObj    bounds of the object to be checked, with x, y, width, height
   * @param QuadTreeNode Object tree  the quad tree node that is searched for retreival
   * @Return Array    array with all detected objects
  */
  function retrieve ( rectObj, tree ) {
    
    var index = getIndex( rectObj, tree ),
        returnObjects = tree.objects;
      
    //if we have subnodes ...
    if( tree.nodes[0] && typeof tree.nodes[0] !== 'undefined' ) {
      
      //if rectObj fits into a subnode ..
      if( index !== -1 ) {
        returnObjects = returnObjects.concat( retrieve( rectObj, tree.nodes[index] ) );
        
      //if rectObj does not fit into a subnode, check it against all subnodes
      } else {
        for( var i=0; i < tree.nodes.length; i=i+1 ) {
          returnObjects = returnObjects.concat( retrieve( rectObj, tree.nodes[i] ) );
        }
      }
    }
   
    return returnObjects;
  }
  
  var QuadTreeModel = Backbone.Model.extend({

    /*
     * Initialize the quad tree
     * @param Object bounds   bounds of the node, object with x, y, width, height
    */
    initialize: function ( bounds, maxObj, maxLvls ) {

      bounds = bounds || defaults.CONTAINER_BOUNDS;
      this.tree = new QuadTreeNode(1, bounds);

      // Initializing private max variables
      maxObjects = maxObj || defaults.MAX_OBJECTS;
      maxLevels = maxLvls || defaults.MAX_LEVELS;
    },

    /*
     * Check for collition and add an object to the quad tree if not colliding
     * @param Object rectObj    bounds of the area to be checked, with x, y, width, height
     * @return binary result    true if added successfully, false if there was a collition
    */
    hasCollision: function ( rectObj ) {
      var possibleCollitionObjectList = retrieve(rectObj, this.tree);
      var isColliding = false;
      var index;
      if (possibleCollitionObjectList) {
        for (index = 0; index < possibleCollitionObjectList.length && !isColliding; index++) {
          if (isCollide(rectObj, possibleCollitionObjectList[index])) {
            isColliding = true;
          }
        }
      }
      if (!isColliding) {
        insert(rectObj, this.tree);
      }
      return isColliding;
    },

    /*
     * Clear the quadtree
     */
    clear: function() {     
      this.tree.objects = [];
      this.tree.nodes = [];
    }


  });

  return QuadTreeModel;

});