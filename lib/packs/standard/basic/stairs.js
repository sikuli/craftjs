var model = module.exports = require('craft').model.define();

model.name('stairs')
    .author('dragos')
    .version('1.0.0');

//
// Parameters
//

model.parameter('no_of_steps').defaultValue(5)

//
// Examples
//

model.example('default stairs')


//
// Factory
//

model.factory(function($$$, params) {
	//vars
    var steps = params.no_of_steps;

    if(steps <= 0) steps = 5;
    var c = $$$.cube();
    //-----------------------------

    for(var i = 0; i < steps; i++)
        c = $$$.union(c,$$$.cube().translate([i,0,0]).scale([1,1,i+1]));

    return c;
 });
