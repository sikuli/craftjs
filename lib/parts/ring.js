var S = require('openscad');

var part = exports;

part.info = {
    name: 'ring',
    author: 'doubleshow',
    version: '1.0.0',
    examples: [{
        description: 'default ring',
        parameters: {}
    }, {
        description: 'a bigger ring',
        parameters: {
            radius: 10
        }
    }, {
        description: 'a ticker ring',
        parameters: {
        	thickness: 3
        }
    }, {
        description: 'a taller ring',
        parameters: {
            depth: 10,
        }
    }]
};

part.generate = function(parameters){
	var params = parameters || {};
	var radius = params.radius || 5;
	var depth = params.depth || 1;
	var thickness = params.thickness || 1;

	var outter = S.cylinder({r: radius, h: depth, center:[true,true,false]});
	var inner = S.cylinder({r: radius - thickness, h: depth, center:[true,true,false]});
	inner.addMarker('base', [0,0,depth]);

	var r = S.difference(outter, inner)
	return r;
}