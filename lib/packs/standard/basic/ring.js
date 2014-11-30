var model = module.exports = require('craft').model.define()

model.name('ring')
    .author('doubleshow')
    .version('1.0.0');

//
// Parameters
//

model.parameter('radius')
    .defaultValue(5);

model.parameter('depth')
    .defaultValue(1);

model.parameter('thickness')
    .defaultValue(1);

//
// Examples
//

model.example('default ring');

model.example('a bigger ring')
    .radius(10);

model.example('a ticker ring')
    .thickness(3);

model.example('a taller ring')
    .depth(10);

//
// Factory
//

model.factory(function($$$, params) {
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
    var r = $$$.difference(outter, inner)
    return r;
});