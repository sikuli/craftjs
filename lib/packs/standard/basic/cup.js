var model = module.exports = require('craft').model.define()

model.name('cup')
     .author('jeeeun')
     .version('1.0.0');
					   
//parameter
model.parameter('radius')
     .defaultValue(1.5);
model.parameter('height')
	.defaultValue(2);


//model viewer
model.example('default cup');

model.example('small cup')
	.radius(2);


model.factory(function($$$, params) {

	var radius = params.radius;
	var height = params.height;

	var body = $$$.cylinder({r:2*radius, h:5*height, $fn:100, center:true});
	var holder = $$$.torus({r1:1*radius, ro:1.2*radius}).translate([2*radius,0,0]);
	holder = $$$.rotate([90,0,0],holder);
	body = $$$.union(body, holder);

	var hole = $$$.cylinder({r:1.8*radius, h:5*height, $fn:100, center:true}).translate([0,0,.3]);

	body = $$$.difference(body, hole);
	return body;
});
