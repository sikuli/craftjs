var model = module.exports = require('craft').model.define()

model.name('board')
    .author('doubleshow')
    .version('1.0.0')

//
// Parameters
//

model.parameter('width')
    .defaultValue(30)

model.parameter('height')
    .defaultValue(30)

model.parameter('depth')
    .defaultValue(1)

//
// Examples
//

model.example('default board')

model.example('a bigger board')
    .height(50)
    .width(50)

//
// Factory
//

model.factory(function($$$, params) {   
    var width = params.width
    var height = params.height
    var depth = params.depth

    var c = $$$.cube({
        center: true
    })
    c = c.setColor([0.8, 0.8, 0])
    c = c.scale([width, height, depth])
    return c
})