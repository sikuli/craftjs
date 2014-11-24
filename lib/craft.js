// The module to be exported.
var craft = module.exports = {};

// Generate a Thing

// craft.generate = function(name, params){
// 	var component = require('./components/' + name);
// 	return component.generate(name, params);
// }

craft.things = function(){
  var things = {};
  ['canvas','pin'].forEach(function(name){

    things[name] = require('./components/' + name);
  });	
	return things;
}();

// Connect Things

craft.connect = function(thing, connectorName){
	return new Connect(thing, connectorName);
}

function Connect(thing, connectorName) {
    this.thing = thing;
    this.connectorName = connectorName;
}

Connect.prototype.to = function(anotherThing, anotherConnectorName) {
    var moved = this.thing.connectTo(
        this.thing.properties[this.connectorName],
        anotherThing.properties[anotherConnectorName],
        true, // mirror 
        0 // normalrotation
    );
    return moved;
}


// Make a thing from XML (CraftXML)

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

  var csg = craft.things[name].generate(params);
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