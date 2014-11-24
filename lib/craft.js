// The module to be exported.
var craft = module.exports = {};

// Generate a Thing

craft.generate = function(name, params){
	var component = require('./components/' + name);
	return component.generate(name, params);
}

craft.lookup = function(name){
	var component = require('./components/' + name);
	return component;
}

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

craft.makeFromXML = function(xmlstring){    
    var root = new xmldoc.XmlDocument(xmlstring); 
    console.time('construct');
    var c = construct(root);
    console.timeEnd('construct');
    return c;
}

function construct(node){

  var name = node.name;  

  var params = node.attr;
  if (node.val)
    params.val = node.val.trim();

  for (key in params) {
    console.log(key);

    var a = key.split('_')
    console.log(a)
  }

  console.log(name + ":" + JSON.stringify(params));

  var height = Number(params.height) || 0;
  var width = Number(params.width) || 0;
  var padding =  Number(params.padding) || 0;
  
  params.node = node;

  var csg = craft.generate(name, params);
  // console.log(csg);
  //child_csgs = [csg];

  if (!csg.skipChildren){

    node.eachChild(function (child){
      child_csg = construct(child);

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