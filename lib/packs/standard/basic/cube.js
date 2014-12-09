var model = module.exports = require('craft').model.define()

model.name('cube')
	.author('caleb')
	.version('1.0.0')

//
// Examples
//
model.example('default cube')

//
// Factory
//

model.factory(function($$$, params) {
	return $$$.cube();
})