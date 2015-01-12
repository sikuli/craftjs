var model = module.exports = require('craft').model.define()

model.name('candle')
	.author('caleb')
	.version('1.0.0')

// Implement Later
// A more realistic flame?
// Fix ratios between hollow & wick height

//
// Parameters
//

model.parameter('width')
	.defaultValue(8)

model.parameter('height')
	.defaultValue(45)

model.parameter('size')
	.defaultValue(1)

model.parameter('melted')
	.defaultValue(true)

//
// Examples
//

model.example('default candle')

model.example('a fat candle')
	.width(10)
	.height(15)

model.example('a cake candle')
	.width(2)
	.height(6)

//
// Factory
//

model.factory(function($$$, params) {
	var width = params.width;
	var height = params.height;
	var size = params.size;
	var melted = params.melted;

	if (width < 5)
		width = 5;

	if (height < 3)
		height = 3;

	if ((width / height) > 3.5)
		width = height * 3.5;

	// assembled candle
	return $$$.union(
		candle(),
		wick_and_flame()
	).scale(size);

	// candle components
	function candle() {
	    // objects
	    var body = $$$.cylinder({
	    	r: width / 2, 
	    	h: height - 1
	    });

	    var roundtop = $$$.torus({
	    	ri: 1,
	    	ro: (width / 2) - 1, 
	    	fni: 16
	    });

	    var fill = $$$.cylinder({
            r: (width / 2) - 1, 
            h: 1
        });

	    var hollow = $$$.sphere({r: (width / 2) - 1});
	    
	    // transformations
	    roundtop = roundtop.translate([0, 0, height - 1]);
	    fill = fill.translate([0, 0, height - 1]);
	    body = $$$.union(body, roundtop, fill);

	    if (width > height)
	    	hollow = hollow.translate([0, 0, height + (width / (height * 0.25))]);
	    else
	    	hollow = hollow.translate([0, 0, height]);
	    
	     
	    if (melted == true)
	    	return $$$.difference(body, hollow);
	    else
	    	return body;
	}

	function wick_and_flame() {
		var wick_height = height;

		if (melted == false) 
			wick_height += 3; 
		else {
			if (width >= height)
				wick_height -= (width / 4);
		}
			
		// objects
	    var base = $$$.sphere({r: 1});

	    var top = $$$.cylinder({
	    	r1: 1.01, 
	    	r2:0, 
	    	h: 5.5
	    });

		var wick = $$$.cylinder({
	    	r: 0.2, 
	    	h: wick_height
    	});		

    	base = $$$.union(base, top);

	    // transformations
	    base = base.scale([1, 1, 1.2]);
	    base = base.translate([0, 0, wick_height]);

	    return $$$.union(wick, base);   
	}
})