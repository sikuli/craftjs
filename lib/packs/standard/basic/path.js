var model = module.exports = require('craft').model.define()

model.name('path')
	.author('caleb')
	.version('1.0.0')

// Implement Later
// Working logic for teethPat ?? Not sure why it's broken...
// Working class parameter calls diff functions
// Textures

// 
// Parameters
//

model.parameter('width')
	.defaultValue(5)

model.parameter('length')
	.defaultValue(50)

model.parameter('height')
	.defaultValue(5)

model.parameter('teethPat')
	.defaultValue(false)

model.parameter('orientation')
	.defaultValue('horizontal')

/* 
model.parameter('moveX')
	.defaultValue(0)

model.parameter('moveY')
	.defaultValue(0)

model.parameter('class')

model.parameter('wave')

model.parameter('round')
*/

// 
// Examples
//

model.example('default line')

model.example('rounded line')

model.example('bumpy line')

//
// Factory
//

model.factory(function($$$, params) {
	var width = params.width;
	var length = params.length;
	var height = params.height;
	var orientation = params.orientation;
	var teethPat = params.teethPat;

	// handles orientation
	if (orientation == 'horizontal') {
		return line().rotateZ(90);
	}
	else {
		return line();
	} 

	// classes
	function line() {
		var l = $$$.cube({
			size: [width, length, height]
		});

		if (teethPat == true) {
			return $$$.union(
				l,
				teeth()
			);
		}
		else
			return l;
	}

	// patterns
	function teeth() {
		// objects
		var t = $$$.cube({size: width});
		var d = $$$.cube({size: (width * 1.5)})

		// transformations
		t = $$$.difference(
			t,
			d.rotateX(45)
		);

		t = t.translate([0, 0, height])

		for (var i = 0; i < (length / width) - 1; i++) {
			t = $$$.union(
				t,
				t.translate([0, width, 0])
			);
		}
		return t;
	}
})