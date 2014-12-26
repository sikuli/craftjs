var xmldoc = require('xmldoc');

module.exports = function(craft) {

    var $$$ = craft.scad

    craft.xml = {}

    craft.xml.generate = function(xmlstring) {
        var root = new xmldoc.XmlDocument(xmlstring);
        //console.time('construct');
        var c = construct(root);
        //console.timeEnd('construct');
        return c;
    }

    function relative_layout(container, content) {

        // x,y for relative positioning
        var tx = 0 + container.attr.padding
        var ty = 0 - container.attr.padding

        // keep track of the height of the current row
        // which is the maximum height of the child csgs in the row
        var row_height = 0

        content.forEach(function(child) {

            // if container width is known
            if ('width' in container.attr){

                // check if the current child is going to exceed the container width
                if (tx + child.attr.width > container.attr.width) {
                    // if so, change to the next row
                    ty = ty - row_height
                    tx = container.attr.padding
                    row_height = 0
                }
            }

            // set the calculated x, y
            child.attr.x = tx
            child.attr.y = ty

            row_height = Math.max(row_height, child.attr.height)

            // update tx for the next child
            tx = tx + child.attr.width
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

                console.log(val + ' is resolved to ' + attr[key])
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

    function construct(node, parent) {

        var name = node.name;

        if (parent !== undefined) {
            resolve_relative_attributes(node.attr, parent.attr)
        }

        var params = node.attr

        if (node.val) {
            params.val = node.val.trim();
            params.text = node.val.trim();
        }

        if (!('padding' in node.attr)) {
            node.attr['padding'] = 0
        }

        node.attr.padding = Number(node.attr.padding)

        var model = craft.model.require(name)
        if (model === undefined)
            throw "unable to load model [" + name + "]"

        // var child_csgs = []

        // split children notes into two groups: parameters and models
        var children_groups = _.groupBy(node.children, function(child) {
            if (model.hasParameter(child.name))
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
            _.merge(params, param)
        })

        var parent = node

        // construct child csgs
        children.models.forEach(function(child) {

            var child_csg = construct(child, node)
            var cb = child_csg.getBounds()

            child.attr.csg = child_csg

            // calculate height, width and assign them as properties
            child.attr.width = cb[1].x - cb[0].x
            child.attr.height = cb[1].y - cb[0].y
        })

        // layout and place child csgs
        relative_layout(node, children.models)

        // canvas
        if (name === 'canvas') {
            // if any dimension is not specified, 
            // automatically fit content            

            var xrange = {
                min: Number.MAX_VALUE,
                max: Number.MIN_VALUE
            }
            var yrange = {
                min: Number.MAX_VALUE,
                max: Number.MIN_VALUE
            }

            children.models.forEach(function(child) {
                xrange.min = Math.min(xrange.min, child.attr.x)                            
                xrange.max = Math.max(xrange.max, child.attr.x + child.attr.width)
                yrange.min = Math.min(yrange.min, child.attr.y)
                yrange.max = Math.max(yrange.max, child.attr.y + child.attr.height)
            })

            var content_height = yrange.max - yrange.min
            var content_width = xrange.max - xrange.min

            node.attr.width = content_width + 2 * node.attr.padding
            node.attr.height = content_height + 2 * node.attr.padding
        }

        // construct csg
        var csg = model.generate(params)

        // perform union with each child csg
        children.models.forEach(function(child) {

            var child_csg = $$$.connect(child.attr.csg, 'base').to(csg, 'top')
            child_csg = child_csg.translate([child.attr.x, child.attr.y, 0])

            // speed up for preview (at least 200% speedup)
            csg = csg.unionForNonIntersecting(child_csg)
        })


        // if ('text-align' in node.attr) {
        //     // console.log('align')
        //     tx = width / 2
        //     // ty = height/2 - childHeight/2
        // }

        // if ('vertical-align' in node.attr) {
        //     ty = height / 2
        // }

        return csg;
    }
}