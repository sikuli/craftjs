 var model = module.exports = require('craft').model.define()

model.name('button1')
    .author('caleb')
    .version('1.0.0')

// Implement Later
// Set min & max width
// Set min & max height

//
// Parameters
// 

model.parameter('size')
    .defaultValue(1)

model.parameter('width')
    .defaultValue(6)

model.parameter('height')
    .defaultValue(1)

//
// Examples
// 

model.example('default button')

model.example('a flat, wide button')
    .width(15)

model.example('a thick, wide button')
    .width(15)
    .height(3)

// 
// Factory
//

model.factory(function($$$, params) {
    var size = params.size;
    var width = params.width;
    var height = params.height;

    return $$$.union(
        base(),
        border()
        ).scale([size, size, height]);

// button components
function base() {
    // objects
    var center = $$$.cylinder({r:width/2, h:1});
    var hole = $$$.cylinder({r:width/12, h:1});

    // transformations
    var hole_1 = hole.translate([-width/6, width/6,0]);
    var hole_2 = hole.translate([width/6,width/6,0]);
    var hole_3 = hole.translate([-width/6,-width/6,0]);
    var hole_4 = hole.translate([width/6,-width/6,0]);
    
    return $$$.difference(center, hole_1, hole_2, hole_3, hole_4);
}

function border() {
    return $$$.torus({ri:1, ro:width/2, fni:6}).translate([0,0,0.5]);  
}
})
