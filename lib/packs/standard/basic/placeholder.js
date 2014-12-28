var model = module.exports = require('craft').model.define()

model.name('placeholder')
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
// Spaces
//

model.space('top', function($$$, params){
    return $$$.cube({center:true})
        .scale([params.width,params.height,1])
        .translate([0,0,-0.5])
})

model.space('base', function($$$, params){
    return $$$.cube({center:true})
        .scale([params.width,params.height,1])
        .translate([0,0,-params.depth-0.5])
})

//
// Examples
//

model.example('default placeholder')

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
    c = c.scale([width, height, depth])
    return c
})