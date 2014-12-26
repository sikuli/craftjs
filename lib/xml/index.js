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


    function construct(node) {

        var name = node.name;

        var params = node.attr;
        if (node.val) {
            params.val = node.val.trim();
            params.text = node.val.trim();
        }

        // convert a1_a2 = v to {a1: {a2: v}}
        // e.g., head_radius = 5  --->  {head: {radius: 5}}
        for (key in params) {
            var as = key.split('_')
            if (as.length == 2) {
                params[as[0]] = {}
                params[as[0]][as[1]] = params[key];
            }
        }

        var height = Number(params.height) || 0;
        var width = Number(params.width) || 0;

        var padding = Number(params.padding) || 0;

        params.node = node;

        //params.width = params.width * 0.90

        var model = craft.model.require(name)
        if (model === undefined)
            throw "unable to load model [" + name + "]"



        // console.log(csg.properties.base.properties.cube)
        // console.log(csg.properties.top.properties.cube.facecenters)
        // console.log(csg.properties.width())

        // var getWidth = function(c){
        //     return c.properties['top'].sides[1].length()
        // }

        // var getHeight = function(c){
        //     return c.properties['top'].sides[0].length()
        // }

        // height = getHeight(csg)
        // width = getWidth(csg)

        // if (!csg.skipChildren) {



        // console.log("height:"+height)
        // console.log("width:"+width)
        //child_csgs = [csg];
        // console.log(csg.properties.s.sides[0].length())
        // console.log(csg.properties.s.sides[1].length())
        // console.log(csg.properties.base.properties.cube)

        // var b = csg.properties.spaces['base'].properties.cube.corners

        // var c1 = b[0]
        // var c2 = b[1]

        // var c3 = b[2]
        // var c4 = b[3]

        // width = c1.distanceTo(c2)
        // height = c3.distanceTo(c4)

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

        var csg = model.generate(params);

        // if height/width not specified, calculate
        if (height == 0 || width == 0) {
            var bs = csg.getBounds()
            height = bs[1].y - bs[0].y
            width = bs[1].x - bs[0].x
        }

        // construct child csgs
        var child_csgs = (children_groups.models || []).map(function(model) {

            var child_csg = construct(model)
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

        //var child_csg = construct(child)
        // var cb = child_csg.getBounds()

        // var x = Number(child.attr.x) || 0
        // var y = Number(child.attr.y) || 0

        // console.log(child_csg)

        // child_csg = $$$.connect(child_csg, 'base').to(csg, 'top')

        // var c_height = cb[1].y - cb[0].y
        // var c_width  = cb[1].x - cb[0].x


        // ty = -y - padding;

        // if ('text-align' in node.attr) {
        //     // console.log('align')
        //     tx = width / 2
        //     // ty = height/2 - childHeight/2
        // }

        // if ('vertical-align' in node.attr) {
        //     ty = height / 2
        // }

        // child_csg = child_csg.translate([tx, ty, 0])

        // csg = csg.union(child_csg);

        // })


        // else {

        //         var child_csg = construct(child);

        //         // child_csg. = 
        //         child_csg.x = Number(child.attr.x) || 0
        //         child_csg.y = Number(child.attr.y) || 0
        //         child_csgs.push(child_csg)
        //     }
        // })



        // child_csgs.forEach(function(child_csg) {

        //     var cb = child_csg.getBounds()
        //     var x = child_csg.x
        //     var y = child_csg.y



        //     child_csg = $$$.connect(child_csg, 'base').to(csg, 'top');

        //     var tx = x + padding;
        //     var ty = -y - padding;
        //     // var ty = 0
        //     // console.log(tx)

        //     // console.log("child.width:" + childWidth)
        //     // console.log("child.height:" + childHeight)
        //     // console.log(node.attr['text-align'])
        //     // if ('text-align' in node.attr) {
        //     //     // console.log('align')
        //     //     tx = width / 2
        //     //     // ty = height/2 - childHeight/2
        //     // }

        //     // if ('vertical-align' in node.attr) {
        //     //     ty = height / 2
        //     // }

        //     child_csg = child_csg.translate([tx, ty, 0]);

        //     // csg = csg.union(child_csg);
        //     // speed up for preview (at least 200% speedup)
        //     csg = csg.unionForNonIntersecting(child_csg);


        // })


        // node.


        // }

        return csg;
    }
}