var craft = require('craft');
var S = require('craft').openscad;
var part = module.exports = craft.parts.define();

part.name('cross')
    .author('doubleshow')
    .version('1.0.0')

//
// Parameters
//

part.parameter('size')
    .defaultValue(3)

part.parameter('depth')
    .defaultValue(1)

//
// Examples
//

part.example('default cross')

part.example('a bigger cross')
    .size(10)

part.example('a ticker and bigger cross')
    .size(30)
    .depth(5)

//
// Factory
//

part.factory(function(params) {

    console.log(params);

    var size = params.size;
    var depth = params.depth;

    var c = S.cube();
    c = c.scale([1, size, depth]).center([true, true, false]);
    c = S.union(c, c.rotateZ(90));
    c.addConnector('back', [-size / 2, size / 2, 0], [0, 0, -1], [1, 0, 0]);
    return c;
})