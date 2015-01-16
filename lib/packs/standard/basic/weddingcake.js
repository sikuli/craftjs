var model = module.exports = require('craft').model.define()

model.name('weddingcake')
	.author('caleb')
	.version('1.0.0')

// Implement Later
// Decreasing base height per tier

// Issues
// border() slows down rendering time significantly

//
// Parameters
//

model.parameter('width')
    .defaultValue(30)

// actual height is height + 1 due to fill
model.parameter('height')   
    .defaultValue(10)

model.parameter('tiers')
    .defaultValue(2) 

model.parameter('size')
    .defaultValue(1)

//
// Examples
//

model.example('default cake')

model.example('3-tier cake')
    .tiers(3) 

model.example('mini cake')
    .size(0.5)

model.example('pancakes, perhaps')
    .height(2)
    .tiers(4) 

//
// Factory
//

model.factory(function($$$, params) {
    var width = params.width;
    var height = params.height;
    var tiers = params.tiers;
    var size = params.size;

    if (height < 1)
        height = 1;

    if (tiers < 1)
        tiers = 1;

    var cake = $$$.union(
        base(),
        border()
    );

    // handles multiple tiers
    if (tiers > 1) {
        var tier_height = height;
        var cake_n = cake.scale([0.7, 0.7, 0.7]);

        for (i = 0; i < tiers - 1; i++) {
            if (i == 0)
                tier_height = height + 1;
            else
                tier_height = tier_height + ((height + 1) * 0.7);
                
            cake = $$$.union(cake, cake_n.translate([0, 0, tier_height]));

            cake_n = cake_n.scale([0.7, 0.7, 1]);
        }
    }
   
    // assembled cake
    return cake.scale(size);

    // cake components
    function base() {
        var cake_base = $$$.cylinder({
            r: width/2, 
            h: height
        });

        var fill = $$$.cylinder({
            r: (width / 2) - 1, 
            h: 1
        }).translate([0, 0, height]);

        var round = $$$.torus({
            ri: 1,
            ro: (width / 2) - 1
        }).translate([0, 0, height]);

        return $$$.union(cake_base, fill, round);
    }

    function border() {
        var b = $$$.sphere(0.8).translate([0, width / 2, 0]);
        
        for (var i = 0; i < 7; i++) {
            var angle = i * 360/7;
            b = $$$.union(b, b.rotateZ(angle));
        }

        return b;
    }
})