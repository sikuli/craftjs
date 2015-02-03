var model = module.exports = require('craft').model.define()

model.name('bed')
	.author('caleb')
	.version('1.0.0')

// Problems
// Logic for headRound & bedFrame not working

//
// Parameters
//

model.parameter('width')
	.defaultValue(40)

model.parameter('length')
	.defaultValue(75)

model.parameter('height')
	.defaultValue(10)

model.parameter('headRound')
	.defaultValue(true)

model.parameter('bedFrame')
	.defaultValue(true)

model.parameter('size')
	.defaultValue(1)


//
// Examples
// 

model.example('default bed')

model.example('twin-sized bed')
	.width(40)
	.length(75)

model.example('queen-sized bed')
	.width(60)
	.length(80)

model.example('king-sized bed')
	.width(76)
	.length(80)

model.example('mattress only')
	.bedFrame(false)

//
// Factory
//

model.factory(function($$$, params) {
	var width = params.width;
	var length = params.length;
	var height = params.height;
	var headRound = params.headRound;
	var bedFrame = params.bedFrame;
	var size = params.size;

	// assembled bed
	if (bedFrame == true) {
		return $$$.union(
			mattress(),
			pillow(),
			frame()
		).scale(size);	
	}
	else {
		return $$$.union(
			mattress(),
			pillow()
		).scale(size);
	}

	// bed components
	function mattress() {
		// objects
		// cube is scaled because certain dimensions may turn it into torus
		var m = $$$.cube({
			size: 1, 
			round: true
		}).scale([width, length, height]);

		// transformations
		m = m.translate([0, 0, 6]);

		return m;
	}

	function pillow() {
		// objects
		var p = $$$.cylinder({
			r: 10,
			h: 26
		}).scale([0.4, 1, 1]).rotateY(90).translate([0, 10, 20]);

		// transformations
		// narrow bed - smaller pillow
		if (width < 38) {
			p = $$$.cylinder({
				r: 10,
				h: (width - 8)
			}).scale([0.4, 0.5, 1]).rotateY(90).translate([4, 5, 20]);
		}

		// multi-pillow beds
		var space;
		var count = 1;
		var l = p;
		do {
			space = width;
			l = $$$.union(
				l,
				p.translate([(26 * count) + (2 * count), 0, 0])
			);
			count += 1;
			space = space - (26 * count) - (2 * count);
		} while (space >= 28);

		l = l.translate([(width - (26 * count) - (2 * (count - 1))) / count, 0, 0])
	
		if (width / 2  < 28) {
			// single-pillow beds
			p = p.translate([(width - 26) / 2, 0, 0]);
			return p;
		}
		else {
			return l;
		}
	}

	function frame() {
		var legf1, legf2, legb1, legb2;

		// objects
		var head = $$$.cube({size: [width, height * 3, 4]});
		var base = $$$.cube({size: [width + 2, length + 2, 5]});
		var baseHollow = $$$.cube({size: [width, length - 1, 2]});
		var leg = $$$.cube({size: [3, 3, 8]});
		var headLeg = $$$.cube({size: [4, 4, (height * 3) + 6]});

		// transformations
		head = head.rotateX(90);
		head = head.translate([0, 0, 4]);

		base = base.translate([-1, 0, 4]);

		base = $$$.difference(
			base,
			baseHollow.translate([0, 1, 7])
		);

		legf1 = leg.translate([width - 2, length - 2, -4]);
		legf2 = legf1.translate([-width + 1, 0, 0]);

		legb1 = headLeg.translate([width - 1, -4, -4]);
		legb2 = legb1.translate([-width - 1, 0, 0]);

		// handles rounded headboard
		if (headRound == true) {
			var dome = $$$.cylinder({
				r: width / 2,
				h: 4
			});

			dome = dome.rotateX(90);
			dome = dome.scale([1, 1, 0.70])
			dome = dome.translate([width / 2, 0, height * 3]);
			dome = $$$.difference(dome, dome.translate([0, 0, -(width/3)]));
			
			head = $$$.union(head, dome);
		}

		return $$$.union(head, base, legf1, legf2, legb1, legb2);
	}
})