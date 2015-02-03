var model = module.exports = require('craft').model.define()

model.name('pencil')
	.author('caleb')
	.version('1.0.0')

// Implement Later
// Parameter: width

//
// Parameters
//

model.parameter('length')
	.defaultValue(100) 

model.parameter('size')
	.defaultValue(1)

// 
// Examples
//

model.example('default pencil')

model.example('pencil stub')
	.length(20)

//
// Factory
//

model.factory(function($$$, params) {
	var length = params.length;
	var size = params.size;

	if (length < 4)
		length = 4;

	// assembled body
	var p = $$$.union(
		shaft(),
		ferrule(), 
		tip()
	);

	// rounds off tip
    p = $$$.difference(
    	p, 
    	tip_round()
    );

    // assembled pencil
    return p.scale(size);

    // pencil components
    function shaft() {
	    // objects
	    var s = $$$.polygon({points: 
	    	[ [1,-2], 
	    	[-1,-2], 
	    	[-2,0], 
	    	[-1,2], 
	    	[1,2], 
	    	[2,0] ] 
	    });
	    
	    // transformations
	    s = $$$.linear_extrude({height: length}, s);
	    s = s.rotateX(90);
	    s = s.translate([0, 25, 0]);

	    return s;
	}

	function tip_round() {
	    // objects
	    var r = $$$.torus({
	    	ri: 5, 
	    	ro: 6, 
	    	fni: 6
	    });
	    
	    // transformations    
	    r = r.rotateX(90);
	    r = r.translate([0, -length + 25, 0]);
	  
	    return r;
	}

	function tip() {
	    // objects
	    var t = $$$.cylinder({
	    	r1: 1, 
	    	r2: 0, 
	    	h: 2
	    });
	    
	    // transformations
	    t = t.rotateX(90);
	    t = t.translate([0, -length + 25, 0]);
	    
	    return t;
	}


	function ferrule() {
	    // objects
	    var guard = $$$.cylinder({
	        r: 2.3,
	        h: 2
	    });

	    var wood = $$$.cylinder({
	        r: 2.2,
	        h: 1
	    }).translate([0,0,2]);

	    var eraser = $$$.cylinder({
	        r: 2.2,
	        h: 3
	    }).translate([0, 0, 10]);
	    
	    // combine
	    var end = $$$.union(guard, wood);
	    end = end.union(end.translate([0, 0, 3]));
	    end = end.union(end.translate([0, 0, 4]));
	    end = end.union(eraser);
	    
	    // transformations
	    end = end.rotateX(270);
	    end = end.translate([0, 25, 0]);
	    
	    return end;
	}
})