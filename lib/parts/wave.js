var S = require('openscad');
var part = exports;

part.info = {
    name: 'save',
    author: 'doubleshow',
    version: '1.0.0',
    examples: [{
        description: 'default wave',
        parameters: {}
    }, {
        description: 'a longer, wider wave',
        parameters: {
        	width: 40,
        	height: 15,
            count: 15
        }
    }]
};

part.generate = function wave(parameters){
	var params = parameters || {};

	var height = params.height || 10;
	var width = params.width || 20;
	var count = params.count || 6;

	var c = S.cylinder({r:5, h:height});

	var cut = S.cube({});	
	cut = cut.scale([5*(count+1),10,height]).translate([0,-4,0]);
	cut.addMarker('base', [2,-4,height]);

	var parts = new Array();
	for (var i = 0; i < count; i = i + 1){
		c = c.translate([5,0,0]);
		parts.push(c);
	}
	var r = S.difference(S.union(parts), cut);

	// fit the width
	var b = r.getBounds();
	var dx = b[1].x - b[0].x;
	r = r.scale([width/dx, 1, 1]);
	return r.center(true).rotateX(-90);
}