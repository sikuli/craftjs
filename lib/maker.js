var maker = exports;

var xmldoc = require('xmldoc');

maker.make = function(xmlstring){    
    var root = new xmldoc.XmlDocument(xmlstring); 

    // TODO: fix hardcoded base URL
    // importScripts('http://localhost:3000/3dbook/components.js');

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

  // import 'component' script dynamically
  // if (this[name] === undefined){
  //   var script_url = 'http://localhost:3000/3dbook/' + name + ".js";
  //   importScripts(script_url);
  // }

  var componentModule = './components/' + name;
  var component = require(componentModule);

  var height = Number(params.height) || 0;
  var width = Number(params.width) || 0;
  var padding =  Number(params.padding) || 0;
  
  params.node = node;

  var csg = component.generate(params);
  // console.log(csg);
  //child_csgs = [csg];

  if (!csg.skipChildren){

    node.eachChild(function (child){
      child_csg = construct(child);

      child_csg = child_csg.connectTo(
        child_csg.properties.connector, 
        csg.properties.containerConnector,
        true,   // mirror 
        0       // normalrotation
      );

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