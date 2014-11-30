var model = module.exports = require('craft').model.define()
var canvas = require('craft').model.require('canvas')

model.name('table')
    .author('doubleshow')
    .version('1.0.0')

//
// Parameters
//

model.parameter('width')
    .defaultValue(20)

model.parameter('height')
    .defaultValue(10)

model.parameter('depth')
    .defaultValue(3)

model.parameter('support_type')
    .defaultValue('four-legs')

model.parameter('support_padding')
    .defaultValue(1)

model.parameter('support_thickness')
    .defaultValue(1)

//
// Examples
//

model.example('default table')

model.example('wider table')
    .width(40)
    .height(20)

model.example('bigger, taller table, flushed to corners')
    .width(30)
    .height(30)
    .depth(10)
    .support_padding(0);

model.example('table supported by two walls')
    .support_type('two-walls')
    .support_padding(3)
    .depth(10)

model.example('table supported by four walls')
    .support_type('four-walls')
    .depth(5)

// 
// Spaces
//

model.space('base', function($$$, params){
    return $$$.cube({center:true})
        .scale([params.width-params.support_padding*2,params.height-params.support_padding*2,1])
        .translate([0,0,-params.depth-0.5])
})

//
// Factory
//

model.factory(function($$$, params) {

    var width = params.width;
    var height = params.height;
    var depth = params.depth;
    var sp = params.support_padding;
    var st = params.support_thickness;
    var support_type = params.support_type;

    var c = canvas.generate({
        width: width,
        height: height
    });
    c = $$$.color([0.6, 0.6, 0, 0.5], c)

    var ps = []; // holds an array of support models

    if (support_type == 'two-walls' || support_type == 'four-walls') {
        var wall = $$$.color('brown', $$$.cube({
            center: [true, true, false]
        }));

        ps.push(wall.scale([st, height - sp * 2, depth]).translate([-(width - sp * 2 - st) / 2, 0, -depth]));
        ps.push(wall.scale([st, height - sp * 2, depth]).translate([(width - sp * 2 - st) / 2, 0, -depth]));

        if (support_type == 'four-walls') {

            ps.push(wall.scale([width - sp * 2, st, depth]).translate([0, -(height - sp * 2 - st) / 2, -depth]));
            ps.push(wall.scale([width - sp * 2, st, depth]).translate([0, (height - sp * 2 - st) / 2, -depth]));
        }

        ps.push(c);
        return $$$.union(ps);

    } else {
        var leg = $$$.color('brown', $$$.cube({
            center: [true, true, false]
        }).scale([st, st, depth]));

        var w = width - st - sp * 2;
        var h = height - st - sp * 2;

        var leg1 = leg.translate([-w / 2, -h / 2, -depth])
        var leg2 = leg.translate([w / 2, -h / 2, -depth])
        var leg3 = leg.translate([-w / 2, h / 2, -depth])
        var leg4 = leg.translate([w / 2, h / 2, -depth])
        return $$$.union(c, leg1, leg2, leg3, leg4);
    }
})