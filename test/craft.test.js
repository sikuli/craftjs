var should = require('chai').should();
var craft = require('../lib/craft');

describe('craft', function() {
  it('connect a pin to a canvas', function() {   
	var canvas = craft.generate('canvas');
	var pin = craft.generate('pin');

	craft.connect(pin,'back').to(canvas,'front');	
  });
});

