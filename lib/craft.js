// The module to be exported.
var craft = module.exports = {};

var CSG = require('openscad').CSG;
craft.openscad = require('openscad');

// Collect an array of parts

// craft.parts = function() {
//     var glob = require('glob');
//     var path = require('path');

//     var parts = {};
//     glob.glob(__dirname + '/parts/*.js', {
//         sync: true
//     }).forEach(function(file) {

//         // file <-- github/craftjs/lib/parts/canvas.js

//         // name <-- canvas
//         var name = path.basename(file, '.js');

//         parts[name] = require('./parts/' + name);
//     });
//     return parts;
// }();

// Connect a CSG to another CSG

craft.connect = function(part, connectorName) {
    return new Connect(part, connectorName);
}

function Connect(part, connectorName) {
    this.part = part;
    this.connectorName = connectorName;
}

Connect.prototype.to = function(anotherPart, anotherConnectorName) {


    var c1 = new CSG.Connector(this.part.properties.markers[this.connectorName], [0, 0, -1], [1, 0, 0]);
    var c2 = new CSG.Connector(anotherPart.properties.markers[anotherConnectorName], [0, 0, 1], [1, 0, 0]);

    var moved = this.part.connectTo(
        c1,
        c2,
        true, // mirror 
        0 // normalrotation
    );
    return moved;
}


craft.resolve = function resolve(given_parameters, default_parameters) {
    var resolved_parameters = {};

    for (key in default_parameters) {
        if (given_parameters[key] === undefined) {
            resolved_parameters[key] = default_parameters[key];
        } else if (typeof(default_parameters[key]) === 'object') {
            resolved_parameters[key] = resolve(given_parameters[key], default_parameters[key]);
        } else {
            resolved_parameters[key] = given_parameters[key];
        }
    }
    return resolved_parameters;
}

craft.generateExamples = function(part) {

    // var info = part.info;
    // var examples = part.examples();

    console.log(part);

    var examples = [];

    part.examples.forEach(function(example, i) {

        //var params = resolve(example.parameters, info.default_parameters);
        var params = example.parameters;

        var csg = part.generate(params);

        var stl = csg.toStlString();

        examples.push({
            description: example.description,
            parameters: example.parameters,
            stl: stl
        });

        console.log("example " + (i + 1) + " generated");
    });

    return examples;
}

// Make a model from XML (CraftXML)

var xmldoc = require('xmldoc');

craft.makeFromXml = function(xmlstring) {
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

    var csg = craft.parts[name].generate(params);
    // console.log(csg);
    //child_csgs = [csg];

    if (!csg.skipChildren) {

        node.eachChild(function(child) {
            var child_csg = construct(child);

            child_csg = craft.connect(child_csg, 'base').to(csg, 'container');

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

craft.parts = {};

craft.parts.lookup = function lookup(name) {
    return require('./parts/' + name);
}

craft.parts.define = function define(name) {
    return new Part(name);
}

function Part(name) {
    this.name = name;
    this.parameters = [];
    this.examples = [];

    this.Example = function Example(attrs) {
        // var self = this;
        this.attrs = attrs;
        return this;//self;
    }
}

Part.prototype.author = function(str) {
    if (0 == arguments.length) return this._author;
    this.author = str;
    return this;
}

Part.prototype.version = function(str) {
    if (0 == arguments.length) return this._version;
    this.version = str;
    return this;
}

Part.prototype.parameter = function(name) {
    // console.log(name)
    // // create a method to Example builder to set parameter
    // this.Example.prototype[name] = function(v) {

    //     // console.log(name)
    //     // var ns = name.split('.')
    //     // console.log(ns);
    //     // if (ns.length == 2) {

    //     // e.g., 'support.depth' => ['support']['depth'] = v

    //     // this.attrs[ns[0]] = {};
    //     // this.attrs[ns[0]][ns[1]] = v;

    //     // } else {

    //     this.attrs[name] = v;
    //     // }

    //     // this.attrs[name] = v;
    //     return this;
    // }

    // var ns = name.split('.')
    //     // console.log(ns);
    // if (ns.length == 2) {

    //     var n1 = ns[0];
    //     var n2 = ns[1];

    //     if (this.Example.prototype[n1] === undefined)
    //         this.Example.prototype[n1] = {};

    //     this.Example.prototype[n1][n2] = function(v) {

    //         console.log("here:"+JSON.stringify(this));

    //         this.attrs[n1] = this.attrs[n1] || {};
    //         this.attrs[n1][n2] = v;
    //         return this;
    //     }

    // } else {

        this.Example.prototype[name] = function(v) {

            // console.log("there:"+JSON.stringify(this));

            this.attrs[name] = v;
            return this;
        }
    // }
    // e.g., 'support.depth' => ['support']['depth'] = v

    // console.log(n1)
    // console.log(n2)

    // this.Example.prototype[n1] = function(v) {
    //     this.attrs[n] = v;
    //     return this;
    // };

    var param = {
        name: name
    };
    this.parameters.push(param);
    return new Parameter(param);
}

Part.prototype.example = function(description) {
    var attrs = {
        description: description
    };
    attrs.parameters = {};
    // var p = new this.Example(str);
    this.examples.push(attrs);
    return new this.Example(attrs.parameters);
}


// deprecated
function resolve(given_parameters, default_parameters) {
    var resolved_parameters = {};

    for (key in default_parameters) {
        if (given_parameters[key] === undefined) {
            resolved_parameters[key] = default_parameters[key];
        } else if (typeof(default_parameters[key]) === 'object') {
            resolved_parameters[key] = resolve(given_parameters[key], default_parameters[key]);
        } else {
            resolved_parameters[key] = given_parameters[key];
        }
    }
    return resolved_parameters;
}

Part.prototype.factory = function(f) {
    if (0 == arguments.length) return this._factory;
    this._factory = f;
    return this;
}

Part.prototype.generate = function(customParameters) {
    var customParameters = customParameters || {};
    var params = {};
    this.parameters.forEach(function(p) {
        var name = p.name;

        if (customParameters[name] !== undefined) {
            params[name] = customParameters[name];
        } else {
            params[name] = p.defaultValue;
        }
    })
    return this._factory(params);
}

function Parameter(attrs) {
    this._attrs = attrs;
}

Parameter.prototype.defaultValue = function(v) {
    if (0 == arguments.length) return this._attrs.defaultValue;
    this._attrs.defaultValue = v;
    return this;
}