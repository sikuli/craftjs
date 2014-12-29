var craft = require('craft')
var $$$ = craft.scad

var builder = module.exports = {}

builder.build = function(craftdom) {
    construct(craftdom)

    // TODO: put compact, flatten into collect_csgs function
    var csgs = _.compact(_.flatten(collect_csgs(craftdom)))

    // TODO: uncomment this to see just one csg, make this an option
    // craftdom.csgs = [$$$.union(csgs)]
    craftdom.csgs = csgs

    // TODO: allow customizable, per-component color
    var colors = ['blue', 'orange', 'yellow', 'green', 'fuchsia', 'red']
    csgs.forEach(function(csg, index) {
        csg.color = colors[index % 6]
    })
}

function collect_csgs(node) {
    var csgs = node.children.map(function(c) {
        return collect_csgs(c)
    });

    if (!node.virtual){
        return [node.csg].concat(csgs)
    }else{
        return csgs
    }
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
    node.children.forEach(function(c) {
        if (c.name.toLowerCase() === 'number')
            vs.push(Number(c.attributes.text))
        else
            vs.push(c.attributes.text)
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

function perform_layout_csg_operations(container, child) {

    function transform_recursively(node, matrix) {
        if (node.csg) {
            node.csg = node.csg.transform(matrix)
        }
        node.children.forEach(function(c) {
            transform_recursively(c, matrix)
        })
    }

    function compute_transformation_matrix(csg1, name1, csg2, name2, xoffset, yoffset) {
        var p1 = csg1.properties.spaces[name1].properties.cube.corners[0]
        var p2 = csg2.properties.spaces[name2].properties.cube.corners[4]

        p2 = p2.translate([dx, -dy])

        var c1 = new $$$.CSG.Connector(p1, [0, 0, -1], [1, 0, 0]);
        var c2 = new $$$.CSG.Connector(p2, [0, 0, 1], [1, 0, 0]);

        return c1.getTransformationTo(c2, true, 0);
    }

    var dx = child.layout.x
    var dy = child.layout.y

    var matrix = compute_transformation_matrix(child.csg, 'base', container.csg, 'top', dx, -dy)
    transform_recursively(child, matrix)

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
        _.merge(node.attributes, param)
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
    if (node.layout.width)
        params.width = node.layout.width
    if (node.layout.height)
        params.height = node.layout.height

    // generate a container csg for this node
    var model
    var container_csg

    name = name.toLowerCase()
    var allowabled_html_tags = ['p','div','h1','h2']
    var text_html_tags = ['h1','h2','h3','h4','h5']
    if (_.contains(text_html_tags, name)){
        model = craft.model.require('text')
    }
    else if (_.contains(allowabled_html_tags, name) || name === 'craft') {
        // TODO: define the list of virtual container names somewhere else
        // create a virtual container
        model = craft.model.require('placeholder')    
        node.virtual = true
    } else {
        model = craft.model.require(name)
        if (model === undefined)
            throw "unable to load model [" + name + "]"
    }

    console.log("generating a [" + model.name + "] with params: ", params)        
    node.csg = model.generate(params)
    
    // for each child, perform the csg operations necessary to position it
    // to the right location relative to the container csg
    children.models.forEach(function(child) {
        perform_layout_csg_operations(node, child)
    })

    var cb = node.csg.getBounds()
    node.layout.width = node.layout.width || cb[1].x - cb[0].x
    node.layout.height = node.layout.height || cb[1].y - cb[0].y
    node.layout.depth = node.layout.depth || cb[1].z - cb[0].z
    node.layout.zmin = cb[0].z
    node.layout.zmax = cb[1].z

    console.groupEnd()
}