var model = module.exports = require('craft').model.define()

model.name('text')
	.author('doubleshow')
    .version('1.0.0');

//
// Parameters
//

model.parameter('size')
    .defaultValue(10);

model.parameter('text')
    .defaultValue('');

//
// Examples
//

model.example('hello')
	.text('hello');

model.example('1234 (bigger)')
	.text('1234')
	.size(15);

model.example('x y z (smaller)')
	.text('x y z')
	.size(5);

//
// Factory
//

model.factory(function($$$, params){	
	var size = params.size;
	var text = params.text;

	var l = $$$.vector_text(0,0,text);   // l contains a list of polylines to be drawn
	var o = [];
	l.forEach(function(pl) {                   // pl = polyline (not closed)
	   o.push($$$.rectangular_extrude(pl, {w: 2, h: 2}));   // extrude it to 3D
	});
	
	var scaleFactor = 0.25 * (size/10);
	var depthScaleFactor = 0.1;

	// var r = union(o).scale([scaleFactor,scaleFactor,depthScaleFactor]);	
	// speedup for now
	var r = $$$.group(o).scale([scaleFactor,scaleFactor,depthScaleFactor]);

	// compute ymax in order to set upper left to origin (0,0)
	// var b = r.getBounds();
	// var ymax = b[1].y;
	var ymax = 5.5;	// hard coded, the value is about the same
	
	return r.center(true);
});