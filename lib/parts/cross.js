var S = require('openscad');
var part = exports;

part.info = {
    name: 'cross',
    author: 'doubleshow',
    version: '1.0.0',
    examples: [{
        description: 'default cross',
        parameters: {}
    }, {
        description: 'a bigger cross',
        parameters: {
            size: 10
        }
    }, {
        description: 'a thicker cross',
        parameters: {
            size: 30,
            depth: 5
        }
    }]
};

part.generate = function(parameters) {
    var params = parameters || {};
    var size = params.size || 3;
    var depth = params.depth || 1;
    var c = S.cube();
    c = c.scale([1, size, depth]).center([true, true, false]);
    c = S.union(c, c.rotateZ(90));
    c.addConnector('back', [-size / 2, size / 2, 0], [0, 0, -1], [1, 0, 0]);
    return c;
}