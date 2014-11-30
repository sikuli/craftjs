var model = module.exports = require('craft').model.define()
var braille = require('craft').model.require('braille')

model.name('barchart')
    .author('doubleshow')
    .version('1.0.0')

//
// Parameters
//

model.parameter('values')
    .defaultValue([1, 2, 3])

model.parameter('height')
    .defaultValue(20)

model.parameter('bar_width')
    .defaultValue(10)

model.parameter('bar_depth')
    .defaultValue(1)    

model.parameter('bar_spacing')
    .defaultValue(1)


//
// Examples
//

model.example('1 2 3 4 5')
    .values([1, 2, 3, 4, 5])

model.example('50 20 30')
    .values([50,20,30])
    .height(40)
    .bar_spacing(5)
    .bar_depth(3)

model.example('123 234 345')
    .values([123,234,345])
    .bar_spacing(4)


model.factory(function($$$, params) {    

    var values = params.values

    var height = params.height
    var bar_width = params.bar_width
    var bar_spacing = params.bar_spacing
    var bar_depth = params.bar_depth

    var max = Math.max.apply(Math, values)
    var yscale = height / max

    var bars = new Array();
    values.forEach(function(d, i) {
        var bar = $$$.cube()
            .scale([bar_width, d * yscale, bar_depth])
            .translate([i * (bar_width + bar_spacing), 0, 0])

        var label = braille.generate({text:''+d})
        	.translate([i*(bar_width+bar_spacing)+bar_width/2,5+d*yscale,0])

        label = $$$.alignMinZ(label, bar)

        bars.push(label)
        bars.push(bar)
    })

    var c = $$$.group(bars)
    return c.center(true)
})