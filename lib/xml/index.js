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

        var csg = craft.model.require(name).generate(params);

        // if height/width not specified, calculate
        if (height == 0 || width == 0){
            var bs = csg.getBounds()
            height = bs[1].y - bs[0].y
            width = bs[1].x - bs[0].x
        }

        // console.log(csg);
        //child_csgs = [csg];

        if (!csg.skipChildren) {

            node.eachChild(function(child) {
                var child_csg = construct(child);

                child_csg = $$$.connect(child_csg, 'base').to(csg, 'container');

                var x = Number(child.attr.x) || 0;
                var y = Number(child.attr.y) || 0;

                var tx = x + padding;
                var ty = height - y - padding;

                child_csg = child_csg.translate([tx, ty, 0]);
                // csg = csg.union(child_csg);
                // speed up for preview (at least 200% speedup)
                csg = csg.unionForNonIntersecting(child_csg);
            })

        }

        return csg;
    }
}