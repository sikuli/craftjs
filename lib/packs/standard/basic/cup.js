var model = module.exports = require('craft').model.define()

model.name('cup')
     .author('jeeeun')
     .version('1.0.0');
					   
//parameter
model.parameter('radius')
     .defaultValue(5);
							
										 
//model viewer
model.example('default cup');

model.example('flipped cup')
	.radius(2);


model.factory(function($$$, params) {

	var h = params.h;
	var r = params.r;

	var body = $$$.cylinder(r=2, h=3, $fn=50);

	return body;
});
