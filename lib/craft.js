// The module to be exported.
var craft = module.exports = {};

// Generate a part

craft.parts = function(){
  var parts = {};
  ['canvas','pin'].forEach(function(name){

    parts[name] = require('./parts/' + name);
  });	
	return parts;
}();

// Connect Things

craft.connect = function(part, connectorName){
	return new Connect(part, connectorName);
}

function Connect(part, connectorName) {
    this.part = part;
    this.connectorName = connectorName;
}

Connect.prototype.to = function(anotherPart, anotherConnectorName) {
    var moved = this.part.connectTo(
        this.part.properties[this.connectorName],
        anotherPart.properties[anotherConnectorName],
        true, // mirror 
        0 // normalrotation
    );
    return moved;
}


// Make a model from XML (CraftXML)

var xmldoc = require('xmldoc');

craft.makeFromXml = function(xmlstring){    
    var root = new xmldoc.XmlDocument(xmlstring); 
    //console.time('construct');
    var c = construct(root);
    //console.timeEnd('construct');
    return c;
}

function construct(node){

  var name = node.name;  

  var params = node.attr;
  if (node.val)
    params.val = node.val.trim();

  // convert a1_a2 = v to {a1: {a2: v}}
  // e.g., head_radius = 5  --->  {head: {radius: 5}}
  for (key in params) {    
    var as = key.split('_')
    if (as.length == 2){
      params[as[0]] = {}
      params[as[0]][as[1]] = params[key];
    }
  }

  var height = Number(params.height) || 0;
  var width = Number(params.width) || 0;
  var padding =  Number(params.padding) || 0;  
  
  params.node = node;

  var csg = craft.parts[name].generate(params);
  // console.log(csg);
  //child_csgs = [csg];

  if (!csg.skipChildren){

    node.eachChild(function (child){
      var child_csg = construct(child);

      child_csg = craft.connect(child_csg, 'back').to(csg, 'front');

      var x = Number(child.attr.x) || 0;
      var y = Number(child.attr.y) || 0;

      var tx = x + padding;
      var ty = height - y - padding;

      child_csg = child_csg.translate([tx,ty,0]);
      // csg = csg.union(child_csg);
      // speed up for preview (at least 200% speedup)
      csg = csg.unionForNonIntersecting(child_csg);
    })

  }

  return csg;
}