var craft = require('craft')
var viewer = craft.viewer

var pin = craft.model.require('pin')
var canvas = craft.model.require('canvas')

var g = craft.make(function($$$) {

    var radius = 10
    var theta = 0
    var depth = 5

    var as = []

    var c = canvas.generate({
        width: 70,
        height: 60
    })

    as.push(c)

    for (var i = 0; i < 20; i = i + 1) {

        var a = pin.generate({
            depth: depth
        })

        a = $$$.connect(a, 'base').to(c, 'container')

        var x = 35 + radius * Math.cos(theta)
        var y = 25 + radius * Math.sin(theta)
        a = a.translate([x, y, 0])

        as.push(a)

        theta = theta + 0.5
        radius = radius + 1
        depth = depth + 0.5
    }
    return $$$.group(as)
})

viewer.view(g)