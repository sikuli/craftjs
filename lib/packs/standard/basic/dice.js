var model = module.exports = require('craft').model.define();

model.name('dice')
    .author('dragos')
    .version('1.0.0');

//
// Parameters
//

model.parameter('no_of_sides').defaultValue(6)

//
// Examples
//

model.example('default dice')


//
// Factory
//

model.factory(function($$$, params) {
	//vars
    var sides = params.no_of_sides;

    if(sides <= 0) sides = 5;
    //-----------------------------

    var c = $$$.cube();

    return c;
 });
