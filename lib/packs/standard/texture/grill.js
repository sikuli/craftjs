var model = module.exports = require('craft').model.define()

model.name('grill')
    .author('doubleshow')
    .version('1.0.0')

//
// Parameters
//

model.parameter('height')
    .defaultValue(15)

model.parameter('width')
    .defaultValue(30)

model.parameter('depth')
    .defaultValue(1)

model.parameter('orientation')
    .defaultValue('horizontal')

model.parameter('bar_count')
    .defaultValue(5)

model.parameter('bar_width')
    .defaultValue(1)

//
// Examples
//

model.example('default grill')

model.example('a longer, denser grill')
    .width(50)
    .bar_count(40)
    .bar_width(0.2)

model.example('a vertical grill')
    .width(50)
    .height(50)
    .orientation('vertical')

//
// Factory
//

model.factory(function($$$, params) {
    var height = params.height
    var width = params.width
    var depth = params.depth
    var orientation = params.orientation
    var bar_count = params.bar_count
    var bar_width = params.bar_width

    var length = 0;
    if (orientation == 'vertical'){
        length = height;
        var bar_length = width;
    }else{
        length = width;
        var bar_length = height;
    }

    var gap_between_bars = 1.0 * (length - bar_width) / (bar_count - 1);

    var models = new Array();

    var bar = $$$.cube({
        center: [false, false, false]
    });
    bar = bar.scale([bar_width, bar_length, 2]);

    models.push(bar);
    for (var i = 0; i < bar_count - 1; i = i + 1) {
        bar = bar.translate([gap_between_bars, 0, 0]);
        models.push(bar);
    }

    var bars = $$$.union(models).scale([1, 1, depth / 2]);

    // center
     bars = bars.translate([-length/2,-bar_length/2,0])

    if (orientation == 'vertical'){        
        bars = bars.rotateZ(90);
    }
    return bars;
})