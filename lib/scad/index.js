var CSG = require('./openscad').CSG
var scad = require('./openscad')

module.exports = function(craft) {
    craft.scad = scad
}

scad.connect = function(csg, connectorName) {
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

    var matrix = c1.getTransformationTo(c2, true, 0);
    //    return this.transform(matrix);
    var moved = this.csg.transform(matrix);


    // var moved = this.csg.connectTo(
    //     c1,
    //     c2,
    //     true, // mirror 
    //     0 // normalrotation
    // );
    return moved;
}

function transform_recursively(node, matrix){
    node.csg = node.csg.transform(matrix)
    node.children.forEach(function(c){
        transform_recursively(c, matrix)
    })
}

Connect.prototype.to = function(csg2, anotherConnectorName, node) {
    var p1 = this.csg.properties.spaces[this.connectorName].properties.cube.corners[0]
    var p2 = csg2.properties.spaces[anotherConnectorName].properties.cube.corners[4]

    var dx = node.layout.x
    var dy = node.layout.y

    p2 = p2.translate([dx,-dy])

    var c1 = new CSG.Connector(p1, [0, 0, -1], [1, 0, 0]);
    var c2 = new CSG.Connector(p2, [0, 0, 1], [1, 0, 0]);

    var matrix = c1.getTransformationTo(c2, true, 0);
    //    return this.transform(matrix);
    transform_recursively(node, matrix)
    // node.csg = node.csg.transform(matrix)    
    // var moved = this.csg.transform(matrix);

    // apply the same transformation to every decendent csg



    // var moved = this.csg.connectTo(
    //     c1,
    //     c2,
    //     true, // mirror 
    //     0 // normalrotation
    // );
    // return moved;
}