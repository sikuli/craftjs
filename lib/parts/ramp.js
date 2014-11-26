var part = module.exports = require('craft').parts.define()

part.name('ramp')
    .author('doubleshow')
    .version('1.0.0')

//
// Parameters
//

part.parameter('corner')
    .defaultValue('NE')

//
// Examples
//

part.example('default')

part.example('ramp SW corner')
    .corner('SW');

part.example('ramp SE corner')
    .corner('SE');

part.example('ramp NW corner')
    .corner('NW');    

//
// Factory
//

part.factory(function(params,$$$) {
    var corner = params.corner

    var c = $$$.cube();
    c = c.scale([10, 10, 2])

    cut1 = $$$.cube().scale([5, 5, 3]).rotateY(-30).translate([-1, 2.5, 0]);
    cut2 = $$$.cube().scale([5, 5, 3]).rotateY(-30).rotateZ(90).translate([7.5, -1, 0]);
    var s = $$$.difference(c, $$$.union(cut1, cut2));
    s = s.center([true, true, false]);


    // NW -- NE
    // |     |
    // |     |
    // SW -- SE
    if (corner == 'NW') {
        angle = 90;
    } else if (corner == 'SW') {
        angle = 180;
    } else if (corner == 'SE') {
        angle = 270;
    } else if (corner == 'NE') {
        angle = 0;
    }

    s = s.rotateZ(angle);
    s.addMarker('base', [-5, 5, 0]);
    return s;
})