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

    function relative_layout(params) {
        var container = params.container
        var content = params.content

        // x,y for relative positioning
        var tx = 0 + container.padding
        var ty = 0 - container.padding

        // keep track of the height of the current row
        // which is the maximum height of the child csgs in the row
        var row_height = 0

        return content.csgs.map(function(child_csg) {

            child_csg = $$$.connect(child_csg, 'base').to(container.csg, 'top')

            // if the current child csg is going to exceed the container width
            if (tx + child_csg.properties.width > container.width) {
                // change to the next row
                ty = ty - row_height
                tx = container.padding
                row_height = 0
            }

            row_height = Math.max(row_height, child_csg.properties.height)

            child_csg = child_csg.translate([tx, ty, 0])

            // update tx for the next child_csg
            tx = tx + child_csg.properties.width

            return child_csg
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


    function construct(node, parent) {

        var name = node.name;

        if (parent !== undefined){
           resolve_relative_attributes(node.attr, parent.attr)
        }

        var params = node.attr

        if (node.val) {
            params.val = node.val.trim();
            params.text = node.val.trim();
        }


        var height = Number(params.height) || 0;
        var width = Number(params.width) || 0;
        var padding = Number(params.padding) || 0;

        params.node = node;

        //params.width = params.width * 0.90

        var model = craft.model.require(name)
        if (model === undefined)
            throw "unable to load model [" + name + "]"


        var child_csgs = []

        // split children notes into two groups: parameters and models
        var children_groups = _.groupBy(node.children, function(child) {
            if (model.hasParameter(child.name))
                return 'parameters'
            else
                return 'models'
        })

        // process children who are parameters
        var ps = (children_groups.parameters || [])
        ps.forEach(function(child) {

            // e.g., 'values' is a parameter of 'barchart'

            var vs = []
            child.eachChild(function(v) {
                if (v.name.toLowerCase() === 'number')
                    vs.push(Number(v.val))
                else
                    vs.push(v.val)
            })

            params[child.name] = vs
        })

        var csg = model.generate(params)

        // if height/width not specified, calculate
        if (height == 0 || width == 0) {
            var bs = csg.getBounds()
            height = bs[1].y - bs[0].y
            width = bs[1].x - bs[0].x
        }

        var parent = node
        parent.attr.width = width
        parent.attr.height = height

        // construct child csgs
        var child_csgs = (children_groups.models || []).map(function(model) {

            var parent = node
            var child_csg = construct(model, node)
            var cb = child_csg.getBounds()

            // calculate height, width and assign them as properties
            child_csg.properties.height = cb[1].y - cb[0].y
            child_csg.properties.width = cb[1].x - cb[0].x

            return child_csg
        })

        // layout and place child csgs
        child_csgs = relative_layout({
            content: {
                csgs: child_csgs
            },
            container: {
                csg: csg,
                width: width,
                height: height,
                padding: padding
            }
        })

        // perform union with each child csg
        child_csgs.forEach(function(child_csg) {
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