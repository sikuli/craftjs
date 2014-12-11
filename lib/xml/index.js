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

        // split children notes into two groups: parameters and csgs
        var gs = _.groupBy(node.children, function(child) {
            if (model.hasParameter(child.name))
                return 'parameters'
            else
                return 'csgs'
        })

        var ps = (gs.parameters || [])
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


        (gs.csgs || []).forEach(function(child) {

            var child_csg = construct(child)
            var cb = child_csg.getBounds()

            var x = Number(child.attr.x) || 0
            var y = Number(child.attr.y) || 0

            child_csg = $$$.connect(child_csg, 'base').to(csg, 'top');

            var tx = x + padding;
            var ty = -y - padding;

            // if ('text-align' in node.attr) {
            //     // console.log('align')
            //     tx = width / 2
            //     // ty = height/2 - childHeight/2
            // }

            // if ('vertical-align' in node.attr) {
            //     ty = height / 2
            // }

            child_csg = child_csg.translate([tx, ty, 0]);

            // csg = csg.union(child_csg);
            // speed up for preview (at least 200% speedup)
            csg = csg.unionForNonIntersecting(child_csg);



        })


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