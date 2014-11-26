var part = module.exports = require('craft').parts.define()

part.name('pin')
    .author('doubleshow')
    .version('1.0.0')

//
// Parameters
//

part.parameter('depth')
    .defaultValue(5)

part.parameter('head_radius')
    .defaultValue(2)

part.parameter('head_depth')
    .defaultValue(1)

//
// Examples
//

part.example('default pin')

part.example('a tall pin')
    .depth(10);

part.example('a pin with a wider head')
    .head_radius(5);

part.example('a tall pin with a wider/thicker head')
    .depth(5)
    .head_radius(5)
    .head_depth(3)

//
// Factory
//

part.factory(function(params,$$$) {
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
    head.addMarker('container', [0, 0, 0]);
    head = head.translate([0, 0, depth]);

    return $$$.union(head, needle);
})