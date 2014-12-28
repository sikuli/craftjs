var craft = require('craft')
var $$$ = craft.scad

var builder = module.exports = {}

builder.build = function(craftdom){
    construct(craftdom)
}

function relative_layout(container, content) {

    var padding = container.style.padding

    // x,y for relative positioning
    var tx = 0 + padding
    var ty = 0 + padding

    // keep track of the height of the current row
    // which is the maximum height of the child csgs in the row
    var line_height = 0

    content.forEach(function(child) {

        var isExceedingWidth = function() {
            return 'width' in container.layout && (tx + child.layout.width > container.layout.width)
        }

        if (child.layout.newline || isExceedingWidth()) {

            // if so, change to the next line
            ty = ty + line_height
            tx = padding
            line_height = 0
        }

        // set the calculated x, y
        child.layout.x = tx
        child.layout.y = ty

        line_height = Math.max(line_height, child.layout.height)

        // update tx for the next child
        tx = tx + child.layout.width
    });
}

function resolve_relative_attributes(attr, parent_attr) {
    for (key in attr) {
        var val = attr[key]

        // will match 20%width 25%head_radius 20% 
        var ms = val.match(/%([a-zA-Z0-9_]*)$/)
        if (ms) {

            if (ms[1] === '') {
                // e.g.,
                // width="20%"
                // 20%width
                parent_attr_name = key
            } else {
                // e.g.,
                // width="20%radius"
                parent_attr_name = ms[1]
            }

            var percentage = parseFloat(val) / 100.0;

            attr[key] = percentage * parent_attr[parent_attr_name]

            //console.log(val + ' is resolved to ' + attr[key])
        }
    }
}

function parseAsParameter(node, parent) {
    var vs = []
    node.eachChild(function(v) {
        if (v.name.toLowerCase() === 'number')
            vs.push(Number(v.val))
        else
            vs.push(v.val)
    })

    var obj = {}
    obj[node.name] = vs
    return obj
}

function display(node) {
    console.group()
    console.log("[" + node.name + "]")
    console.log("attributes: " + JSON.stringify(node.attributes))
    // console.log("style: " + JSON.stringify(node.style.borderColor))

    console.log("style: ", JSON.stringify(node.style)) //_.pick(node.style, ['display', 'padding', 'borderColor']))

    console.log("layout: " + JSON.stringify(node.layout))
    _.forEach(node.children, function(child) {
        display(child)
    })
    console.groupEnd()
}

function construct(node, parent) {

    console.group()
    console.log("constructing [" + node.name + "]")

    // console.log(node.a('width'))
    // var name = node.name;
    var name = node.name

    if (parent !== undefined) {
        resolve_relative_attributes(node.attributes, parent.attributes)
    }

    if (node.val) {
        node.attr.text = node.val.trim()
    }
    var model = craft.model.require(name)

    // split children notes into two groups: parameters and models
    var children_groups = _.groupBy(node.children, function(child) {
        if (model !== undefined && model.hasParameter(child.name))
            return 'parameters'
        else
            return 'models'
    })

    var children = {}
    children.parameters = children_groups.parameters || []
    children.models = children_groups.models || []

    // process children who are parameters        
    children.parameters.forEach(function(child) {
        var param = parseAsParameter(child, node)
        _.merge(node.attr, param)
    })

    //
    // construct children csgs recursively
    //
    children.models.forEach(function(child) {
        // console.log(child.nodeName)
        construct(child, node)
    })

    // console.log("width", node.attr('width'))
    node.layout = {}
    if ('width' in node.attributes) {
        node.layout.width = node.attributes.width
    }

    if ('height' in node.attributes) {
        node.layout.height = node.attributes.height
    }

    if (node.style.display === 'block') {
        node.layout.newline = true
    }

    //
    // layout children model
    //
    relative_layout(node, children.models)

    // if the node has children models
    // compute content bounds
    if (children.models.length > 0) {
        // compute x, y ranges of the children models
        var xrange = {}
        var yrange = {}
        xrange.min = _.min(children.models.map(function(c) {
            return c.layout.x
        }))
        xrange.max = _.max(children.models.map(function(c) {
            return c.layout.x + c.layout.width
        }))

        yrange.min = _.min(children.models.map(function(c) {
            return c.layout.y
        }))
        yrange.max = _.max(children.models.map(function(c) {
            return c.layout.y + c.layout.height
        }))

        // console.log(xrange, yrange)

        var content_height = yrange.max - yrange.min
        var content_width = xrange.max - xrange.min

        var padding = node.style.padding

        // set width, height (if not already specified)
        node.layout.width = node.layout.width || content_width + 2 * padding
        node.layout.height = node.layout.height || content_height + 2 * padding
    }


    var params = {}
    _.merge(params, node.style)
    _.merge(params, node.attributes)
    params.width = node.layout.width
    params.height = node.layout.height

    // console.log('params:', params)

    // generate a container csg for this node
    var model
    var container_csg

    name = name.toLowerCase()
    // 1
    if (name === 'p' || name === 'div' || name === 'craft') {
        // create an imaginary board (so we can connect contents to it)            
        model = craft.model.require('board')
        container_csg = model.generate(params)
        container_csg.imaginary = true
    } else {
        model = craft.model.require(name)
        if (model === undefined)
            throw "unable to load model [" + name + "]"
        container_csg = model.generate(params)
    }

    // connect each child csg to the container csg and translate the child csg
    // to the right in-container position
    children.models.forEach(function(child) {
        // console.log('doconnect')
        // console.log(child.csg.getBounds()[0].z + '->' + child.csg.getBounds()[1].z)
        // console.log(child.csg.getBounds()[0].x + '->' + child.csg.getBounds()[1].x)
        // console.log()
        // console.log(container_csg.getBounds()[0].z + '=>' + container_csg.getBounds()[1].z)


        child.csg = $$$.connect(child.csg, 'base').to(container_csg, 'top')
        // console.log(child.csg.getBounds()[0].z + '->' + child.csg.getBounds()[1].z)

        child.csg = child.csg.translate([child.layout.x, -child.layout.y, 0])
    })

    // collect parts to union        
    var parts = []

    // note: the order in which csgs are pushed into the arraymatters
    // container_csg must be pushed first
    // otherwise things don't get stacked correctly
    // not sure why .... a wierd bug

    // include container (if its not imaginary)
    if (!container_csg.imaginary) {
        parts.push(container_csg)
    }

    // include children
    children.models.forEach(function(child) {
        parts.push(child.csg)
    })


    node.csg = $$$.union(parts)

    var cb = node.csg.getBounds()
    node.layout.width = node.layout.width || cb[1].x - cb[0].x
    node.layout.height = node.layout.height || cb[1].y - cb[0].y
    node.layout.depth = node.layout.depth || cb[1].z - cb[0].z
    node.layout.zmin = cb[0].z
    node.layout.zmax = cb[1].z

    // console.log(node.attr)
    // if ('text-align' in node.attr) {
    //     // console.log('align')
    //     tx = width / 2
    //     // ty = height/2 - childHeight/2
    // }

    // if ('vertical-align' in node.attr) {
    //     ty = height / 2
    // }

    // console.log("layout: " + JSON.stringify(node.layout))
    console.groupEnd()
}