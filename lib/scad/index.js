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

    var moved = this.csg.connectTo(
        c1,
        c2,
        true, // mirror 
        0 // normalrotation
    );
    return moved;
}