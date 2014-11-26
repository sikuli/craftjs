var part = module.exports = require('craft').parts.define()

part.name('ring')
    .author('doubleshow')
    .version('1.0.0');

//
// Parameters
//

part.parameter('radius')
    .defaultValue(5);

part.parameter('depth')
    .defaultValue(1);

part.parameter('thickness')
    .defaultValue(1);

//
// Examples
//

part.example('default ring');

part.example('a bigger ring')
    .radius(10);

part.example('a ticker ring')
    .thickness(3);

part.example('a taller ring')
    .depth(10);

//
// Factory
//

part.factory(function(params, $$$) {
    var radius = params.radius
    var depth = params.depth
    var thickness = params.thickness

    var outter = $$$.cylinder({
        r: radius,
        h: depth,
        center: [true, true, false]
    });
    var inner = $$$.cylinder({
        r: radius - thickness,
        h: depth,
        center: [true, true, false]
    });
    inner.addMarker('base', [0, 0, depth]);

    var r = $$$.difference(outter, inner)
    return r;
});