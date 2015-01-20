var model = module.exports = require('craft').model.define()
var braille = require('craft').model.require('braille')

model.name('piechart')
    .author('doubleshow')
    .version('1.0.0')

//
// Parameters
//

model.parameter('values')
    .defaultValue([])

model.parameter('labels')
    .defaultValue([])

model.parameter('radius')
    .defaultValue(20)

//
// Examples
//

model.example('1 2 3 3')
    .values([1, 2, 3, 3])
    .labels(['a', 'b', 'c', 'd'])

model.example('2 3 4')
    .values([2, 3, 4])
    .labels(['x', 'y', 'z'])
    .radius(15)


model.factory(function($$$, params) {

    var values = params.values
    var labels = params.labels
    var radius = params.radius

    var sum = values.reduce(function(a, b) {
        return a + b;
    });

    var slices = new Array();
    var start = 0;
    var end = 0;

    values.forEach(function(value, i) {


        var perct = value / sum;

        var da = 360 * value / sum;
        end = start + da;

        var arc = $$$.CSG.Path2D.arc({
            center: [0, 0, 0],
            radius: radius,
            startangle: start + 2,
            endangle: end - 2,
            resolution: 16,
        });
        var p = arc.appendPoint([0, 0]).close();

        var slice = p.innerToCAG().extrude({
            offset: [0, 0, 2]
        });
        slices.push(slice);

        var theta = Math.PI * ((start + end) / 2) / 180;

        var r1 = radius / 2 + 3;
        var r2 = radius + 5;

        var percttext = Math.round(perct * 100);
        var perctlabel = braille.generate({
                text: "" + percttext
            })
            .center(true)
            .rotateZ(-90)
            .translate([r1 * Math.cos(theta), r1 * Math.sin(theta), 2]);
        slices.push(perctlabel)


        var label = labels[i]      
        if (label) {
            var namelabel = braille.generate({
                    text: label
                })
                .center(true)
                .rotateZ(-90)
                .translate([r2 * Math.cos(theta), r2 * Math.sin(theta), 0]);
            slices.push(namelabel);
        }

        start = end;
    })

    var c = $$$.group(slices);
    return c
})