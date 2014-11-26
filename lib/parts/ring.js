var craft = require('craft');
var S = require('craft').openscad;
var part = module.exports = craft.parts.define();

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

part.factory(function(parameters) {
    var params = parameters || {};
    var radius = params.radius || 5;
    var depth = params.depth || 1;
    var thickness = params.thickness || 1;

    var outter = S.cylinder({
        r: radius,
        h: depth,
        center: [true, true, false]
    });
    var inner = S.cylinder({
        r: radius - thickness,
        h: depth,
        center: [true, true, false]
    });
    inner.addMarker('base', [0, 0, depth]);

    var r = S.difference(outter, inner)
    return r;
});