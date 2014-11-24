var S = require('openscad');

var part = exports;

part.info = {
    name: 'ramp',
    author: 'doubleshow',
    version: '1.0.0',
    examples: [{
        description: 'ramo NE corner (default)',
        parameters: {}
    }, {
        description: 'ramp SW corner',
        parameters: {
            corner: 'SW'
        }
    }, {
        description: 'ramp SE corner',
        parameters: {
            corner: 'SE'
        }
    }, {
        description: 'ramp NW corner',
        parameters: {
            corner: 'NW'
        }
    }]
};

part.generate = function(parameters) {
    var params = parameters || {};
    var corner = params.corner || 'NE';
    var c = S.cube();
    c = c.scale([10, 10, 2])

    cut1 = S.cube().scale([5, 5, 3]).rotateY(-30).translate([-1, 2.5, 0]);
    cut2 = S.cube().scale([5, 5, 3]).rotateY(-30).rotateZ(90).translate([7.5, -1, 0]);
    var s = S.difference(c, S.union(cut1, cut2));
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
}