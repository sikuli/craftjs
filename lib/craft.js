// The module to be exported.
var craft = module.exports = {};

var CSG = require('openscad').CSG;
craft.scad = require('openscad');

// Connect a CSG to another CSG

craft.make = function(makeFunc){
    return makeFunc(craft.scad)
}

craft.scad.connect = function(csg, connectorName) {
    return new Connect(csg, connectorName);
}

function Connect(csg, connectorName) {
    this.csg = csg;
    this.connectorName = connectorName;
}

Connect.prototype.to = function(csg2, anotherConnectorName) {


    var c1 = new CSG.Connector(this.csg.properties.markers[this.connectorName], [0, 0, -1], [1, 0, 0]);
    var c2 = new CSG.Connector(csg2.properties.markers[anotherConnectorName], [0, 0, 1], [1, 0, 0]);

    var moved = this.csg.connectTo(
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

craft.models = {}

craft.use = function(fn) {
    fn(craft)
}

craft.use(require('./xml'))
craft.use(require('./model'))
craft.use(require('./packs/standard'))
craft.use(require('./viewers'))