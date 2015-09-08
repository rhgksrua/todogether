'use strict';

describe('myApp.create module', function() {

  beforeEach(module('myApp.create'));

  describe('create controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view1Ctrl = $controller('View1Ctrl');
      expect(view1Ctrl).toBeDefined();
    }));

  });
});