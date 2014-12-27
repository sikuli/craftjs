var _ = require('lodash')

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
    var p1 = this.csg.properties.spaces[this.connectorName].properties.cube.corners[0]
    var p2 = csg2.properties.spaces[anotherConnectorName].properties.cube.corners[4]

    var c1 = new CSG.Connector(p1, [0, 0, -1], [1, 0, 0]);
    var c2 = new CSG.Connector(p2, [0, 0, 1], [1, 0, 0]);

    var moved = this.csg.connectTo(
        c1,
        c2,
        true, // mirror 
        0 // normalrotation
    );
    return moved;
}

// Return a new CSG solid which is 'csg' whose minimun z is aligned to that of the 'target'
craft.scad.alignMinZ = function(csg, target){

    var b1 = csg.getBounds()
    var b2 = target.getBounds()
    var d = b1[0].z - b2[0].z

    return csg.translate([0,0, -d])
}

// Return a new CSG solid which is 'csg' whose maximun z is aligned to that of the 'target'
craft.scad.alignMaxZ = function(csg, target){

    var b1 = csg.getBounds()
    var b2 = target.getBounds()
    var d = b1[1].z - b2[1].z

    return csg.translate([0,0, -d])
}

craft.scad.mark = function(csg, name){
    return new Marker(csg, name)
}

function Marker(csg, name){
    this.csg = csg
    this.name = name
}

 Marker.prototype.rectangle = function(p1,p2,p3) {
    this.csg.properties[this.name] = [p1,p2,p3]
        // return new Rectangle(p1,p2,p3)
}

// craft.scad.getRectangle = function(csg, name){
//     var pts = csg.properties[this.name]

//     var 
// }

// function Rectangle(){
//     this.p1 = p1
//     this.p2 = p2
//     this.p3 = p3
// }

// craft.generateExamples = function(part) {

//     console.log(part);

//     var examples = [];

//     part.examples.forEach(function(example, i) {

//         var params = example.parameters;

//         var csg = part.generate(params);

//         var stl = csg.toStlString();

//         examples.push({
//             description: example.description,
//             parameters: example.parameters,
//             stl: stl
//         });

//         console.log("example " + (i + 1) + " generated");
//     });

//     return examples;
// }

craft.use = function(fn) {
    fn(craft)
}

craft.use(require('./xml'))
craft.use(require('./model'))
craft.use(require('./packs/standard'))
// craft.use(require('./viewers'))