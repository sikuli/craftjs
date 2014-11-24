var S = require('openscad');

var thing = exports;

thing.info = {
    name: 'grill',
    author: 'doubleshow',
    version: '1.0.0',
    examples: [{
        description: 'default grill',
        parameters: {}
    }, {
        description: 'a longer, denser grill',
        parameters: {
            width: 50,
            bar: {
                count: 40,
                width: 0.2
            }
        }
    }, {
        description: 'a vertical grill',
        parameters: {
            width: 50,
            height: 50,
            orientation: 'vertical'
        }
    }]
};

thing.generate = function(parameters) {
    var params = parameters || {};

    var height = params.height || 15;
    var width = params.width || 30;
    var depth = params.depth || 1;
    var orientation = params.orientation || 'horizontal';
    var bar = params.bar || {};
    var bar_count = bar.count || 5;
    var bar_width = bar.width || 1;

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

    bars.addMarker('base', [-width/2, height/2, 0]);//, [0, 0, -1], [0, -1, 0]);
    return bars;
}