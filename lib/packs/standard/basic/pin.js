var model = module.exports = require('craft').model.define()

model.name('pin')
    .author('doubleshow')
    .version('1.0.0')

//
// Parameters
//

model.parameter('depth')
    .defaultValue(5)

model.parameter('head_radius')
    .defaultValue(2)

model.parameter('head_depth')
    .defaultValue(1)

//
// Examples
//

model.example('default pin')

model.example('a tall pin')
    .depth(10);

model.example('a pin with a wider head')
    .head_radius(5);

model.example('a tall pin with a wider/thicker head')
    .depth(5)
    .head_radius(5)
    .head_depth(3)

// 
// Spaces
//

model.space('base', function($$$, params) {
    return $$$.cube({
            center: true
        })
        .scale([2, 2, 1])
        .translate([0, 0, -0.5])
})

//
// Factory
//

model.factory(function($$$, params) {
    var depth = params.depth
    var head_radius = params.head_radius;
    var head_depth = params.head_depth;

    // needle
    var needle = $$$.cylinder({
        r: 1,
        h: depth,
        center: [true, true, false]
    });
    needle.addMarker('base', [0, 0, 0]);

    // head
    var head = $$$.cylinder({
        r: head_radius,
        h: head_depth,
        center: [true, true, false]
    });
    head.addMarker('container', [-head_radius, -head_radius, head_depth]);
    head = head.translate([0, 0, depth]);

    return $$$.union(head, needle);
})