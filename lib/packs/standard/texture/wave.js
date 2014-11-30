var model = module.exports = require('craft').model.define()

model.name('wave')
	.author('doubleshow')
    .version('1.0.0');

//
// Parameters
//

model.parameter('height')
    .defaultValue(10);

model.parameter('width')
    .defaultValue(20);

model.parameter('count')
    .defaultValue(6);    

//
// Examples
//

model.example('default wave')

model.example('a longer, wider wave')
	.width(40)
	.height(15)
	.count(15)

//
// Factory
//

model.factory(function($$$, params){

	var height = params.height
	var width = params.width
	var count = params.count

	var c = $$$.cylinder({r:5, h:height});

	var cut = $$$.cube({});	
	cut = cut.scale([5*(count+1),10,height]).translate([0,-4,0]);
	cut.addMarker('base', [2,-4,height]);

	var models = new Array();
	for (var i = 0; i < count; i = i + 1){
		c = c.translate([5,0,0]);
		models.push(c);
	}
	var r = $$$.difference($$$.union(models), cut);

	// fit the width
	var b = r.getBounds();
	var dx = b[1].x - b[0].x;
	r = r.scale([width/dx, 1, 1]);
	return r.center(true).rotateX(-90);
})