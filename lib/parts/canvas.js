var craft = require('craft')
var S = require('craft').openscad
var part = module.exports = craft.parts.define()

part.name('canvas')
    .author('doubleshow')
    .version('1.0.0')

//
// Parameters
//

part.parameter('width')
    .defaultValue(30)

part.parameter('height')
    .defaultValue(30)

part.parameter('depth')
    .defaultValue(1)

//
// Examples
//

part.example('default canvas')

part.example('a bigger canvas')
    .height(50)
    .width(50)

//
// Factory
//

part.factory(function(params) {   
    var width = params.width
    var height = params.height
    var depth = params.depth

    var c = S.cube({
        center: true
    })
    c = c.setColor([0.8, 0.8, 0])

    c.addMarker('container', [-0.5,-0.5,0.5])
    c = c.scale([width, height, depth])
    return c
})