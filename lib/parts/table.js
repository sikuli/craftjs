var craft = require('craft');
var S = require('craft').openscad;
var part = module.exports = craft.parts.define();

part.name('table')
    .author('doubleshow')
    .version('1.0.0')

//
// Parameters
//

part.parameter('width')
    .defaultValue(20)

part.parameter('height')
    .defaultValue(20)

part.parameter('depth')
    .defaultValue(3)

part.parameter('support_type')
    .defaultValue('four-legs')

part.parameter('support_padding')
    .defaultValue(1)

part.parameter('support_thickness')
    .defaultValue(1)

//
// Examples
//

part.example('default table')

part.example('wider table')
    .width(40)
    .height(20)

part.example('bigger, taller table, flushed to corners')
    .width(30)
    .height(30)
    .depth(10)
    .support_padding(0);

part.example('table supported by two walls')
    .support_type('two-walls')
    .depth(10)

part.example('table supported by four walls')
    .support_type('four-walls')
    .depth(5)

//
// Factory
//

part.factory(function(params) {

    var width = params.width;
    var height = params.height;
    var depth = params.depth;
    var sp = params.support_padding;
    var st = params.support_thickness;
    var support_type = params.support_type;

    var c = craft.parts.lookup('canvas').generate({
        width: width,
        height: height
    });
    c = S.color([0.6, 0.6, 0, 0.5], c);

    c.addMarker('base', [-width / 2, height / 2, -depth]);
    c.addMarker('container', [-width / 2, height / 2, 0]);

    var ps = []; // holds an array of support parts

    if (support_type == 'two-walls' || support_type == 'four-walls') {
        var wall = S.color('brown', S.cube({
            center: [true, true, false]
        }));

        ps.push(wall.scale([st, height - sp * 2, depth]).translate([-(width - sp * 2 - st) / 2, 0, -depth]));
        ps.push(wall.scale([st, height - sp * 2, depth]).translate([(width - sp * 2 - st) / 2, 0, -depth]));

        if (support_type == 'four-walls') {

            ps.push(wall.scale([width - sp * 2, st, depth]).translate([0, -(height - sp * 2 - st) / 2, -depth]));
            ps.push(wall.scale([width - sp * 2, st, depth]).translate([0, (height - sp * 2 - st) / 2, -depth]));
        }

        ps.push(c);
        return S.union(ps);

    } else {
        var leg = S.color('brown', S.cube({
            center: [true, true, false]
        }).scale([st, st, depth]));

        var w = width - st - sp * 2;
        var h = height - st - sp * 2;

        var leg1 = leg.translate([-w / 2, -h / 2, -depth])
        var leg2 = leg.translate([w / 2, -h / 2, -depth])
        var leg3 = leg.translate([-w / 2, h / 2, -depth])
        var leg4 = leg.translate([w / 2, h / 2, -depth])
        return S.union(c, leg1, leg2, leg3, leg4);

    }
});