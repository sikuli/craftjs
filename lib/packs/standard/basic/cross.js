var model = module.exports = require('craft').model.define()

model.name('cross')
    .author('doubleshow')
    .version('1.0.0')

//
// Parameters
//

model.parameter('size')
    .defaultValue(3)

model.parameter('depth')
    .defaultValue(1)

//
// Examples
//

model.example('default cross')

model.example('a bigger cross')
    .size(10)

model.example('a ticker and bigger cross')
    .size(30)
    .depth(5)

//
// Factory
//

model.factory(function($$$, params) {
    var size = params.size;
    var depth = params.depth;

    var c = $$$.cube();
    c = c.scale([1, size, depth]).center([true, true, false]);
    c = $$$.union(c, c.rotateZ(90));
    return c;
})