var craft = require('craft');
var S = require('craft').openscad;
var part = module.exports = craft.parts.define();

part.name('text')
	.author('doubleshow')
    .version('1.0.0');

//
// Parameters
//

part.parameter('size')
    .defaultValue(10);

part.parameter('text')
    .defaultValue('');

//
// Examples
//

part.example('hello')
	.text('hello');

part.example('1234 (bigger)')
	.text('1234')
	.size(15);

part.example('x y z (smaller)')
	.text('x y z')
	.size(5);

//
// Factory
//

part.factory(function(parameters){
	var params = parameters || {};
	var size = params.size || 10;
	var text = params.text || '';

	var l = S.vector_text(0,0,text);   // l contains a list of polylines to be drawn
	var o = [];
	l.forEach(function(pl) {                   // pl = polyline (not closed)
	   o.push(S.rectangular_extrude(pl, {w: 2, h: 2}));   // extrude it to 3D
	});
	
	var scaleFactor = 0.25 * (size/10);
	var depthScaleFactor = 0.1;

	// var r = union(o).scale([scaleFactor,scaleFactor,depthScaleFactor]);	
	// speedup for now
	var r = S.union(o).scale([scaleFactor,scaleFactor,depthScaleFactor]);

	// compute ymax in order to set upper left to origin (0,0)
	// var b = r.getBounds();
	// var ymax = b[1].y;
	var ymax = 5.5;	// hard coded, the value is about the same
	
	r.addMarker('base',[0,ymax,0]);
	return r.center(true);
});