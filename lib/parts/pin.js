var S = require('openscad');

var thing = exports;

thing.info = {
    name: 'pin',
    author: 'doubleshow',
    version: '1.0.0',
    examples: [{
        description: 'default pin',
        parameters: {}
    }, {
        description: 'a tall pin',
        parameters: {
            depth: 10
        }
    }, {
        description: 'a pin with a wider head',
        parameters: {
            head: {
                radius: 5
            }
        }
    }, {
        description: 'a tall pin with a wider/thicker head',
        parameters: {
            depth: 10,
            head: {
                radius: 5,
                depth: 3
            }
        }
    }]
};

thing.generate = function(parameters) {
    var params = parameters || {}
    var head = params.head || {};
    var head_radius = head.radius || 2;
    var head_depth = head.depth || 1;

    var depth = params.depth || 5;

    var needle = S.cylinder({
        r: 1,
        h: depth,
        center: [true, true, false]
    });
    var head = S.cylinder({
        r: head_radius,
        h: head_depth,
        center: [true, true, false]
    });
    head.addConnector('front', [0, 0, 0], [0, 0, -1], [1, 0, 0]);

    head = head.translate([0, 0, depth]);

    needle.addConnector('back', [0, 0, 0], [0, 0, -1], [1, 0, 0]);

    return S.union(head, needle);
}
