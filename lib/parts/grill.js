var craft = require('craft');
var S = require('craft').openscad;
var part = module.exports = craft.parts.define();

part.name('grill')
    .author('doubleshow')
    .version('1.0.0')

//
// Parameters
//

part.parameter('height')
    .defaultValue(15)

part.parameter('width')
    .defaultValue(30)

part.parameter('depth')
    .defaultValue(1)

part.parameter('orientation')
    .defaultValue('horizontal')

part.parameter('bar_count')
    .defaultValue(5)

part.parameter('bar_width')
    .defaultValue(1)

//
// Examples
//

part.example('default grill')

part.example('a longer, denser grill')
    .width(50)
    .bar_count(40)
    .bar_width(0.2)

part.example('a vertical grill')
    .width(50)
    .height(50)
    .orientation('vertical')

//
// Factory
//

part.factory(function(params) {
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

    var parts = new Array();

    var bar = S.cube({
        center: [false, false, false]
    });
    bar = bar.scale([bar_width, bar_length, 2]);

    parts.push(bar);
    for (var i = 0; i < bar_count - 1; i = i + 1) {
        bar = bar.translate([gap_between_bars, 0, 0]);
        parts.push(bar);
    }

    var bars = S.union(parts).scale([1, 1, depth / 2]);

    // center
     bars = bars.translate([-length/2,-bar_length/2,0])

    if (orientation == 'vertical'){        
        bars = bars.rotateZ(90);
    }

    bars.addMarker('base', [-width/2, height/2, 0]);
    return bars;
})