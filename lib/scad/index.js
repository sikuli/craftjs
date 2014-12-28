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
    var moved = this.csg.transform(matrix);
    return moved;
}
 

 // Return a new CSG solid which is 'csg' whose minimun z is aligned to that of the 'target'
scad.alignMinZ = function(csg, target){

    var b1 = csg.getBounds()
    var b2 = target.getBounds()
    var d = b1[0].z - b2[0].z

    return csg.translate([0,0, -d])
}

// Return a new CSG solid which is 'csg' whose maximun z is aligned to that of the 'target'
scad.alignMaxZ = function(csg, target){

    var b1 = csg.getBounds()
    var b2 = target.getBounds()
    var d = b1[1].z - b2[1].z

    return csg.translate([0,0, -d])
}