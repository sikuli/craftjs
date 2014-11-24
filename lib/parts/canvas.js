var S = require('openscad');

var thing = exports;

thing.info = {
    name: 'canvas',
    author: 'doubleshow',
    version: '1.0.0',
    examples: [{
        description: 'default canvas',
        parameters: {}
    }, {
        description: '30 x 30 canvas',
        parameters: {
            width: 30,
            height: 30
        }
    }, {
        description: '30 x 10 x 2 canvas',
        parameters: {
            width: 30,
            height: 10,
            depth: 2
        }
    }, {
        description: '30 x 10 x 5 canvas',
        parameters: {
            width: 30,
            height: 10,
            depth: 5
        }
    }]
};

thing.generate = function(parameters) {
    var params = parameters || {};
    var width = params.width || 50;
    var height = params.height || 50;
    var depth = params.depth || 1;

    var c = S.cube({
        center: true
    });
    c = c.setColor([0.8, 0.8, 0]);

    c.addConnector('front', [-0.5, -0.5, 0.5], [0, 0, 1], [1, 0, 0]);

    c = c.scale([width, height, depth]);

    c.properties.params = params;
    return c;
}