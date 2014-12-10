var model = module.exports = require('craft').model.define()

model.name('cube')
	.author('caleb')
	.version('1.0.0')

//
// Parameters
//

model.parameter('width')
	.defaultValue(10)
	
model.parameter('height')
	.defaultValue(10)
	
model.parameter('depth')
	.defaultValue(10)
	
model.parameter('rounded')
	.defaultValue(false)

//
// Examples
//

model.example('default cube')

model.example('rounded cube')
	.rounded(true)
	
//
// Factory
//

model.factory(function($$$, params) {
	var width = params.width;
	var height = params.height;
	var depth = params.depth;
	var rounded = params.rounded;

	var c = $$$.cube({
        center: true,
        round: rounded
    })

	c = c.scale([width, depth, height])
	return c
})
