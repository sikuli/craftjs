var S = require('openscad');

var part = exports;

part.info = {
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

part.generate = function(parameters) {
    var params = parameters || {};
    var width = params.width || 50;
    var height = params.height || 50;
    var depth = params.depth || 1;

    var c = S.cube({
        center: true
    });
    c = c.setColor([0.8, 0.8, 0]);

    c.addMarker('container', [-0.5,-0.5,0.5]);
    c = c.scale([width, height, depth]);    
    return c;
}