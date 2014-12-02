var model = module.exports = require('craft').model.define()

model.name('cup')
     .author('jeeeun')
     .version('1.0.0');
					   
//parameter
model.parameter('radius')
     .defaultValue(5);
model.parameter('height')
	.defaultValue(3);


//model viewer
model.example('default cup');

model.example('small cup')
	.radius(2);


model.factory(function($$$, params) {

	var radius = params.radius;
	var height = params.height;

	var body = $$$.cylinder({r:2, h:5, $fn:100, center:true});
	var hole = $$$.cylinder({r:1.8, h:5, $fn:100, center:true}).translate([0,0,.3]);

	var body = $$$.difference(body, hole).scale([radius, radius, height]);

	//body = $$$.union(body, $$$.torus({ri:1.5, ro:3}).translate([2,0,0]));
	return body;
});
