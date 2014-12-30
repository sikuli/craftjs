/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	onmessage = function(e) {
		var data = e.data
	    try {
	    	var s = __webpack_require__(33)

	        s.xml.build(data.craftdom)

	        var stls = data.craftdom.csgs.map(function(csg){
	            return {color: csg.color, stl: csg.toStlString()}
	        })


	        var msg = {
	            type: 'stls',
	            stls: stls
	        }
	        postMessage(msg)

	    } catch (err) {
	        var msg = {
	            type: 'error',
	            error: err
	        }
	        postMessage(msg)
	    }
	};

/***/ },

/***/ 33:
/***/ function(module, exports, __webpack_require__) {

	var craft = module.exports = {};

	craft.make = function(makeFunc){
	    return makeFunc(craft.scad)
	}

	craft.use = function(fn) {
	    fn(craft)
	}

	craft.use(__webpack_require__(55))
	craft.use(__webpack_require__(56))
	craft.use(__webpack_require__(57))
	craft.use(__webpack_require__(58))
	// craft.use(require('./viewers'))

/***/ },

/***/ 55:
/***/ function(module, exports, __webpack_require__) {

	var CSG = __webpack_require__(66).CSG
	var scad = __webpack_require__(66)

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

/***/ },

/***/ 56:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(67)

/***/ },

/***/ 57:
/***/ function(module, exports, __webpack_require__) {

	var parser = __webpack_require__(68),
	    builder = __webpack_require__(69)

	module.exports = function(craft) {

	    craft.xml = {}
	    craft.xml.generate = function(xmlstring) {

	        // wrap all with <craftml></craftml> if missing
	        if (!xmlstring.match(/^<craft>/)) {
	            xmlstring = '<craft>' + xmlstring + "</craft>"
	        }

	        var craftdom = parser.parse(xmlstring)
	            // console.log(JSON.stringify(craftdom, null, ' '))

	        builder.build(craftdom)

	        // display(craftdom)
	        return craftdom
	    }

	    craft.xml.parse = function(xmlstring) {

	        // wrap all with <craftml></craftml> if missing
	        if (!xmlstring.match(/^<craft>/)) {
	            xmlstring = '<craft>' + xmlstring + "</craft>"
	        }

	        return parser.parse(xmlstring)
	    }

	    craft.xml.build = function(craftdom){
	        return builder.build(craftdom)
	    }
	}

/***/ },

/***/ 58:
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(craft){
		craft.pack()
			.name('standard')
			.add(__webpack_require__(71))
			.add(__webpack_require__(72))
			.add(__webpack_require__(73))
			.add(__webpack_require__(74))	
			.add(__webpack_require__(75))
			.add(__webpack_require__(76))
			.add(__webpack_require__(77))
			.add(__webpack_require__(78))
			.add(__webpack_require__(79))
			.add(__webpack_require__(80))
			.add(__webpack_require__(81))
			.add(__webpack_require__(82))
			.add(__webpack_require__(83))		
			.add(__webpack_require__(84))
			.add(__webpack_require__(85))
			.add(__webpack_require__(86))

	}


/***/ },

/***/ 66:
/***/ function(module, exports, __webpack_require__) {

	// openscad.js, a few functions to simplify coding OpenSCAD-like
	//    written by Rene K. Mueller <spiritdude@gmail.com>, License: GPLv2
	//
	// Version: 0.021
	//
	// Description:
	// Helping to convert OpenSCAD .scad files to OpenJSCad .jscad files with 
	// little editing, can be used at
	//     http://joostn.github.com/OpenJsCad/processfile.html
	//
	// and has been integrated at
	//     http://openjscad.org/
	//
	// History:
	// 2013/04/26: 0.021: sphere() geodesic option added
	// 2013/04/25: 0.020: center(v,obj) added, uses new .center(v)
	// 2013/04/22: 0.019: vector_char() and vector_text() added, vector font rendering
	// 2013/04/11: 0.018: added alpha support to AMF export
	// 2013/04/09: 0.017: added color()
	// 2013/04/08: 0.016: added hull() which takes multiple 2d polygons (CAG)
	// 2013/04/08: 0.015: individual center: [true,false,true] possible for cube(), sphere() and cylinder()
	// 2013/04/05: 0.014: parseAMF(), experimental parseOBJ() and parseGCode()
	// 2013/04/04: 0.013: cube({round: true}), cylinder({round: true}) added
	// 2013/03/28: 0.012: rectangular_extrude() along 2d path, rotate_extrude() and torus() added
	// 2013/03/18: 0.011: import of STL (binary / ASCII), polyhedron() implemented, better blend between browser & nodejs
	// 2013/03/15: 0.010: circle(), square(), polygon() (partially) and linear_extrude() implemented
	// 2013/03/13: 0.009: adding include() for web-gui
	// 2013/03/12: 0.008: covering most mathematical function of OpenSCAD in JS as well
	// 2013/03/11: 0.007: most function transforming CSG now take array as well, more functions for OpenSCAD-alike behaviour
	// 2013/03/10: 0.006: colored intersection() & difference(), added mirror(), cylinder supports start/end coordinates too
	// 2013/03/04: 0.005: intersect() -> intersection(), sin, cos, asin, acos included, more examples 
	// 2013/03/02: 0.004: better install, examples/, etc refinements (working on 2d primitives)
	// 2013/03/01: 0.003: example.jscad vs example.scad, openscad.js/.jscad split up, and openjscad cli in nodejs implemented
	// 2013/02/28: 0.002: center:false default
	// 2013/02/27: 0.001: first version, center: true|false support
	//
	// original .scad file:
	// union() {
	//       //cube(size=[30,30,0.1],center=true);
	//       translate([3,0,0]) cube();
	//       difference() {
	//          rotate([0,-45,0]) cube(size=[8,7,3],center=true);
	//          sphere(r=3,$fn=20,center=true);
	//       }
	//       translate([10,5,5]) scale([0.5,1,2]) sphere(r=5,$fn=50);
	//       translate([-15,0,0]) cylinder(r1=2,r2=0,h=10,$fn=20);
	//      
	//    for(i=[0:19]) {
	//       rotate([0,i/20*360,0]) translate([i,0,0]) rotate([0,i/20*90,i/20*90,0]) cube(size=[1,1.2,.5],center=true);
	//    }
	// }

	// function main() {  // -- the same in .jscad :-)
	//    var cubes = new Array();
	//    for(i=0; i<20; i++) {
	//       cubes[i] = rotate([0,i/20*360,0], translate([i,0,0], rotate([0,i/20*90,i/20*90,0], cube({size:[1,1.2,.5],center:true}))));
	//    }
	//    return union(
	//       //cube({size:[30,30,0.1],center:true}),
	//       translate([3,0,0],cube()),
	//       difference(
	//          rotate([0,-45,0], cube({size:[8,7,3],center:true})),
	//          sphere({r:3,fn:20,center:true})
	//       ),
	//       translate([10,5,5], scale([0.5,1,2], sphere({r:5,fn:50}))),
	//       translate([-15,0,0], cylinder({r1:2,r2:0,h:10,fn:20})),
	//       cubes
	//       //translate([0,5,0], linear_extrude({height:10, center: true, twist: 100, slices: 50}, translate([2,0,0], circle(1))))
	//    );
	// }

	function JStoMeta(src) {
	   var l = src.split(/\n/);
	   var n = 0;
	   var m = [];
	   for(var i=0; ; i++) {
	      if(l[i].match(/^\/\/\s*(\S[^:]+):\s*(\S.*)/)) {
	         var k = RegExp.$1;
	         var v = RegExp.$2;
	         m[k] = v;
	         n++;
	      } else {
	         if(i>5&&n==0)
	            break;
	         else if(n>0)
	            break;
	      }
	   }
	   return m;
	}

	function MetaToJS(m) {
	   var s = "";
	   for(var k in m) {
	      s += "// "+k+": "+m[k]+"\n";
	   }
	   return s;
	}

	// wrapper functions for OpenJsCAD & OpenJSCAD.org

	// color table from http://www.w3.org/TR/css3-color/

	function color() {
	   var map = {
	   "black" : [ 0/255,0/255,0/255 ],
	   "silver": [ 192/255,192/255,192/255 ],
	   "gray"  : [ 128/255,128/255,128/255 ],
	   "white" : [ 255/255,255/255,255/255 ],
	   "maroon": [ 128/255,0/255,0/255 ],
	   "red"   : [ 255/255,0/255,0/255 ],
	   "purple": [ 128/255,0/255,128/255 ],
	   "fuchsia": [ 255/255,0/255,255/255 ],
	   "green" : [ 0/255,128/255,0/255 ],
	   "lime"  : [ 0/255,255/255,0/255 ],
	   "olive" : [ 128/255,128/255,0/255 ],
	   "yellow": [ 255/255,255/255,0/255 ],
	   "navy"  : [ 0/255,0/255,128/255 ],
	   "blue"  : [ 0/255,0/255,255/255 ],
	   "teal"  : [ 0/255,128/255,128/255 ],
	   "aqua"  : [ 0/255,255/255,255/255 ],
	   "aliceblue"   : [ 240/255,248/255,255/255 ],
	   "antiquewhite"   : [ 250/255,235/255,215/255 ],
	   "aqua"  : [ 0/255,255/255,255/255 ],
	   "aquamarine"  : [ 127/255,255/255,212/255 ],
	   "azure" : [ 240/255,255/255,255/255 ],
	   "beige" : [ 245/255,245/255,220/255 ],
	   "bisque"   : [ 255/255,228/255,196/255 ],
	   "black" : [ 0/255,0/255,0/255 ],
	   "blanchedalmond" : [ 255/255,235/255,205/255 ],
	   "blue"  : [ 0/255,0/255,255/255 ],
	   "blueviolet"  : [ 138/255,43/255,226/255 ],
	   "brown" : [ 165/255,42/255,42/255 ],
	   "burlywood"   : [ 222/255,184/255,135/255 ],
	   "cadetblue"   : [ 95/255,158/255,160/255 ],
	   "chartreuse"  : [ 127/255,255/255,0/255 ],
	   "chocolate"   : [ 210/255,105/255,30/255 ],
	   "coral" : [ 255/255,127/255,80/255 ],
	   "cornflowerblue" : [ 100/255,149/255,237/255 ],
	   "cornsilk" : [ 255/255,248/255,220/255 ],
	   "crimson"  : [ 220/255,20/255,60/255 ],
	   "cyan"  : [ 0/255,255/255,255/255 ],
	   "darkblue" : [ 0/255,0/255,139/255 ],
	   "darkcyan" : [ 0/255,139/255,139/255 ],
	   "darkgoldenrod"  : [ 184/255,134/255,11/255 ],
	   "darkgray" : [ 169/255,169/255,169/255 ],
	   "darkgreen"   : [ 0/255,100/255,0/255 ],
	   "darkgrey" : [ 169/255,169/255,169/255 ],
	   "darkkhaki"   : [ 189/255,183/255,107/255 ],
	   "darkmagenta" : [ 139/255,0/255,139/255 ],
	   "darkolivegreen" : [ 85/255,107/255,47/255 ],
	   "darkorange"  : [ 255/255,140/255,0/255 ],
	   "darkorchid"  : [ 153/255,50/255,204/255 ],
	   "darkred"  : [ 139/255,0/255,0/255 ],
	   "darksalmon"  : [ 233/255,150/255,122/255 ],
	   "darkseagreen"   : [ 143/255,188/255,143/255 ],
	   "darkslateblue"  : [ 72/255,61/255,139/255 ],
	   "darkslategray"  : [ 47/255,79/255,79/255 ],
	   "darkslategrey"  : [ 47/255,79/255,79/255 ],
	   "darkturquoise"  : [ 0/255,206/255,209/255 ],
	   "darkviolet"  : [ 148/255,0/255,211/255 ],
	   "deeppink" : [ 255/255,20/255,147/255 ],
	   "deepskyblue" : [ 0/255,191/255,255/255 ],
	   "dimgray"  : [ 105/255,105/255,105/255 ],
	   "dimgrey"  : [ 105/255,105/255,105/255 ],
	   "dodgerblue"  : [ 30/255,144/255,255/255 ],
	   "firebrick"   : [ 178/255,34/255,34/255 ],
	   "floralwhite" : [ 255/255,250/255,240/255 ],
	   "forestgreen" : [ 34/255,139/255,34/255 ],
	   "fuchsia"  : [ 255/255,0/255,255/255 ],
	   "gainsboro"   : [ 220/255,220/255,220/255 ],
	   "ghostwhite"  : [ 248/255,248/255,255/255 ],
	   "gold"  : [ 255/255,215/255,0/255 ],
	   "goldenrod"   : [ 218/255,165/255,32/255 ],
	   "gray"  : [ 128/255,128/255,128/255 ],
	   "green" : [ 0/255,128/255,0/255 ],
	   "greenyellow" : [ 173/255,255/255,47/255 ],
	   "grey"  : [ 128/255,128/255,128/255 ],
	   "honeydew" : [ 240/255,255/255,240/255 ],
	   "hotpink"  : [ 255/255,105/255,180/255 ],
	   "indianred"   : [ 205/255,92/255,92/255 ],
	   "indigo"   : [ 75/255,0/255,130/255 ],
	   "ivory" : [ 255/255,255/255,240/255 ],
	   "khaki" : [ 240/255,230/255,140/255 ],
	   "lavender" : [ 230/255,230/255,250/255 ],
	   "lavenderblush"  : [ 255/255,240/255,245/255 ],
	   "lawngreen"   : [ 124/255,252/255,0/255 ],
	   "lemonchiffon"   : [ 255/255,250/255,205/255 ],
	   "lightblue"   : [ 173/255,216/255,230/255 ],
	   "lightcoral"  : [ 240/255,128/255,128/255 ],
	   "lightcyan"   : [ 224/255,255/255,255/255 ],
	   "lightgoldenrodyellow" : [ 250/255,250/255,210/255 ],
	   "lightgray"   : [ 211/255,211/255,211/255 ],
	   "lightgreen"  : [ 144/255,238/255,144/255 ],
	   "lightgrey"   : [ 211/255,211/255,211/255 ],
	   "lightpink"   : [ 255/255,182/255,193/255 ],
	   "lightsalmon" : [ 255/255,160/255,122/255 ],
	   "lightseagreen"  : [ 32/255,178/255,170/255 ],
	   "lightskyblue"   : [ 135/255,206/255,250/255 ],
	   "lightslategray" : [ 119/255,136/255,153/255 ],
	   "lightslategrey" : [ 119/255,136/255,153/255 ],
	   "lightsteelblue" : [ 176/255,196/255,222/255 ],
	   "lightyellow" : [ 255/255,255/255,224/255 ],
	   "lime"  : [ 0/255,255/255,0/255 ],
	   "limegreen"   : [ 50/255,205/255,50/255 ],
	   "linen" : [ 250/255,240/255,230/255 ],
	   "magenta"  : [ 255/255,0/255,255/255 ],
	   "maroon"   : [ 128/255,0/255,0/255 ],
	   "mediumaquamarine"  : [ 102/255,205/255,170/255 ],
	   "mediumblue"  : [ 0/255,0/255,205/255 ],
	   "mediumorchid"   : [ 186/255,85/255,211/255 ],
	   "mediumpurple"   : [ 147/255,112/255,219/255 ],
	   "mediumseagreen" : [ 60/255,179/255,113/255 ],
	   "mediumslateblue"   : [ 123/255,104/255,238/255 ],
	   "mediumspringgreen" : [ 0/255,250/255,154/255 ],
	   "mediumturquoise"   : [ 72/255,209/255,204/255 ],
	   "mediumvioletred"   : [ 199/255,21/255,133/255 ],
	   "midnightblue"   : [ 25/255,25/255,112/255 ],
	   "mintcream"   : [ 245/255,255/255,250/255 ],
	   "mistyrose"   : [ 255/255,228/255,225/255 ],
	   "moccasin" : [ 255/255,228/255,181/255 ],
	   "navajowhite" : [ 255/255,222/255,173/255 ],
	   "navy"  : [ 0/255,0/255,128/255 ],
	   "oldlace"  : [ 253/255,245/255,230/255 ],
	   "olive" : [ 128/255,128/255,0/255 ],
	   "olivedrab"   : [ 107/255,142/255,35/255 ],
	   "orange"   : [ 255/255,165/255,0/255 ],
	   "orangered"   : [ 255/255,69/255,0/255 ],
	   "orchid"   : [ 218/255,112/255,214/255 ],
	   "palegoldenrod"  : [ 238/255,232/255,170/255 ],
	   "palegreen"   : [ 152/255,251/255,152/255 ],
	   "paleturquoise"  : [ 175/255,238/255,238/255 ],
	   "palevioletred"  : [ 219/255,112/255,147/255 ],
	   "papayawhip"  : [ 255/255,239/255,213/255 ],
	   "peachpuff"   : [ 255/255,218/255,185/255 ],
	   "peru"  : [ 205/255,133/255,63/255 ],
	   "pink"  : [ 255/255,192/255,203/255 ],
	   "plum"  : [ 221/255,160/255,221/255 ],
	   "powderblue"  : [ 176/255,224/255,230/255 ],
	   "purple"   : [ 128/255,0/255,128/255 ],
	   "red"   : [ 255/255,0/255,0/255 ],
	   "rosybrown"   : [ 188/255,143/255,143/255 ],
	   "royalblue"   : [ 65/255,105/255,225/255 ],
	   "saddlebrown" : [ 139/255,69/255,19/255 ],
	   "salmon"   : [ 250/255,128/255,114/255 ],
	   "sandybrown"  : [ 244/255,164/255,96/255 ],
	   "seagreen" : [ 46/255,139/255,87/255 ],
	   "seashell" : [ 255/255,245/255,238/255 ],
	   "sienna"   : [ 160/255,82/255,45/255 ],
	   "silver"   : [ 192/255,192/255,192/255 ],
	   "skyblue"  : [ 135/255,206/255,235/255 ],
	   "slateblue"   : [ 106/255,90/255,205/255 ],
	   "slategray"   : [ 112/255,128/255,144/255 ],
	   "slategrey"   : [ 112/255,128/255,144/255 ],
	   "snow"  : [ 255/255,250/255,250/255 ],
	   "springgreen" : [ 0/255,255/255,127/255 ],
	   "steelblue"   : [ 70/255,130/255,180/255 ],
	   "tan"   : [ 210/255,180/255,140/255 ],
	   "teal"  : [ 0/255,128/255,128/255 ],
	   "thistle"  : [ 216/255,191/255,216/255 ],
	   "tomato"   : [ 255/255,99/255,71/255 ],
	   "turquoise"   : [ 64/255,224/255,208/255 ],
	   "violet"   : [ 238/255,130/255,238/255 ],
	   "wheat" : [ 245/255,222/255,179/255 ],
	   "white" : [ 255/255,255/255,255/255 ],
	   "whitesmoke"  : [ 245/255,245/255,245/255 ],
	   "yellow"   : [ 255/255,255/255,0/255 ],
	   "yellowgreen" : [ 154/255,205/255,50/255 ] };

	   var o, i = 1, a = arguments, c = a[0], alpha;

	   if(a[0].length<4 && (a[i]*1-0)==a[i]) { alpha = a[i++]; }  // first argument rgb (no a), and next one is numeric?
	   if(a[i].length) { a = a[i], i = 0; }                       // next arg an array, make it our main array to walk through
	   if(typeof c == 'string')
	      c = map[c.toLowerCase()];
	   if(alpha!==undefined) 
	      c = c.concat(alpha);
	   for(o=a[i++]; i<a.length; i++) { 
	      o = o.union(a[i]);
	   } 
	   return o.setColor(c);
	}

	// -- 3D operations (OpenSCAD like notion)

	function group() {                              // experimental
	   var o,i=0,a=arguments; 
	   if(a[0].length) a = a[0]; 
	   
	   if((typeof(a[i]) == "object") && (a[i] instanceof CAG)) {
	      o = a[i].extrude({offset: [0,0,0.1]});    // -- convert a 2D shape to a thin solid, note: do not a[i] = a[i].extrude()
	   } else {
	      o = a[i++];                               
	   }
	   for(; i<a.length; i++) { 
	      var obj = a[i];
	      if((typeof(a[i]) == "object") && (a[i] instanceof CAG)) {
	         obj = a[i].extrude({offset: [0,0,0.1]});    // -- convert a 2D shape to a thin solid:
	      }
	      o = o.unionForNonIntersecting(obj); 
	   } 
	   return o; 
	}

	function union() { 
	   var o,i=0,a=arguments; 
	   if(a[0].length) a = a[0]; 
	   
	   o = a[i++];
	   if(0) {     // we leave to code for now, perhaps later we allow mixed CAG/CSG union
	      if((typeof(a[i]) == "object") && (a[i] instanceof CAG)) {
	         o = a[i].extrude({offset: [0,0,0.1]});    // -- convert a 2D shape to a thin solid, note: do not a[i] = a[i].extrude()
	      } else {
	         o = a[i++];
	      }
	   }
	   for(; i<a.length; i++) { 
	      var obj = a[i];

	      // for now disabled, later perhaps allow mixed union of CAG/CSG
	      if(false) {
	         obj = a[i].extrude({offset: [0,0,0.1]});    // -- convert a 2D shape to a thin solid:
	      }
	      o = o.union(obj); 
	   } 
	   return o; 
	}

	function difference() { 
	   var o,i=0,a=arguments; 
	   if(a[0].length) a = a[0]; 
	   for(o=a[i++]; i<a.length; i++) { 
	      o = o.subtract(a[i].setColor(1,1,0));     // -- color the cuts
	   } 
	   return o; 
	}

	function intersection() { 
	   var o,i=0,a=arguments; 
	   if(a[0].length) a = a[0]; 
	   for(o=a[i++]; i<a.length; i++) { 
	      o = o.intersect(a[i].setColor(1,1,0));    // -- color the cuts
	   } 
	   return o; 
	}

	// -- 3D primitives (OpenSCAD like notion)

	function cube(p) { 
	   var s = 1, v = null, off = [0,0,0], round = false, r = 0, fn = 8;
	   if(p&&p.length) v = p;		
	   if(p&&p.size&&p.size.length) v = p.size;        // { size: [1,2,3] }
	   if(p&&p.size&&!p.size.length) s = p.size;       // { size: 1 }
	   //if(p&&!p.size&&!p.length&&p.center===undefined&&!p.round&&!p.radius) s = p;      // (2)
	   if(p&&(typeof p!='object')) s = p;      // (2)
	   if(p&&p.round==true) { round = true, r = v&&v.length?(v[0]+v[1]+v[2])/30:s/10}
	   if(p&&p.radius) { round = true, r = p.radius; }
	   if(p&&p.fn) fn = p.fn;              // applies in case of round: true

	   var x = s, y = s, z = s; 
	   if(v&&v.length) { 
	      x = v[0], y = v[1], z = v[2]; 
	   }
	   off = [x/2,y/2,z/2];       // center: false default
	   var o = round?
	      CSG.roundedCube({radius:[x/2,y/2,z/2], roundradius:r, resolution: fn}):
	      CSG.cube({radius:[x/2,y/2,z/2]});
	   if(p&&p.center&&p.center.length) {
	      off = [p.center[0]?0:x/2, p.center[1]?0:y/2,p.center[2]?0:z/2];
	   } else if(p&&p.center==true) { 
	      off = [0,0,0];
	   } else if(p&&p.center==false) {
	      off = [x/2,y/2,z/2];
	   }
	   if(off[0]||off[1]||off[2]) o = o.translate(off);
	   //if(v&&v.length) o = o.scale(v);      // we don't scale afterwards, we already created box with the correct size
	   return o;
	}

	function sphere(p) {
	   var r = 1;
	   var fn = 32;
	   var off = [0,0,0];      
	   var type = 'normal';
	   
	   //var zoff = 0; // sphere() in openscad has no center:true|false
	   if(p&&p.r) r = p.r;
	   if(p&&p.fn) fn = p.fn;
	   if(p&&p.type) type = p.type;
	   //if(p&&!p.r&&!p.fn&&!p.type) r = p;
	   if(p&&(typeof p!='object')) r = p;
	   off = [0,0,0];       // center: false (default)

	   var o;
	   if(type=='geodesic')
	      o = geodesicSphere(p);
	   else 
	      o = CSG.sphere({radius:r,resolution:fn});
	   
	   if(p&&p.center&&p.center.length) {         // preparing individual x,y,z center
	      off = [p.center[0]?0:r,p.center[1]?0:r,p.center[2]?0:r];
	   } else if(p&&p.center==true) { 
	      off = [0,0,0];
	   } else if(p&&p.center==false) {
	      off = [r,r,r];
	   }
	   if(off[0]||off[1]||off[2]) o = o.translate(off);
	   return o;
	}

	function geodesicSphere(p) {
	   var r = 1, fn = 5; 

	   var ci = [              // hard-coded data of icosahedron (20 faces, all triangles)
	      [0.850651,0.000000,-0.525731],
	      [0.850651,-0.000000,0.525731],
	      [-0.850651,-0.000000,0.525731],
	      [-0.850651,0.000000,-0.525731],
	      [0.000000,-0.525731,0.850651],
	      [0.000000,0.525731,0.850651],
	      [0.000000,0.525731,-0.850651],
	      [0.000000,-0.525731,-0.850651],
	      [-0.525731,-0.850651,-0.000000],
	      [0.525731,-0.850651,-0.000000],
	      [0.525731,0.850651,0.000000],
	      [-0.525731,0.850651,0.000000]];
	   
	   var ti = [ [0,9,1], [1,10,0], [6,7,0], [10,6,0], [7,9,0], [5,1,4], [4,1,9], [5,10,1], [2,8,3], [3,11,2], [2,5,4], 
	      [4,8,2], [2,11,5], [3,7,6], [6,11,3], [8,7,3], [9,8,4], [11,10,5], [10,11,6], [8,9,7]];
	   
	   var geodesicSubDivide = function(p,fn,off) {
	      var p1 = p[0], p2 = p[1], p3 = p[2];
	      var n = off;
	      var c = [];
	      var f = [];
	   
	      //           p3
	      //           /\
	      //          /__\     fn = 3
	      //      i  /\  /\
	      //        /__\/__\       total triangles = 9 (fn*fn)
	      //       /\  /\  /\         
	      //     0/__\/__\/__\   
	      //    p1 0   j      p2
	   
	      for(var i=0; i<fn; i++) {
	         for(var j=0; j<fn-i; j++) {
	            var t0 = i/fn;
	            var t1 = (i+1)/fn;
	            var s0 = j/(fn-i);
	            var s1 = (j+1)/(fn-i);
	            var s2 = fn-i-1?j/(fn-i-1):1;
	            var q = [];
	            
	            q[0] = mix3(mix3(p1,p2,s0),p3,t0);
	            q[1] = mix3(mix3(p1,p2,s1),p3,t0);
	            q[2] = mix3(mix3(p1,p2,s2),p3,t1);
	            
	            // -- normalize
	            for(var k=0; k<3; k++) {
	               var r = Math.sqrt(q[k][0]*q[k][0]+q[k][1]*q[k][1]+q[k][2]*q[k][2]);
	               for(var l=0; l<3; l++) {
	                  q[k][l] /= r;
	               }
	            }
	            c.push(q[0],q[1],q[2]);
	            f.push([n,n+1,n+2]); n += 3;
	            
	            if(j<fn-i-1) {
	               var s3 = fn-i-1?(j+1)/(fn-i-1):1;
	               q[0] = mix3(mix3(p1,p2,s1),p3,t0);
	               q[1] = mix3(mix3(p1,p2,s3),p3,t1);
	               q[2] = mix3(mix3(p1,p2,s2),p3,t1);
	   
	               // -- normalize
	               for(var k=0; k<3; k++) {
	                  var r = Math.sqrt(q[k][0]*q[k][0]+q[k][1]*q[k][1]+q[k][2]*q[k][2]);
	                  for(var l=0; l<3; l++) {
	                     q[k][l] /= r;
	                  }
	               }
	               c.push(q[0],q[1],q[2]);
	               f.push([n,n+1,n+2]); n += 3;
	            }
	         }
	      } 
	      return { points: c, triangles: f, off: n };
	   }
	   
	   var mix3 = function(a,b,f) {
	      var _f = 1-f;
	      var c = [];
	      for(var i=0; i<3; i++) {
	         c[i] = a[i]*_f+b[i]*f;
	      }
	      return c;
	   }

	   if(p) {
	      if(p.fn) fn = Math.floor(p.fn/6);
	      if(p.r) r = p.r;
	   }

	   if(fn<=0) fn = 1;
	   
	   var q = [];
	   var c = [], f = [];
	   var off = 0;

	   for(var i=0; i<ti.length; i++) {
	      var g = geodesicSubDivide([ ci[ti[i][0]], ci[ti[i][1]], ci[ti[i][2]] ],fn,off);
	      c = c.concat(g.points);
	      f = f.concat(g.triangles);
	      off = g.off;
	   }
	   return polyhedron({points: c, triangles: f}).scale(r);
	}

	function cylinder(p) {
	   var r1 = 1, r2 = 1, h = 1, fn = 32, round = false; var a = arguments;
	   var off = [0,0,0];
	   if(p&&p.r) {
	      r1 = p.r; r2 = p.r; 
	   }
	   if(p&&p.h) {
	      h = p.h;
	   }
	   if(p&&(p.r1||p.r2)) {
	      r1 = p.r1; r2 = p.r2; if(p.h) h = p.h;
	   } 
	   if(a&&a[0]&&a[0].length) {
	      a = a[0]; r1 = a[0]; r2 = a[1]; h = a[2]; if(a.length==4) fn = a[3];
	   }
	   if(p&&p.fn) fn = p.fn;
	   //if(p&&p.center==true) zoff = -h/2;
	   if(p&&p.round==true) round = true;
	   var o;
	   if(p&&(p.start&&p.end)) {
	      o = round?
	         CSG.roundedCylinder({start:p.start,end:p.end,radiusStart:r1,radiusEnd:r2,resolution:fn}):
	         CSG.cylinder({start:p.start,end:p.end,radiusStart:r1,radiusEnd:r2,resolution:fn});
	   } else {
	      o = round?
	         CSG.roundedCylinder({start:[0,0,0],end:[0,0,h],radiusStart:r1,radiusEnd:r2,resolution:fn}):
	         CSG.cylinder({start:[0,0,0],end:[0,0,h],radiusStart:r1,radiusEnd:r2,resolution:fn});
	      var r = r1>r2?r1:r2;
	      if(p&&p.center&&p.center.length) {         // preparing individual x,y,z center
	         off = [p.center[0]?0:r,p.center[1]?0:r,p.center[2]?-h/2:0];
	      } else if(p&&p.center==true) { 
	         off = [0,0,-h/2];
	      } else if(p&&p.center==false) {
	         off = [0,0,0];
	      }
	      if(off[0]||off[1]||off[2]) o = o.translate(off);
	   }
	   return o;
	}

	function torus(p) {
	   var ri = 1, ro = 4, fni = 16, fno = 32, roti = 0;
	   if(p) {
	      if(p.ri) ri = p.ri;
	      if(p.fni) fni = p.fni;
	      if(p.roti) roti = p.roti;
	      if(p.ro) ro = p.ro;
	      if(p.fno) fno = p.fno;
	   }
	   if(fni<3) fni = 3;
	   if(fno<3) fno = 3;
	   var c = circle({r:ri,fn:fni,center:true});
	   if(roti) c = c.rotateZ(roti);
	   return rotate_extrude({fn:fno},c.translate([ro,0,0]));
	}

	function polyhedron(p) { 
	   //console.log("polyhedron() not yet implemented"); 
	   var pgs = [];
	   var ref = p.triangles||p.polygons;
	   
	   for(var i=0; i<ref.length; i++) {
	      var pp = []; 
	      for(var j=0; j<ref[i].length; j++) {
	         pp[j] = p.points[ref[i][j]];
	      }

	      var v = [];
	      for(j=ref[i].length-1; j>=0; j--) {       // --- we reverse order for examples of OpenSCAD work
	      //for(var j=0; j<ref[i].length-1; j++) {
	         v.push(new CSG.Vertex(new CSG.Vector3D(pp[j][0],pp[j][1],pp[j][2])));
	      }
	      pgs.push(new CSG.Polygon(v));
	   }
	   var r = CSG.fromPolygons(pgs);
	   //r.properties.polyhedron = new CSG.Properties();
	   //r.properties.polyhedron.center = new CSG.Vector3D(center);
	   //r.properties.sphere.facepoint = center.plus(xvector);
	   return r;   
	}
	   
	// -- 3D transformations (OpenSCAD like notion)

	function translate() {      // v, obj or array
	   var a = arguments, v = a[0], o, i = 1;
	   if(a[1].length) { a = a[1]; i = 0; }
	   for(o=a[i++]; i<a.length; i++) { 
	      o = o.union(a[i]);
	   } 
	   return o.translate(v); 
	}

	function center() { // v, obj or array
	   var a = arguments, v = a[0], o, i = 1;
	   if(a[1].length) { a = a[1]; i = 0; }
	   for(o=a[i++]; i<a.length; i++) { 
	      o = o.union(a[i]);
	   } 
	   return o.center(v);
	}

	function scale() {         // v, obj or array
	   var a = arguments, v = a[0], o, i = 1;
	   if(a[1].length) { a = a[1]; i = 0; }
	   for(o=a[i++]; i<a.length; i++) { 
	      o = o.union(a[i]);
	   } 
	   return o.scale(v); 
	}

	function rotate() { 
	   var o,i,v, r = 1, a = arguments;
	   if(!a[0].length) {        // rotate(r,[x,y,z],o)
	      r = a[0];
	      v = a[1];
	      i = 2;
	      if(a[2].length) { a = a[2]; i = 0; }
	   } else {                   // rotate([x,y,z],o)
	      v = a[0];
	      i = 1;
	      if(a[1].length) { a = a[1]; i = 0; }
	   }
	   for(o=a[i++]; i<a.length; i++) { 
	      o = o.union(a[i]);
	   } 
	   if(r!=1) {
	      return o.rotateX(v[0]*r).rotateY(v[1]*r).rotateZ(v[2]*r);
	   } else {
	      return o.rotateX(v[0]).rotateY(v[1]).rotateZ(v[2]);
	   }
	}

	function mirror(v,o) { 
	   var a = arguments, v,o,i = 1, r = 0;
	   if(arguments.length==3) {  // mirror(r,[x,y,z],o)
	      r = a[0];
	      v = a[1];
	      i = 2;
	      if(a[2].length) { a = a[2]; i = 0; }
	      
	   } else {                   // rotate([x,y,z],o)
	      v = a[0];
	      i = 1;
	      if(a[1].length) { a = a[1]; i = 0; }
	   }
	   for(o=a[i++]; i<a.length; i++) { 
	      o = o.union(a[i]);
	   } 
	   if(r!=1) {
	      return o.mirroredX(v[0]*r).mirroredY(v[1]*r).mirroredZ(v[2]*r);
	   } else {
	      return o.mirroredX(v[0]).mirroredY(v[1]).mirroredZ(v[2]); 
	   }
	}

	function expand(r,n,o) {
	   return o.expand(r,n);
	}
	function contract(r,n,o) {
	   return o.contract(r,n);
	}

	function multmatrix() {
	   console.log("multmatrix() not yet implemented"); 
	}

	function minkowski() {
	   console.log("minkowski() not yet implemented"); 
	}

	function hull() {
	   var pts = [];

	   var a = arguments;                     
	   if(a[0].length) a = a[0];
	   var done = [];

	   for(var i=0; i<a.length; i++) {              // extract all points of the CAG in the argument list
	      var cag = a[i];
	      if(!(cag instanceof CAG)) {
	         throw("ERROR: hull() accepts only 2D forms / CAG");
	         return;
	      }
	      for(var j=0; j<cag.sides.length; j++) {
	         var x = cag.sides[j].vertex0.pos.x;
	         var y = cag.sides[j].vertex0.pos.y;
	         if(done[''+x+','+y])  // avoid some coord to appear multiple times
	            continue;
	         pts.push({ x:x, y:y });
	         done[''+x+','+y]++;
	         //echo(x,y);
	      }
	   }
	   //echo(pts.length+" points in",pts);

	   // from http://www.psychedelicdevelopment.com/grahamscan/
	   //    see also at https://github.com/bkiers/GrahamScan/blob/master/src/main/cg/GrahamScan.java
	   var ConvexHullPoint = function(i, a, d) {

	      this.index = i;
	      this.angle = a;
	      this.distance = d;
	   
	      this.compare = function(p) {
	         if (this.angle<p.angle)
	            return -1;
	         else if (this.angle>p.angle)
	            return 1;
	         else {
	            if (this.distance<p.distance)
	               return -1;
	            else if (this.distance>p.distance)
	               return 1;
	         }
	         return 0;
	      }
	   }
	   
	   var ConvexHull = function() {
	      this.points = null;
	      this.indices = null;
	   
	      this.getIndices = function() {
	         return this.indices;
	      }
	   
	      this.clear = function() {
	         this.indices = null;
	         this.points = null;
	      }
	   
	      this.ccw = function(p1, p2, p3) {
	         var ccw = (this.points[p2].x - this.points[p1].x)*(this.points[p3].y - this.points[p1].y) - 
	                   (this.points[p2].y - this.points[p1].y)*(this.points[p3].x - this.points[p1].x);
	         if(ccw<1e-5)      // we need this, otherwise sorting never ends, see https://github.com/Spiritdude/OpenJSCAD.org/issues/18
	            return 0
	         return ccw;
	      }
	   
	      this.angle = function(o, a) {
	         //return Math.atan((this.points[a].y-this.points[o].y) / (this.points[a].x - this.points[o].x)); 
	         return Math.atan2((this.points[a].y-this.points[o].y), (this.points[a].x - this.points[o].x));
	      }
	       
	      this.distance = function(a, b) {
	         return ((this.points[b].x-this.points[a].x)*(this.points[b].x-this.points[a].x)+
	                 (this.points[b].y-this.points[a].y)*(this.points[b].y-this.points[a].y));
	      }
	   
	      this.compute = function(_points) {
	         this.indices=null;
	         if (_points.length<3)
	            return;
	         this.points=_points;
	   
	         // Find the lowest point
	         var min = 0;
	         for(var i = 1; i < this.points.length; i++) {
	            if(this.points[i].y==this.points[min].y) {
	               if(this.points[i].x<this.points[min].x)
	                  min = i;
	            }
	            else if(this.points[i].y<this.points[min].y)
	               min = i;
	         }
	   
	         // Calculate angle and distance from base
	         var al = new Array();
	         var ang = 0.0;
	         var dist = 0.0;
	         for (i = 0; i<this.points.length; i++) {
	            if (i==min)
	               continue;
	            ang = this.angle(min, i);
	            if (ang<0)
	               ang += Math.PI;
	            dist = this.distance(min, i);
	            al.push(new ConvexHullPoint(i, ang, dist));
	         }
	   
	         al.sort(function (a, b) { return a.compare(b); });
	   
	         // Create stack
	         var stack = new Array(this.points.length+1);
	         var j = 2;
	         for(i = 0; i<this.points.length; i++) {
	            if(i==min)
	               continue;
	            stack[j] = al[j-2].index;
	            j++;
	         }
	         stack[0] = stack[this.points.length];
	         stack[1] = min;
	   
	         var tmp;
	         var M = 2;
	         for(i = 3; i<=this.points.length; i++) {
	            while(this.ccw(stack[M-1], stack[M], stack[i]) <= 0)
	               M--;
	            M++;
	            tmp = stack[i];
	            stack[i] = stack[M];
	            stack[M] = tmp;
	         }
	   
	         this.indices = new Array(M);
	         for (i = 0; i<M; i++) {
	            this.indices[i] = stack[i+1];
	         }
	      }
	   }

	   var hull = new ConvexHull();

	   hull.compute(pts);
	   var indices = hull.getIndices();

	   if(indices&&indices.length>0) {
	      var ch = [];
	      for(var i=0; i<indices.length; i++) {
	         ch.push(pts[indices[i]]);
	         //echo(pts[indices[i]]);
	      }
	      //echo(ch.length+" points out",ch);
	      return CAG.fromPoints(ch);
	      //return CAG.fromPointsNoCheck(ch);
	   }
	}

	// "Whosa whatsis" suggested "Chain Hull" as described at https://plus.google.com/u/0/105535247347788377245/posts/aZGXKFX1ACN
	// essentially hull A+B, B+C, C+D and then union those

	function chain_hull() {
	   var a = arguments;
	   var j = 0, closed = false;

	   if(a[j].closed!==undefined) 
	      closed = a[j++].closed;
	   
	   if(a[j].length) 
	      a = a[j];

	   var h = []; var n = a.length-(closed?0:1); 
	   for(var i=0; i<n; i++) {
	      h.push(hull(a[i],a[(i+1)%a.length]));
	   }
	   return union(h);
	}

	// -- 2D to 3D primitives (OpenSCAD like notion)

	function linear_extrude(p,s) {
	   //console.log("linear_extrude() not yet implemented");
	   //return;
	   var h = 1, off = 0, /* convexity = 10,*/ twist = 0, slices = 10;
	   if(p.height) h = p.height;
	   //if(p.convexity) convexity = p.convexity;      // abandoned
	   if(p.twist) twist = p.twist;
	   if(p.slices) slices = p.slices;
	   var o = s.extrude({offset:[0,0,h], twistangle:twist, twiststeps:slices});
	   if(p.center==true) {
	      var b = new Array;
	      b = o.getBounds();      // b[0] = min, b[1] = max
	      off = b[1].plus(b[0]);
	      off = off.times(-0.5);
	      o = o.translate(off);
	   }
	   return o;
	}

	function rotate_extrude(p,o) {
	   var fn = 32;
	   if(arguments.length<2) {
	      o = p;      // no switches, just an object
	   } else if(p!==undefined) {
	      fn = p.fn;
	   }
	   if(fn<3) fn = 3;
	   var ps = [];
	   for(var i=0; i<fn; i++) {
	      // o.{x,y} -> rotate([0,0,i:0..360], obj->{o.x,0,o.y})
	      for(var j=0; j<o.sides.length; j++) {
	         // has o.sides[j].vertex{0,1}.pos (only x,y)
	         var p = [];
	         var m;

	         m = new CSG.Matrix4x4.rotationZ(i/fn*360);
	         p[0] = new CSG.Vector3D(o.sides[j].vertex0.pos.x,0,o.sides[j].vertex0.pos.y);
	         p[0] = m.rightMultiply1x3Vector(p[0]);
	         
	         p[1] = new CSG.Vector3D(o.sides[j].vertex1.pos.x,0,o.sides[j].vertex1.pos.y);
	         p[1] = m.rightMultiply1x3Vector(p[1]);
	         
	         m = new CSG.Matrix4x4.rotationZ((i+1)/fn*360);
	         p[2] = new CSG.Vector3D(o.sides[j].vertex1.pos.x,0,o.sides[j].vertex1.pos.y);
	         p[2] = m.rightMultiply1x3Vector(p[2]);
	         
	         p[3] = new CSG.Vector3D(o.sides[j].vertex0.pos.x,0,o.sides[j].vertex0.pos.y);
	         p[3] = m.rightMultiply1x3Vector(p[3]);

	         var p1 = new CSG.Polygon([
	            new CSG.Vertex(p[0]),
	            new CSG.Vertex(p[1]),
	            new CSG.Vertex(p[2]),
	            new CSG.Vertex(p[3]),      // we make a square polygon (instead of 2 triangles)
	         ]);
	         //var p2 = new CSG.Polygon([
	         //   new CSG.Vertex(p[0]),
	         //   new CSG.Vertex(p[2]),
	         //   new CSG.Vertex(p[3]),
	         //]);
	         ps.push(p1);
	         //ps.push(p2);
	         //echo("i="+i,i/fn*360,"j="+j);
	      }
	   }
	   return CSG.fromPolygons(ps);
	}

	function rectangular_extrude(pa,p) {
	   var w = 1, h = 1, fn = 8, closed = false, round = true;
	   if(p) {
	      if(p.w) w = p.w;
	      if(p.h) h = p.h;
	      if(p.fn) fn = p.fn;
	      if(p.closed!==undefined) closed = p.closed;
	      if(p.round!==undefined) round = p.round;
	   }
	   return new CSG.Path2D(pa,closed).rectangularExtrude(w,h,fn,round);
	}

	// -- 2D primitives (OpenSCAD like notion)

	function square() {
	   var v = [1,1], off; var a = arguments, p = a[0];
	   if(p&&!p.size) v = [p,p];
	   if(p&&p.length) v = a[0], p = a[1];
	   if(p&&p.size&&p.size.length) v = p.size;

	   off = [v[0]/2,v[1]/2];
	   if(p&&p.center==true) off = [0,0];

	   var o = CAG.rectangle({center:off,radius:[v[0]/2,v[1]/2]});

	   return o;
	}

	function circle() {
	   var r = 1, off, fn = 32; var a = arguments, p = a[0];
	   if(p&&p.r) r = p.r;
	   if(p&&p.fn) fn = p.fn;
	   if(p&&!p.r&&!p.fn&&!p.center) r = p;
	   off = [r,r];
	   if(p&&p.center==true) { off = [0,0]; } 
	   var o = CAG.circle({center:off,radius:r,resolution:fn});
	   return o;
	}

	function polygon(p) {  // array of po(ints) and pa(ths)
	   var points = new Array();
	   if(p.paths&&p.paths.length&&p.paths[0].length) {          // pa(th): [[0,1,2],[2,3,1]] (two paths)
	      for(var j=0; j<p.paths.length; j++) {
	         for(var i=0; i<p.paths[j].length; i++) {
	            points[i] = p.points[p.paths[j][i]];
	         }
	      }
	   } else if(p.paths&&p.paths.length) {                 // pa(th): [0,1,2,3,4] (single path)
	      for(var i=0; i<p.paths.length; i++) {
	         points[i] = p.points[p.paths[i]];
	      }
	   } else {                               // pa(th) = po(ints)
	      if(p.length) {
	         points = p;
	      } else {
	         points = p.points;
	      }
	   }
	   return CAG.fromPoints(points);
	}

	function triangle() {         // -- new addition
	   var a = arguments;
	   if(a[0]&&a[0].length) a = a[0];
	   var o = CAG.fromPoints(a);
	   return o;
	}

	// -- Math functions (360 deg based vs 2pi)

	function sin(a) {
	   return Math.sin(a/360*Math.PI*2);
	}
	function cos(a) {
	   return Math.cos(a/360*Math.PI*2);
	}
	function asin(a) {
	   return Math.asin(a)/(Math.PI*2)*360;
	}
	function acos(a) {
	   return Math.acos(a)/(Math.PI*2)*360;
	}
	function tan(a) {
	   return Math.tan(a/360*Math.PI*2);
	}
	function atan(a) {
	   return Math.atan(a)/(Math.PI*2)*360;
	}
	function atan2(a,b) {
	   return Math.atan2(a,b)/(Math.PI*2)*360;
	}
	function ceil(a) {
	   return Math.ceil(a);
	}
	function floor(a) {
	   return Math.floor(a);
	}
	function abs(a) {
	   return Math.abs(a);
	}
	function min(a,b) {
	   return a<b?a:b;
	}
	function max(a,b) {
	   return a>b?a:b;
	}
	function rands(min,max,vn,seed) {
	   // -- seed is ignored for now, FIX IT (requires reimplementation of random())
	   //    see http://stackoverflow.com/questions/424292/how-to-create-my-own-javascript-random-number-generator-that-i-can-also-set-the
	   var v = new Array(vn);
	   for(var i=0; i<vn; i++) {
	      v[i] = Math.random()*(max-min)+min;
	   }
	}
	function log(a) {
	   return Math.log(a);
	}
	function lookup(ix,v) {
	   var r = 0;
	   for(var i=0; i<v.length; i++) {
	      var a0 = v[i];
	      if(a0[0]>=ix) {
	         i--;
	         a0 = v[i];
	         var a1 = v[i+1];
	         var m = 0;
	         if(a0[0]!=a1[0]) {
	            m = abs((ix-a0[0])/(a1[0]-a0[0]));
	         }
	         //echo(">>",i,ix,a0[0],a1[0],";",m,a0[1],a1[1]);
	         if(m>0) {
	            r = a0[1]*(1-m)+a1[1]*m;
	         } else {
	            r = a0[1];
	         }
	         return r;
	      } 
	   }
	   return r;
	}
	function pow(a,b) {
	   return Math.pow(a,b);
	}
	function sign(a) {
	   return a<0?-1:(a>1?1:0);
	}
	function sqrt(a) {
	   return Math.sqrt(a);
	}
	function round(a) {
	   return floor(a+0.5);
	}

	function echo() {
	   var s = "", a = arguments;
	   for(var i=0; i<a.length; i++) {
	      if(i) s += ", ";
	      s += a[i];
	   }
	   if(typeof OpenJsCad !== 'undefined') {
	      OpenJsCad.log(s);
	   } else {
	      //var t = (new Date()-global.time)/1000;
	      //console.log(t,s);
	      console.log(s);
	   }
	}

	function status(s) {
	   if(typeof document !== 'undefined') {
	      document.getElementById('statusspan').innerHTML = s;
	   } else {
	      echo(s);
	   }
	}

	// from http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
	/**
	 * Converts an RGB color value to HSL. Conversion formula
	 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
	 * Assumes r, g, and b are contained in the set [0, 1] and
	 * returns h, s, and l in the set [0, 1].
	 *
	 * @param   Number  r       The red color value
	 * @param   Number  g       The green color value
	 * @param   Number  b       The blue color value
	 * @return  Array           The HSL representation
	 */
	function rgb2hsl(r, g, b){
	    if(r.length) { b = r[2], g = r[1], r = r[0]; }
	    var max = Math.max(r, g, b), min = Math.min(r, g, b);
	    var h, s, l = (max + min) / 2;

	    if(max == min){
	        h = s = 0; // achromatic
	    }else{
	        var d = max - min;
	        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	        switch(max){
	            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
	            case g: h = (b - r) / d + 2; break;
	            case b: h = (r - g) / d + 4; break;
	        }
	        h /= 6;
	    }

	    return [h, s, l];
	}

	/**
	 * Converts an HSL color value to RGB. Conversion formula
	 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
	 * Assumes h, s, and l are contained in the set [0, 1] and
	 * returns r, g, and b in the set [0, 1].
	 *
	 * @param   Number  h       The hue
	 * @param   Number  s       The saturation
	 * @param   Number  l       The lightness
	 * @return  Array           The RGB representation
	 */
	function hsl2rgb(h, s, l){
	    if(h.length) { l = h[2], s = h[1], h = h[0]; }
	    var r, g, b;

	    if(s == 0){
	        r = g = b = l; // achromatic
	    }else{
	        function hue2rgb(p, q, t){
	            if(t < 0) t += 1;
	            if(t > 1) t -= 1;
	            if(t < 1/6) return p + (q - p) * 6 * t;
	            if(t < 1/2) return q;
	            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
	            return p;
	        }

	        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	        var p = 2 * l - q;
	        r = hue2rgb(p, q, h + 1/3);
	        g = hue2rgb(p, q, h);
	        b = hue2rgb(p, q, h - 1/3);
	    }

	    return [r, g, b];
	}

	/**
	 * Converts an RGB color value to HSV. Conversion formula
	 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
	 * Assumes r, g, and b are contained in the set [0, 1] and
	 * returns h, s, and v in the set [0, 1].
	 *
	 * @param   Number  r       The red color value
	 * @param   Number  g       The green color value
	 * @param   Number  b       The blue color value
	 * @return  Array           The HSV representation
	 */
	function rgb2hsv(r, g, b){
	    if(r.length) { b = r[2], g = r[1], r = r[0]; }
	    var max = Math.max(r, g, b), min = Math.min(r, g, b);
	    var h, s, v = max;

	    var d = max - min;
	    s = max == 0 ? 0 : d / max;

	    if(max == min){
	        h = 0; // achromatic
	    }else{
	        switch(max){
	            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
	            case g: h = (b - r) / d + 2; break;
	            case b: h = (r - g) / d + 4; break;
	        }
	        h /= 6;
	    }

	    return [h, s, v];
	}

	/**
	 * Converts an HSV color value to RGB. Conversion formula
	 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
	 * Assumes h, s, and v are contained in the set [0, 1] and
	 * returns r, g, and b in the set [0, 1].
	 *
	 * @param   Number  h       The hue
	 * @param   Number  s       The saturation
	 * @param   Number  v       The value
	 * @return  Array           The RGB representation
	 */
	function hsv2rgb(h, s, v){
	    if(h.length) { v = h[2], s = h[1], h = h[0]; }
	    var r, g, b;

	    var i = Math.floor(h * 6);
	    var f = h * 6 - i;
	    var p = v * (1 - s);
	    var q = v * (1 - f * s);
	    var t = v * (1 - (1 - f) * s);

	    switch(i % 6){
	        case 0: r = v, g = t, b = p; break;
	        case 1: r = q, g = v, b = p; break;
	        case 2: r = p, g = v, b = t; break;
	        case 3: r = p, g = q, b = v; break;
	        case 4: r = t, g = p, b = v; break;
	        case 5: r = v, g = p, b = q; break;
	    }

	    return [r, g, b];
	}

	// --------------------------------------------------------------------------------------------

	function vector_char(x,y,c) {
	   c = c.charCodeAt(0);
	   c -= 32;
	   if(c<0||c>=95) return { width: 0, segments: [] };

	   var off = c*112;
	   var n = simplexFont[off++];
	   var w = simplexFont[off++];
	   var l = [];
	   var segs = [];
	   
	   for(var i=0; i<n; i++) {
	      var xp = simplexFont[off+i*2];
	      var yp = simplexFont[off+i*2+1];
	      if(xp==-1&&yp==-1) {
	         segs.push(l); l = [];
	      } else {
	         l.push([xp+x,yp+y]);
	      }
	   }                
	   if(l.length) segs.push(l);
	   return { width: w, segments: segs };
	}

	function vector_text(x,y,s) {
	   var o = [];
	   var x0 = x;
	   for(var i=0; i<s.length; i++) {
	      var c = s.charAt(i);
	      if(c=='\n') {
	         x = x0; y -= 30;
	      } else {
	         var d = vector_char(x,y,c);
	         x += d.width;
	         o = o.concat(d.segments);
	      }
	   }
	   return o;
	}

	// -- data below from http://paulbourke.net/dataformats/hershey/

	var simplexFont = [
	    0,16, /* Ascii 32 */
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    8,10, /* Ascii 33 */
	    5,21, 5, 7,-1,-1, 5, 2, 4, 1, 5, 0, 6, 1, 5, 2,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    5,16, /* Ascii 34 */
	    4,21, 4,14,-1,-1,12,21,12,14,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   11,21, /* Ascii 35 */
	   11,25, 4,-7,-1,-1,17,25,10,-7,-1,-1, 4,12,18,12,-1,-1, 3, 6,17, 6,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   26,20, /* Ascii 36 */
	    8,25, 8,-4,-1,-1,12,25,12,-4,-1,-1,17,18,15,20,12,21, 8,21, 5,20, 3,
	   18, 3,16, 4,14, 5,13, 7,12,13,10,15, 9,16, 8,17, 6,17, 3,15, 1,12, 0,
	    8, 0, 5, 1, 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   31,24, /* Ascii 37 */
	   21,21, 3, 0,-1,-1, 8,21,10,19,10,17, 9,15, 7,14, 5,14, 3,16, 3,18, 4,
	   20, 6,21, 8,21,10,20,13,19,16,19,19,20,21,21,-1,-1,17, 7,15, 6,14, 4,
	   14, 2,16, 0,18, 0,20, 1,21, 3,21, 5,19, 7,17, 7,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   34,26, /* Ascii 38 */
	   23,12,23,13,22,14,21,14,20,13,19,11,17, 6,15, 3,13, 1,11, 0, 7, 0, 5,
	    1, 4, 2, 3, 4, 3, 6, 4, 8, 5, 9,12,13,13,14,14,16,14,18,13,20,11,21,
	    9,20, 8,18, 8,16, 9,13,11,10,16, 3,18, 1,20, 0,22, 0,23, 1,23, 2,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    7,10, /* Ascii 39 */
	    5,19, 4,20, 5,21, 6,20, 6,18, 5,16, 4,15,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   10,14, /* Ascii 40 */
	   11,25, 9,23, 7,20, 5,16, 4,11, 4, 7, 5, 2, 7,-2, 9,-5,11,-7,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   10,14, /* Ascii 41 */
	    3,25, 5,23, 7,20, 9,16,10,11,10, 7, 9, 2, 7,-2, 5,-5, 3,-7,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    8,16, /* Ascii 42 */
	    8,21, 8, 9,-1,-1, 3,18,13,12,-1,-1,13,18, 3,12,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    5,26, /* Ascii 43 */
	   13,18,13, 0,-1,-1, 4, 9,22, 9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    8,10, /* Ascii 44 */
	    6, 1, 5, 0, 4, 1, 5, 2, 6, 1, 6,-1, 5,-3, 4,-4,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    2,26, /* Ascii 45 */
	    4, 9,22, 9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    5,10, /* Ascii 46 */
	    5, 2, 4, 1, 5, 0, 6, 1, 5, 2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    2,22, /* Ascii 47 */
	   20,25, 2,-7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   17,20, /* Ascii 48 */
	    9,21, 6,20, 4,17, 3,12, 3, 9, 4, 4, 6, 1, 9, 0,11, 0,14, 1,16, 4,17,
	    9,17,12,16,17,14,20,11,21, 9,21,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    4,20, /* Ascii 49 */
	    6,17, 8,18,11,21,11, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   14,20, /* Ascii 50 */
	    4,16, 4,17, 5,19, 6,20, 8,21,12,21,14,20,15,19,16,17,16,15,15,13,13,
	   10, 3, 0,17, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   15,20, /* Ascii 51 */
	    5,21,16,21,10,13,13,13,15,12,16,11,17, 8,17, 6,16, 3,14, 1,11, 0, 8,
	    0, 5, 1, 4, 2, 3, 4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    6,20, /* Ascii 52 */
	   13,21, 3, 7,18, 7,-1,-1,13,21,13, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   17,20, /* Ascii 53 */
	   15,21, 5,21, 4,12, 5,13, 8,14,11,14,14,13,16,11,17, 8,17, 6,16, 3,14,
	    1,11, 0, 8, 0, 5, 1, 4, 2, 3, 4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   23,20, /* Ascii 54 */
	   16,18,15,20,12,21,10,21, 7,20, 5,17, 4,12, 4, 7, 5, 3, 7, 1,10, 0,11,
	    0,14, 1,16, 3,17, 6,17, 7,16,10,14,12,11,13,10,13, 7,12, 5,10, 4, 7,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    5,20, /* Ascii 55 */
	   17,21, 7, 0,-1,-1, 3,21,17,21,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   29,20, /* Ascii 56 */
	    8,21, 5,20, 4,18, 4,16, 5,14, 7,13,11,12,14,11,16, 9,17, 7,17, 4,16,
	    2,15, 1,12, 0, 8, 0, 5, 1, 4, 2, 3, 4, 3, 7, 4, 9, 6,11, 9,12,13,13,
	   15,14,16,16,16,18,15,20,12,21, 8,21,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   23,20, /* Ascii 57 */
	   16,14,15,11,13, 9,10, 8, 9, 8, 6, 9, 4,11, 3,14, 3,15, 4,18, 6,20, 9,
	   21,10,21,13,20,15,18,16,14,16, 9,15, 4,13, 1,10, 0, 8, 0, 5, 1, 4, 3,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   11,10, /* Ascii 58 */
	    5,14, 4,13, 5,12, 6,13, 5,14,-1,-1, 5, 2, 4, 1, 5, 0, 6, 1, 5, 2,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   14,10, /* Ascii 59 */
	    5,14, 4,13, 5,12, 6,13, 5,14,-1,-1, 6, 1, 5, 0, 4, 1, 5, 2, 6, 1, 6,
	   -1, 5,-3, 4,-4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    3,24, /* Ascii 60 */
	   20,18, 4, 9,20, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    5,26, /* Ascii 61 */
	    4,12,22,12,-1,-1, 4, 6,22, 6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    3,24, /* Ascii 62 */
	    4,18,20, 9, 4, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   20,18, /* Ascii 63 */
	    3,16, 3,17, 4,19, 5,20, 7,21,11,21,13,20,14,19,15,17,15,15,14,13,13,
	   12, 9,10, 9, 7,-1,-1, 9, 2, 8, 1, 9, 0,10, 1, 9, 2,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   55,27, /* Ascii 64 */
	   18,13,17,15,15,16,12,16,10,15, 9,14, 8,11, 8, 8, 9, 6,11, 5,14, 5,16,
	    6,17, 8,-1,-1,12,16,10,14, 9,11, 9, 8,10, 6,11, 5,-1,-1,18,16,17, 8,
	   17, 6,19, 5,21, 5,23, 7,24,10,24,12,23,15,22,17,20,19,18,20,15,21,12,
	   21, 9,20, 7,19, 5,17, 4,15, 3,12, 3, 9, 4, 6, 5, 4, 7, 2, 9, 1,12, 0,
	   15, 0,18, 1,20, 2,21, 3,-1,-1,19,16,18, 8,18, 6,19, 5,
	    8,18, /* Ascii 65 */
	    9,21, 1, 0,-1,-1, 9,21,17, 0,-1,-1, 4, 7,14, 7,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   23,21, /* Ascii 66 */
	    4,21, 4, 0,-1,-1, 4,21,13,21,16,20,17,19,18,17,18,15,17,13,16,12,13,
	   11,-1,-1, 4,11,13,11,16,10,17, 9,18, 7,18, 4,17, 2,16, 1,13, 0, 4, 0,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   18,21, /* Ascii 67 */
	   18,16,17,18,15,20,13,21, 9,21, 7,20, 5,18, 4,16, 3,13, 3, 8, 4, 5, 5,
	    3, 7, 1, 9, 0,13, 0,15, 1,17, 3,18, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   15,21, /* Ascii 68 */
	    4,21, 4, 0,-1,-1, 4,21,11,21,14,20,16,18,17,16,18,13,18, 8,17, 5,16,
	    3,14, 1,11, 0, 4, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   11,19, /* Ascii 69 */
	    4,21, 4, 0,-1,-1, 4,21,17,21,-1,-1, 4,11,12,11,-1,-1, 4, 0,17, 0,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    8,18, /* Ascii 70 */
	    4,21, 4, 0,-1,-1, 4,21,17,21,-1,-1, 4,11,12,11,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   22,21, /* Ascii 71 */
	   18,16,17,18,15,20,13,21, 9,21, 7,20, 5,18, 4,16, 3,13, 3, 8, 4, 5, 5,
	    3, 7, 1, 9, 0,13, 0,15, 1,17, 3,18, 5,18, 8,-1,-1,13, 8,18, 8,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    8,22, /* Ascii 72 */
	    4,21, 4, 0,-1,-1,18,21,18, 0,-1,-1, 4,11,18,11,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    2, 8, /* Ascii 73 */
	    4,21, 4, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   10,16, /* Ascii 74 */
	   12,21,12, 5,11, 2,10, 1, 8, 0, 6, 0, 4, 1, 3, 2, 2, 5, 2, 7,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    8,21, /* Ascii 75 */
	    4,21, 4, 0,-1,-1,18,21, 4, 7,-1,-1, 9,12,18, 0,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    5,17, /* Ascii 76 */
	    4,21, 4, 0,-1,-1, 4, 0,16, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   11,24, /* Ascii 77 */
	    4,21, 4, 0,-1,-1, 4,21,12, 0,-1,-1,20,21,12, 0,-1,-1,20,21,20, 0,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    8,22, /* Ascii 78 */
	    4,21, 4, 0,-1,-1, 4,21,18, 0,-1,-1,18,21,18, 0,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   21,22, /* Ascii 79 */
	    9,21, 7,20, 5,18, 4,16, 3,13, 3, 8, 4, 5, 5, 3, 7, 1, 9, 0,13, 0,15,
	    1,17, 3,18, 5,19, 8,19,13,18,16,17,18,15,20,13,21, 9,21,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   13,21, /* Ascii 80 */
	    4,21, 4, 0,-1,-1, 4,21,13,21,16,20,17,19,18,17,18,14,17,12,16,11,13,
	   10, 4,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   24,22, /* Ascii 81 */
	    9,21, 7,20, 5,18, 4,16, 3,13, 3, 8, 4, 5, 5, 3, 7, 1, 9, 0,13, 0,15,
	    1,17, 3,18, 5,19, 8,19,13,18,16,17,18,15,20,13,21, 9,21,-1,-1,12, 4,
	   18,-2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   16,21, /* Ascii 82 */
	    4,21, 4, 0,-1,-1, 4,21,13,21,16,20,17,19,18,17,18,15,17,13,16,12,13,
	   11, 4,11,-1,-1,11,11,18, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   20,20, /* Ascii 83 */
	   17,18,15,20,12,21, 8,21, 5,20, 3,18, 3,16, 4,14, 5,13, 7,12,13,10,15,
	    9,16, 8,17, 6,17, 3,15, 1,12, 0, 8, 0, 5, 1, 3, 3,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    5,16, /* Ascii 84 */
	    8,21, 8, 0,-1,-1, 1,21,15,21,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   10,22, /* Ascii 85 */
	    4,21, 4, 6, 5, 3, 7, 1,10, 0,12, 0,15, 1,17, 3,18, 6,18,21,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    5,18, /* Ascii 86 */
	    1,21, 9, 0,-1,-1,17,21, 9, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   11,24, /* Ascii 87 */
	    2,21, 7, 0,-1,-1,12,21, 7, 0,-1,-1,12,21,17, 0,-1,-1,22,21,17, 0,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    5,20, /* Ascii 88 */
	    3,21,17, 0,-1,-1,17,21, 3, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    6,18, /* Ascii 89 */
	    1,21, 9,11, 9, 0,-1,-1,17,21, 9,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    8,20, /* Ascii 90 */
	   17,21, 3, 0,-1,-1, 3,21,17,21,-1,-1, 3, 0,17, 0,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   11,14, /* Ascii 91 */
	    4,25, 4,-7,-1,-1, 5,25, 5,-7,-1,-1, 4,25,11,25,-1,-1, 4,-7,11,-7,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    2,14, /* Ascii 92 */
	    0,21,14,-3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   11,14, /* Ascii 93 */
	    9,25, 9,-7,-1,-1,10,25,10,-7,-1,-1, 3,25,10,25,-1,-1, 3,-7,10,-7,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   10,16, /* Ascii 94 */
	    6,15, 8,18,10,15,-1,-1, 3,12, 8,17,13,12,-1,-1, 8,17, 8, 0,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    2,16, /* Ascii 95 */
	    0,-2,16,-2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    7,10, /* Ascii 96 */
	    6,21, 5,20, 4,18, 4,16, 5,15, 6,16, 5,17,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   17,19, /* Ascii 97 */
	   15,14,15, 0,-1,-1,15,11,13,13,11,14, 8,14, 6,13, 4,11, 3, 8, 3, 6, 4,
	    3, 6, 1, 8, 0,11, 0,13, 1,15, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   17,19, /* Ascii 98 */
	    4,21, 4, 0,-1,-1, 4,11, 6,13, 8,14,11,14,13,13,15,11,16, 8,16, 6,15,
	    3,13, 1,11, 0, 8, 0, 6, 1, 4, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   14,18, /* Ascii 99 */
	   15,11,13,13,11,14, 8,14, 6,13, 4,11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0,11,
	    0,13, 1,15, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   17,19, /* Ascii 100 */
	   15,21,15, 0,-1,-1,15,11,13,13,11,14, 8,14, 6,13, 4,11, 3, 8, 3, 6, 4,
	    3, 6, 1, 8, 0,11, 0,13, 1,15, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   17,18, /* Ascii 101 */
	    3, 8,15, 8,15,10,14,12,13,13,11,14, 8,14, 6,13, 4,11, 3, 8, 3, 6, 4,
	    3, 6, 1, 8, 0,11, 0,13, 1,15, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    8,12, /* Ascii 102 */
	   10,21, 8,21, 6,20, 5,17, 5, 0,-1,-1, 2,14, 9,14,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   22,19, /* Ascii 103 */
	   15,14,15,-2,14,-5,13,-6,11,-7, 8,-7, 6,-6,-1,-1,15,11,13,13,11,14, 8,
	   14, 6,13, 4,11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0,11, 0,13, 1,15, 3,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   10,19, /* Ascii 104 */
	    4,21, 4, 0,-1,-1, 4,10, 7,13, 9,14,12,14,14,13,15,10,15, 0,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    8, 8, /* Ascii 105 */
	    3,21, 4,20, 5,21, 4,22, 3,21,-1,-1, 4,14, 4, 0,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   11,10, /* Ascii 106 */
	    5,21, 6,20, 7,21, 6,22, 5,21,-1,-1, 6,14, 6,-3, 5,-6, 3,-7, 1,-7,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    8,17, /* Ascii 107 */
	    4,21, 4, 0,-1,-1,14,14, 4, 4,-1,-1, 8, 8,15, 0,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    2, 8, /* Ascii 108 */
	    4,21, 4, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   18,30, /* Ascii 109 */
	    4,14, 4, 0,-1,-1, 4,10, 7,13, 9,14,12,14,14,13,15,10,15, 0,-1,-1,15,
	   10,18,13,20,14,23,14,25,13,26,10,26, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   10,19, /* Ascii 110 */
	    4,14, 4, 0,-1,-1, 4,10, 7,13, 9,14,12,14,14,13,15,10,15, 0,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   17,19, /* Ascii 111 */
	    8,14, 6,13, 4,11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0,11, 0,13, 1,15, 3,16,
	    6,16, 8,15,11,13,13,11,14, 8,14,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   17,19, /* Ascii 112 */
	    4,14, 4,-7,-1,-1, 4,11, 6,13, 8,14,11,14,13,13,15,11,16, 8,16, 6,15,
	    3,13, 1,11, 0, 8, 0, 6, 1, 4, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   17,19, /* Ascii 113 */
	   15,14,15,-7,-1,-1,15,11,13,13,11,14, 8,14, 6,13, 4,11, 3, 8, 3, 6, 4,
	    3, 6, 1, 8, 0,11, 0,13, 1,15, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    8,13, /* Ascii 114 */
	    4,14, 4, 0,-1,-1, 4, 8, 5,11, 7,13, 9,14,12,14,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   17,17, /* Ascii 115 */
	   14,11,13,13,10,14, 7,14, 4,13, 3,11, 4, 9, 6, 8,11, 7,13, 6,14, 4,14,
	    3,13, 1,10, 0, 7, 0, 4, 1, 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    8,12, /* Ascii 116 */
	    5,21, 5, 4, 6, 1, 8, 0,10, 0,-1,-1, 2,14, 9,14,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   10,19, /* Ascii 117 */
	    4,14, 4, 4, 5, 1, 7, 0,10, 0,12, 1,15, 4,-1,-1,15,14,15, 0,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    5,16, /* Ascii 118 */
	    2,14, 8, 0,-1,-1,14,14, 8, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   11,22, /* Ascii 119 */
	    3,14, 7, 0,-1,-1,11,14, 7, 0,-1,-1,11,14,15, 0,-1,-1,19,14,15, 0,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    5,17, /* Ascii 120 */
	    3,14,14, 0,-1,-1,14,14, 3, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    9,16, /* Ascii 121 */
	    2,14, 8, 0,-1,-1,14,14, 8, 0, 6,-4, 4,-6, 2,-7, 1,-7,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    8,17, /* Ascii 122 */
	   14,14, 3, 0,-1,-1, 3,14,14,14,-1,-1, 3, 0,14, 0,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   39,14, /* Ascii 123 */
	    9,25, 7,24, 6,23, 5,21, 5,19, 6,17, 7,16, 8,14, 8,12, 6,10,-1,-1, 7,
	   24, 6,22, 6,20, 7,18, 8,17, 9,15, 9,13, 8,11, 4, 9, 8, 7, 9, 5, 9, 3,
	    8, 1, 7, 0, 6,-2, 6,-4, 7,-6,-1,-1, 6, 8, 8, 6, 8, 4, 7, 2, 6, 1, 5,
	   -1, 5,-3, 6,-5, 7,-6, 9,-7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	    2, 8, /* Ascii 124 */
	    4,25, 4,-7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   39,14, /* Ascii 125 */
	    5,25, 7,24, 8,23, 9,21, 9,19, 8,17, 7,16, 6,14, 6,12, 8,10,-1,-1, 7,
	   24, 8,22, 8,20, 7,18, 6,17, 5,15, 5,13, 6,11,10, 9, 6, 7, 5, 5, 5, 3,
	    6, 1, 7, 0, 8,-2, 8,-4, 7,-6,-1,-1, 8, 8, 6, 6, 6, 4, 7, 2, 8, 1, 9,
	   -1, 9,-3, 8,-5, 7,-6, 5,-7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   23,24, /* Ascii 126 */
	    3, 6, 3, 8, 4,11, 6,12, 8,12,10,11,14, 8,16, 7,18, 7,20, 8,21,10,-1,
	   -1, 3, 8, 4,10, 6,11, 8,11,10,10,14, 7,16, 6,18, 6,20, 7,21,10,21,12,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
	];


	// --------------------------------------------------------------------------------------------

	function parseAMF(amf,fn) {      // http://en.wikipedia.org/wiki/Additive_Manufacturing_File_Format
	   var xml, err = '';            // http://api.jquery.com/category/traversing/
	   try {
	      xml = $.parseXML(amf);
	   } catch(e) {
	      echo("XML parsing error:",e.message.substring(0,120)+"..");
	      err += "XML parsing error / invalid XML";
	   }
	   var v = [];    // vertices
	   var f = [];    // faces
	   //var c = [];    // color settings (per face)
	   var nv = 0, np = 0;
	   var src = '', srci = '';

	   srci = "\tvar pgs = [];\n";

	   var meta = [];
	   var metatag = $(xml).find('metadata');    // -- extract metadata
	   metatag.each(function() {
	      var el = $(this);
	      meta[el.attr('type')] = el.text();
	   });
	   
	   var obj = $(xml).find('object');
	   obj.each(function() {
	      var el = $(this);
	      var mesh = el.find('mesh');
	      mesh.each(function() {
	         var el = $(this);
	         var c = [];
	         var co = el.find('color');
	         var rgbm = [];
	         if(co.length) {
	            rgbm = [co.find('r').first().text(), co.find('g').first().text(), co.find('b').first().text()];
	            if(co.find('a').length) rgbm = rgbm.concat(co.find('a').first().text());
	         }
	         v = []; f = []; nv = 0;        // we create each individual polygon
	         
	         var vertices = el.find('vertices');
	         var sn = nv;
	         vertices.each(function() {
	            var el = $(this);
	            var vertex = el.find('vertex');
	            vertex.each(function() {
	               var el = $(this);
	               var x = el.find('x').text();
	               var y = el.find('y').text();
	               var z = el.find('z').text();
	               v.push([x,y,z]);
	               nv++;
	            });
	         });
	         var volume = el.find('volume');
	         volume.each(function() {
	            var el = $(this);
	            var rgbv = [], co = el.find('color');
	            if(co.length) {
	               rgbv = [co.find('r').first().text(), co.find('g').first().text(), co.find('b').first().text()];
	               if(co.find('a').length) rgbv = rgbv.concat(co.find('a').first().text());
	            }
	            var triangle = el.find('triangle');
	            triangle.each(function() {
	               var el = $(this);
	               var rgbt = [], co = el.find('color');
	               if(co.length) {
	                  rgbt = [co.find('r').first().text(), co.find('g').first().text(), co.find('b').first().text()];
	                  if(co.find('a').length) rgbt = rgbt.concat(co.find('a').first().text());
	               }
	               var v1 = parseInt(el.find('v1').first().text()); // -- why: v1 might occur <v1>1</v1><map><v1>0</v1></map> -> find('v1') return '1'+'0' = '10'
	               var v2 = parseInt(el.find('v2').first().text());
	               var v3 = parseInt(el.find('v3').first().text());
	               if(rgbm.length||rgbv.length||rgbt.length) 
	                  c[f.length] = rgbt.length?rgbt:(rgbv.length?rgbv:rgbm);
	               f.push([v1+sn,v2+sn,v3+sn]);        // HINT: reverse order for polyhedron()

	               var maps = el.find('map');
	               maps.each(function() {
	                  ;        // not yet
	               });
	            });
	         });
	         var textures = el.find('texture');
	         textures.each(function() {
	            ; // not yet
	         });
	         
	         // v[] has the vertices
	         // f[] has the faces
	         for(var i=0; i<f.length; i++) {
	            //srci += "\tpgs.push(new CSG.Polygon([\n\t\t";
	            srci += "\tpgs.push(PP([\n\t\t";
	            for(var j=0; j<f[i].length; j++) {
	               if(f[i][j]<0||f[i][j]>=v.length) {
	                  if(err.length=='') err += "bad index for vertice (out of range)";
	                  continue;
	               }
	               if(j) srci += ",\n\t\t";
	               //srci += "<!-- "+v+","+f+" -->";
	               //srci += "<!-- "+f[i]+":"+v.length+":"+v[f[i]]+" -->";
	               //srci += "new CSG.Vertex(new CSG.Vector3D("+v[f[i][j]]+"))";
	               srci += "VV("+v[f[i][j]]+")";
	            }
	            srci += "])";
	            if(c[i]) srci += ".setColor("+c[i]+")";
	            srci += ");\n";
	            np++;
	         }
	      });
	   });
	   var src = "";
	   for(var k in meta) {
	      src += "// AMF."+k+": "+meta[k]+"\n";
	   }
	   src += "// producer: OpenJSCAD "+me.toUpperCase()+" "+version+" AMF Importer\n";
	   src += "// date: "+(new Date())+"\n";
	   src += "// source: "+fn+"\n";
	   src += "\n";
	   
	   if(err) src += "// WARNING: import errors: "+err+" (some triangles might be misaligned or missing)\n";
	   src += "// objects: 1\n// object #1: polygons: "+np+"\n\n";
	   src += "function main() {\n"; 
	   src += "\tvar PP = function(a) { return new CSG.Polygon(a); }\n"; 
	   src += "\tvar VV = function(x,y,z) { return new CSG.Vertex(new CSG.Vector3D(x,y,z)); }\n";
	   //src += vt2jscad(v,f,[],c);
	   src += srci;
	   src += "\treturn CSG.fromPolygons(pgs);\n}\n";
	   return src;
	}
	   

	function parseOBJ(obj,fn) {   // http://en.wikipedia.org/wiki/Wavefront_.obj_file
	   var l = obj.split(/\n/);
	   var v = [], f = [];
	   
	   for(var i=0; i<l.length; i++) {
	      var s = l[i];
	      var a = s.split(/\s+/);

	      if(a[0]=='v') {
	         v.push([a[1],a[2],a[3]]);
	         
	      } else if(a[0]=='f') {
	         var fc = [];
	         var skip = 0;

	         for(var j=1; j<a.length; j++) {
	            var c = a[j];            
	            c = c.replace(/\/.*$/,'');     // -- if coord# is '840/840' -> 840
	            c--;                       // -- starts with 1, but we start with 0
	            if(c>=v.length) 
	               skip++;
	            if(skip==0)
	               fc.push(c);
	         }
	         //fc.reverse();
	         if(skip==0) 
	            f.push(fc);
	         
	      } else {
	         ;     // vn vt and all others disregarded
	      }
	   }
	   var src = ""; 
	   src += "// producer: OpenJSCAD "+me.toUpperCase()+" "+version+" Wavefront OBJ Importer\n";
	   src += "// date: "+(new Date())+"\n";
	   src += "// source: "+fn+"\n";
	   src += "\n";
	   //if(err) src += "// WARNING: import errors: "+err+" (some triangles might be misaligned or missing)\n";
	   src += "// objects: 1\n// object #1: polygons: "+f.length+"\n\n";
	   src += "function main() { return "; 
	   src += vt2jscad(v,f);
	   src += "; }";
	   return src;
	}

	// STL function from http://jsfiddle.net/Riham/yzvGD/35/ 
	// CC BY-SA by Riham
	// changes by Rene K. Mueller <spiritdude@gmail.com>
	//
	// 2013/03/28: lot of rework and debugging included, and error handling
	// 2013/03/18: renamed functions, creating .jscad source direct via polyhedron()

	function parseSTL(stl,fn) {
	   var isAscii = true;

	   for(var i=0; i<stl.length; i++) {
	      if(stl[i].charCodeAt(0) == 0) {
	         isAscii = false;
	         break;
	      }
	   }
	   //echo("STL:"+fn,isAscii?"ascii":"binary");
	   var src;
	   if(!isAscii) {
	      src = parseBinarySTL(stl,fn);
	   } else {
	      src = parseAsciiSTL(stl,fn);
	   }
	   //echo("STL converted JSCAD",src);
	   return src;
	}

	function parseBinarySTL(stl,fn) {
	    // -- This makes more sense if you read http://en.wikipedia.org/wiki/STL_(file_format)#Binary_STL
	    var vertices = [];
	    var triangles = [];
	    var normals = [];
	    var vertexIndex = 0;
	    var converted = 0;
	    var err = 0;
	    var br = new BinaryReader(stl);
	    
	    br.seek(80); //Skip header
	    //for(var i=0; i<80; i++) 
	    //   br.readInt8();
	      
	    var totalTriangles = br.readUInt32(); //Read # triangles

	    for (var tr = 0; tr < totalTriangles; tr++) {
	        //if(tr%100==0) status('stl importer: converted '+converted+' out of '+totalTriangles+' triangles');
	        /*
	             REAL32[3] . Normal vector
	             REAL32[3] . Vertex 1
	             REAL32[3] . Vertex 2
	             REAL32[3] . Vertex 3
	                UINT16 . Attribute byte count */
	        // -- Parse normal
	        var no = []; no.push(br.readFloat()); no.push(br.readFloat()); no.push(br.readFloat());

	        // -- Parse every 3 subsequent floats as a vertex
	        var v1 = []; v1.push(br.readFloat()); v1.push(br.readFloat()); v1.push(br.readFloat());
	        var v2 = []; v2.push(br.readFloat()); v2.push(br.readFloat()); v2.push(br.readFloat());
	        var v3 = []; v3.push(br.readFloat()); v3.push(br.readFloat()); v3.push(br.readFloat());

	        var skip = 0;
	        if(1) {
	           for(var i=0; i<3; i++) {
	              if(isNaN(v1[i])) skip++;
	              if(isNaN(v2[i])) skip++;
	              if(isNaN(v3[i])) skip++;
	              if(isNaN(no[i])) skip++;
	           }
	           if(skip>0) {
	              echo("bad triangle vertice coords/normal: ",skip);
	           }
	        }
	        err += skip;
	        // -- every 3 vertices create a triangle.
	        var triangle = []; triangle.push(vertexIndex++); triangle.push(vertexIndex++); triangle.push(vertexIndex++);

	        br.readUInt16();

	        // -- Add 3 vertices for every triangle
	        // -- TODO: OPTIMIZE: Check if the vertex is already in the array, if it is just reuse the index
	        if(skip==0) {  // checking cw vs ccw, given all normal/vertice are valid
	           // E1 = B - A
	           // E2 = C - A
	           // test = dot( Normal, cross( E1, E2 ) )
	           // test > 0: cw, test < 0 : ccw
	           var w1 = new CSG.Vector3D(v1);
	           var w2 = new CSG.Vector3D(v2);
	           var w3 = new CSG.Vector3D(v3);
	           var e1 = w2.minus(w1);
	           var e2 = w3.minus(w1);
	           var t = new CSG.Vector3D(no).dot(e1.cross(e2));
	           if(t>0) {    // 1,2,3 -> 3,2,1 
	              var tmp = v3;
	              v3 = v1;
	              v1 = tmp;
	           }
	        }
	        vertices.push(v1);
	        vertices.push(v2);
	        vertices.push(v3);
	        triangles.push(triangle);
	        normals.push(no);
	        converted++;
	    }
	   var src = "";
	   src += "// producer: OpenJSCAD "+me.toUpperCase()+" "+version+" STL Binary Importer\n";
	   src += "// date: "+(new Date())+"\n";
	   src += "// source: "+fn+"\n";
	   src += "\n";
	   if(err) src += "// WARNING: import errors: "+err+" (some triangles might be misaligned or missing)\n";
	   src += "// objects: 1\n// object #1: triangles: "+totalTriangles+"\n\n";
	   src += "function main() { return "; 
	   src += vt2jscad(vertices,triangles,normals);
	   src += "; }";
	   return src;
	}

	function parseAsciiSTL(stl,fn) {
	   var src = "";
	   var n = 0;
	   var converted = 0;
	   var o;
	     
	   src += "// producer: OpenJSCAD "+me.toUpperCase()+" "+version+" STL ASCII Importer\n";
	   src += "// date: "+(new Date())+"\n";
	   src += "// source: "+fn+"\n";
	   src += "\n";
	    src += "function main() { return union(\n"; 
	    // -- Find all models
	    var objects = stl.split('endsolid');
	    src += "// objects: "+(objects.length-1)+"\n";
	    
	    for (o = 1; o < objects.length; o++) {
	        // -- Translation: a non-greedy regex for facet {...} endloop pattern 
	        var patt = /\bfacet[\s\S]*?endloop/mgi;
	        var vertices = [];
	        var triangles = [];
	        var normals = [];
	        var vertexIndex = 0;
	        var err = 0;
	        
	        match = stl.match(patt);
	        if (match == null) continue;
	        for (var i = 0; i < match.length; i++) {
	            //if(converted%100==0) status('stl to jscad: converted '+converted+' out of '+match.length+ ' facets');
	            // -- 1 normal with 3 numbers, 3 different vertex objects each with 3 numbers:
	            //var vpatt = /\bfacet\s+normal\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)\s*outer\s+loop\s+vertex\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)\s*vertex\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)\s*vertex\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)/mgi;
	                                         // (-?\d+\.?\d*) -1.21223
	                                         // (-?\d+\.?\d*[Ee]?[-+]?\d*)
	            var vpatt = /\bfacet\s+normal\s+(\S+)\s+(\S+)\s+(\S+)\s+outer\s+loop\s+vertex\s+(\S+)\s+(\S+)\s+(\S+)\s+vertex\s+(\S+)\s+(\S+)\s+(\S+)\s+vertex\s+(\S+)\s+(\S+)\s+(\S+)\s*/mgi;
	            var v = vpatt.exec(match[i]);
	            if (v == null) continue;
	            if (v.length != 13) {
	                echo("Failed to parse " + match[i]);
	                break;
	            }
	            var skip = 0;
	            for(var k=0; k<v.length; k++) {
	               if(v[k]=='NaN') {
	                  echo("bad normal or triangle vertice #"+converted+" "+k+": '"+v[k]+"', skipped");
	                  skip++;
	               }
	            }
	            err += skip;
	            if(skip) {
	               continue;
	            }
	            if(false) {
	               var j = 1+3;
	               var v1 = []; v1.push(parseFloat(v[j++])); v1.push(parseFloat(v[j++])); v1.push(parseFloat(v[j++]));
	               var v2 = []; v2.push(parseFloat(v[j++])); v2.push(parseFloat(v[j++])); v2.push(parseFloat(v[j++]));
	               var v3 = []; v3.push(parseFloat(v[j++])); v3.push(parseFloat(v[j++])); v3.push(parseFloat(v[j++]));
	               echo("recalculate norm",v1,v2,v3);
	               var w1 = new CSG.Vector3D(v1);
	               var w2 = new CSG.Vector3D(v2);
	               var w3 = new CSG.Vector3D(v3);
	               var _u = w1.minus(w3);
	               var _v = w1.minus(w2);
	               var norm = _u.cross(_v).unit();
	               j = 1;
	               v[j++] = norm._x;
	               v[j++] = norm._y;
	               v[j++] = norm._z;
	               skip = false;
	            }
	            var j = 1;
	            var no = []; no.push(parseFloat(v[j++])); no.push(parseFloat(v[j++])); no.push(parseFloat(v[j++]));
	            var v1 = []; v1.push(parseFloat(v[j++])); v1.push(parseFloat(v[j++])); v1.push(parseFloat(v[j++]));
	            var v2 = []; v2.push(parseFloat(v[j++])); v2.push(parseFloat(v[j++])); v2.push(parseFloat(v[j++]));
	            var v3 = []; v3.push(parseFloat(v[j++])); v3.push(parseFloat(v[j++])); v3.push(parseFloat(v[j++]));
	            var triangle = []; triangle.push(vertexIndex++); triangle.push(vertexIndex++); triangle.push(vertexIndex++);

	            // -- Add 3 vertices for every triangle
	            //    TODO: OPTIMIZE: Check if the vertex is already in the array, if it is just reuse the index
	            if(skip==0) {  // checking cw vs ccw
	               // E1 = B - A
	               // E2 = C - A
	               // test = dot( Normal, cross( E1, E2 ) )
	               // test > 0: cw, test < 0: ccw
	               var w1 = new CSG.Vector3D(v1);
	               var w2 = new CSG.Vector3D(v2);
	               var w3 = new CSG.Vector3D(v3);
	               var e1 = w2.minus(w1);
	               var e2 = w3.minus(w1);
	               var t = new CSG.Vector3D(no).dot(e1.cross(e2));
	               if(t>0) {      // 1,2,3 -> 3,2,1
	                  var tmp = v3;
	                  v3 = v1;
	                  v1 = tmp;
	               }
	            }
	            vertices.push(v1);
	            vertices.push(v2);
	            vertices.push(v3);
	            normals.push(no);
	            triangles.push(triangle);
	            converted++;
	        }
	        if(n++) src += ",";
	        if(err) src += "// WARNING: import errors: "+err+" (some triangles might be misaligned or missing)\n";
	        src += "// object #"+(o)+": triangles: "+match.length+"\n";
	        src += vt2jscad(vertices,triangles,normals);
	    }
	    src += "); }\n";
	    return src;
	}

	function vt2jscad(v,t,n,c) {     // vertices, triangles, normals and colors
	   var src = '';
	   src += "polyhedron({ points: [\n\t";
	   for(var i=0,j=0; i<v.length; i++) {
	      if(j++) src += ",\n\t";
	      src += "["+v[i]+"]"; //.join(", ");
	   }
	   src += "],\n\tpolygons: [\n\t";
	   for(var i=0,j=0; i<t.length; i++) {
	      if(j++) src += ",\n\t";
	      src += "["+t[i]+"]"; //.join(', ');
	   }
	   src += "] })\n";
	   return src;
	   //return polyhedron({points:vertices, triangles: triangles});
	}

	// BinaryReader
	// Refactored by Vjeux <vjeuxx@gmail.com>
	// http://blog.vjeux.com/2010/javascript/javascript-binary-reader.html

	// Original
	//+ Jonas Raoni Soares Silva
	//@ http://jsfromhell.com/classes/binary-parser [rev. #1]

	var BinaryReader = function (data) {
	   this._buffer = data;
	   this._pos = 0;
	};

	BinaryReader.prototype = {

	   /* Public */

	   readInt8:   function (){ return this._decodeInt(8, true); },
	   readUInt8:  function (){ return this._decodeInt(8, false); },
	   readInt16:  function (){ return this._decodeInt(16, true); },
	   readUInt16: function (){ return this._decodeInt(16, false); },
	   readInt32:  function (){ return this._decodeInt(32, true); },
	   readUInt32: function (){ return this._decodeInt(32, false); },

	   readFloat:  function (){ return this._decodeFloat(23, 8); },
	   readDouble: function (){ return this._decodeFloat(52, 11); },

	   readChar:   function () { return this.readString(1); },
	   readString: function (length) {
	      this._checkSize(length * 8);
	      var result = this._buffer.substr(this._pos, length);
	      this._pos += length;
	      return result;
	   },

	   seek: function (pos) {
	      this._pos = pos;
	      this._checkSize(0);
	   },

	   getPosition: function () {
	      return this._pos;
	   },

	   getSize: function () {
	      return this._buffer.length;
	   },


	   /* Private */

	   _decodeFloat: function(precisionBits, exponentBits){
	      var length = precisionBits + exponentBits + 1;
	      var size = length >> 3;
	      this._checkSize(length);

	      var bias = Math.pow(2, exponentBits - 1) - 1;
	      var signal = this._readBits(precisionBits + exponentBits, 1, size);
	      var exponent = this._readBits(precisionBits, exponentBits, size);
	      var significand = 0;
	      var divisor = 2;
	      var curByte = 0; //length + (-precisionBits >> 3) - 1;
	      do {
	         var byteValue = this._readByte(++curByte, size);
	         var startBit = precisionBits % 8 || 8;
	         var mask = 1 << startBit;
	         while (mask >>= 1) {
	            if (byteValue & mask) {
	               significand += 1 / divisor;
	            }
	            divisor *= 2;
	         }
	      } while (precisionBits -= startBit);

	      this._pos += size;

	      return exponent == (bias << 1) + 1 ? significand ? NaN : signal ? -Infinity : +Infinity
	         : (1 + signal * -2) * (exponent || significand ? !exponent ? Math.pow(2, -bias + 1) * significand
	         : Math.pow(2, exponent - bias) * (1 + significand) : 0);
	   },

	   _decodeInt: function(bits, signed){
	      var x = this._readBits(0, bits, bits / 8), max = Math.pow(2, bits);
	      var result = signed && x >= max / 2 ? x - max : x;

	      this._pos += bits / 8;
	      return result;
	   },

	   //shl fix: Henri Torgemane ~1996 (compressed by Jonas Raoni)
	   _shl: function (a, b){
	      for (++b; --b; a = ((a %= 0x7fffffff + 1) & 0x40000000) == 0x40000000 ? a * 2 : (a - 0x40000000) * 2 + 0x7fffffff + 1);
	      return a;
	   },

	   _readByte: function (i, size) {
	      return this._buffer.charCodeAt(this._pos + size - i - 1) & 0xff;
	   },

	   _readBits: function (start, length, size) {
	      var offsetLeft = (start + length) % 8;
	      var offsetRight = start % 8;
	      var curByte = size - (start >> 3) - 1;
	      var lastByte = size + (-(start + length) >> 3);
	      var diff = curByte - lastByte;

	      var sum = (this._readByte(curByte, size) >> offsetRight) & ((1 << (diff ? 8 - offsetRight : length)) - 1);

	      if (diff && offsetLeft) {
	         sum += (this._readByte(lastByte++, size) & ((1 << offsetLeft) - 1)) << (diff-- << 3) - offsetRight; 
	      }

	      while (diff) {
	         sum += this._shl(this._readByte(lastByte++, size), (diff-- << 3) - offsetRight);
	      }

	      return sum;
	   },

	   _checkSize: function (neededBits) {
	      if (!(this._pos + Math.ceil(neededBits / 8) < this._buffer.length)) {
	         //throw new Error("Index out of bound");
	      }
	   }
	};

	function parseGCode(gcode,fn) {   // http://reprap.org/wiki/G-code 
	                                  // just as experiment ... 
	   var l = gcode.split(/[\n]/);   // for now just GCODE ASCII 
	   var srci = '';
	   var d = 0, pos = [], lpos = [], le = 0, ld = 0, p = [];
	   var origin = [-100,-100];
	   var layers = 0;
	   var lh = 0.35, lz = 0;
	   
	   for(var i=0; i<l.length; i++) {
	      var val = '', k, e = 0;
	      if(l[i].match(/^\s*;/))
	         continue;
	      var c = l[i].split(/\s+/);
	      for(var j=0; j<c.length; j++) {
	         if(c[j].match(/G(\d+)/)) {
	            var n = parseInt(RegExp.$1);
	            if(n==1) d++;
	            if(n==90) pos.type = 'abs';
	            if(n==91) pos.type = 'rel';
	            
	         } else if(c[j].match(/M(\d+)/)) {
	            var n = parseInt(RegExp.$1);
	            if(n==104||n==109)
	               k = 'temp'; 
	   
	         } else if(c[j].match(/S([\d\.]+)/)) {
	            var v = parseInt(RegExp.$1);
	            if(k!==undefined) 
	               val[k] = v;
	            
	         } else if(c[j].match(/([XYZE])([\-\d\.]+)/)) {
	            var a = RegExp.$1, v = parseFloat(RegExp.$2);
	            if(pos.type=='abs') {
	               if(d) pos[a] = v;
	            } else {
	               if(d) pos[a] += v;
	            }
	            //console.log(d,a,pos.E,lpos.E);
	            if(d&&a=='E'&&lpos.E===undefined) 
	               lpos.E = pos.E;
	            if(d&&a=='E'&&(pos.E-lpos.E)>0) {
	               //console.log(pos.E,lpos.E);
	               e++;
	            }
	         }
	      }
	      if(d&&pos.X&&pos.Y) {
	         if(e) {
	            if(!le&&lpos.X&&lpos.Y) {
	               //console.log(lpos.X,lpos.Y);
	               p.push("["+(lpos.X+origin[0])+","+(lpos.Y+origin[1])+"]");
	            }
	            p.push("["+(pos.X+origin[0])+","+(pos.Y+origin[1])+"]");
	         } 
	         if(!e&&le&&p.length>1) {
	            if(srci.length) srci += ",\n\t\t";
	            if(pos.Z!=lz) { 
	               lh = pos.Z-lz;
	               layers++;
	            }
	            srci += "EX(["+p.join(', ')+"],{w: "+lh*1.1+", h:"+lh*1.02+", fn:1, closed: false}).translate([0,0,"+pos['Z']+"])";
	            p = [];
	            lz = pos.Z;
	            //if(layers>2) 
	            //   break;
	         } 
	         le = e;
	         lpos.X = pos.X;
	         lpos.Y = pos.Y;
	         lpos.Z = pos.Z;
	         lpos.E = pos.E;
	      }
	      ld = d;
	   }
	   
	   var src = "";
	   src += "// producer: OpenJSCAD "+me.toUpperCase()+" "+version+" GCode Importer\n";
	   src += "// date: "+(new Date())+"\n";
	   src += "// source: "+fn+"\n";
	   src += "\n";
	   //if(err) src += "// WARNING: import errors: "+err+" (some triangles might be misaligned or missing)\n";
	   src += "// layers: "+layers+"\n";
	   src += "function main() {\n\tvar EX = function(p,opt) { return rectangular_extrude(p,opt); }\n\treturn ["; 
	   src += srci;
	   src += "\n\t];\n}\n";
	   return src;
	}

	// -------------------------------------------------------------------------------------------------

	function clone(obj) {
	    if (null == obj || "object" != typeof obj) return obj;
	    var copy = obj.constructor();
	    for (var attr in obj) {
	        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
	    }
	    return copy;
	}
	   
	/**
	sprintf() for JavaScript 0.7-beta1
	http://www.diveintojavascript.com/projects/javascript-sprintf

	Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com>
	All rights reserved.

	Redistribution and use in source and binary forms, with or without
	modification, are permitted provided that the following conditions are met:
	    * Redistributions of source code must retain the above copyright
	      notice, this list of conditions and the following disclaimer.
	    * Redistributions in binary form must reproduce the above copyright
	      notice, this list of conditions and the following disclaimer in the
	      documentation and/or other materials provided with the distribution.
	    * Neither the name of sprintf() for JavaScript nor the
	      names of its contributors may be used to endorse or promote products
	      derived from this software without specific prior written permission.

	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
	ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
	WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
	DISCLAIMED. IN NO EVENT SHALL Alexandru Marasteanu BE LIABLE FOR ANY
	DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
	(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
	LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
	ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
	SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


	Changelog:
	2010.09.06 - 0.7-beta1
	  - features: vsprintf, support for named placeholders
	  - enhancements: format cache, reduced global namespace pollution

	2010.05.22 - 0.6:
	 - reverted to 0.4 and fixed the bug regarding the sign of the number 0
	 Note:
	 Thanks to Raphael Pigulla <raph (at] n3rd [dot) org> (http://www.n3rd.org/)
	 who warned me about a bug in 0.5, I discovered that the last update was
	 a regress. I appologize for that.

	2010.05.09 - 0.5:
	 - bug fix: 0 is now preceeded with a + sign
	 - bug fix: the sign was not at the right position on padded results (Kamal Abdali)
	 - switched from GPL to BSD license

	2007.10.21 - 0.4:
	 - unit test and patch (David Baird)

	2007.09.17 - 0.3:
	 - bug fix: no longer throws exception on empty paramenters (Hans Pufal)

	2007.09.11 - 0.2:
	 - feature: added argument swapping

	2007.04.03 - 0.1:
	 - initial release
	**/

	var sprintf = (function() {
		function get_type(variable) {
			return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
		}
		function str_repeat(input, multiplier) {
			for (var output = []; multiplier > 0; output[--multiplier] = input) {/* do nothing */}
			return output.join('');
		}

		var str_format = function() {
			if (!str_format.cache.hasOwnProperty(arguments[0])) {
				str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
			}
			return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
		};

		str_format.format = function(parse_tree, argv) {
			var cursor = 1, tree_length = parse_tree.length, node_type = '', arg, output = [], i, k, match, pad, pad_character, pad_length;
			for (i = 0; i < tree_length; i++) {
				node_type = get_type(parse_tree[i]);
				if (node_type === 'string') {
					output.push(parse_tree[i]);
				}
				else if (node_type === 'array') {
					match = parse_tree[i]; // convenience purposes only
					if (match[2]) { // keyword argument
						arg = argv[cursor];
						for (k = 0; k < match[2].length; k++) {
							if (!arg.hasOwnProperty(match[2][k])) {
								throw(sprintf('[sprintf] property "%s" does not exist', match[2][k]));
							}
							arg = arg[match[2][k]];
						}
					}
					else if (match[1]) { // positional argument (explicit)
						arg = argv[match[1]];
					}
					else { // positional argument (implicit)
						arg = argv[cursor++];
					}

					if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
						throw(sprintf('[sprintf] expecting number but found %s', get_type(arg)));
					}
					switch (match[8]) {
						case 'b': arg = arg.toString(2); break;
						case 'c': arg = String.fromCharCode(arg); break;
						case 'd': arg = parseInt(arg, 10); break;
						case 'e': arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential(); break;
						case 'f': arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg); break;
						case 'o': arg = arg.toString(8); break;
						case 's': arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg); break;
						case 'u': arg = Math.abs(arg); break;
						case 'x': arg = arg.toString(16); break;
						case 'X': arg = arg.toString(16).toUpperCase(); break;
					}
					arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+'+ arg : arg);
					pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
					pad_length = match[6] - String(arg).length;
					pad = match[6] ? str_repeat(pad_character, pad_length) : '';
					output.push(match[5] ? arg + pad : pad + arg);
				}
			}
			return output.join('');
		};

		str_format.cache = {};

		str_format.parse = function(fmt) {
			var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
			while (_fmt) {
				if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
					parse_tree.push(match[0]);
				}
				else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
					parse_tree.push('%');
				}
				else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
					if (match[2]) {
						arg_names |= 1;
						var field_list = [], replacement_field = match[2], field_match = [];
						if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
							field_list.push(field_match[1]);
							while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
								if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
									field_list.push(field_match[1]);
								}
								else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
									field_list.push(field_match[1]);
								}
								else {
									throw('[sprintf] huh?');
								}
							}
						}
						else {
							throw('[sprintf] huh?');
						}
						match[2] = field_list;
					}
					else {
						arg_names |= 2;
					}
					if (arg_names === 3) {
						throw('[sprintf] mixing positional and named placeholders is not (yet) supported');
					}
					parse_tree.push(match);
				}
				else {
					throw('[sprintf] huh?');
				}
				_fmt = _fmt.substring(match[0].length);
			}
			return parse_tree;
		};

		return str_format;
	})();

	var vsprintf = function(fmt, argv) {
		argv.unshift(fmt);
		return sprintf.apply(null, argv);
	};

	var _getParameterDefinitions = function(param) {         // used for openjscad CLI only
	   if(typeof getParameterDefinitions!=='undefined') {
	      var p = {};
	      var pa = getParameterDefinitions();
	      for(var a in pa) {               // defaults, given by getParameterDefinitions()
	         p[pa[a].name] = pa[a].default||pa[a].initial;
	         //echo("default=",pa[a].name,p[pa[a].name]);
	      }
	      for(var a in param) {            // given by command-line
	         p[a] = param[a];
	         //echo("cli=",a,p[a]);
	      }
	      if(0) {
	         for(var a in p) {
	            echo("param=",a,p[a]);
	         }
	      }
	      return p;
	   } else 
	      return param;
	}

	// -------------------------------------------------------------------------------------------------

	if(true) {    // we are used as module in nodejs require()
	   //var CSG = require(global.lib+'./csg.js').CSG;
	   var CSG = __webpack_require__(199).CSG;
	   var CAG = __webpack_require__(199).CAG;
	   //console.log("lib="+global.lib);
	   module.exports = { 
	      // -- list all functions we export
	      parseSTL: function(stl,fn) { return parseSTL(stl,fn); },
	      parseAMF: function(amf,fn) { return parseAMF(amf,fn); },
	      cube: cube,
	      cylinder: cylinder,
			torus: torus,
	      sphere: sphere,
	      group: group,
	      union: union,
	      center: center,
	      translate: translate,
	      scale: scale,
	      rotate: rotate,
	      torus: torus,     	
	      rotate_extrude: rotate_extrude,
	      linear_extrude: linear_extrude,
	      square: square,
	      circle: circle,
	      difference: difference,
	      color: color,
	      rectangular_extrude: rectangular_extrude,
	      vector_text: vector_text,
	      CSG: CSG,
	      CAG: CAG
	   };
	   //me = 'cli';
	}




/***/ },

/***/ 67:
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(203)

	module.exports = function(craft) {

	    craft.define1 = function(name, defineFunction) {
	        var model = new Model()
	        model.name = name
	        defineFunction(model)
	        return part
	    }

	    // an array that holds the paths to model definition files
	    // it is populated by 'use()'
	    craft.models = {}

	    craft.model = {}

	    craft.model.require = function model(name) {
	        if (name in craft.models) {
	            var model = craft.models[name]
	            return model
	        }
	        return undefined
	    }

	    craft.model.define = function define(factoryFunc) {
	        if (1 == arguments.length) {
	            var m = new Model('')
	            m.factory(factoryFunc)
	            return m;
	        } else {
	            return new Model()
	        }
	    }


	    var $$$ = craft.scad

	    // 
	    // Model
	    //

	    function Model() {
	        this.parameters = []
	        this.examples = []
	        this.spaces = {}

	        this.Example = function Example(attrs) {
	            this.attrs = attrs;
	            return this;
	        }
	    }

	    Model.prototype.author = function(str) {
	        this.author = str;
	        return this;
	    }

	    Model.prototype.name = function(str) {
	        this.name = str;
	        return this;
	    }

	    Model.prototype.version = function(str) {
	        if (0 == arguments.length) return this._version;
	        this.version = str;
	        return this;
	    }

	    Model.prototype.hasParameter = function(name){
	        return _.any(this.parameters, function(d){
	            return d.name === name
	        })
	    }

	    Model.prototype.parameter = function(name) {
	        this.Example.prototype[name] = function(v) {
	            this.attrs[name] = v;
	            return this;
	        }

	        var param = {
	            name: name,            
	        }
	        this.parameters.push(param);            
	        return new Parameter(param);
	    }

	    Model.prototype.example = function(description) {
	        var attrs = {
	            description: description
	        };
	        attrs.parameters = {};
	        this.examples.push(attrs);
	        return new this.Example(attrs.parameters);
	    }

	    Model.prototype.space = function(name, f) {
	        this.spaces[name] = f
	    }

	    Model.prototype.factory = function(f) {
	        this._factory = f;
	        return this;
	    }

	    Model.prototype._resolveParameters = function(customParameters) {
	        var params = {}
	        this.parameters.forEach(function(p) {
	            var name = p.name;
	            var type = p.type;
	            if (customParameters[name] !== undefined) {

	                var v = customParameters[name]

	                // automatic convert to the right type
	                // note: the type is inferred from the defaultValue
	                if (type === 'number'){
	                    v = Number(v)                    
	                } else if (type === 'string'){
	                    v = String(v)
	                }

	                params[name] = v
	                
	            } else {

	                params[name] = p.defaultValue;
	            }
	        })
	        return params;
	    }

	    Model.prototype.generate = function(customParameters) {
	        var customParameters = customParameters || {};
	        var params = this._resolveParameters(customParameters)
	        var csg = this._factory(craft.scad, params);

	        // 
	        // Create Spaces
	        //

	        csg.properties.spaces = new $$$.CSG.Properties()

	        // calculate the default top and base spaces
	        // based on the bounding box
	        var b = csg.getBounds()
	        var w = b[1].x - b[0].x
	        var h = b[1].y - b[0].y
	        var top = $$$.cube().scale([w, h, 1]).translate([b[0].x, b[0].y, b[1].z])
	        var base = $$$.cube().scale([w, h, 1]).translate([b[0].x, b[0].y, b[0].z - 1])

	        csg.properties.spaces['top'] = top
	        csg.properties.spaces['base'] = base


	        // add custom defined spaces
	        for (var name in this.spaces) {
	            var f = this.spaces[name]
	            var cag = f($$$, params)
	            csg.properties.spaces[name] = cag
	        }

	        return csg
	    }

	    Model.prototype.generateExamples = function() {

	        var examples = []
	        var self = this

	        this.examples.forEach(function(example, i) {

	            var params = self._resolveParameters(example.parameters)

	            var csg = self.generate(params);
	            var stl = csg.toStlString();

	            // create a csg by taking the union of all space csgs
	            var spaces_csg = $$$.union(_.values(csg.properties.spaces))
	            var spaces_stl = spaces_csg.toStlString()

	            examples.push({
	                description: example.description,
	                parameters: example.parameters,
	                stl: stl,
	                markers: spaces_stl
	            });

	            console.log("example " + (i + 1) + " generated");
	        });

	        return examples;
	    }


	    function Parameter(attrs) {
	        this._attrs = attrs;
	    }

	    Parameter.prototype.defaultValue = function(v) {
	        if (0 == arguments.length) return this._attrs.defaultValue;
	        this._attrs.defaultValue = v;
	        this._attrs.type = typeof(v);
	        return this;
	    }

	    // 
	    // Pack
	    //

	    craft.pack = function() {
	        return new Pack();
	    }

	    function Pack() {}

	    Pack.prototype.name = function(str) {
	        this.name = str;
	        return this;
	    }

	    Pack.prototype.add = function(model) {
	        craft.models[model.name] = model
	        return this;
	    }

	    Pack.prototype.addFolder = function(folder) {

	        // var glob = require('glob');
	        var path = __webpack_require__(202);

	        glob.glob(folder + '/*.js', {
	            sync: true
	        }).forEach(function(file) {

	            // console.log(file)
	            // file <-- github/craftjs/lib/Model./canvas.js

	            // name <-- canvas
	            var name = path.basename(file, '.js');

	            // this.modelNames.push(name)

	            craft.models[name] = file

	        });
	        return this;
	    }
	}

/***/ },

/***/ 68:
/***/ function(module, exports, __webpack_require__) {

	var css = __webpack_require__(201);

	var parser = module.exports = {}

	parser.parse = function(xmlstring) {
	    // TODO: use jsdom to make this work in headless mode too
	    var dom = $.parseHTML(xmlstring)

	    // wrap each text node in 'p' with <text></text>
	    // TODO: consider supporting this in other html tags (i.e., div, h1)
	    $(dom).find('p').contents()
	        .filter(function() {
	            return this.nodeType === 3
	        }).wrap('<text></text>')

	    process_style(dom)

	    var root = $(dom)[0]
	    var ret = dom2craftdom(root)

	    // console.debug(JSON.stringify(ret, null, ' '))
	    return ret
	}

	function dom2craftdom(dom_node) {
	    var name, style, attributes, children

	    //
	    // name
	    //    
	    name = dom_node.nodeName

	    // e.g., PIN --> pin
	    name = name.toLowerCase()

	    // e.g., #text --> text
	    name = name.replace('#', '')

	    //
	    // attributes        
	    //
	    attributes = {}

	    // copy attributes from dom_node
	    _.forEach(dom_node.attributes, function(att){
	        attributes[att.nodeName] = att.value
	    })

	    // delete attributes.style
	    delete attributes.style

	    // attributes.text    
	    if ($(dom_node).children().length == 0) {
	        var text = $(dom_node).text().trim()
	            // if text is not empty
	        if (text.length > 0) {
	            // add text as an attribute
	            attributes.text = $(dom_node).text().trim()
	        }
	    }

	    //
	    // style
	    //
	    style = dom_node.custom_style || {}

	    //
	    // children
	    //   
	    children = _.map(dom_node.children, function(c) {
	        return dom2craftdom(c);
	    })

	    return {
	        name: name,
	        attributes: attributes,
	        style: style,
	        children: children
	    }
	}

	function process_style(dom) {
	    // TODO: read this off from config data
	    var default_css = '* {padding: 0;}\n board {display: block; padding: 2;}\n p {display: block;} div {display: block;} h1 {display: block;}';
	    default_css += 'text {font-size: 8;}'
	    default_css += 'h1 {display: block; font-size: 16;}'
	    default_css += 'h2 {display: block; font-size: 14;}'
	    default_css += 'h3 {display: block; font-size: 12;}'
	    default_css += 'h4 {display: block; font-size: 10;}'
	    default_css += 'h5 {display: block; font-size: 8;}'

	    var csstext = $(dom).find("style").text()
	    $(dom).find("style").remove()

	    var cssdom = css.parse(default_css + csstext)
	        // console.log(cssdom)

	    function apply_css_rule_to_element(rule, el) {
	        rule.declarations.forEach(function(declaration) {
	            var prop = declaration.property
	            var val = declaration.value
	                // console.log(prop, '=>', val)
	            if (prop === 'padding') {
	                // TODO: conversion for all properties, not just padding
	                val = Number(val)
	            }

	            // convert the css property name to a valid js property name
	            // e.g., font-size --> font_size 
	            prop = prop.replace('-', '_')

	            el.custom_style[prop] = val
	        })
	    }

	    // add a custom style property to each node
	    $(dom).find("*").addBack().each(function() {
	        // note: addBack() add 'dom' to the set of found elements so we 
	        // can get a list of all elements including 'dom' itself
	        this.custom_style = {}
	    })

	    // for each css rule
	    cssdom.stylesheet.rules.forEach(function(rule) {
	        // for each rule's selector
	        rule.selectors.forEach(function(selector) {

	            // apply the rule to 

	            // matched root node
	            $(dom).filter(selector).each(function(i, el) {
	                apply_css_rule_to_element(rule, el)
	            })

	            // matched descendents
	            $(dom).find(selector).each(function(i, el) {
	                apply_css_rule_to_element(rule, el)
	            })
	        })
	    })
	}

/***/ },

/***/ 69:
/***/ function(module, exports, __webpack_require__) {

	var craft = __webpack_require__(200)
	var _ = __webpack_require__(203)
	var $$$ = craft.scad

	var builder = module.exports = {}

	builder.build = function(craftdom) {
	    construct(craftdom)

	    // TODO: put compact, flatten into collect_csgs function
	    // strange behavior of _.flatten (need 'true' flag to go deep)
	    var csgs = _.compact(_.flatten(collect_csgs(craftdom),true))

	    // TODO: uncomment this to see just one csg, make this an option
	    // craftdom.csgs = [$$$.union(csgs)]
	    craftdom.csgs = csgs

	    // TODO: allow customizable, per-component color
	    var colors = ['blue', 'orange', 'yellow', 'green', 'fuchsia', 'red']
	    csgs.forEach(function(csg, index) {
	        csg.color = colors[index % 6]
	    })
	}

	function collect_csgs(node) {
	    var csgs = node.children.map(function(c) {
	        return collect_csgs(c)
	    });

	    if (!node.virtual){
	        return [node.csg].concat(csgs)
	    }else{
	        return csgs
	    }
	}

	function relative_layout(container, content) {

	    var padding = container.style.padding

	    // x,y for relative positioning
	    var tx = 0 + padding
	    var ty = 0 + padding

	    // keep track of the height of the current row
	    // which is the maximum height of the child csgs in the row
	    var line_height = 0

	    content.forEach(function(child) {

	        var isExceedingWidth = function() {
	            return 'width' in container.layout && (tx + child.layout.width > container.layout.width)
	        }

	        if (child.layout.newline || isExceedingWidth()) {

	            // if so, change to the next line
	            ty = ty + line_height
	            tx = padding
	            line_height = 0
	        }

	        // set the calculated x, y
	        child.layout.x = tx
	        child.layout.y = ty

	        line_height = Math.max(line_height, child.layout.height)

	        // update tx for the next child
	        tx = tx + child.layout.width
	    });
	}

	function resolve_relative_attributes(attr, parent_attr) {
	    for (key in attr) {
	        var val = attr[key]

	        // will match 20%width 25%head_radius 20% 
	        var ms = val.match(/%([a-zA-Z0-9_]*)$/)
	        if (ms) {

	            if (ms[1] === '') {
	                // e.g.,
	                // width="20%"
	                // 20%width
	                parent_attr_name = key
	            } else {
	                // e.g.,
	                // width="20%radius"
	                parent_attr_name = ms[1]
	            }

	            var percentage = parseFloat(val) / 100.0;

	            attr[key] = percentage * parent_attr[parent_attr_name]

	            //console.log(val + ' is resolved to ' + attr[key])
	        }
	    }
	}

	function parseAsParameter(node, parent) {
	    var vs = []
	    node.children.forEach(function(c) {
	        if (c.name.toLowerCase() === 'number')
	            vs.push(Number(c.attributes.text))
	        else
	            vs.push(c.attributes.text)
	    })

	    var obj = {}
	    obj[node.name] = vs
	    return obj
	}

	function display(node) {
	    console.group()
	    console.log("[" + node.name + "]")
	    console.log("attributes: " + JSON.stringify(node.attributes))
	    // console.log("style: " + JSON.stringify(node.style.borderColor))

	    console.log("style: ", JSON.stringify(node.style)) //_.pick(node.style, ['display', 'padding', 'borderColor']))

	    console.log("layout: " + JSON.stringify(node.layout))
	    _.forEach(node.children, function(child) {
	        display(child)
	    })
	    console.groupEnd()
	}

	function perform_layout_csg_operations(container, child) {

	    function transform_recursively(node, matrix) {
	        if (node.csg) {
	            node.csg = node.csg.transform(matrix)
	        }
	        node.children.forEach(function(c) {
	            transform_recursively(c, matrix)
	        })
	    }

	    function compute_transformation_matrix(csg1, name1, csg2, name2, xoffset, yoffset) {
	        var p1 = csg1.properties.spaces[name1].properties.cube.corners[0]
	        var p2 = csg2.properties.spaces[name2].properties.cube.corners[4]

	        p2 = p2.translate([dx, -dy])

	        var c1 = new $$$.CSG.Connector(p1, [0, 0, -1], [1, 0, 0]);
	        var c2 = new $$$.CSG.Connector(p2, [0, 0, 1], [1, 0, 0]);

	        return c1.getTransformationTo(c2, true, 0);
	    }

	    var dx = child.layout.x
	    var dy = child.layout.y

	    var matrix = compute_transformation_matrix(child.csg, 'base', container.csg, 'top', dx, -dy)
	    transform_recursively(child, matrix)

	}

	function construct(node, parent) {

	    // console.group()
	    console.log("constructing [" + node.name + "]")

	    // console.log(node.a('width'))
	    // var name = node.name;
	    var name = node.name

	    if (parent !== undefined) {
	        resolve_relative_attributes(node.attributes, parent.attributes)
	    }

	    if (node.val) {
	        node.attr.text = node.val.trim()
	    }
	    var model = craft.model.require(name)

	    // split children notes into two groups: parameters and models
	    var children_groups = _.groupBy(node.children, function(child) {
	        if (model !== undefined && model.hasParameter(child.name))
	            return 'parameters'
	        else
	            return 'models'
	    })

	    var children = {}
	    children.parameters = children_groups.parameters || []
	    children.models = children_groups.models || []

	    // process children who are parameters        
	    children.parameters.forEach(function(child) {
	        var param = parseAsParameter(child, node)
	        _.merge(node.attributes, param)
	    })

	    //
	    // construct children csgs recursively
	    //
	    children.models.forEach(function(child) {
	        // console.log(child.nodeName)
	        construct(child, node)
	    })

	    // console.log("width", node.attr('width'))
	    node.layout = {}
	    if ('width' in node.attributes) {
	        node.layout.width = node.attributes.width
	    }

	    if ('height' in node.attributes) {
	        node.layout.height = node.attributes.height
	    }

	    if (node.style.display === 'block') {
	        node.layout.newline = true
	    }

	    //
	    // layout children model
	    //
	    relative_layout(node, children.models)

	    // if the node has children models
	    // compute content bounds
	    if (children.models.length > 0) {
	        // compute x, y ranges of the children models
	        var xrange = {}
	        var yrange = {}
	        xrange.min = _.min(children.models.map(function(c) {
	            return c.layout.x
	        }))
	        xrange.max = _.max(children.models.map(function(c) {
	            return c.layout.x + c.layout.width
	        }))

	        yrange.min = _.min(children.models.map(function(c) {
	            return c.layout.y
	        }))
	        yrange.max = _.max(children.models.map(function(c) {
	            return c.layout.y + c.layout.height
	        }))

	        // console.log(xrange, yrange)

	        var content_height = yrange.max - yrange.min
	        var content_width = xrange.max - xrange.min

	        var padding = node.style.padding

	        // set width, height (if not already specified)
	        node.layout.width = node.layout.width || content_width + 2 * padding
	        node.layout.height = node.layout.height || content_height + 2 * padding
	    }


	    var params = {}
	    _.merge(params, node.style)
	    _.merge(params, node.attributes)
	    if (node.layout.width)
	        params.width = node.layout.width
	    if (node.layout.height)
	        params.height = node.layout.height

	    // generate a container csg for this node
	    var model
	    var container_csg

	    name = name.toLowerCase()
	    var allowabled_html_tags = ['p','div','h1','h2']
	    var text_html_tags = ['h1','h2','h3','h4','h5']
	    if (_.contains(text_html_tags, name)){
	        model = craft.model.require('text')
	    }
	    else if (_.contains(allowabled_html_tags, name) || name === 'craft') {
	        // TODO: define the list of virtual container names somewhere else
	        // create a virtual container
	        model = craft.model.require('placeholder')    
	        node.virtual = true
	    } else {
	        model = craft.model.require(name)
	        if (model === undefined)
	            throw "unable to find model '" + name + "'"
	    }

	    // console.log("generating a [" + model.name + "] with params: ", params)        
	    node.csg = model.generate(params)
	    
	    // for each child, perform the csg operations necessary to position it
	    // to the right location relative to the container csg
	    children.models.forEach(function(child) {
	        perform_layout_csg_operations(node, child)
	    })

	    var cb = node.csg.getBounds()
	    node.layout.width = node.layout.width || cb[1].x - cb[0].x
	    node.layout.height = node.layout.height || cb[1].y - cb[0].y
	    node.layout.depth = node.layout.depth || cb[1].z - cb[0].z
	    node.layout.zmin = cb[0].z
	    node.layout.zmax = cb[1].z

	    // console.groupEnd()
	}

/***/ },

/***/ 71:
/***/ function(module, exports, __webpack_require__) {

	var model = module.exports = __webpack_require__(200).model.define()

	model.name('board')
	    .author('doubleshow')
	    .version('1.0.0')

	//
	// Parameters
	//

	model.parameter('width')
	    .defaultValue(30)

	model.parameter('height')
	    .defaultValue(30)

	model.parameter('depth')
	    .defaultValue(1)

	//
	// Examples
	//

	model.example('default board')

	model.example('a bigger board')
	    .height(50)
	    .width(50)

	//
	// Factory
	//

	model.factory(function($$$, params) {   
	    var width = params.width
	    var height = params.height
	    var depth = params.depth

	    var c = $$$.cube({
	        center: true
	    })
	    c = c.setColor([0.8, 0.8, 0])
	    c = c.scale([width, height, depth])
	    return c
	})

/***/ },

/***/ 72:
/***/ function(module, exports, __webpack_require__) {

	var model = module.exports = __webpack_require__(200).model.define()

	model.name('placeholder')
	    .author('doubleshow')
	    .version('1.0.0')

	//
	// Parameters
	//

	model.parameter('width')
	    .defaultValue(30)

	model.parameter('height')
	    .defaultValue(30)

	model.parameter('depth')
	    .defaultValue(1)

	// 
	// Spaces
	//

	model.space('top', function($$$, params){
	    return $$$.cube({center:true})
	        .scale([params.width,params.height,1])
	        .translate([0,0,-0.5])
	})

	model.space('base', function($$$, params){
	    return $$$.cube({center:true})
	        .scale([params.width,params.height,1])
	        .translate([0,0,-params.depth-0.5])
	})

	//
	// Examples
	//

	model.example('default placeholder')

	//
	// Factory
	//

	model.factory(function($$$, params) {   
	    var width = params.width
	    var height = params.height
	    var depth = params.depth

	    var c = $$$.cube({
	        center: true
	    })
	    c = c.scale([width, height, depth])
	    return c
	})

/***/ },

/***/ 73:
/***/ function(module, exports, __webpack_require__) {

	var model = module.exports = __webpack_require__(200).model.define()

	model.name('chair1')
	    .author('caleb')
	    .version('1.0.0')

	//
	// Parameters
	// 

	model.parameter('size')
	    .defaultValue(1)

	model.parameter('seat_length')
	    .defaultValue(15)

	model.parameter('leg_length')
	    .defaultValue(14)


	//
	// Examples
	// 

	model.example('default chair')


	model.example('a long chair')
	    .seat_length(25)

	model.example('a tall chair')
	    .leg_length(25)

	model.example('a short, long chair')
	    .seat_length(30)
	    .leg_length(5) 


	// 
	// Factory
	//
	 
	model.factory(function($$$, params) {    
	    var size = params.size;
	    var leg_length = params.leg_length;
	    var seat_length = params.seat_length;

	    return seat().scale(size);

	// chair components
	function seat() {
	    var c, d;

	    // seat base
	    c = $$$.cube({size:[seat_length,15,1]}).translate([0,0,14]);

	    // seat back
	    var back_main = $$$.cube({size:[1,15,7.5]});
	    var back_dome = $$$.cylinder({r:6.5, h:1});
	    var back_support_l = $$$.cube({size:[2,2,16]});
	    var back_support_r = $$$.cube({size:[2,2,16]});
	    
	    // legs
	    var leg = $$$.cube({size:[2,2,leg_length]});
	    var leg_support = $$$.cube({size:[seat_length-1,1.5,1.5]});
	    
	    // seat back transformations
	    back_main = back_main.translate([0.2,0,10]);
	    back_dome = $$$.rotate([0,90,0], back_dome).translate([0.2,7.5,18.5]);
	    back_support_l = back_support_l.translate([0,0,7]);
	    back_support_r = back_support_r.translate([0,13,7]);
	   
	    d = $$$.union(back_main, back_dome, back_support_l, back_support_r);
	    d = d.translate([0,0,8]);
	    d = $$$.union(c,d);
	    
	    // leg transformations
	    var leg_fl = leg.translate([seat_length-2,0,14-leg_length]);
	    var leg_fr = leg.translate([seat_length-2,13,14-leg_length]);
	    var leg_bl = leg.translate([0,0,14-leg_length]);
	    var leg_br = leg.translate([0,13,14-leg_length]);
	    
	    var leg_support_l = leg_support.translate([1,0,17-leg_length]);
	    var leg_support_r = leg_support.translate([1,13.5,17-leg_length]);
	    
	    return $$$.union(d, leg_fl, leg_fr, leg_bl, leg_br, leg_support_l, leg_support_r);
	}
	})


/***/ },

/***/ 74:
/***/ function(module, exports, __webpack_require__) {

	var model = module.exports = __webpack_require__(200).model.define()

	model.name('cube')
		.author('caleb')
		.version('1.0.0')

	//
	// Parameters
	//

	model.parameter('width')
		.defaultValue(10)
		
	model.parameter('height')
		.defaultValue(10)
		
	model.parameter('depth')
		.defaultValue(10)
		
	model.parameter('rounded')
		.defaultValue(false)

	//
	// Examples
	//

	model.example('default cube')

	model.example('rounded cube')
		.rounded(true)
		
	//
	// Factory
	//

	model.factory(function($$$, params) {
		var width = params.width;
		var height = params.height;
		var depth = params.depth;
		var rounded = params.rounded;

		var c = $$$.cube({
	        center: true,
	        round: rounded
	    })

		c = c.scale([width, depth, height])
		return c
	})


/***/ },

/***/ 75:
/***/ function(module, exports, __webpack_require__) {

	var model = module.exports = __webpack_require__(200).model.define()

	model.name('pin')
	    .author('doubleshow')
	    .version('1.0.0')

	//
	// Parameters
	//

	model.parameter('depth')
	    .defaultValue(5)

	model.parameter('head_radius')
	    .defaultValue(2)

	model.parameter('head_depth')
	    .defaultValue(1)

	//
	// Examples
	//

	model.example('default pin')

	model.example('a tall pin')
	    .depth(10);

	model.example('a pin with a wider head')
	    .head_radius(5);

	model.example('a tall pin with a wider/thicker head')
	    .depth(5)
	    .head_radius(5)
	    .head_depth(3)

	// 
	// Spaces
	//

	// model.space('base', function($$$, params) {
	//     return $$$.cube({
	//             center: true
	//         })
	//         .scale([2, 2, 1])
	//         .translate([0, 0, -0.5])
	// })

	//
	// Factory
	//

	model.factory(function($$$, params) {
	    var depth = params.depth
	    var head_radius = params.head_radius;
	    var head_depth = params.head_depth;

	    // needle
	    var needle = $$$.cylinder({
	        r: 1,
	        h: depth,
	        center: [true, true, false]
	    });

	    // head
	    var head = $$$.cylinder({
	        r: head_radius,
	        h: head_depth,
	        center: [true, true, false]
	    });
	    head = head.translate([0, 0, depth]);
	    return $$$.union(head, needle);
	})

/***/ },

/***/ 76:
/***/ function(module, exports, __webpack_require__) {

	var model = module.exports = __webpack_require__(200).model.define()

	model.name('cross')
	    .author('doubleshow')
	    .version('1.0.0')

	//
	// Parameters
	//

	model.parameter('size')
	    .defaultValue(3)

	model.parameter('depth')
	    .defaultValue(1)

	//
	// Examples
	//

	model.example('default cross')

	model.example('a bigger cross')
	    .size(10)

	model.example('a ticker and bigger cross')
	    .size(30)
	    .depth(5)

	//
	// Factory
	//

	model.factory(function($$$, params) {
	    var size = params.size;
	    var depth = params.depth;

	    var c = $$$.cube();
	    c = c.scale([1, size, depth]).center([true, true, false]);
	    c = $$$.union(c, c.rotateZ(90));
	    return c;
	})

/***/ },

/***/ 77:
/***/ function(module, exports, __webpack_require__) {

	var model = module.exports = __webpack_require__(200).model.define()
	var board = __webpack_require__(200).model.require('board')

	model.name('desk')
	    .author('doubleshow')
	    .version('1.0.0')

	//
	// Parameters
	//

	model.parameter('width')
	    .defaultValue(20)

	model.parameter('height')
	    .defaultValue(10)

	model.parameter('depth')
	    .defaultValue(3)

	model.parameter('support_type')
	    .defaultValue('four-legs')

	model.parameter('support_padding')
	    .defaultValue(1)

	model.parameter('support_thickness')
	    .defaultValue(1)

	//
	// Examples
	//

	model.example('default table')

	model.example('wider table')
	    .width(40)
	    .height(20)

	model.example('bigger, taller table, flushed to corners')
	    .width(30)
	    .height(30)
	    .depth(10)
	    .support_padding(0);

	model.example('table supported by two walls')
	    .support_type('two-walls')
	    .support_padding(3)
	    .depth(10)

	model.example('table supported by four walls')
	    .support_type('four-walls')
	    .depth(5)

	// 
	// Spaces
	//

	// model.space('base', function($$$, params){
	//     return $$$.cube({center:true})
	//         .scale([params.width-params.support_padding*2,params.height-params.support_padding*2,1])
	//         .translate([0,0,-params.depth-0.5])
	// })

	//
	// Factory
	//

	model.factory(function($$$, params) {

	    var width = params.width;
	    var height = params.height;
	    var depth = params.depth;
	    var sp = params.support_padding;
	    var st = params.support_thickness;
	    var support_type = params.support_type;

	    var c = board.generate({
	        width: width,
	        height: height
	    });
	    c = $$$.color([0.6, 0.6, 0, 0.5], c)

	    var ps = []; // holds an array of support models

	    if (support_type == 'two-walls' || support_type == 'four-walls') {
	        var wall = $$$.color('brown', $$$.cube({
	            center: [true, true, false]
	        }));

	        ps.push(wall.scale([st, height - sp * 2, depth]).translate([-(width - sp * 2 - st) / 2, 0, -depth]));
	        ps.push(wall.scale([st, height - sp * 2, depth]).translate([(width - sp * 2 - st) / 2, 0, -depth]));

	        if (support_type == 'four-walls') {

	            ps.push(wall.scale([width - sp * 2, st, depth]).translate([0, -(height - sp * 2 - st) / 2, -depth]));
	            ps.push(wall.scale([width - sp * 2, st, depth]).translate([0, (height - sp * 2 - st) / 2, -depth]));
	        }

	        ps.push(c);
	        return $$$.union(ps);

	    } else {
	        var leg = $$$.color('brown', $$$.cube({
	            center: [true, true, false]
	        }).scale([st, st, depth]));

	        var w = width - st - sp * 2;
	        var h = height - st - sp * 2;

	        var leg1 = leg.translate([-w / 2, -h / 2, -depth])
	        var leg2 = leg.translate([w / 2, -h / 2, -depth])
	        var leg3 = leg.translate([-w / 2, h / 2, -depth])
	        var leg4 = leg.translate([w / 2, h / 2, -depth])
	        return $$$.union(c, leg1, leg2, leg3, leg4);
	    }
	})

/***/ },

/***/ 78:
/***/ function(module, exports, __webpack_require__) {

	var model = module.exports = __webpack_require__(200).model.define()

	model.name('text')
		.author('doubleshow')
	    .version('1.0.0');

	//
	// Parameters
	//

	model.parameter('font_size')
	    .defaultValue(10);

	model.parameter('text')
	    .defaultValue('');

	//
	// Examples
	//

	model.example('hello')
		.text('hello');

	model.example('1234 (bigger)')
		.text('1234')
		.font_size(15);

	model.example('x y z (smaller)')
		.text('x y z')
		.font_size(5);

	//
	// Factory
	//

	model.factory(function($$$, params){	
		var size = params.font_size;
		var text = params.text;

		var l = $$$.vector_text(0,0,text);   // l contains a list of polylines to be drawn
		var o = [];
		l.forEach(function(pl) {                   // pl = polyline (not closed)
		   o.push($$$.rectangular_extrude(pl, {w: 2, h: 2}));   // extrude it to 3D
		});
		
		var scaleFactor = 0.25 * (size/10);
		var depthScaleFactor = 0.1;

		// var r = union(o).scale([scaleFactor,scaleFactor,depthScaleFactor]);	
		// speedup for now
		var r = $$$.group(o).scale([scaleFactor,scaleFactor,depthScaleFactor]);

		// compute ymax in order to set upper left to origin (0,0)
		// var b = r.getBounds();
		// var ymax = b[1].y;
		var ymax = 5.5;	// hard coded, the value is about the same
		
		return r.center(true);
	});

/***/ },

/***/ 79:
/***/ function(module, exports, __webpack_require__) {

	var model = module.exports = __webpack_require__(200).model.define()

	model.name('ring')
	    .author('doubleshow')
	    .version('1.0.0');

	//
	// Parameters
	//

	model.parameter('radius')
	    .defaultValue(5);

	model.parameter('depth')
	    .defaultValue(1);

	model.parameter('thickness')
	    .defaultValue(1);

	//
	// Examples
	//

	model.example('default ring');

	model.example('a bigger ring')
	    .radius(10);

	model.example('a ticker ring')
	    .thickness(3);

	model.example('a taller ring')
	    .depth(10);

	//
	// Factory
	//

	model.factory(function($$$, params) {
	    var radius = params.radius
	    var depth = params.depth
	    var thickness = params.thickness

	    var outter = $$$.cylinder({
	        r: radius,
	        h: depth,
	        center: [true, true, false]
	    });
	    var inner = $$$.cylinder({
	        r: radius - thickness,
	        h: depth,
	        center: [true, true, false]
	    });
	    var r = $$$.difference(outter, inner)
	    return r;
	});

/***/ },

/***/ 80:
/***/ function(module, exports, __webpack_require__) {

	var model = module.exports = __webpack_require__(200).model.define()

	model.name('flower')
	    .author('dragosh')
	    .version('1.0.0')

	//
	// Parameters
	//

	model.parameter('petal_length')
	    .defaultValue(2)

	model.parameter('center_radius')
	    .defaultValue(1)

	//
	// Examples
	//

	model.example('default flower')

	model.example('a bigger flower')
	    .center_radius(3)

	model.example('a ticker and bigger cross')
	    .center_radius(5)
	    .petal_length(5)

	//
	// Factory
	//

	model.factory(function($$$, params) {

	    //vars
	    var petal_length = params.petal_length;
	    if(petal_length < 0) petal_length = 2;

	    var center_radius = params.center_radius;
	    if(center_radius < 0) center_radius = 1;

	    var min = Math.ceil(4 * Math.PI * center_radius/petal_length);
	    var max = Math.floor(8 * Math.PI * center_radius/petal_length);
	    
	    var no_of_petals = params.number_of_petals || min;
	    if(no_of_petals < min || no_of_petals > max) no_of_petals = Math.round((min + max)/2);

	    //-----------------------

	    var c = $$$.difference($$$.sphere().scale([1,1,0.3]) , $$$.sphere().scale([1,1,0.3]).translate([0,0,0.4]));

	    c = c.scale(center_radius);

	    //one petal
	    var petal = $$$.sphere(0.25);

	    petal = $$$.difference(petal.translate([0,0,-0.1]) , $$$.cube(0.5).translate([-0.25,-0.25,-0.5])).scale([1,1,0.85]);

	    var matrix = $$$.rotate_extrude( $$$.translate([0.25,0,0], $$$.circle({r: 0.025, center: true}) ) ).rotateY(90);
	    matrix =  $$$.difference(matrix , $$$.union(matrix.scale(0.9).translate([0.02,0,0]),matrix.scale(0.9).translate([-0.02,0,0])));


	     var petal_begin = $$$.difference(petal, matrix.scale([3,1,1]).translate([0,0,-0.125]));

	    petal = $$$.union(petal_begin, $$$.difference($$$.difference(petal,matrix.scale([3,1.2,1]).translate([0,0,-0.125])).scale([1,3.5,1]),$$$.cube(2).center([false,true,false]).translate([-1,-1,0]))).scale([1,1,0.5]);

	    petal = petal.scale([petal_length,petal_length,petal_length]).rotateY(7);
	    
	    petal = petal.translate([0,center_radius  + 0.08 * petal_length,0]);
	    //-----------------------

	    for(var i = 0; i < no_of_petals; i++) c = $$$.group(c,petal.rotateZ(360/no_of_petals*i));

	    return c;
	});

/***/ },

/***/ 81:
/***/ function(module, exports, __webpack_require__) {

	var model = module.exports = __webpack_require__(200).model.define()

	model.name('cup')
	     .author('jeeeun')
	     .version('1.0.0');
						   
	//parameter
	model.parameter('radius')
	     .defaultValue(1.5);
	model.parameter('height')
		.defaultValue(10);


	//model viewer
	model.example('default cup');

	model.example('small cup')
		.radius(2);


	model.factory(function($$$, params) {

		var radius = params.radius;
		var height = params.height;

		var body = $$$.cylinder({r:2*radius, h:height, $fn:100, center:true});
		var holder = $$$.torus({r1:1*radius, ro:1.2*radius}).translate([2*radius,0,0]);
		holder = $$$.rotate([90,0,0],holder);
		body = $$$.union(body, holder);

		var hole = $$$.cylinder({r:1.8*radius, h:height, $fn:100, center:true}).translate([0,0,.3]);

		body = $$$.difference(body, hole);
		return body;
	});


/***/ },

/***/ 82:
/***/ function(module, exports, __webpack_require__) {

	var model = module.exports = __webpack_require__(200).model.define()

	model.name('braille')
	    .author('doubleshow')
	    .version('1.0.0')

	//
	// Parameters
	//

	model.parameter('text')
	    .defaultValue('')

	model.parameter('plate_thickness')
	    .defaultValue(0.3)

	model.parameter('plate_spacing')
	    .defaultValue(0.5)


	//
	// Examples
	//

	model.example('hello')
	    .text('hello')

	model.example('12345')
	    .text('12345')

	// 
	// Factory
	//

	var radius = 0.3;
	var spacing = 1.5;
	var distance = 3 + spacing;

	var plate_height = 10;

	model.factory(function($$$, params) {
	    var plate_thickness = params.plate_thickness
	    var plate_spacing = params.plate_spacing

	    var text = params.text;    
	    text = text.toUpperCase();
	    var csg = braille_str(text)//.center(true)

	    var b = csg.getBounds()
	    var h = 3 * spacing + 2 * plate_spacing
	    var w = b[1].x - b[0].x + 2 * plate_spacing

	    var plate = $$$.cube()
	        .scale([w,h,plate_thickness])
	        .translate([b[0].x - plate_spacing, plate_spacing,-plate_thickness])
	    return $$$.union(csg, plate).center(true)


	    // adapated from work by jaqtikkun
	    // http://www.thingiverse.com/jaqtikkun/about

	    // TODOS:
	    // - braille contractions

	    function braille_str(text) {
	        var csgs = new Array();

	        // tokens - this needs to be placed by code to compute contractions
	        var tokens = text;

	        for (var i = 0; i < tokens.length; i = i + 1) {
	            if (tokens[i] == ' ') {
	                // space, do nothing
	            } else {
	                var csg = braille_char(tokens[i]);
	                csg = csg.translate([i * distance, 0, 0]);
	                csg = $$$.color('black', csg);
	                csgs.push(csg);
	            }
	        }
	        return $$$.group(csgs);
	    }

	    function letter(bitmap) {
	        var row_size = 2;
	        var col_size = 3;
	        var bitmap_size = row_size * col_size;

	        function loc_y(loc) {
	            return (3 - Math.floor(loc / row_size)) * spacing;
	        }

	        function loc_x(loc) {
	            return loc % row_size * spacing + (distance - spacing) / 2;
	        }

	        var bits = new Array();
	        for (var loc = 0; loc < bitmap_size; loc = loc + 1) {
	            if (bitmap[loc] != 0) {
	                var bit = $$$.sphere({
	                        r: radius * bitmap[loc],
	                        center: true,
	                        fn: 10
	                    })
	                    .translate([loc_x(loc), loc_y(loc), 0]);
	                bits.push(bit);
	            }
	        }
	        return $$$.group(bits);
	    }

	    function braille_char(char) {
	        if (char == "A") {
	            return letter([
	                1, 0,
	                0, 0,
	                0, 0
	            ]);
	        } else if (char == "B") {
	            return letter([
	                1, 0,
	                1, 0,
	                0, 0
	            ]);
	        } else if (char == "C") {
	            return letter([
	                1, 1,
	                0, 0,
	                0, 0
	            ]);
	        } else if (char == "D") {
	            return letter([
	                1, 1,
	                0, 1,
	                0, 0
	            ]);
	        } else if (char == "E") {
	            return letter([
	                1, 0,
	                0, 1,
	                0, 0
	            ]);
	        } else if (char == "F") {
	            return letter([
	                1, 1,
	                1, 0,
	                0, 0
	            ]);
	        } else if (char == "G") {
	            return letter([
	                1, 1,
	                1, 1,
	                0, 0
	            ]);
	        } else if (char == "H") {
	            return letter([
	                1, 0,
	                1, 1,
	                0, 0
	            ]);
	        } else if (char == "I") {
	            return letter([
	                0, 1,
	                1, 0,
	                0, 0
	            ]);
	        } else if (char == "J") {
	            return letter([
	                0, 1,
	                1, 1,
	                0, 0
	            ]);
	        } else if (char == "K") {
	            return letter([
	                1, 0,
	                0, 0,
	                1, 0
	            ]);
	        } else if (char == "L") {
	            return letter([
	                1, 0,
	                1, 0,
	                1, 0
	            ]);
	        } else if (char == "M") {
	            return letter([
	                1, 1,
	                0, 0,
	                1, 0
	            ]);
	        } else if (char == "N") {
	            return letter([
	                1, 1,
	                0, 1,
	                1, 0
	            ]);
	        } else if (char == "O") {
	            return letter([
	                1, 0,
	                0, 1,
	                1, 0
	            ]);
	        } else if (char == "P") {
	            return letter([
	                1, 1,
	                1, 0,
	                1, 0
	            ]);
	        } else if (char == "Q") {
	            return letter([
	                1, 1,
	                1, 1,
	                1, 0
	            ]);
	        } else if (char == "R") {
	            return letter([
	                1, 0,
	                1, 1,
	                1, 0
	            ]);
	        } else if (char == "S") {
	            return letter([
	                0, 1,
	                1, 0,
	                1, 0
	            ]);
	        } else if (char == "T") {
	            return letter([
	                0, 1,
	                1, 1,
	                1, 0
	            ]);
	        } else if (char == "U") {
	            return letter([
	                1, 0,
	                0, 0,
	                1, 1
	            ]);
	        } else if (char == "V") {
	            return letter([
	                1, 0,
	                1, 0,
	                1, 1
	            ]);
	        } else if (char == "W") {
	            return letter([
	                0, 1,
	                1, 1,
	                0, 1
	            ]);
	        } else if (char == "X") {
	            return letter([
	                1, 1,
	                0, 0,
	                1, 1
	            ]);
	        } else if (char == "Y") {
	            return letter([
	                1, 1,
	                0, 1,
	                1, 1
	            ]);
	        } else if (char == "Z") {
	            return letter([
	                1, 0,
	                0, 1,
	                1, 1
	            ]);
	        } else if (char == "CH") {
	            return letter([
	                1, 0,
	                0, 0,
	                0, 1
	            ]);
	        } else if (char == "SH") {
	            return letter([
	                1, 1,
	                0, 0,
	                0, 1
	            ]);
	        } else if (char == "TH") {
	            return letter([
	                1, 1,
	                0, 1,
	                0, 1
	            ]);
	        } else if (char == "WH") {
	            return letter([
	                1, 0,
	                0, 1,
	                0, 1
	            ]);
	        } else if (char == "OU") {
	            return letter([
	                1, 0,
	                1, 1,
	                0, 1
	            ]);
	        } else if (char == "ST") {
	            return letter([
	                0, 1,
	                0, 0,
	                1, 0
	            ]);
	        } else if (char == "AND") {
	            return letter([
	                1, 1,
	                1, 0,
	                1, 1
	            ]);
	        } else if (char == "FOR") {
	            return letter([
	                1, 1,
	                1, 1,
	                1, 1
	            ]);
	        } else if (char == "OF") {
	            return letter([
	                1, 0,
	                1, 1,
	                1, 1
	            ]);
	        } else if (char == "THE") {
	            return letter([
	                0, 1,
	                1, 0,
	                1, 1
	            ]);
	        } else if (char == "WITH") {
	            return letter([
	                0, 1,
	                1, 1,
	                1, 1
	            ]);
	        } else if (char == "IN") {
	            return letter([
	                0, 0,
	                0, 1,
	                1, 0
	            ]);
	        } else if (char == "EN") {
	            return letter([
	                0, 0,
	                1, 0,
	                0, 1
	            ]);
	        } else if (char == "CON") {
	            return letter([
	                0, 0,
	                1, 1,
	                0, 0
	            ]);
	        } else if (char == "DIS") {
	            return letter([
	                0, 0,
	                1, 1,
	                0, 1
	            ]);
	        } else if (char == "COM") {
	            return letter([
	                0, 0,
	                0, 0,
	                1, 1
	            ]);
	        } else if (char == "BE") {
	            return letter([
	                0, 0,
	                1, 0,
	                1, 0
	            ]);
	        } else if (char == "EA") {
	            return letter([
	                0, 0,
	                1, 0,
	                0, 0
	            ]);
	        } else if (char == "BB") {
	            return letter([
	                0, 0,
	                1, 0,
	                1, 0
	            ]);
	        } else if (char == "CC") {
	            return letter([
	                0, 0,
	                1, 1,
	                0, 0
	            ]);
	        } else if (char == "DD") {
	            return letter([
	                0, 0,
	                1, 1,
	                0, 1
	            ]);
	        } else if (char == "FF") {
	            return letter([
	                0, 0,
	                1, 1,
	                1, 0
	            ]);
	        } else if (char == "GG") {
	            return letter([
	                0, 0,
	                1, 1,
	                1, 1
	            ]);
	        } else if (char == "AR") {
	            return letter([
	                0, 1,
	                0, 1,
	                1, 0
	            ]);
	        } else if (char == "BLE") {
	            return letter([
	                0, 1,
	                0, 1,
	                1, 1
	            ]);
	        } else if (char == "ED") {
	            return letter([
	                1, 1,
	                1, 0,
	                0, 1
	            ]);
	        } else if (char == "ER") {
	            return letter([
	                1, 1,
	                1, 1,
	                0, 1
	            ]);
	        } else if (char == "GH") {
	            return letter([
	                1, 0,
	                1, 0,
	                0, 1
	            ]);
	        } else if (char == "ING") {
	            return letter([
	                0, 1,
	                0, 0,
	                1, 1
	            ]);
	        } else if (char == "OW") {
	            return letter([
	                0, 1,
	                1, 0,
	                0, 1
	            ]);
	        } else if (char == "cap") {
	            return letter([
	                0, 0,
	                0, 0,
	                0, 1
	            ]);
	        } else if (char == "#") {
	            return letter([
	                0, 1,
	                0, 1,
	                1, 1
	            ]);
	        } else if (char == "let") {
	            return letter([
	                0, 0,
	                0, 1,
	                0, 1
	            ]);
	        } else if (char == ".") {
	            return letter([
	                0, 0,
	                1, 1,
	                0, 1
	            ]);
	        } else if (char == "?") {
	            return letter([
	                0, 0,
	                1, 0,
	                1, 1
	            ]);
	        } else if (char == "!") {
	            return letter([
	                0, 0,
	                1, 1,
	                1, 0
	            ]);
	        } else if (char == "-") {
	            return letter([
	                0, 0,
	                0, 0,
	                1, 1
	            ]);
	        } else if (char == "quote") {
	            return letter([
	                0, 0,
	                0, 1,
	                1, 1
	            ]);
	        } else if (char == "1") {
	            return letter([
	                1, 0,
	                0, 0,
	                0, 0
	            ]);
	        } else if (char == "2") {
	            return letter([
	                1, 0,
	                1, 0,
	                0, 0
	            ]);
	        } else if (char == "3") {
	            return letter([
	                1, 1,
	                0, 0,
	                0, 0
	            ]);
	        } else if (char == "4") {
	            return letter([
	                1, 1,
	                0, 1,
	                0, 0
	            ]);
	        } else if (char == "5") {
	            return letter([
	                1, 0,
	                0, 1,
	                0, 0
	            ]);
	        } else if (char == "6") {
	            return letter([
	                1, 1,
	                1, 0,
	                0, 0
	            ]);
	        } else if (char == "7") {
	            return letter([
	                1, 1,
	                1, 1,
	                0, 0
	            ]);
	        } else if (char == "8") {
	            return letter([
	                1, 0,
	                1, 1,
	                0, 0
	            ]);
	        } else if (char == "9") {
	            return letter([
	                0, 1,
	                1, 0,
	                0, 0
	            ]);
	        } else if (char == "0") {
	            return letter([
	                0, 1,
	                1, 1,
	                0, 0
	            ]);
	        } else if (char == " ") {
	            return letter([
	                0, 0,
	                0, 0,
	                0, 0
	            ]);
	        } else {
	            console.log("Invalid Character: ", char);
	        }

	    }
	})

/***/ },

/***/ 83:
/***/ function(module, exports, __webpack_require__) {

	var model = module.exports = __webpack_require__(200).model.define()
	var braille = __webpack_require__(200).model.require('braille')

	model.name('barchart')
	    .author('doubleshow')
	    .version('1.0.0')

	//
	// Parameters
	//

	model.parameter('values')
	    .defaultValue([1, 2, 3])

	model.parameter('height')
	    .defaultValue(20)

	model.parameter('bar_width')
	    .defaultValue(10)

	model.parameter('bar_depth')
	    .defaultValue(1)    

	model.parameter('bar_spacing')
	    .defaultValue(1)


	//
	// Examples
	//

	model.example('1 2 3 4 5')
	    .values([1, 2, 3, 4, 5])

	model.example('50 20 30')
	    .values([50,20,30])
	    .height(40)
	    .bar_spacing(5)
	    .bar_depth(3)

	model.example('123 234 345')
	    .values([123,234,345])
	    .bar_spacing(4)


	model.factory(function($$$, params) {    

	    var values = params.values

	    var height = params.height
	    var bar_width = params.bar_width
	    var bar_spacing = params.bar_spacing
	    var bar_depth = params.bar_depth

	    var max = Math.max.apply(Math, values)
	    var yscale = height / max

	    var bars = new Array();
	    values.forEach(function(d, i) {
	        var bar = $$$.cube()
	            .scale([bar_width, d * yscale, bar_depth])
	            .translate([i * (bar_width + bar_spacing), 0, 0])

	        var label = braille.generate({text:''+d})
	        	.translate([i*(bar_width+bar_spacing)+bar_width/2,5+d*yscale,0])

	        label = $$$.alignMinZ(label, bar)

	        bars.push(label)
	        bars.push(bar)
	    })

	    var c = $$$.group(bars)
	    return c.center(true)
	})

/***/ },

/***/ 84:
/***/ function(module, exports, __webpack_require__) {

	var model = module.exports = __webpack_require__(200).model.define()
	var braille = __webpack_require__(200).model.require('braille')

	model.name('piechart')
	    .author('doubleshow')
	    .version('1.0.0')

	//
	// Parameters
	//

	model.parameter('values')
	    .defaultValue([])

	model.parameter('labels')
	    .defaultValue([])

	model.parameter('radius')
	    .defaultValue(20)

	//
	// Examples
	//

	model.example('1 2 3 3')
	    .values([1, 2, 3, 3])
	    .labels(['a', 'b', 'c', 'd'])

	model.example('2 3 4')
	    .values([2, 3, 4])
	    .labels(['x', 'y', 'z'])
	    .radius(15)


	model.factory(function($$$, params) {

	    var values = params.values
	    var labels = params.labels
	    var radius = params.radius

	    var sum = values.reduce(function(a, b) {
	        return a + b;
	    });

	    var slices = new Array();
	    var start = 0;
	    var end = 0;

	    values.forEach(function(value, i) {


	        var perct = value / sum;

	        var da = 360 * value / sum;
	        end = start + da;

	        var arc = $$$.CSG.Path2D.arc({
	            center: [0, 0, 0],
	            radius: radius,
	            startangle: start + 2,
	            endangle: end - 2,
	            resolution: 16,
	        });
	        var p = arc.appendPoint([0, 0]).close();

	        var slice = p.innerToCAG().extrude({
	            offset: [0, 0, 2]
	        });
	        slices.push(slice);

	        var theta = Math.PI * ((start + end) / 2) / 180;

	        var r1 = radius / 2 + 3;
	        var r2 = radius + 5;

	        var percttext = Math.round(perct * 100);
	        var perctlabel = braille.generate({
	                text: "" + percttext
	            })
	            .center(true)
	            .rotateZ(-90)
	            .translate([r1 * Math.cos(theta), r1 * Math.sin(theta), 2]);
	        slices.push(perctlabel)


	        var label = labels[i]      
	        if (label) {
	            var namelabel = braille.generate({
	                    text: label
	                })
	                .center(true)
	                .rotateZ(-90)
	                .translate([r2 * Math.cos(theta), r2 * Math.sin(theta), 0]);
	            slices.push(namelabel);
	        }

	        start = end;
	    })

	    var c = $$$.group(slices);
	    return c
	})

/***/ },

/***/ 85:
/***/ function(module, exports, __webpack_require__) {

	var model = module.exports = __webpack_require__(200).model.define()

	model.name('grill')
	    .author('doubleshow')
	    .version('1.0.0')

	//
	// Parameters
	//

	model.parameter('height')
	    .defaultValue(15)

	model.parameter('width')
	    .defaultValue(30)

	model.parameter('depth')
	    .defaultValue(1)

	model.parameter('orientation')
	    .defaultValue('horizontal')

	model.parameter('bar_count')
	    .defaultValue(5)

	model.parameter('bar_width')
	    .defaultValue(1)

	//
	// Examples
	//

	model.example('default grill')

	model.example('a longer, denser grill')
	    .width(50)
	    .bar_count(40)
	    .bar_width(0.2)

	model.example('a vertical grill')
	    .width(50)
	    .height(50)
	    .orientation('vertical')

	//
	// Factory
	//

	model.factory(function($$$, params) {
	    var height = params.height
	    var width = params.width
	    var depth = params.depth
	    var orientation = params.orientation
	    var bar_count = params.bar_count
	    var bar_width = params.bar_width

	    var length = 0;
	    if (orientation == 'vertical'){
	        length = height;
	        var bar_length = width;
	    }else{
	        length = width;
	        var bar_length = height;
	    }

	    var gap_between_bars = 1.0 * (length - bar_width) / (bar_count - 1);

	    var models = new Array();

	    var bar = $$$.cube({
	        center: [false, false, false]
	    });
	    bar = bar.scale([bar_width, bar_length, 2]);

	    models.push(bar);
	    for (var i = 0; i < bar_count - 1; i = i + 1) {
	        bar = bar.translate([gap_between_bars, 0, 0]);
	        models.push(bar);
	    }

	    var bars = $$$.union(models).scale([1, 1, depth / 2]);

	    // center
	     bars = bars.translate([-length/2,-bar_length/2,0])

	    if (orientation == 'vertical'){        
	        bars = bars.rotateZ(90);
	    }
	    return bars;
	})

/***/ },

/***/ 86:
/***/ function(module, exports, __webpack_require__) {

	var model = module.exports = __webpack_require__(200).model.define()

	model.name('wave')
		.author('doubleshow')
	    .version('1.0.0');

	//
	// Parameters
	//

	model.parameter('height')
	    .defaultValue(10);

	model.parameter('width')
	    .defaultValue(20);

	model.parameter('count')
	    .defaultValue(6);    

	//
	// Examples
	//

	model.example('default wave')

	model.example('a longer, wider wave')
		.width(40)
		.height(15)
		.count(15)

	//
	// Factory
	//

	model.factory(function($$$, params){

		var height = params.height
		var width = params.width
		var count = params.count

		var c = $$$.cylinder({r:5, h:height});

		var cut = $$$.cube({});	
		cut = cut.scale([5*(count+1),10,height]).translate([0,-4,0]);

		var models = new Array();
		for (var i = 0; i < count; i = i + 1){
			c = c.translate([5,0,0]);
			models.push(c);
		}
		var r = $$$.difference($$$.union(models), cut);

		// fit the width
		var b = r.getBounds();
		var dx = b[1].x - b[0].x;
		r = r.scale([width/dx, 1, 1]);
		return r.center(true).rotateX(-90);
	})

/***/ },

/***/ 199:
/***/ function(module, exports, __webpack_require__) {

	/*
	## License

	Copyright (c) 2013 Eduard Bespalov (edwbes@gmail.com): .solidFromSlices()
	Copyright (c) 2013 Rene K. Mueller (http://OpenJSCAD.org): AMF export added, CSG.center([flag,flag,flag]);
	Copyright (c) 2012 Joost Nieuwenhuijse (joost@newhouse.nl)
	Copyright (c) 2012 Alexandre Girard (https://github.com/alx)
	Copyright (c) 2011 Evan Wallace (http://evanw.github.com/csg.js/) -- original csg.js

	All code released under MIT license

	## Overview

	For an overview of the CSG process see the original csg.js code:
	http://evanw.github.com/csg.js/

	CSG operations through BSP trees suffer from one problem: heavy fragmentation
	of polygons. If two CSG solids of n polygons are unified, the resulting solid may have
	in the order of n*n polygons, because each polygon is split by the planes of all other
	polygons. After a few operations the number of polygons explodes.

	This version of CSG.js solves the problem in 3 ways:

	1. Every polygon split is recorded in a tree (CSG.PolygonTreeNode). This is a separate
	tree, not to be confused with the CSG tree. If a polygon is split into two parts but in
	the end both fragments have not been discarded by the CSG operation, we can retrieve
	the original unsplit polygon from the tree, instead of the two fragments.

	This does not completely solve the issue though: if a polygon is split multiple times
	the number of fragments depends on the order of subsequent splits, and we might still
	end up with unncessary splits:
	Suppose a polygon is first split into A and B, and then into A1, B1, A2, B2. Suppose B2 is
	discarded. We will end up with 2 polygons: A and B1. Depending on the actual split boundaries
	we could still have joined A and B1 into one polygon. Therefore a second approach is used as well:

	2. After CSG operations all coplanar polygon fragments are joined by a retesselating
	operation. See CSG.reTesselated(). Retesselation is done through a
	linear sweep over the polygon surface. The sweep line passes over the y coordinates
	of all vertices in the polygon. Polygons are split at each sweep line, and the fragments
	are joined horizontally and vertically into larger polygons (making sure that we
	will end up with convex polygons).
	This still doesn't solve the problem completely: due to floating point imprecisions
	we may end up with small gaps between polygons, and polygons may not be exactly coplanar
	anymore, and as a result the retesselation algorithm may fail to join those polygons.
	Therefore:

	3. A canonicalization algorithm is implemented: it looks for vertices that have
	approximately the same coordinates (with a certain tolerance, say 1e-5) and replaces
	them with the same vertex. If polygons share a vertex they will actually point to the
	same CSG.Vertex instance. The same is done for polygon planes. See CSG.canonicalized().


	Performance improvements to the original CSG.js:

	Replaced the flip() and invert() methods by flipped() and inverted() which don't
	modify the source object. This allows to get rid of all clone() calls, so that
	multiple polygons can refer to the same CSG.Plane instance etc.

	The original union() used an extra invert(), clipTo(), invert() sequence just to remove the
	coplanar front faces from b; this is now combined in a single b.clipTo(a, true) call.

	Detection whether a polygon is in front or in back of a plane: for each polygon
	we are caching the coordinates of the bounding sphere. If the bounding sphere is
	in front or in back of the plane we don't have to check the individual vertices
	anymore.


	Other additions to the original CSG.js:

	CSG.Vector class has been renamed into CSG.Vector3D

	Classes for 3D lines, 2D vectors, 2D lines, and methods to find the intersection of
	a line and a plane etc.

	Transformations: CSG.transform(), CSG.translate(), CSG.rotate(), CSG.scale()

	Expanding or contracting a solid: CSG.expand() and CSG.contract(). Creates nice
	smooth corners.

	The vertex normal has been removed since it complicates retesselation. It's not needed
	for solid CAD anyway.

	*/

	(function(module){

	var _CSGDEBUG = false;

	function fnNumberSort(a, b) {
		return a - b;
	}

	// # class CSG
	// Holds a binary space partition tree representing a 3D solid. Two solids can
	// be combined using the `union()`, `subtract()`, and `intersect()` methods.
	var CSG = function() {
		this.polygons = [];
		this.properties = new CSG.Properties();
		this.isCanonicalized = true;
		this.isRetesselated = true;
	};

	CSG.defaultResolution2D = 32;
	CSG.defaultResolution3D = 12;

	// Construct a CSG solid from a list of `CSG.Polygon` instances.
	CSG.fromPolygons = function(polygons) {
		var csg = new CSG();
		csg.polygons = polygons;
		csg.isCanonicalized = false;
		csg.isRetesselated = false;
		return csg;
	};

	// Construct a CSG solid from generated slices.
	// Look at CSG.Polygon.prototype.solidFromSlices for details
	CSG.fromSlices = function(options) {
		return (new CSG.Polygon.createFromPoints([
				[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0]
		])).solidFromSlices(options);
	};

	// create from an untyped object with identical property names:
	CSG.fromObject = function(obj) {
		var polygons = obj.polygons.map(function(p) {
			return CSG.Polygon.fromObject(p);
		});
		var csg = CSG.fromPolygons(polygons);
		csg = csg.canonicalized();
		return csg;
	};

	// Reconstruct a CSG from the output of toCompactBinary()
	CSG.fromCompactBinary = function(bin) {
		if(bin['class'] != "CSG") throw new Error("Not a CSG");
		var planes = [],
			planeData = bin.planeData,
			numplanes = planeData.length / 4,
			arrayindex = 0,
			x, y, z, w, normal, plane;
		for(var planeindex = 0; planeindex < numplanes; planeindex++) {
			x = planeData[arrayindex++];
			y = planeData[arrayindex++];
			z = planeData[arrayindex++];
			w = planeData[arrayindex++];
			normal = new CSG.Vector3D(x, y, z);
			plane = new CSG.Plane(normal, w);
			planes.push(plane);
		}

		var vertices = [],
			vertexData = bin.vertexData,
			numvertices = vertexData.length / 3,
			pos, vertex;
		arrayindex = 0;
		for(var vertexindex = 0; vertexindex < numvertices; vertexindex++) {
			x = vertexData[arrayindex++];
			y = vertexData[arrayindex++];
			z = vertexData[arrayindex++];
			pos = new CSG.Vector3D(x, y, z);
			vertex = new CSG.Vertex(pos);
			vertices.push(vertex);
		}

		var shareds = bin.shared.map(function(shared) {
			return CSG.Polygon.Shared.fromObject(shared);
		});

		var polygons = [],
			numpolygons = bin.numPolygons,
			numVerticesPerPolygon = bin.numVerticesPerPolygon,
			polygonVertices = bin.polygonVertices,
			polygonPlaneIndexes = bin.polygonPlaneIndexes,
			polygonSharedIndexes = bin.polygonSharedIndexes,
			numpolygonvertices, polygonvertices, shared, polygon;//already defined plane,
		arrayindex = 0;
		for(var polygonindex = 0; polygonindex < numpolygons; polygonindex++) {
			numpolygonvertices = numVerticesPerPolygon[polygonindex];
			polygonvertices = [];
			for(var i = 0; i < numpolygonvertices; i++) {
				polygonvertices.push(vertices[polygonVertices[arrayindex++]]);
			}
			plane = planes[polygonPlaneIndexes[polygonindex]];
			shared = shareds[polygonSharedIndexes[polygonindex]];
			polygon = new CSG.Polygon(polygonvertices, shared, plane);
			polygons.push(polygon);
		}
		var csg = CSG.fromPolygons(polygons);
		csg.isCanonicalized = true;
		csg.isRetesselated = true;
		return csg;
	};

	CSG.prototype = {

		addConnector: function(name, point, axisvector, normalvector){
			this.properties[name] = new CSG.Connector(point, axisvector, normalvector);
		},

		addMarker: function(name, point){
			if (this.properties.markers === undefined){
				this.properties.markers = new CSG.Properties();		
			}
			this.properties.markers[name] = new CSG.Vector3D(point);
		},

		addFlatSurface: function(name, p1, p2){
			if (this.properties.surfaces === undefined){
				this.properties.surfaces = new CSG.Properties();		
			}
			this.properties.surfaces[name] = [new CSG.Vector3D(p1), new CSG.Vector3D(p2)];
		},

		toPolygons: function() {
			return this.polygons;
		},

		// Return a new CSG solid representing space in either this solid or in the
		// solid `csg`. Neither this solid nor the solid `csg` are modified.
		//
		//     A.union(B)
		//
		//     +-------+            +-------+
		//     |       |            |       |
		//     |   A   |            |       |
		//     |    +--+----+   =   |       +----+
		//     +----+--+    |       +----+       |
		//          |   B   |            |       |
		//          |       |            |       |
		//          +-------+            +-------+
		//
		union: function(csg) {
			var csgs;
			if(csg instanceof Array) {
				csgs = csg;
			} else {
				csgs = [csg];
			}
			var result = this;
			for(var i = 0; i < csgs.length; i++) {
				var islast = (i == (csgs.length - 1));
				result = result.unionSub(csgs[i], islast, islast);
			}
			return result;
		},

		unionSub: function(csg, retesselate, canonicalize) {
			if(!this.mayOverlap(csg)) {
				return this.unionForNonIntersecting(csg);
			} else {
				var a = new CSG.Tree(this.polygons);
				var b = new CSG.Tree(csg.polygons);
				a.clipTo(b, false);

				// b.clipTo(a, true); // ERROR: this doesn't work
				b.clipTo(a);
				b.invert();
				b.clipTo(a);
				b.invert();

				var newpolygons = a.allPolygons().concat(b.allPolygons());
				var result = CSG.fromPolygons(newpolygons);
				result.properties = this.properties._merge(csg.properties);
				if(retesselate) result = result.reTesselated();
				if(canonicalize) result = result.canonicalized();
				return result;
			}
		},

		// Like union, but when we know that the two solids are not intersecting
		// Do not use if you are not completely sure that the solids do not intersect!
		unionForNonIntersecting: function(csg) {
			var newpolygons = this.polygons.concat(csg.polygons);
			var result = CSG.fromPolygons(newpolygons);
			result.properties = this.properties._merge(csg.properties);
			result.isCanonicalized = this.isCanonicalized && csg.isCanonicalized;
			result.isRetesselated = this.isRetesselated && csg.isRetesselated;
			return result;
		},

		// Return a new CSG solid representing space in this solid but not in the
		// solid `csg`. Neither this solid nor the solid `csg` are modified.
		//
		//     A.subtract(B)
		//
		//     +-------+            +-------+
		//     |       |            |       |
		//     |   A   |            |       |
		//     |    +--+----+   =   |    +--+
		//     +----+--+    |       +----+
		//          |   B   |
		//          |       |
		//          +-------+
		//
		subtract: function(csg) {
			var csgs;
			if(csg instanceof Array) {
				csgs = csg;
			} else {
				csgs = [csg];
			}
			var result = this;
			for(var i = 0; i < csgs.length; i++) {
				var islast = (i == (csgs.length - 1));
				result = result.subtractSub(csgs[i], islast, islast);
			}
			return result;
		},

		subtractSub: function(csg, retesselate, canonicalize) {
			var a = new CSG.Tree(this.polygons);
			var b = new CSG.Tree(csg.polygons);
			a.invert();
			a.clipTo(b);
			b.clipTo(a, true);
			a.addPolygons(b.allPolygons());
			a.invert();
			var result = CSG.fromPolygons(a.allPolygons());
			result.properties = this.properties._merge(csg.properties);
			if(retesselate) result = result.reTesselated();
			if(canonicalize) result = result.canonicalized();
			return result;
		},

		// Return a new CSG solid representing space both this solid and in the
		// solid `csg`. Neither this solid nor the solid `csg` are modified.
		//
		//     A.intersect(B)
		//
		//     +-------+
		//     |       |
		//     |   A   |
		//     |    +--+----+   =   +--+
		//     +----+--+    |       +--+
		//          |   B   |
		//          |       |
		//          +-------+
		//
		intersect: function(csg) {
			var csgs;
			if(csg instanceof Array) {
				csgs = csg;
			} else {
				csgs = [csg];
			}
			var result = this;
			for(var i = 0; i < csgs.length; i++) {
				var islast = (i == (csgs.length - 1));
				result = result.intersectSub(csgs[i], islast, islast);
			}
			return result;
		},

		intersectSub: function(csg, retesselate, canonicalize) {
			var a = new CSG.Tree(this.polygons);
			var b = new CSG.Tree(csg.polygons);
			a.invert();
			b.clipTo(a);
			b.invert();
			a.clipTo(b);
			b.clipTo(a);
			a.addPolygons(b.allPolygons());
			a.invert();
			var result = CSG.fromPolygons(a.allPolygons());
			result.properties = this.properties._merge(csg.properties);
			if(retesselate) result = result.reTesselated();
			if(canonicalize) result = result.canonicalized();
			return result;
		},

		// Return a new CSG solid with solid and empty space switched. This solid is
		// not modified.
		inverse: function() {
			var flippedpolygons = this.polygons.map(function(p) {
				return p.flipped();
			});
			return CSG.fromPolygons(flippedpolygons);
			// TODO: flip properties
		},

		// Affine transformation of CSG object. Returns a new CSG object
		transform1: function(matrix4x4) {
			var newpolygons = this.polygons.map(function(p) {
				return p.transform(matrix4x4);
			});
			var result = CSG.fromPolygons(newpolygons);
			result.properties = this.properties._transform(matrix4x4);
			result.isRetesselated = this.isRetesselated;
			return result;
		},

		transform: function(matrix4x4) {
			var ismirror = matrix4x4.isMirroring();
			var transformedvertices = {};
			var transformedplanes = {};
			var newpolygons = this.polygons.map(function(p) {
				var newplane;
				var plane = p.plane;
				var planetag = plane.getTag();
				if(planetag in transformedplanes) {
					newplane = transformedplanes[planetag];
				} else {
					newplane = plane.transform(matrix4x4);
					transformedplanes[planetag] = newplane;
				}
				var newvertices = p.vertices.map(function(v) {
					var newvertex;
					var vertextag = v.getTag();
					if(vertextag in transformedvertices) {
						newvertex = transformedvertices[vertextag];
					} else {
						newvertex = v.transform(matrix4x4);
						transformedvertices[vertextag] = newvertex;
					}
					return newvertex;
				});
				if(ismirror) newvertices.reverse();
				return new CSG.Polygon(newvertices, p.shared, newplane);
			});
			var result = CSG.fromPolygons(newpolygons);
			result.properties = this.properties._transform(matrix4x4);
			result.isRetesselated = this.isRetesselated;
			result.isCanonicalized = this.isCanonicalized;
			return result;
		},

		toStlString: function() {
			var result = "solid csg.js\n";
			this.polygons.map(function(p) {
				result += p.toStlString();
			});
			result += "endsolid csg.js\n";
			return result;
		},

		toAMFString: function(m) {
			var result = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<amf"+(m&&m.unit?" unit=\"+m.unit\"":"")+">\n";
			for(var k in m) {
				result += "<metadata type=\""+k+"\">"+m[k]+"</metadata>\n";
			}
			result += "<object id=\"0\">\n<mesh>\n<vertices>\n";

			this.polygons.map(function(p) {                  // first we dump all vertices of all polygons
	         for(var i=0; i<p.vertices.length; i++) {
	            result += p.vertices[i].toAMFString();
	         }
	      });
	      result += "</vertices>\n";

	      var n = 0;
			this.polygons.map(function(p) {                  // then we dump all polygons
	         result += "<volume>\n";
	         if(p.vertices.length<3) 
	            return;
				var r = 1, g = 0.4, b = 1, a = 1, colorSet = false;
				if(p.shared && p.shared.color) {
					r = p.shared.color[0];
					g = p.shared.color[1];
					b = p.shared.color[2];
	            a = p.shared.color[3];
					colorSet = true;
				} else if(p.color) {
	            r = p.color[0];
	            g = p.color[1];
	            b = p.color[2];
	            if(p.color.length()>3) a = p.color[3];
					colorSet = true;
	         }

	   		result += "<color><r>"+r+"</r><g>"+g+"</g><b>"+b+"</b>"+(a!==undefined?"<a>"+a+"</a>":"")+"</color>";

	         for(var i=0; i<p.vertices.length-2; i++) {      // making sure they are all triangles (triangular polygons)
	            result += "<triangle>";
	            result += "<v1>" + (n) + "</v1>";
	            result += "<v2>" + (n+i+1) + "</v2>";
	            result += "<v3>" + (n+i+2) + "</v3>";
	            result += "</triangle>\n";
	         }
	         n += p.vertices.length;
	         result += "</volume>\n";
			});
			result += "</mesh>\n</object>\n";
			result += "</amf>\n";
			return result;
		},

		toX3D: function() {
			// materialPolygonLists
			// key: a color string (e.g. "0 1 1" for yellow)
			// value: an array of strings specifying polygons of this color
			//        (as space-separated indices into vertexCoords)
			var materialPolygonLists = {},
			// list of coordinates (as "x y z" strings)
				vertexCoords = [],
			// map to look up the index in vertexCoords of a given vertex
				vertexTagToCoordIndexMap = {};

			this.polygons.map(function(p) {
				var red = 0,
					green = 0,
					blue = 1; // default color is blue
				if(p.shared && p.shared.color) {
					red = p.shared.color[0];
					green = p.shared.color[1];
					blue = p.shared.color[2];
				}

				var polygonVertexIndices = [],
					numvertices = p.vertices.length,
					vertex;
				for(var i = 0; i < numvertices; i++) {
					vertex = p.vertices[i];
					if(!(vertex.getTag() in vertexTagToCoordIndexMap)) {
						vertexCoords.push(vertex.pos._x.toString() + " " +
							vertex.pos._y.toString() + " " +
							vertex.pos._z.toString()
						);
						vertexTagToCoordIndexMap[vertex.getTag()] = vertexCoords.length - 1;
					}
					polygonVertexIndices.push(vertexTagToCoordIndexMap[vertex.getTag()]);
				}

				var polygonString = polygonVertexIndices.join(" ");

				var colorString = red.toString() + " " + green.toString() + " " + blue.toString();
				if(!(colorString in materialPolygonLists)) {
					materialPolygonLists[colorString] = [];
				}
				// add this polygonString to the list of colorString-colored polygons
				materialPolygonLists[colorString].push(polygonString);
			});


			// create output document
			var docType = document.implementation.createDocumentType("X3D",
				'ISO//Web3D//DTD X3D 3.1//EN" "http://www.web3d.org/specifications/x3d-3.1.dtd', null);
			var exportDoc = document.implementation.createDocument(null, "X3D", docType);
			exportDoc.insertBefore(
				exportDoc.createProcessingInstruction('xml', 'version="1.0" encoding="UTF-8"'),
				exportDoc.doctype);

			var exportRoot = exportDoc.getElementsByTagName("X3D")[0];
			exportRoot.setAttribute("profile", "Interchange");
			exportRoot.setAttribute("version", "3.1");
			exportRoot.setAttribute("xsd:noNamespaceSchemaLocation","http://www.web3d.org/specifications/x3d-3.1.xsd");
			exportRoot.setAttribute("xmlns:xsd", "http://www.w3.org/2001/XMLSchema-instance");

			var exportScene = exportDoc.createElement("Scene");
			exportRoot.appendChild(exportScene);

			/*
		  For each color, create a shape made of an appropriately colored
		  material which contains all polygons that are this color.

		  The first shape will contain the definition of all vertices,
		  (<Coordinate DEF="coords_mesh"/>), which will be referenced by
		  subsequent shapes.
		*/
			var coordsMeshDefined = false;
			for(var colorString in materialPolygonLists) {
				var polygonList = materialPolygonLists[colorString];
				var shape = exportDoc.createElement("Shape");
				exportScene.appendChild(shape);

				var appearance = exportDoc.createElement("Appearance");
				shape.appendChild(appearance);

				var material = exportDoc.createElement("Material");
				appearance.appendChild(material);
				material.setAttribute("diffuseColor", colorString);
				material.setAttribute("ambientIntensity", "1.0");

				var ifs = exportDoc.createElement("IndexedFaceSet");
				shape.appendChild(ifs);
				ifs.setAttribute("solid", "true");
				ifs.setAttribute("coordIndex", polygonList.join(" -1 ") + " -1");

				var coordinate = exportDoc.createElement("Coordinate");
				ifs.appendChild(coordinate);
				if(coordsMeshDefined) {
					coordinate.setAttribute("USE", "coords_mesh");
				} else {
					coordinate.setAttribute("DEF", "coords_mesh");
					coordinate.setAttribute("point", vertexCoords.join(" "));
					coordsMeshDefined = true;
				}
			}

			var x3dstring = (new XMLSerializer()).serializeToString(exportDoc);
			return new Blob([x3dstring], {
				type: "model/x3d+xml"
			});
		},

		// see http://en.wikipedia.org/wiki/STL_%28file_format%29#Binary_STL
		toStlBinary: function(p) {
			// first check if the host is little-endian:
			var buffer = new ArrayBuffer(4);
			var int32buffer = new Int32Array(buffer, 0, 1);
			var int8buffer = new Int8Array(buffer, 0, 4);
			int32buffer[0] = 0x11223344;
			if(int8buffer[0] != 0x44) {
				throw new Error("Binary STL output is currently only supported on little-endian (Intel) processors");
			}

			var numtriangles = 0;
			this.polygons.map(function(p) {
				var numvertices = p.vertices.length;
				var thisnumtriangles = (numvertices >= 3) ? numvertices - 2 : 0;
				numtriangles += thisnumtriangles;
			});
			var headerarray = new Uint8Array(80);
			for(var i = 0; i < 80; i++) {
				headerarray[i] = 65;
			}
			var ar1 = new Uint32Array(1);
			ar1[0] = numtriangles;
			// write the triangles to allTrianglesBuffer:
			var allTrianglesBuffer = new ArrayBuffer(50 * numtriangles);
			var allTrianglesBufferAsInt8 = new Int8Array(allTrianglesBuffer);
			// a tricky problem is that a Float32Array must be aligned at 4-byte boundaries (at least in certain browsers)
			// while each triangle takes 50 bytes. Therefore we write each triangle to a temporary buffer, and copy that
			// into allTrianglesBuffer:
			var triangleBuffer = new ArrayBuffer(50);
			var triangleBufferAsInt8 = new Int8Array(triangleBuffer);
			// each triangle consists of 12 floats:
			var triangleFloat32array = new Float32Array(triangleBuffer, 0, 12);
			// and one uint16:
			var triangleUint16array = new Uint16Array(triangleBuffer, 48, 1);
			var byteoffset = 0;
			this.polygons.map(function(p) {
				var numvertices = p.vertices.length;
				for(var i = 0; i < numvertices - 2; i++) {
					var normal = p.plane.normal;
					triangleFloat32array[0] = normal._x;
					triangleFloat32array[1] = normal._y;
					triangleFloat32array[2] = normal._z;
					var arindex = 3;
					for(var v = 0; v < 3; v++) {
						var vv = v + ((v > 0) ? i : 0);
						var vertexpos = p.vertices[vv].pos;
						triangleFloat32array[arindex++] = vertexpos._x;
						triangleFloat32array[arindex++] = vertexpos._y;
						triangleFloat32array[arindex++] = vertexpos._z;
					}
					triangleUint16array[0] = 0;
					// copy the triangle into allTrianglesBuffer:
					allTrianglesBufferAsInt8.set(triangleBufferAsInt8, byteoffset);
					byteoffset += 50;
				}
			});
	      if(p&&p.webBlob) {      // -- want a blob direct
				return new Blob([headerarray.buffer, ar1.buffer, allTrianglesBuffer], {
				   type: "application/sla"
				});
	      } else {
	         // we differentiate, as binary string blobbing gives bad blob in web, we need binary string for CLI
	         //    perhaps there is a way to make it working (see openjscad for stlb)\
	         //
	         // concat 3 buffers together -- don't make blob so early, we want data (non-blob) for nodejs too
	         //    must be string data direct to write
	         var stl = new Uint8Array(headerarray.buffer.byteLength + ar1.buffer.byteLength + allTrianglesBuffer.byteLength);
	         var j = 0;
	         for(var i=0; i<headerarray.buffer.byteLength; i++) { stl.buffer[j++] = headerarray.buffer[i]; }
	         for(var i=0; i<ar1.buffer.byteLength; i++) { stl.buffer[j++] = ar1.buffer[i]; }
	         for(var i=0; i<allTrianglesBuffer.byteLength; i++) { stl.buffer[j++] = allTrianglesBuffer[i]; }
	         return String.fromCharCode.apply(null, new Uint8Array(stl.buffer)); 
	         
	      }   
		},

		toString: function() {
			var result = "CSG solid:\n";
			this.polygons.map(function(p) {
				result += p.toString();
			});
			return result;
		},

	   center: function(c) {
	      if(!c.length) c = [c,c,c];
	      var b = this.getBounds();
	      return this.translate([
	         c[0]?-(b[1].x-b[0].x)/2-b[0].x:0,
	         c[1]?-(b[1].y-b[0].y)/2-b[0].y:0,
	         c[2]?-(b[1].z-b[0].z)/2-b[0].z:0]);
	   },

		// Expand the solid
		// resolution: number of points per 360 degree for the rounded corners
		expand: function(radius, resolution) {
			var result = this.expandedShell(radius, resolution, true);
			result = result.reTesselated();
			result.properties = this.properties; // keep original properties
			return result;
		},

		// Contract the solid
		// resolution: number of points per 360 degree for the rounded corners
		contract: function(radius, resolution) {
			var expandedshell = this.expandedShell(radius, resolution, false);
			var result = this.subtract(expandedshell);
			result = result.reTesselated();
			result.properties = this.properties; // keep original properties
			return result;
		},

		// Create the expanded shell of the solid:
		// All faces are extruded to get a thickness of 2*radius
		// Cylinders are constructed around every side
		// Spheres are placed on every vertex
		// unionWithThis: if true, the resulting solid will be united with 'this' solid;
		//   the result is a true expansion of the solid
		//   If false, returns only the shell
		expandedShell: function(radius, resolution, unionWithThis) {
			var csg = this.reTesselated();
			var result;
			if(unionWithThis) {
				result = csg;
			} else {
				result = new CSG();
			}

			// first extrude all polygons:
			csg.polygons.map(function(polygon) {
				var extrudevector = polygon.plane.normal.unit().times(2 * radius);
				var translatedpolygon = polygon.translate(extrudevector.times(-0.5));
				var extrudedface = translatedpolygon.extrude(extrudevector);
				result = result.unionSub(extrudedface, false, false);
			});

			// Make a list of all unique vertex pairs (i.e. all sides of the solid)
			// For each vertex pair we collect the following:
			//   v1: first coordinate
			//   v2: second coordinate
			//   planenormals: array of normal vectors of all planes touching this side
			var vertexpairs = {}; // map of 'vertex pair tag' to {v1, v2, planenormals}
			csg.polygons.map(function(polygon) {
				var numvertices = polygon.vertices.length;
				var prevvertex = polygon.vertices[numvertices - 1];
				var prevvertextag = prevvertex.getTag();
				for(var i = 0; i < numvertices; i++) {
					var vertex = polygon.vertices[i];
					var vertextag = vertex.getTag();
					var vertextagpair;
					if(vertextag < prevvertextag) {
						vertextagpair = vertextag + "-" + prevvertextag;
					} else {
						vertextagpair = prevvertextag + "-" + vertextag;
					}
					var obj;
					if(vertextagpair in vertexpairs) {
						obj = vertexpairs[vertextagpair];
					} else {
						obj = {
							v1: prevvertex,
							v2: vertex,
							planenormals: []
						};
						vertexpairs[vertextagpair] = obj;
					}
					obj.planenormals.push(polygon.plane.normal);

					prevvertextag = vertextag;
					prevvertex = vertex;
				}
			});

			// now construct a cylinder on every side
			// The cylinder is always an approximation of a true cylinder: it will have <resolution> polygons
			// around the sides. We will make sure though that the cylinder will have an edge at every
			// face that touches this side. This ensures that we will get a smooth fill even
			// if two edges are at, say, 10 degrees and the resolution is low.
			// Note: the result is not retesselated yet but it really should be!
			for(var vertextagpair in vertexpairs) {
				var vertexpair = vertexpairs[vertextagpair],
					startpoint = vertexpair.v1.pos,
					endpoint = vertexpair.v2.pos,
				// our x,y and z vectors:
					zbase = endpoint.minus(startpoint).unit(),
					xbase = vertexpair.planenormals[0].unit(),
					ybase = xbase.cross(zbase),

				// make a list of angles that the cylinder should traverse:
					angles = [];

				// first of all equally spaced around the cylinder:
				for(var i = 0; i < resolution; i++) {
					angles.push(i * Math.PI * 2 / resolution);
				}

				// and also at every normal of all touching planes:
				for(var i = 0, iMax = vertexpair.planenormals.length; i < iMax; i++) {
					var planenormal = vertexpair.planenormals[i],
						si = ybase.dot(planenormal),
						co = xbase.dot(planenormal),
						angle = Math.atan2(si, co);

					if(angle < 0) angle += Math.PI * 2;
					angles.push(angle);
					angle = Math.atan2(-si, -co);
					if(angle < 0) angle += Math.PI * 2;
					angles.push(angle);
				}

				// this will result in some duplicate angles but we will get rid of those later.
				// Sort:
				angles = angles.sort(fnNumberSort);

				// Now construct the cylinder by traversing all angles:
				var numangles = angles.length,
					prevp1, prevp2,
					startfacevertices = [],
					endfacevertices = [],
					polygons = [];
				for(var i = -1; i < numangles; i++) {
					var angle = angles[(i < 0) ? (i + numangles) : i],
						si = Math.sin(angle),
						co = Math.cos(angle),
						p = xbase.times(co * radius).plus(ybase.times(si * radius)),
						p1 = startpoint.plus(p),
						p2 = endpoint.plus(p),
						skip = false;
					if(i >= 0) {
						if(p1.distanceTo(prevp1) < 1e-5) {
							skip = true;
						}
					}
					if(!skip) {
						if(i >= 0) {
							startfacevertices.push(new CSG.Vertex(p1));
							endfacevertices.push(new CSG.Vertex(p2));
							var polygonvertices = [
								new CSG.Vertex(prevp2),
								new CSG.Vertex(p2),
								new CSG.Vertex(p1),
								new CSG.Vertex(prevp1)];
							var polygon = new CSG.Polygon(polygonvertices);
							polygons.push(polygon);
						}
						prevp1 = p1;
						prevp2 = p2;
					}
				}
				endfacevertices.reverse();
				polygons.push(new CSG.Polygon(startfacevertices));
				polygons.push(new CSG.Polygon(endfacevertices));
				var cylinder = CSG.fromPolygons(polygons);
				result = result.unionSub(cylinder, false, false);
			}

			// make a list of all unique vertices
			// For each vertex we also collect the list of normals of the planes touching the vertices
			var vertexmap = {};
			csg.polygons.map(function(polygon) {
				polygon.vertices.map(function(vertex) {
					var vertextag = vertex.getTag();
					var obj;
					if(vertextag in vertexmap) {
						obj = vertexmap[vertextag];
					} else {
						obj = {
							pos: vertex.pos,
							normals: []
						};
						vertexmap[vertextag] = obj;
					}
					obj.normals.push(polygon.plane.normal);
				});
			});

			// and build spheres at each vertex
			// We will try to set the x and z axis to the normals of 2 planes
			// This will ensure that our sphere tesselation somewhat matches 2 planes
			for(var vertextag in vertexmap) {
				var vertexobj = vertexmap[vertextag];
				// use the first normal to be the x axis of our sphere:
				var xaxis = vertexobj.normals[0].unit();
				// and find a suitable z axis. We will use the normal which is most perpendicular to the x axis:
				var bestzaxis = null;
				var bestzaxisorthogonality = 0;
				for(var i = 1; i < vertexobj.normals.length; i++) {
					var normal = vertexobj.normals[i].unit();
					var cross = xaxis.cross(normal);
					var crosslength = cross.length();
					if(crosslength > 0.05) {
						if(crosslength > bestzaxisorthogonality) {
							bestzaxisorthogonality = crosslength;
							bestzaxis = normal;
						}
					}
				}
				if(!bestzaxis) {
					bestzaxis = xaxis.randomNonParallelVector();
				}
				var yaxis = xaxis.cross(bestzaxis).unit();
				var zaxis = yaxis.cross(xaxis);
				var sphere = CSG.sphere({
					center: vertexobj.pos,
					radius: radius,
					resolution: resolution,
					axes: [xaxis, yaxis, zaxis]
				});
				result = result.unionSub(sphere, false, false);
			}

			return result;
		},

		canonicalized: function() {
			if(this.isCanonicalized) {
				return this;
			} else {
				var factory = new CSG.fuzzyCSGFactory();
				var result = factory.getCSG(this);
				result.isCanonicalized = true;
				result.isRetesselated = this.isRetesselated;
				result.properties = this.properties; // keep original properties
				return result;
			}
		},

		reTesselated: function() {
			if(this.isRetesselated) {
				return this;
			} else {
				var csg = this.canonicalized();
				var polygonsPerPlane = {};
				csg.polygons.map(function(polygon) {
					var planetag = polygon.plane.getTag();
					var sharedtag = polygon.shared.getTag();
					planetag += "/" + sharedtag;
					if(!(planetag in polygonsPerPlane)) {
						polygonsPerPlane[planetag] = [];
					}
					polygonsPerPlane[planetag].push(polygon);
				});
				var destpolygons = [];
				for(var planetag in polygonsPerPlane) {
					var sourcepolygons = polygonsPerPlane[planetag];
					if(sourcepolygons.length < 2) {
						destpolygons = destpolygons.concat(sourcepolygons);
					} else {
						var retesselayedpolygons = [];
						CSG.reTesselateCoplanarPolygons(sourcepolygons, retesselayedpolygons);
						destpolygons = destpolygons.concat(retesselayedpolygons);
					}
				}
				var result = CSG.fromPolygons(destpolygons);
				result.isRetesselated = true;
				result = result.canonicalized();
				//      result.isCanonicalized = true;
				result.properties = this.properties; // keep original properties
				return result;
			}
		},

		// returns an array of two CSG.Vector3Ds (minimum coordinates and maximum coordinates)
		getBounds: function() {
			if(!this.cachedBoundingBox) {
				var minpoint = new CSG.Vector3D(0, 0, 0);
				var maxpoint = new CSG.Vector3D(0, 0, 0);
				var polygons = this.polygons;
				var numpolygons = polygons.length;
				for(var i = 0; i < numpolygons; i++) {
					var polygon = polygons[i];
					var bounds = polygon.boundingBox();
					if(i === 0) {
						minpoint = bounds[0];
						maxpoint = bounds[1];
					} else {
						minpoint = minpoint.min(bounds[0]);
						maxpoint = maxpoint.max(bounds[1]);
					}
				}
				this.cachedBoundingBox = [minpoint, maxpoint];
			}
			return this.cachedBoundingBox;
		},

		// returns true if there is a possibility that the two solids overlap
		// returns false if we can be sure that they do not overlap
		mayOverlap: function(csg) {
			if((this.polygons.length === 0) || (csg.polygons.length === 0)) {
				return false;
			} else {
				var mybounds = this.getBounds();
				var otherbounds = csg.getBounds();
	         // [0].x/y  
	         //    +-----+
	         //    |     |
	         //    |     |
	         //    +-----+ 
	         //          [1].x/y
	         //return false;
	         //echo(mybounds,"=",otherbounds);
				if(mybounds[1].x < otherbounds[0].x) return false;
				if(mybounds[0].x > otherbounds[1].x) return false;
				if(mybounds[1].y < otherbounds[0].y) return false;
				if(mybounds[0].y > otherbounds[1].y) return false;
				if(mybounds[1].z < otherbounds[0].z) return false;
				if(mybounds[0].z > otherbounds[1].z) return false;
				return true;
			}
		},

		// Cut the solid by a plane. Returns the solid on the back side of the plane
		cutByPlane: function(plane) {
			if(this.polygons.length === 0) {
				return new CSG();
			}
			// Ideally we would like to do an intersection with a polygon of inifinite size
			// but this is not supported by our implementation. As a workaround, we will create
			// a cube, with one face on the plane, and a size larger enough so that the entire
			// solid fits in the cube.
			// find the max distance of any vertex to the center of the plane:
			var planecenter = plane.normal.times(plane.w);
			var maxdistance = 0;
			this.polygons.map(function(polygon) {
				polygon.vertices.map(function(vertex) {
					var distance = vertex.pos.distanceToSquared(planecenter);
					if(distance > maxdistance) maxdistance = distance;
				});
			});
			maxdistance = Math.sqrt(maxdistance);
			maxdistance *= 1.01; // make sure it's really larger
			// Now build a polygon on the plane, at any point farther than maxdistance from the plane center:
			var vertices = [];
			var orthobasis = new CSG.OrthoNormalBasis(plane);
			vertices.push(new CSG.Vertex(orthobasis.to3D(new CSG.Vector2D(maxdistance, -maxdistance))));
			vertices.push(new CSG.Vertex(orthobasis.to3D(new CSG.Vector2D(-maxdistance, -maxdistance))));
			vertices.push(new CSG.Vertex(orthobasis.to3D(new CSG.Vector2D(-maxdistance, maxdistance))));
			vertices.push(new CSG.Vertex(orthobasis.to3D(new CSG.Vector2D(maxdistance, maxdistance))));
			var polygon = new CSG.Polygon(vertices, null, plane.flipped());

			// and extrude the polygon into a cube, backwards of the plane:
			var cube = polygon.extrude(plane.normal.times(-maxdistance));

			// Now we can do the intersection:
			var result = this.intersect(cube);
			result.properties = this.properties; // keep original properties
			return result;
		},

		// Connect a solid to another solid, such that two CSG.Connectors become connected
		//   myConnector: a CSG.Connector of this solid
		//   otherConnector: a CSG.Connector to which myConnector should be connected
		//   mirror: false: the 'axis' vectors of the connectors should point in the same direction
		//           true: the 'axis' vectors of the connectors should point in opposite direction
		//   normalrotation: degrees of rotation between the 'normal' vectors of the two
		//                   connectors
		connectTo: function(myConnector, otherConnector, mirror, normalrotation) {
			var matrix = myConnector.getTransformationTo(otherConnector, mirror, normalrotation);
			return this.transform(matrix);
		},

		// set the .shared property of all polygons
		// Returns a new CSG solid, the original is unmodified!
		setShared: function(shared) {
			var polygons = this.polygons.map(function(p) {
				return new CSG.Polygon(p.vertices, shared, p.plane);
			});
			var result = CSG.fromPolygons(polygons);
			result.properties = this.properties; // keep original properties
			result.isRetesselated = this.isRetesselated;
			result.isCanonicalized = this.isCanonicalized;
			return result;
		},

		/**
		 * @param {Array} color [red, green, blue] color values are float numbers 0..1
		 * @return {CSG} new CSG instance
		 */
		setColor: function(red, green, blue, alpha) { //for backward compatibility
			var color = red instanceof Array ? red : [red||0, green||0, blue||0, isNaN(alpha) ? 1. : alpha];
			var newshared = new CSG.Polygon.Shared(color);
			return this.setShared(newshared);
		},

		toCompactBinary: function() {
			var csg = this.canonicalized(),
				numpolygons = csg.polygons.length,
				numpolygonvertices = 0,
				numvertices = 0,
				vertexmap = {},
				vertices = [],
				numplanes = 0,
				planemap = {},
				polygonindex = 0,
				planes = [],
				shareds = [],
				sharedmap = {},
				numshared = 0;
			// for (var i = 0, iMax = csg.polygons.length; i < iMax; i++) {
			// 	var p = csg.polygons[i];
			// 	for (var j = 0, jMax = p.length; j < jMax; j++) {
			// 		++numpolygonvertices;
			// 		var vertextag = p[j].getTag();
			// 		if(!(vertextag in vertexmap)) {
			// 			vertexmap[vertextag] = numvertices++;
			// 			vertices.push(p[j]);
			// 		}
			// 	}
			csg.polygons.map(function(p) {
				p.vertices.map(function(v) {
					++numpolygonvertices;
					var vertextag = v.getTag();
					if(!(vertextag in vertexmap)) {
						vertexmap[vertextag] = numvertices++;
						vertices.push(v);
					}
				});

				var planetag = p.plane.getTag();
				if(!(planetag in planemap)) {
					planemap[planetag] = numplanes++;
					planes.push(p.plane);
				}
				var sharedtag = p.shared.getTag();
				if(!(sharedtag in sharedmap)) {
					sharedmap[sharedtag] = numshared++;
					shareds.push(p.shared);
				}
			});
			var numVerticesPerPolygon = new Uint32Array(numpolygons),
				polygonSharedIndexes = new Uint32Array(numpolygons),
				polygonVertices = new Uint32Array(numpolygonvertices),
				polygonPlaneIndexes = new Uint32Array(numpolygons),
				vertexData = new Float64Array(numvertices * 3),
				planeData = new Float64Array(numplanes * 4),
				polygonVerticesIndex = 0;
			for(var polygonindex = 0; polygonindex < numpolygons; ++polygonindex) {
				var p = csg.polygons[polygonindex];
				numVerticesPerPolygon[polygonindex] = p.vertices.length;
				p.vertices.map(function(v) {
					var vertextag = v.getTag();
					var vertexindex = vertexmap[vertextag];
					polygonVertices[polygonVerticesIndex++] = vertexindex;
				});
				var planetag = p.plane.getTag();
				var planeindex = planemap[planetag];
				polygonPlaneIndexes[polygonindex] = planeindex;
				var sharedtag = p.shared.getTag();
				var sharedindex = sharedmap[sharedtag];
				polygonSharedIndexes[polygonindex] = sharedindex;
			}
			var verticesArrayIndex = 0;
			vertices.map(function(v) {
				var pos = v.pos;
				vertexData[verticesArrayIndex++] = pos._x;
				vertexData[verticesArrayIndex++] = pos._y;
				vertexData[verticesArrayIndex++] = pos._z;
			});
			var planesArrayIndex = 0;
			planes.map(function(p) {
				var normal = p.normal;
				planeData[planesArrayIndex++] = normal._x;
				planeData[planesArrayIndex++] = normal._y;
				planeData[planesArrayIndex++] = normal._z;
				planeData[planesArrayIndex++] = p.w;
			});
			var result = {
				"class": "CSG",
				numPolygons: numpolygons,
				numVerticesPerPolygon: numVerticesPerPolygon,
				polygonPlaneIndexes: polygonPlaneIndexes,
				polygonSharedIndexes: polygonSharedIndexes,
				polygonVertices: polygonVertices,
				vertexData: vertexData,
				planeData: planeData,
				shared: shareds
			};
			return result;
		},

		// For debugging
		// Creates a new solid with a tiny cube at every vertex of the source solid
		toPointCloud: function(cuberadius) {
			var csg = this.reTesselated();

			var result = new CSG();

			// make a list of all unique vertices
			// For each vertex we also collect the list of normals of the planes touching the vertices
			var vertexmap = {};
			csg.polygons.map(function(polygon) {
				polygon.vertices.map(function(vertex) {
					vertexmap[vertex.getTag()] = vertex.pos;
				});
			});

			for(var vertextag in vertexmap) {
				var pos = vertexmap[vertextag];
				var cube = CSG.cube({
					center: pos,
					radius: cuberadius
				});
				result = result.unionSub(cube, false, false);
			}
			result = result.reTesselated();
			return result;
		},

		// Get the transformation that transforms this CSG such that it is lying on the z=0 plane,
		// as flat as possible (i.e. the least z-height).
		// So that it is in an orientation suitable for CNC milling
		getTransformationToFlatLying: function() {
			if(this.polygons.length === 0) {
				return new CSG.Matrix4x4(); // unity
			} else {
				// get a list of unique planes in the CSG:
				var csg = this.canonicalized();
				var planemap = {};
				csg.polygons.map(function(polygon) {
					planemap[polygon.plane.getTag()] = polygon.plane;
				});
				// try each plane in the CSG and find the plane that, when we align it flat onto z=0,
				// gives the least height in z-direction.
				// If two planes give the same height, pick the plane that originally had a normal closest
				// to [0,0,-1].
				var xvector = new CSG.Vector3D(1, 0, 0);
				var yvector = new CSG.Vector3D(0, 1, 0);
				var zvector = new CSG.Vector3D(0, 0, 1);
				var z0connectorx = new CSG.Connector([0, 0, 0], [0, 0, -1], xvector);
				var z0connectory = new CSG.Connector([0, 0, 0], [0, 0, -1], yvector);
				var isfirst = true;
				var minheight = 0;
				var maxdotz = 0;
				var besttransformation;
				for(var planetag in planemap) {
					var plane = planemap[planetag];
					var pointonplane = plane.normal.times(plane.w);
					var transformation;
					// We need a normal vecrtor for the transformation
					// determine which is more perpendicular to the plane normal: x or y?
					// we will align this as much as possible to the x or y axis vector
					var xorthogonality = plane.normal.cross(xvector).length();
					var yorthogonality = plane.normal.cross(yvector).length();
					if(xorthogonality > yorthogonality) {
						// x is better:
						var planeconnector = new CSG.Connector(pointonplane, plane.normal, xvector);
						transformation = planeconnector.getTransformationTo(z0connectorx, false, 0);
					} else {
						// y is better:
						var planeconnector = new CSG.Connector(pointonplane, plane.normal, yvector);
						transformation = planeconnector.getTransformationTo(z0connectory, false, 0);
					}
					var transformedcsg = csg.transform(transformation);
					var dotz = -plane.normal.dot(zvector);
					var bounds = transformedcsg.getBounds();
					var zheight = bounds[1].z - bounds[0].z;
					var isbetter = isfirst;
					if(!isbetter) {
						if(zheight < minheight) {
							isbetter = true;
						} else if(zheight == minheight) {
							if(dotz > maxdotz) isbetter = true;
						}
					}
					if(isbetter) {
						// translate the transformation around the z-axis and onto the z plane:
						var translation = [
							-0.5 * (bounds[1].x + bounds[0].x),
							-0.5 * (bounds[1].y + bounds[0].y),
							-bounds[0].z];
						transformation = transformation.multiply(CSG.Matrix4x4.translation(translation));
						minheight = zheight;
						maxdotz = dotz;
						besttransformation = transformation;
					}
					isfirst = false;
				}
				return besttransformation;
			}
		},

		lieFlat: function() {
			var transformation = this.getTransformationToFlatLying();
			return this.transform(transformation);
		},

		// project the 3D CSG onto a plane
		// This returns a 2D CAG with the 'shadow' shape of the 3D solid when projected onto the
		// plane represented by the orthonormal basis
		projectToOrthoNormalBasis: function(orthobasis) {
			var cags = [];
			this.polygons.map(function(polygon) {
				var cag = polygon.projectToOrthoNormalBasis(orthobasis);
				if(cag.sides.length > 0) {
					cags.push(cag);
				}
			});
			var result = new CAG().union(cags);
			return result;
		},

		sectionCut: function(orthobasis) {
			var plane1 = orthobasis.plane;
			var plane2 = orthobasis.plane.flipped();
			plane1 = new CSG.Plane(plane1.normal, plane1.w + 1e-4);
			plane2 = new CSG.Plane(plane2.normal, plane2.w + 1e-4);
			var cut3d = this.cutByPlane(plane1);
			cut3d = cut3d.cutByPlane(plane2);
			return cut3d.projectToOrthoNormalBasis(orthobasis);
		},

		/*
	  fixTJunctions:

	  Suppose we have two polygons ACDB and EDGF:

	   A-----B
	   |     |
	   |     E--F
	   |     |  |
	   C-----D--G

	  Note that vertex E forms a T-junction on the side BD. In this case some STL slicers will complain
	  that the solid is not watertight. This is because the watertightness check is done by checking if
	  each side DE is matched by another side ED.

	  This function will return a new solid with ACDB replaced by ACDEB

	  Note that this can create polygons that are slightly non-convex (due to rounding errors). Therefore the result should
	  not be used for further CSG operations!
	  */
		fixTJunctions: function() {
			var csg = this.canonicalized();
			var sidemap = {};
			for(var polygonindex = 0; polygonindex < csg.polygons.length; polygonindex++) {
				var polygon = csg.polygons[polygonindex];
				var numvertices = polygon.vertices.length;
				if(numvertices >= 3) // should be true
				{
					var vertex = polygon.vertices[0];
					var vertextag = vertex.getTag();
					for(var vertexindex = 0; vertexindex < numvertices; vertexindex++) {
						var nextvertexindex = vertexindex + 1;
						if(nextvertexindex == numvertices) nextvertexindex = 0;
						var nextvertex = polygon.vertices[nextvertexindex];
						var nextvertextag = nextvertex.getTag();
						var sidetag = vertextag + "/" + nextvertextag;
						var reversesidetag = nextvertextag + "/" + vertextag;
						if(reversesidetag in sidemap) {
							// this side matches the same side in another polygon. Remove from sidemap:
							var ar = sidemap[reversesidetag];
							ar.splice(-1, 1);
							if(ar.length === 0) {
								delete sidemap[reversesidetag];
							}
						} else {
							var sideobj = {
								vertex0: vertex,
								vertex1: nextvertex,
								polygonindex: polygonindex
							};
							if(!(sidetag in sidemap)) {
								sidemap[sidetag] = [sideobj];
							} else {
								sidemap[sidetag].push(sideobj);
							}
						}
						vertex = nextvertex;
						vertextag = nextvertextag;
					}
				}
			}
			// now sidemap contains 'unmatched' sides
			// i.e. side AB in one polygon does not have a matching side BA in another polygon
			var vertextag2sidestart = {};
			var vertextag2sideend = {};
			var sidestocheck = {};
			var sidemapisempty = true;
			for(var sidetag in sidemap) {
				sidemapisempty = false;
				sidestocheck[sidetag] = true;
				sidemap[sidetag].map(function(sideobj) {
					var starttag = sideobj.vertex0.getTag();
					var endtag = sideobj.vertex1.getTag();
					if(starttag in vertextag2sidestart) {
						vertextag2sidestart[starttag].push(sidetag);
					} else {
						vertextag2sidestart[starttag] = [sidetag];
					}
					if(endtag in vertextag2sideend) {
						vertextag2sideend[endtag].push(sidetag);
					} else {
						vertextag2sideend[endtag] = [sidetag];
					}
				});
			}

			if(!sidemapisempty) {
				// make a copy of the polygons array, since we are going to modify it:
				var polygons = csg.polygons.slice(0);

				function addSide (vertex0, vertex1, polygonindex) {
					var starttag = vertex0.getTag();
					var endtag = vertex1.getTag();
					if(starttag == endtag) throw new Error("Assertion failed");
					var newsidetag = starttag + "/" + endtag;
					var reversesidetag = endtag + "/" + starttag;
					if(reversesidetag in sidemap) {
						// we have a matching reverse oriented side.
						// Instead of adding the new side, cancel out the reverse side:
						// console.log("addSide("+newsidetag+") has reverse side:");
						deleteSide(vertex1, vertex0, null);
						return null;
					}
					//  console.log("addSide("+newsidetag+")");
					var newsideobj = {
						vertex0: vertex0,
						vertex1: vertex1,
						polygonindex: polygonindex
					};
					if(!(newsidetag in sidemap)) {
						sidemap[newsidetag] = [newsideobj];
					} else {
						sidemap[newsidetag].push(newsideobj);
					}
					if(starttag in vertextag2sidestart) {
						vertextag2sidestart[starttag].push(newsidetag);
					} else {
						vertextag2sidestart[starttag] = [newsidetag];
					}
					if(endtag in vertextag2sideend) {
						vertextag2sideend[endtag].push(newsidetag);
					} else {
						vertextag2sideend[endtag] = [newsidetag];
					}
					return newsidetag;
				}

				function deleteSide (vertex0, vertex1, polygonindex) {
					var starttag = vertex0.getTag();
					var endtag = vertex1.getTag();
					var sidetag = starttag + "/" + endtag;
					// console.log("deleteSide("+sidetag+")");
					if(!(sidetag in sidemap)) throw new Error("Assertion failed");
					var idx = -1;
					var sideobjs = sidemap[sidetag];
					for(var i = 0; i < sideobjs.length; i++) {
						var sideobj = sideobjs[i];
						if(sideobj.vertex0 != vertex0) continue;
						if(sideobj.vertex1 != vertex1) continue;
						if(polygonindex !== null) {
							if(sideobj.polygonindex != polygonindex) continue;
						}
						idx = i;
						break;
					}
					if(idx < 0) throw new Error("Assertion failed");
					sideobjs.splice(idx, 1);
					if(sideobjs.length === 0) {
						delete sidemap[sidetag];
					}
					idx = vertextag2sidestart[starttag].indexOf(sidetag);
					if(idx < 0) throw new Error("Assertion failed");
					vertextag2sidestart[starttag].splice(idx, 1);
					if(vertextag2sidestart[starttag].length === 0) {
						delete vertextag2sidestart[starttag];
					}

					idx = vertextag2sideend[endtag].indexOf(sidetag);
					if(idx < 0) throw new Error("Assertion failed");
					vertextag2sideend[endtag].splice(idx, 1);
					if(vertextag2sideend[endtag].length === 0) {
						delete vertextag2sideend[endtag];
					}
				}


				while(true) {
					var sidemapisempty = true;
					for(var sidetag in sidemap) {
						sidemapisempty = false;
						sidestocheck[sidetag] = true;
					}
					if(sidemapisempty) break;
					var donesomething = false;
					while(true) {
						var sidetagtocheck = null;
						for(var sidetag in sidestocheck) {
							sidetagtocheck = sidetag;
							break;
						}
						if(sidetagtocheck === null) break; // sidestocheck is empty, we're done!
						var donewithside = true;
						if(sidetagtocheck in sidemap) {
							var sideobjs = sidemap[sidetagtocheck];
							if(sideobjs.length === 0) throw new Error("Assertion failed");
							var sideobj = sideobjs[0];
							for(var directionindex = 0; directionindex < 2; directionindex++) {
								var startvertex = (directionindex === 0) ? sideobj.vertex0 : sideobj.vertex1;
								var endvertex = (directionindex === 0) ? sideobj.vertex1 : sideobj.vertex0;
								var startvertextag = startvertex.getTag();
								var endvertextag = endvertex.getTag();
								var matchingsides = [];
								if(directionindex === 0) {
									if(startvertextag in vertextag2sideend) {
										matchingsides = vertextag2sideend[startvertextag];
									}
								} else {
									if(startvertextag in vertextag2sidestart) {
										matchingsides = vertextag2sidestart[startvertextag];
									}
								}
								for(var matchingsideindex = 0; matchingsideindex < matchingsides.length; matchingsideindex++) {
									var matchingsidetag = matchingsides[matchingsideindex];
									var matchingside = sidemap[matchingsidetag][0];
									var matchingsidestartvertex = (directionindex === 0) ? matchingside.vertex0 : matchingside.vertex1;
									var matchingsideendvertex = (directionindex === 0) ? matchingside.vertex1 : matchingside.vertex0;
									var matchingsidestartvertextag = matchingsidestartvertex.getTag();
									var matchingsideendvertextag = matchingsideendvertex.getTag();
									if(matchingsideendvertextag != startvertextag) throw new Error("Assertion failed");
									if(matchingsidestartvertextag == endvertextag) {
										// matchingside cancels sidetagtocheck
										deleteSide(startvertex, endvertex, null);
										deleteSide(endvertex, startvertex, null);
										donewithside = false;
										directionindex = 2; // skip reverse direction check
										donesomething = true;
										break;
									} else {
										var startpos = startvertex.pos;
										var endpos = endvertex.pos;
										var checkpos = matchingsidestartvertex.pos;
										var direction = checkpos.minus(startpos);
										// Now we need to check if endpos is on the line startpos-checkpos:
										var t = endpos.minus(startpos).dot(direction) / direction.dot(direction);
										if((t > 0) && (t < 1)) {
											var closestpoint = startpos.plus(direction.times(t));
											var distancesquared = closestpoint.distanceToSquared(endpos);
											if(distancesquared < 1e-10) {
												// Yes it's a t-junction! We need to split matchingside in two:
												var polygonindex = matchingside.polygonindex;
												var polygon = polygons[polygonindex];
												// find the index of startvertextag in polygon:
												var insertionvertextag = matchingside.vertex1.getTag();
												var insertionvertextagindex = -1;
												for(var i = 0; i < polygon.vertices.length; i++) {
													if(polygon.vertices[i].getTag() == insertionvertextag) {
														insertionvertextagindex = i;
														break;
													}
												}
												if(insertionvertextagindex < 0) throw new Error("Assertion failed");
												// split the side by inserting the vertex:
												var newvertices = polygon.vertices.slice(0);
												newvertices.splice(insertionvertextagindex, 0, endvertex);
												var newpolygon = new CSG.Polygon(newvertices, polygon.shared /*polygon.plane*/ );
												polygons[polygonindex] = newpolygon;

												// remove the original sides from our maps:
												// deleteSide(sideobj.vertex0, sideobj.vertex1, null);
												deleteSide(matchingside.vertex0, matchingside.vertex1, polygonindex);
												var newsidetag1 = addSide(matchingside.vertex0, endvertex, polygonindex);
												var newsidetag2 = addSide(endvertex, matchingside.vertex1, polygonindex);
												if(newsidetag1 !== null) sidestocheck[newsidetag1] = true;
												if(newsidetag2 !== null) sidestocheck[newsidetag2] = true;
												donewithside = false;
												directionindex = 2; // skip reverse direction check
												donesomething = true;
												break;
											} // if(distancesquared < 1e-10)
										} // if( (t > 0) && (t < 1) )
									} // if(endingstidestartvertextag == endvertextag)
								} // for matchingsideindex
							} // for directionindex
						} // if(sidetagtocheck in sidemap)
						if(donewithside) {
							delete sidestocheck[sidetag];
						}
					}
					if(!donesomething) break;
				}
				var newcsg = CSG.fromPolygons(polygons);
				newcsg.properties = csg.properties;
				newcsg.isCanonicalized = true;
				newcsg.isRetesselated = true;
				csg = newcsg;
			} // if(!sidemapisempty)
			var sidemapisempty = true;
			for(var sidetag in sidemap) {
				sidemapisempty = false;
				break;
			}
			if(!sidemapisempty) {
				throw new Error("!sidemapisempty");
			}
			return csg;
		}
	};

	// Parse an option from the options object
	// If the option is not present, return the default value
	CSG.parseOption = function(options, optionname, defaultvalue) {
		var result = defaultvalue;
		if(options) {
			if(optionname in options) {
				result = options[optionname];
			}
		}
		return result;
	};

	// Parse an option and force into a CSG.Vector3D. If a scalar is passed it is converted
	// into a vector with equal x,y,z
	CSG.parseOptionAs3DVector = function(options, optionname, defaultvalue) {
		var result = CSG.parseOption(options, optionname, defaultvalue);
		result = new CSG.Vector3D(result);
		return result;
	};

	// Parse an option and force into a CSG.Vector2D. If a scalar is passed it is converted
	// into a vector with equal x,y
	CSG.parseOptionAs2DVector = function(options, optionname, defaultvalue) {
		var result = CSG.parseOption(options, optionname, defaultvalue);
		result = new CSG.Vector2D(result);
		return result;
	};

	CSG.parseOptionAsFloat = function(options, optionname, defaultvalue) {
		var result = CSG.parseOption(options, optionname, defaultvalue);
		if(typeof(result) == "string") {
			result = Number(result);
		}
		if(isNaN(result) || typeof(result) != "number") {
			throw new Error("Parameter " + optionname + " should be a number");
		}
		return result;
	};

	CSG.parseOptionAsInt = function(options, optionname, defaultvalue) {
		var result = CSG.parseOption(options, optionname, defaultvalue);
		result = Number(Math.floor(result));
		if (isNaN(result)) {
			throw new Error("Parameter " + optionname + " should be a number");
		}
		return result;
	};

	CSG.parseOptionAsBool = function(options, optionname, defaultvalue) {
		var result = CSG.parseOption(options, optionname, defaultvalue);
		if(typeof(result) == "string") {
			if(result == "true") result = true;
			else if(result == "false") result = false;
			else if(result == 0) result = false;
		}
		result = !! result;
		return result;
	};

	// Construct an axis-aligned solid cuboid.
	// Parameters:
	//   center: center of cube (default [0,0,0])
	//   radius: radius of cube (default [1,1,1]), can be specified as scalar or as 3D vector
	//
	// Example code:
	//
	//     var cube = CSG.cube({
	//       center: [0, 0, 0],
	//       radius: 1
	//     });
	CSG.cube = function(options) {
		var c = CSG.parseOptionAs3DVector(options, "center", [0, 0, 0]);
		var r = CSG.parseOptionAs3DVector(options, "radius", [1, 1, 1]);
		var result = CSG.fromPolygons([
			[
				[0, 4, 6, 2],
				[-1, 0, 0]
			],
			[
				[1, 3, 7, 5],
				[+1, 0, 0]
			],
			[
				[0, 1, 5, 4],
				[0, -1, 0]
			],
			[
				[2, 6, 7, 3],
				[0, +1, 0]
			],
			[
				[0, 2, 3, 1],
				[0, 0, -1]
			],
			[
				[4, 5, 7, 6],
				[0, 0, +1]
			]
		].map(function(info) {
			//var normal = new CSG.Vector3D(info[1]);
			//var plane = new CSG.Plane(normal, 1);
			var vertices = info[0].map(function(i) {
				var pos = new CSG.Vector3D(
				c.x + r.x * (2 * !! (i & 1) - 1), c.y + r.y * (2 * !! (i & 2) - 1), c.z + r.z * (2 * !! (i & 4) - 1));
				return new CSG.Vertex(pos);
			});
			return new CSG.Polygon(vertices, null /* , plane */ );
		}));
		result.properties.cube = new CSG.Properties();
		result.properties.cube.center = new CSG.Vector3D(c);
		result.properties.cube.corners = [
			new CSG.Vector3D([-r.x, r.y, r.z]).plus(c), 
			new CSG.Vector3D([r.x, r.y, r.z]).plus(c),
			new CSG.Vector3D([r.x, -r.y, r.z]).plus(c), 
			new CSG.Vector3D([-r.x, -r.y, r.z]).plus(c),
			new CSG.Vector3D([-r.x, r.y, -r.z]).plus(c), 
			new CSG.Vector3D([r.x, r.y, -r.z]).plus(c),
			new CSG.Vector3D([r.x, -r.y, -r.z]).plus(c), 
			new CSG.Vector3D([-r.x, -r.y, -r.z]).plus(c)		
		];	
		// add 6 connectors, at the centers of each face:
		result.properties.cube.facecenters = [
			new CSG.Connector(new CSG.Vector3D([r.x, 0, 0]).plus(c), [1, 0, 0], [0, 0, 1]),
			new CSG.Connector(new CSG.Vector3D([-r.x, 0, 0]).plus(c), [-1, 0, 0], [0, 0, 1]),
			new CSG.Connector(new CSG.Vector3D([0, r.y, 0]).plus(c), [0, 1, 0], [0, 0, 1]),
			new CSG.Connector(new CSG.Vector3D([0, -r.y, 0]).plus(c), [0, -1, 0], [0, 0, 1]),
			new CSG.Connector(new CSG.Vector3D([0, 0, r.z]).plus(c), [0, 0, 1], [1, 0, 0]),
			new CSG.Connector(new CSG.Vector3D([0, 0, -r.z]).plus(c), [0, 0, -1], [1, 0, 0])
		];

		return result;
	};

	// Construct a solid sphere
	//
	// Parameters:
	//   center: center of sphere (default [0,0,0])
	//   radius: radius of sphere (default 1), must be a scalar
	//   resolution: determines the number of polygons per 360 degree revolution (default 12)
	//   axes: (optional) an array with 3 vectors for the x, y and z base vectors
	//
	// Example usage:
	//
	//     var sphere = CSG.sphere({
	//       center: [0, 0, 0],
	//       radius: 2,
	//       resolution: 32,
	//     });
	CSG.sphere = function(options) {
		options = options || {};
		var center = CSG.parseOptionAs3DVector(options, "center", [0, 0, 0]);
		var radius = CSG.parseOptionAsFloat(options, "radius", 1);
		var resolution = CSG.parseOptionAsInt(options, "resolution", CSG.defaultResolution3D);
		var xvector, yvector, zvector;
		if('axes' in options) {
			xvector = options.axes[0].unit().times(radius);
			yvector = options.axes[1].unit().times(radius);
			zvector = options.axes[2].unit().times(radius);
		} else {
			xvector = new CSG.Vector3D([1, 0, 0]).times(radius);
			yvector = new CSG.Vector3D([0, -1, 0]).times(radius);
			zvector = new CSG.Vector3D([0, 0, 1]).times(radius);
		}
		if(resolution < 4) resolution = 4;
		var qresolution = Math.round(resolution / 4);
		var prevcylinderpoint;
		var polygons = [];
		for(var slice1 = 0; slice1 <= resolution; slice1++) {
			var angle = Math.PI * 2.0 * slice1 / resolution;
			var cylinderpoint = xvector.times(Math.cos(angle)).plus(yvector.times(Math.sin(angle)));
			if(slice1 > 0) {
				// cylinder vertices:
				var vertices = [];
				var prevcospitch, prevsinpitch;
				for(var slice2 = 0; slice2 <= qresolution; slice2++) {
					var pitch = 0.5 * Math.PI * slice2 / qresolution;
					var cospitch = Math.cos(pitch);
					var sinpitch = Math.sin(pitch);
					if(slice2 > 0) {
						vertices = [];
						vertices.push(new CSG.Vertex(center.plus(prevcylinderpoint.times(prevcospitch).minus(zvector.times(prevsinpitch)))));
						vertices.push(new CSG.Vertex(center.plus(cylinderpoint.times(prevcospitch).minus(zvector.times(prevsinpitch)))));
						if(slice2 < qresolution) {
							vertices.push(new CSG.Vertex(center.plus(cylinderpoint.times(cospitch).minus(zvector.times(sinpitch)))));
						}
						vertices.push(new CSG.Vertex(center.plus(prevcylinderpoint.times(cospitch).minus(zvector.times(sinpitch)))));
						polygons.push(new CSG.Polygon(vertices));
						vertices = [];
						vertices.push(new CSG.Vertex(center.plus(prevcylinderpoint.times(prevcospitch).plus(zvector.times(prevsinpitch)))));
						vertices.push(new CSG.Vertex(center.plus(cylinderpoint.times(prevcospitch).plus(zvector.times(prevsinpitch)))));
						if(slice2 < qresolution) {
							vertices.push(new CSG.Vertex(center.plus(cylinderpoint.times(cospitch).plus(zvector.times(sinpitch)))));
						}
						vertices.push(new CSG.Vertex(center.plus(prevcylinderpoint.times(cospitch).plus(zvector.times(sinpitch)))));
						vertices.reverse();
						polygons.push(new CSG.Polygon(vertices));
					}
					prevcospitch = cospitch;
					prevsinpitch = sinpitch;
				}
			}
			prevcylinderpoint = cylinderpoint;
		}
		var result = CSG.fromPolygons(polygons);
		result.properties.sphere = new CSG.Properties();
		result.properties.sphere.center = new CSG.Vector3D(center);
		result.properties.sphere.facepoint = center.plus(xvector);
		return result;
	};

	// Construct a solid cylinder.
	//
	// Parameters:
	//   start: start point of cylinder (default [0, -1, 0])
	//   end: end point of cylinder (default [0, 1, 0])
	//   radius: radius of cylinder (default 1), must be a scalar
	//   resolution: determines the number of polygons per 360 degree revolution (default 12)
	//
	// Example usage:
	//
	//     var cylinder = CSG.cylinder({
	//       start: [0, -1, 0],
	//       end: [0, 1, 0],
	//       radius: 1,
	//       resolution: 16
	//     });
	CSG.cylinder = function(options) {
		var s = CSG.parseOptionAs3DVector(options, "start", [0, -1, 0]);
		var e = CSG.parseOptionAs3DVector(options, "end", [0, 1, 0]);
		var r = CSG.parseOptionAsFloat(options, "radius", 1);
		var rEnd = CSG.parseOptionAsFloat(options, "radiusEnd", r);
		var rStart = CSG.parseOptionAsFloat(options, "radiusStart", r);

		if((rEnd < 0) || (rStart < 0)) {
			throw new Error("Radius should be non-negative");
		}
		if((rEnd === 0) && (rStart === 0)) {
			throw new Error("Either radiusStart or radiusEnd should be positive");
		}

		var slices = CSG.parseOptionAsInt(options, "resolution", CSG.defaultResolution2D);
		var ray = e.minus(s);
		var axisZ = ray.unit(); //, isY = (Math.abs(axisZ.y) > 0.5);
		var axisX = axisZ.randomNonParallelVector().unit();

		//  var axisX = new CSG.Vector3D(isY, !isY, 0).cross(axisZ).unit();
		var axisY = axisX.cross(axisZ).unit();
		var start = new CSG.Vertex(s);
		var end = new CSG.Vertex(e);
		var polygons = [];

		function point(stack, slice, radius) {
			var angle = slice * Math.PI * 2;
			var out = axisX.times(Math.cos(angle)).plus(axisY.times(Math.sin(angle)));
			var pos = s.plus(ray.times(stack)).plus(out.times(radius));
			return new CSG.Vertex(pos);
		}
		for(var i = 0; i < slices; i++) {
			var t0 = i / slices,
				t1 = (i + 1) / slices;
			if(rEnd == rStart) {
				polygons.push(new CSG.Polygon([start, point(0, t0, rEnd), point(0, t1, rEnd)]));
				polygons.push(new CSG.Polygon([point(0, t1, rEnd), point(0, t0, rEnd), point(1, t0, rEnd), point(1, t1, rEnd)]));
				polygons.push(new CSG.Polygon([end, point(1, t1, rEnd), point(1, t0, rEnd)]));
			} else {
				if(rStart > 0) {
					polygons.push(new CSG.Polygon([start, point(0, t0, rStart), point(0, t1, rStart)]));
					polygons.push(new CSG.Polygon([point(0, t0, rStart), point(1, t0, rEnd), point(0, t1, rStart)]));
				}
				if(rEnd > 0) {
					polygons.push(new CSG.Polygon([end, point(1, t1, rEnd), point(1, t0, rEnd)]));
					polygons.push(new CSG.Polygon([point(1, t0, rEnd), point(1, t1, rEnd), point(0, t1, rStart)]));
				}
			}
		}
		var result = CSG.fromPolygons(polygons);
		result.properties.cylinder = new CSG.Properties();
		result.properties.cylinder.start = new CSG.Connector(s, axisZ.negated(), axisX);
		result.properties.cylinder.end = new CSG.Connector(e, axisZ, axisX);
		result.properties.cylinder.facepoint = s.plus(axisX.times(rStart));
		return result;
	};

	// Like a cylinder, but with rounded ends instead of flat
	//
	// Parameters:
	//   start: start point of cylinder (default [0, -1, 0])
	//   end: end point of cylinder (default [0, 1, 0])
	//   radius: radius of cylinder (default 1), must be a scalar
	//   resolution: determines the number of polygons per 360 degree revolution (default 12)
	//   normal: a vector determining the starting angle for tesselation. Should be non-parallel to start.minus(end)
	//
	// Example usage:
	//
	//     var cylinder = CSG.roundedCylinder({
	//       start: [0, -1, 0],
	//       end: [0, 1, 0],
	//       radius: 1,
	//       resolution: 16
	//     });
	CSG.roundedCylinder = function(options) {
		var p1 = CSG.parseOptionAs3DVector(options, "start", [0, -1, 0]);
		var p2 = CSG.parseOptionAs3DVector(options, "end", [0, 1, 0]);
		var radius = CSG.parseOptionAsFloat(options, "radius", 1);
		var direction = p2.minus(p1);
		var defaultnormal;
		if(Math.abs(direction.x) > Math.abs(direction.y)) {
			defaultnormal = new CSG.Vector3D(0, 1, 0);
		} else {
			defaultnormal = new CSG.Vector3D(1, 0, 0);
		}
		var normal = CSG.parseOptionAs3DVector(options, "normal", defaultnormal);
		var resolution = CSG.parseOptionAsInt(options, "resolution", CSG.defaultResolution3D);
		if(resolution < 4) resolution = 4;
		var polygons = [];
		var qresolution = Math.floor(0.25 * resolution);
		var length = direction.length();
		if(length < 1e-10) {
			return CSG.sphere({
				center: p1,
				radius: radius,
				resolution: resolution
			});
		}
		var zvector = direction.unit().times(radius);
		var xvector = zvector.cross(normal).unit().times(radius);
		var yvector = xvector.cross(zvector).unit().times(radius);
		var prevcylinderpoint;
		for(var slice1 = 0; slice1 <= resolution; slice1++) {
			var angle = Math.PI * 2.0 * slice1 / resolution;
			var cylinderpoint = xvector.times(Math.cos(angle)).plus(yvector.times(Math.sin(angle)));
			if(slice1 > 0) {
				// cylinder vertices:
				var vertices = [];
				vertices.push(new CSG.Vertex(p1.plus(cylinderpoint)));
				vertices.push(new CSG.Vertex(p1.plus(prevcylinderpoint)));
				vertices.push(new CSG.Vertex(p2.plus(prevcylinderpoint)));
				vertices.push(new CSG.Vertex(p2.plus(cylinderpoint)));
				polygons.push(new CSG.Polygon(vertices));
				var prevcospitch, prevsinpitch;
				for(var slice2 = 0; slice2 <= qresolution; slice2++) {
					var pitch = 0.5 * Math.PI * slice2 / qresolution;
					//var pitch = Math.asin(slice2/qresolution);
					var cospitch = Math.cos(pitch);
					var sinpitch = Math.sin(pitch);
					if(slice2 > 0) {
						vertices = [];
						vertices.push(new CSG.Vertex(p1.plus(prevcylinderpoint.times(prevcospitch).minus(zvector.times(prevsinpitch)))));
						vertices.push(new CSG.Vertex(p1.plus(cylinderpoint.times(prevcospitch).minus(zvector.times(prevsinpitch)))));
						if(slice2 < qresolution) {
							vertices.push(new CSG.Vertex(p1.plus(cylinderpoint.times(cospitch).minus(zvector.times(sinpitch)))));
						}
						vertices.push(new CSG.Vertex(p1.plus(prevcylinderpoint.times(cospitch).minus(zvector.times(sinpitch)))));
						polygons.push(new CSG.Polygon(vertices));
						vertices = [];
						vertices.push(new CSG.Vertex(p2.plus(prevcylinderpoint.times(prevcospitch).plus(zvector.times(prevsinpitch)))));
						vertices.push(new CSG.Vertex(p2.plus(cylinderpoint.times(prevcospitch).plus(zvector.times(prevsinpitch)))));
						if(slice2 < qresolution) {
							vertices.push(new CSG.Vertex(p2.plus(cylinderpoint.times(cospitch).plus(zvector.times(sinpitch)))));
						}
						vertices.push(new CSG.Vertex(p2.plus(prevcylinderpoint.times(cospitch).plus(zvector.times(sinpitch)))));
						vertices.reverse();
						polygons.push(new CSG.Polygon(vertices));
					}
					prevcospitch = cospitch;
					prevsinpitch = sinpitch;
				}
			}
			prevcylinderpoint = cylinderpoint;
		}
		var result = CSG.fromPolygons(polygons);
		var ray = zvector.unit();
		var axisX = xvector.unit();
		result.properties.roundedCylinder = new CSG.Properties();
		result.properties.roundedCylinder.start = new CSG.Connector(p1, ray.negated(), axisX);
		result.properties.roundedCylinder.end = new CSG.Connector(p2, ray, axisX);
		result.properties.roundedCylinder.facepoint = p1.plus(xvector);
		return result;
	};

	// Construct an axis-aligned solid rounded cuboid.
	// Parameters:
	//   center: center of cube (default [0,0,0])
	//   radius: radius of cube (default [1,1,1]), can be specified as scalar or as 3D vector
	//   roundradius: radius of rounded corners (default 0.2), must be a scalar
	//   resolution: determines the number of polygons per 360 degree revolution (default 8)
	//
	// Example code:
	//
	//     var cube = CSG.roundedCube({
	//       center: [0, 0, 0],
	//       radius: 1,
	//       roundradius: 0.2,
	//       resolution: 8,
	//     });
	CSG.roundedCube = function(options) {
		var center = CSG.parseOptionAs3DVector(options, "center", [0, 0, 0]);
		var cuberadius = CSG.parseOptionAs3DVector(options, "radius", [1, 1, 1]);
		var resolution = CSG.parseOptionAsInt(options, "resolution", CSG.defaultResolution3D);
		if(resolution < 4) resolution = 4;
		var roundradius = CSG.parseOptionAsFloat(options, "roundradius", 0.2);
		var innercuberadius = cuberadius;
		innercuberadius = innercuberadius.minus(new CSG.Vector3D(roundradius));
		var result = CSG.cube({
			center: center,
			radius: [cuberadius.x, innercuberadius.y, innercuberadius.z]
		});
		result = result.unionSub(CSG.cube({
			center: center,
			radius: [innercuberadius.x, cuberadius.y, innercuberadius.z]
		}), false, false);
		result = result.unionSub(CSG.cube({
			center: center,
			radius: [innercuberadius.x, innercuberadius.y, cuberadius.z]
		}), false, false);
		for(var level = 0; level < 2; level++) {
			var z = innercuberadius.z;
			if(level == 1) z = -z;
			var p1 = new CSG.Vector3D(innercuberadius.x, innercuberadius.y, z).plus(center);
			var p2 = new CSG.Vector3D(innercuberadius.x, -innercuberadius.y, z).plus(center);
			var p3 = new CSG.Vector3D(-innercuberadius.x, -innercuberadius.y, z).plus(center);
			var p4 = new CSG.Vector3D(-innercuberadius.x, innercuberadius.y, z).plus(center);
			var sphere = CSG.sphere({
				center: p1,
				radius: roundradius,
				resolution: resolution
			});
			result = result.unionSub(sphere, false, false);
			sphere = CSG.sphere({
				center: p2,
				radius: roundradius,
				resolution: resolution
			});
			result = result.unionSub(sphere, false, false);
			sphere = CSG.sphere({
				center: p3,
				radius: roundradius,
				resolution: resolution
			});
			result = result.unionSub(sphere, false, false);
			sphere = CSG.sphere({
				center: p4,
				radius: roundradius,
				resolution: resolution
			});
			result = result.unionSub(sphere, false, true);
			var cylinder = CSG.cylinder({
				start: p1,
				end: p2,
				radius: roundradius,
				resolution: resolution
			});
			result = result.unionSub(cylinder, false, false);
			cylinder = CSG.cylinder({
				start: p2,
				end: p3,
				radius: roundradius,
				resolution: resolution
			});
			result = result.unionSub(cylinder, false, false);
			cylinder = CSG.cylinder({
				start: p3,
				end: p4,
				radius: roundradius,
				resolution: resolution
			});
			result = result.unionSub(cylinder, false, false);
			cylinder = CSG.cylinder({
				start: p4,
				end: p1,
				radius: roundradius,
				resolution: resolution
			});
			result = result.unionSub(cylinder, false, false);
			if(level === 0) {
				var d = new CSG.Vector3D(0, 0, -2 * z);
				cylinder = CSG.cylinder({
					start: p1,
					end: p1.plus(d),
					radius: roundradius,
					resolution: resolution
				});
				result = result.unionSub(cylinder);
				cylinder = CSG.cylinder({
					start: p2,
					end: p2.plus(d),
					radius: roundradius,
					resolution: resolution
				});
				result = result.unionSub(cylinder);
				cylinder = CSG.cylinder({
					start: p3,
					end: p3.plus(d),
					radius: roundradius,
					resolution: resolution
				});
				result = result.unionSub(cylinder);
				cylinder = CSG.cylinder({
					start: p4,
					end: p4.plus(d),
					radius: roundradius,
					resolution: resolution
				});
				result = result.unionSub(cylinder, false, true);
			}
		}
		result = result.reTesselated();
		result.properties.roundedCube = new CSG.Properties();
		result.properties.roundedCube.center = new CSG.Vertex(center);
		result.properties.roundedCube.facecenters = [
			new CSG.Connector(new CSG.Vector3D([cuberadius.x, 0, 0]).plus(center), [1, 0, 0], [0, 0, 1]),
			new CSG.Connector(new CSG.Vector3D([-cuberadius.x, 0, 0]).plus(center), [-1, 0, 0], [0, 0, 1]),
			new CSG.Connector(new CSG.Vector3D([0, cuberadius.y, 0]).plus(center), [0, 1, 0], [0, 0, 1]),
			new CSG.Connector(new CSG.Vector3D([0, -cuberadius.y, 0]).plus(center), [0, -1, 0], [0, 0, 1]),
			new CSG.Connector(new CSG.Vector3D([0, 0, cuberadius.z]).plus(center), [0, 0, 1], [1, 0, 0]),
			new CSG.Connector(new CSG.Vector3D([0, 0, -cuberadius.z]).plus(center), [0, 0, -1], [1, 0, 0])];
		return result;
	};

	CSG.IsFloat = function(n) {
		return(!isNaN(n)) || (n === Infinity) || (n === -Infinity);
	};

	// solve 2x2 linear equation:
	// [ab][x] = [u]
	// [cd][y]   [v]
	CSG.solve2Linear = function(a, b, c, d, u, v) {
		var det = a * d - b * c;
		var invdet = 1.0 / det;
		var x = u * d - b * v;
		var y = -u * c + a * v;
		x *= invdet;
		y *= invdet;
		return [x, y];
	};

	// # class Vector3D
	// Represents a 3D vector.
	//
	// Example usage:
	//
	//     new CSG.Vector3D(1, 2, 3);
	//     new CSG.Vector3D([1, 2, 3]);
	//     new CSG.Vector3D({ x: 1, y: 2, z: 3 });
	//     new CSG.Vector3D(1, 2); // assumes z=0
	//     new CSG.Vector3D([1, 2]); // assumes z=0
	CSG.Vector3D = function(x, y, z) {
		if(arguments.length == 3) {
			this._x = parseFloat(x);
			this._y = parseFloat(y);
			this._z = parseFloat(z);
		} else if(arguments.length == 2) {
			this._x = parseFloat(x);
			this._y = parseFloat(y);
			this._z = 0;
		} else {
			var ok = true;
			if(arguments.length == 1) {
				if(typeof(x) == "object") {
					if(x instanceof CSG.Vector3D) {
						this._x = x._x;
						this._y = x._y;
						this._z = x._z;
					} else if(x instanceof CSG.Vector2D) {
						this._x = x._x;
						this._y = x._y;
						this._z = 0;
					} else if(x instanceof Array) {
						if((x.length < 2) || (x.length > 3)) {
							ok = false;
						} else {
							this._x = parseFloat(x[0]);
							this._y = parseFloat(x[1]);
							if(x.length == 3) {
								this._z = parseFloat(x[2]);
							} else {
								this._z = 0;
							}
						}
					} else if(('x' in x) && ('y' in x)) {
						this._x = parseFloat(x.x);
						this._y = parseFloat(x.y);
						if('z' in x) {
							this._z = parseFloat(x.z);
						} else {
							this._z = 0;
						}
					} else ok = false;
				} else {
					var v = parseFloat(x);
					this._x = v;
					this._y = v;
					this._z = v;
				}
			} else ok = false;
			if(ok) {
				if((!CSG.IsFloat(this._x)) || (!CSG.IsFloat(this._y)) || (!CSG.IsFloat(this._z))) ok = false;
			}
			if(!ok) {
				throw new Error("wrong arguments");
			}
		}
	};

	CSG.Vector3D.prototype = {
		get x() {
			return this._x;
		}, get y() {
			return this._y;
		}, get z() {
			return this._z;
		},

		set x(v) {
			throw new Error("Vector3D is immutable");
		}, set y(v) {
			throw new Error("Vector3D is immutable");
		}, set z(v) {
			throw new Error("Vector3D is immutable");
		},

		clone: function() {
			return new CSG.Vector3D(this);
		},

		negated: function() {
			return new CSG.Vector3D(-this._x, -this._y, -this._z);
		},

		abs: function() {
			return new CSG.Vector3D(Math.abs(this._x), Math.abs(this._y), Math.abs(this._z));
		},

		plus: function(a) {
			return new CSG.Vector3D(this._x + a._x, this._y + a._y, this._z + a._z);
		},

		minus: function(a) {
			return new CSG.Vector3D(this._x - a._x, this._y - a._y, this._z - a._z);
		},

		times: function(a) {
			return new CSG.Vector3D(this._x * a, this._y * a, this._z * a);
		},

		dividedBy: function(a) {
			return new CSG.Vector3D(this._x / a, this._y / a, this._z / a);
		},

		dot: function(a) {
			return this._x * a._x + this._y * a._y + this._z * a._z;
		},

		lerp: function(a, t) {
			return this.plus(a.minus(this).times(t));
		},

		lengthSquared: function() {
			return this.dot(this);
		},

		length: function() {
			return Math.sqrt(this.lengthSquared());
		},

		unit: function() {
			return this.dividedBy(this.length());
		},

		cross: function(a) {
			return new CSG.Vector3D(
			this._y * a._z - this._z * a._y, this._z * a._x - this._x * a._z, this._x * a._y - this._y * a._x);
		},

		distanceTo: function(a) {
			return this.minus(a).length();
		},

		distanceToSquared: function(a) {
			return this.minus(a).lengthSquared();
		},

		equals: function(a) {
			return(this._x == a._x) && (this._y == a._y) && (this._z == a._z);
		},

		// Right multiply by a 4x4 matrix (the vector is interpreted as a row vector)
		// Returns a new CSG.Vector3D
		multiply4x4: function(matrix4x4) {
			return matrix4x4.leftMultiply1x3Vector(this);
		},

		transform: function(matrix4x4) {
			return matrix4x4.leftMultiply1x3Vector(this);
		},

		toStlString: function() {
			return this._x + " " + this._y + " " + this._z;
		},

		toAMFString: function() {
			return "<x>" + this._x + "</x><y>" + this._y + "</y><z>" + this._z + "</z>";
		},

		toString: function() {
			return "(" + this._x.toFixed(2) + ", " + this._y.toFixed(2) + ", " + this._z.toFixed(2) + ")";
		},

		// find a vector that is somewhat perpendicular to this one
		randomNonParallelVector: function() {
			var abs = this.abs();
			if((abs._x <= abs._y) && (abs._x <= abs._z)) {
				return new CSG.Vector3D(1, 0, 0);
			} else if((abs._y <= abs._x) && (abs._y <= abs._z)) {
				return new CSG.Vector3D(0, 1, 0);
			} else {
				return new CSG.Vector3D(0, 0, 1);
			}
		},

		min: function(p) {
			return new CSG.Vector3D(
			Math.min(this._x, p._x), Math.min(this._y, p._y), Math.min(this._z, p._z));
		},

		max: function(p) {
			return new CSG.Vector3D(
			Math.max(this._x, p._x), Math.max(this._y, p._y), Math.max(this._z, p._z));
		}
	};

	// # class Vertex
	// Represents a vertex of a polygon. Use your own vertex class instead of this
	// one to provide additional features like texture coordinates and vertex
	// colors. Custom vertex classes need to provide a `pos` property
	// `flipped()`, and `interpolate()` methods that behave analogous to the ones
	// defined by `CSG.Vertex`.
	CSG.Vertex = function(pos) {
		this.pos = pos;
	};

	// create from an untyped object with identical property names:
	CSG.Vertex.fromObject = function(obj) {
		var pos = new CSG.Vector3D(obj.pos);
		return new CSG.Vertex(pos);
	};

	CSG.Vertex.prototype = {
		// Return a vertex with all orientation-specific data (e.g. vertex normal) flipped. Called when the
		// orientation of a polygon is flipped.
		flipped: function() {
			return this;
		},

		getTag: function() {
			var result = this.tag;
			if(!result) {
				result = CSG.getTag();
				this.tag = result;
			}
			return result;
		},

		// Create a new vertex between this vertex and `other` by linearly
		// interpolating all properties using a parameter of `t`. Subclasses should
		// override this to interpolate additional properties.
		interpolate: function(other, t) {
			var newpos = this.pos.lerp(other.pos, t);
			return new CSG.Vertex(newpos);
		},

		// Affine transformation of vertex. Returns a new CSG.Vertex
		transform: function(matrix4x4) {
			var newpos = this.pos.multiply4x4(matrix4x4);
			return new CSG.Vertex(newpos);
		},

		toStlString: function() {
			return "vertex " + this.pos.toStlString() + "\n";
		},

		toAMFString: function() {
			return "<vertex><coordinates>" + this.pos.toAMFString() + "</coordinates></vertex>\n";
		},

		toString: function() {
			return this.pos.toString();
		}
	};

	// # class Plane
	// Represents a plane in 3D space.
	CSG.Plane = function(normal, w) {
		this.normal = normal;
		this.w = w;
	};

	// create from an untyped object with identical property names:
	CSG.Plane.fromObject = function(obj) {
		var normal = new CSG.Vector3D(obj.normal);
		var w = parseFloat(obj.w);
		return new CSG.Plane(normal, w);
	};

	// `CSG.Plane.EPSILON` is the tolerance used by `splitPolygon()` to decide if a
	// point is on the plane.
	CSG.Plane.EPSILON = 1e-5;

	CSG.Plane.fromVector3Ds = function(a, b, c) {
		var n = b.minus(a).cross(c.minus(a)).unit();
		return new CSG.Plane(n, n.dot(a));
	};

	// like fromVector3Ds, but allow the vectors to be on one point or one line
	// in such a case a random plane through the given points is constructed
	CSG.Plane.anyPlaneFromVector3Ds = function(a, b, c) {
		var v1 = b.minus(a);
		var v2 = c.minus(a);
		if(v1.length() < 1e-5) {
			v1 = v2.randomNonParallelVector();
		}
		if(v2.length() < 1e-5) {
			v2 = v1.randomNonParallelVector();
		}
		var normal = v1.cross(v2);
		if(normal.length() < 1e-5) {
			// this would mean that v1 == v2.negated()
			v2 = v1.randomNonParallelVector();
			normal = v1.cross(v2);
		}
		normal = normal.unit();
		return new CSG.Plane(normal, normal.dot(a));
	};

	CSG.Plane.fromPoints = function(a, b, c) {
		a = new CSG.Vector3D(a);
		b = new CSG.Vector3D(b);
		c = new CSG.Vector3D(c);
		return CSG.Plane.fromVector3Ds(a, b, c);
	};

	CSG.Plane.fromNormalAndPoint = function(normal, point) {
		normal = new CSG.Vector3D(normal);
		point = new CSG.Vector3D(point);
		normal = normal.unit();
		var w = point.dot(normal);
		return new CSG.Plane(normal, w);
	};

	CSG.Plane.prototype = {
		flipped: function() {
			return new CSG.Plane(this.normal.negated(), -this.w);
		},

		getTag: function() {
			var result = this.tag;
			if(!result) {
				result = CSG.getTag();
				this.tag = result;
			}
			return result;
		},

		equals: function(n) {
			return this.normal.equals(n.normal) && this.w == n.w;
		},

		transform: function(matrix4x4) {
			var ismirror = matrix4x4.isMirroring();
			// get two vectors in the plane:
			var r = this.normal.randomNonParallelVector();
			var u = this.normal.cross(r);
			var v = this.normal.cross(u);
			// get 3 points in the plane:
			var point1 = this.normal.times(this.w);
			var point2 = point1.plus(u);
			var point3 = point1.plus(v);
			// transform the points:
			point1 = point1.multiply4x4(matrix4x4);
			point2 = point2.multiply4x4(matrix4x4);
			point3 = point3.multiply4x4(matrix4x4);
			// and create a new plane from the transformed points:
			var newplane = CSG.Plane.fromVector3Ds(point1, point2, point3);
			if(ismirror) {
				// the transform is mirroring
				// We should mirror the plane:
				newplane = newplane.flipped();
			}
			return newplane;
		},

		// Returns object:
		// .type:
		//   0: coplanar-front
		//   1: coplanar-back
		//   2: front
		//   3: back
		//   4: spanning
		// In case the polygon is spanning, returns:
		// .front: a CSG.Polygon of the front part
		// .back: a CSG.Polygon of the back part
		splitPolygon: function(polygon) {
			var result = {
				type: null,
				front: null,
				back: null
			};
			// cache in local vars (speedup):
			var planenormal = this.normal;
			var vertices = polygon.vertices;
			var numvertices = vertices.length;
			if(polygon.plane.equals(this)) {
				result.type = 0;
			} else {
				var EPS = CSG.Plane.EPSILON;
				var thisw = this.w;
				var hasfront = false;
				var hasback = false;
				var vertexIsBack = [];
				var MINEPS = -EPS;
				for(var i = 0; i < numvertices; i++) {
					var t = planenormal.dot(vertices[i].pos) - thisw;
					var isback = (t < 0);
					vertexIsBack.push(isback);
					if(t > EPS) hasfront = true;
					if(t < MINEPS) hasback = true;
				}
				if((!hasfront) && (!hasback)) {
					// all points coplanar
					var t = planenormal.dot(polygon.plane.normal);
					result.type = (t >= 0) ? 0 : 1;
				} else if(!hasback) {
					result.type = 2;
				} else if(!hasfront) {
					result.type = 3;
				} else {
					// spanning
					result.type = 4;
					var frontvertices = [],
						backvertices = [];
					var isback = vertexIsBack[0];
					for(var vertexindex = 0; vertexindex < numvertices; vertexindex++) {
						var vertex = vertices[vertexindex];
						var nextvertexindex = vertexindex + 1;
						if(nextvertexindex >= numvertices) nextvertexindex = 0;
						var nextisback = vertexIsBack[nextvertexindex];
						if(isback == nextisback) {
							// line segment is on one side of the plane:
							if(isback) {
								backvertices.push(vertex);
							} else {
								frontvertices.push(vertex);
							}
						} else {
							// line segment intersects plane:
							var point = vertex.pos;
							var nextpoint = vertices[nextvertexindex].pos;
							var intersectionpoint = this.splitLineBetweenPoints(point, nextpoint);
							var intersectionvertex = new CSG.Vertex(intersectionpoint);
							if(isback) {
								backvertices.push(vertex);
								backvertices.push(intersectionvertex);
								frontvertices.push(intersectionvertex);
							} else {
								frontvertices.push(vertex);
								frontvertices.push(intersectionvertex);
								backvertices.push(intersectionvertex);
							}
						}
						isback = nextisback;
					} // for vertexindex
					// remove duplicate vertices:
					var EPS_SQUARED = CSG.Plane.EPSILON * CSG.Plane.EPSILON;
					if(backvertices.length >= 3) {
						var prevvertex = backvertices[backvertices.length - 1];
						for(var vertexindex = 0; vertexindex < backvertices.length; vertexindex++) {
							var vertex = backvertices[vertexindex];
							if(vertex.pos.distanceToSquared(prevvertex.pos) < EPS_SQUARED) {
								backvertices.splice(vertexindex, 1);
								vertexindex--;
							}
							prevvertex = vertex;
						}
					}
					if(frontvertices.length >= 3) {
						var prevvertex = frontvertices[frontvertices.length - 1];
						for(var vertexindex = 0; vertexindex < frontvertices.length; vertexindex++) {
							var vertex = frontvertices[vertexindex];
							if(vertex.pos.distanceToSquared(prevvertex.pos) < EPS_SQUARED) {
								frontvertices.splice(vertexindex, 1);
								vertexindex--;
							}
							prevvertex = vertex;
						}
					}
					if(frontvertices.length >= 3) {
						result.front = new CSG.Polygon(frontvertices, polygon.shared, polygon.plane);
					}
					if(backvertices.length >= 3) {
						result.back = new CSG.Polygon(backvertices, polygon.shared, polygon.plane);
					}
				}
			}
			return result;
		},

		// robust splitting of a line by a plane
		// will work even if the line is parallel to the plane
		splitLineBetweenPoints: function(p1, p2) {
			var direction = p2.minus(p1);
			var labda = (this.w - this.normal.dot(p1)) / this.normal.dot(direction);
			if(isNaN(labda)) labda = 0;
			if(labda > 1) labda = 1;
			if(labda < 0) labda = 0;
			var result = p1.plus(direction.times(labda));
			return result;
		},

		// returns CSG.Vector3D
		intersectWithLine: function(line3d) {
			return line3d.intersectWithPlane(this);
		},

		// intersection of two planes
		intersectWithPlane: function(plane) {
			return CSG.Line3D.fromPlanes(this, plane);
		},

		signedDistanceToPoint: function(point) {
			var t = this.normal.dot(point) - this.w;
			return t;
		},

		toString: function() {
			return "[normal: " + this.normal.toString() + ", w: " + this.w + "]";
		},

		mirrorPoint: function(point3d) {
			var distance = this.signedDistanceToPoint(point3d);
			var mirrored = point3d.minus(this.normal.times(distance * 2.0));
			return mirrored;
		}
	};


	// # class Polygon
	// Represents a convex polygon. The vertices used to initialize a polygon must
	// be coplanar and form a convex loop. They do not have to be `CSG.Vertex`
	// instances but they must behave similarly (duck typing can be used for
	// customization).
	//
	// Each convex polygon has a `shared` property, which is shared between all
	// polygons that are clones of each other or were split from the same polygon.
	// This can be used to define per-polygon properties (such as surface color).
	//
	// The plane of the polygon is calculated from the vertex coordinates
	// To avoid unnecessary recalculation, the plane can alternatively be
	// passed as the third argument
	CSG.Polygon = function(vertices, shared, plane) {
		this.vertices = vertices;
		if(!shared) shared = CSG.Polygon.defaultShared;
		this.shared = shared;
		//var numvertices = vertices.length;

		if(arguments.length >= 3) {
			this.plane = plane;
		} else {
			this.plane = CSG.Plane.fromVector3Ds(vertices[0].pos, vertices[1].pos, vertices[2].pos);
		}

		if(_CSGDEBUG) {
			this.checkIfConvex();
		}
	};

	// create from an untyped object with identical property names:
	CSG.Polygon.fromObject = function(obj) {
		var vertices = obj.vertices.map(function(v) {
			return CSG.Vertex.fromObject(v);
		});
		var shared = CSG.Polygon.Shared.fromObject(obj.shared);
		var plane = CSG.Plane.fromObject(obj.plane);
		return new CSG.Polygon(vertices, shared, plane);
	};

	CSG.Polygon.prototype = {
		// check whether the polygon is convex (it should be, otherwise we will get unexpected results)
		checkIfConvex: function() {
			if(!CSG.Polygon.verticesConvex(this.vertices, this.plane.normal)) {
				CSG.Polygon.verticesConvex(this.vertices, this.plane.normal);
				throw new Error("Not convex!");
			}
		},

		/**
		 * @param {Array} color [red, green, blue, alpha] color values are float numbers 0..1
		 * @return {CSG.Polygon} The current polygon
		 */
		setColor: function(red, green, blue, alpha) {
			var color = red instanceof Array ? red : [red||0, green||0, blue||0, isNaN(alpha) ? 1. : alpha];
			this.shared = new CSG.Polygon.Shared(color);
			return this;
		},

		// Extrude a polygon into the direction offsetvector
		// Returns a CSG object
		extrude: function(offsetvector) {
			var newpolygons = [];

			var polygon1 = this;
			var direction = polygon1.plane.normal.dot(offsetvector);
			if(direction > 0) {
				polygon1 = polygon1.flipped();
			}
			newpolygons.push(polygon1);
			var polygon2 = polygon1.translate(offsetvector);
			var numvertices = this.vertices.length;
			for(var i = 0; i < numvertices; i++) {
				var sidefacepoints = [];
				var nexti = (i < (numvertices - 1)) ? i + 1 : 0;
				sidefacepoints.push(polygon1.vertices[i].pos);
				sidefacepoints.push(polygon2.vertices[i].pos);
				sidefacepoints.push(polygon2.vertices[nexti].pos);
				sidefacepoints.push(polygon1.vertices[nexti].pos);
				var sidefacepolygon = CSG.Polygon.createFromPoints(sidefacepoints, this.shared);
				newpolygons.push(sidefacepolygon);
			}
			polygon2 = polygon2.flipped();
			newpolygons.push(polygon2);
			return CSG.fromPolygons(newpolygons);
		},

		translate: function(offset) {
			return this.transform(CSG.Matrix4x4.translation(offset));
		},

		// returns an array with a CSG.Vector3D (center point) and a radius
		boundingSphere: function() {
			if(!this.cachedBoundingSphere) {
				var box = this.boundingBox();
				var middle = box[0].plus(box[1]).times(0.5);
				var radius3 = box[1].minus(middle);
				var radius = radius3.length();
				this.cachedBoundingSphere = [middle, radius];
			}
			return this.cachedBoundingSphere;
		},

		// returns an array of two CSG.Vector3Ds (minimum coordinates and maximum coordinates)
		boundingBox: function() {
			if(!this.cachedBoundingBox) {
				var minpoint, maxpoint;
				var vertices = this.vertices;
				var numvertices = vertices.length;
				if(numvertices === 0) {
					minpoint = new CSG.Vector3D(0, 0, 0);
				} else {
					minpoint = vertices[0].pos;
				}
				maxpoint = minpoint;
				for(var i = 1; i < numvertices; i++) {
					var point = vertices[i].pos;
					minpoint = minpoint.min(point);
					maxpoint = maxpoint.max(point);
				}
				this.cachedBoundingBox = [minpoint, maxpoint];
			}
			return this.cachedBoundingBox;
		},

		flipped: function() {
			var newvertices = this.vertices.map(function(v) {
				return v.flipped();
			});
			newvertices.reverse();
			var newplane = this.plane.flipped();
			return new CSG.Polygon(newvertices, this.shared, newplane);
		},

		// Affine transformation of polygon. Returns a new CSG.Polygon
		transform: function(matrix4x4) {
			var newvertices = this.vertices.map(function(v) {
				return v.transform(matrix4x4);
			});
			var newplane = this.plane.transform(matrix4x4);
			var scalefactor = matrix4x4.elements[0] * matrix4x4.elements[5] * matrix4x4.elements[10];
			if(scalefactor < 0) {
				// the transformation includes mirroring. We need to reverse the vertex order
				// in order to preserve the inside/outside orientation:
				newvertices.reverse();
			}
			return new CSG.Polygon(newvertices, this.shared, newplane);
		},

		toStlString: function() {
			var result = "";
			if(this.vertices.length >= 3) // should be!
			{
				// STL requires triangular polygons. If our polygon has more vertices, create
				// multiple triangles:
				var firstVertexStl = this.vertices[0].toStlString();
				for(var i = 0; i < this.vertices.length - 2; i++) {
					result += "facet normal " + this.plane.normal.toStlString() + "\nouter loop\n";
					result += firstVertexStl;
					result += this.vertices[i + 1].toStlString();
					result += this.vertices[i + 2].toStlString();
					result += "endloop\nendfacet\n";
				}
			}
			return result;
		},

		toString: function() {
			var result = "Polygon plane: " + this.plane.toString() + "\n";
			this.vertices.map(function(vertex) {
				result += "  " + vertex.toString() + "\n";
			});
			return result;
		},

		// project the 3D polygon onto a plane
		projectToOrthoNormalBasis: function(orthobasis) {
			var points2d = this.vertices.map(function(vertex) {
				return orthobasis.to2D(vertex.pos);
			});
			var result = CAG.fromPointsNoCheck(points2d);
			var area = result.area();
			if(Math.abs(area) < 1e-5) {
				// the polygon was perpendicular to the orthnormal plane. The resulting 2D polygon would be degenerate
				// return an empty area instead:
				result = new CAG();
			} else if(area < 0) {
				result = result.flipped();
			}
			return result;
		},

		/**
		 * Creates solid from slices (CSG.Polygon) by generating walls
		 * @param {Object} options Solid generating options
		 *	- numslices {Number} Number of slices to be generated
		 *	- callback(t, slice) {Function} Callback function generating slices.
		 *			arguments: t = [0..1], slice = [0..numslices - 1]
		 *			return: CSG.Polygon or null to skip
		 *	- loop {Boolean} no flats, only walls, it's used to generate solids like a tor
		 *
		 *	by Eduard Bespalov AKA tedbeer (2013)
		 */
		solidFromSlices: function(options) {
			var polygons = [],
				csg = null,
				prev = null,
				bottom = null,
				top = null,
				numSlices = 2,
				bLoop = false,
				fnCallback,
				flipped = null;

			if (options) {
				bLoop = Boolean(options['loop']);

				if (options.numslices)
					numSlices = options.numslices;

				if (options.callback)
					fnCallback = options.callback;
			}
			if (!fnCallback) {
				var square = new CSG.Polygon.createFromPoints([
							[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0]
						]);
				fnCallback = function(t, slice) {
					return t == 0 || t == 1 ? square.translate([0,0,t]) : null;
				}
			}
			for(var i = 0, iMax = numSlices - 1; i <= iMax; i++) {
				csg = fnCallback.call(this, i / iMax, i);
				if (csg) {
					if (!(csg instanceof CSG.Polygon)) {
						throw new Error("CSG.Polygon.solidFromSlices callback error: CSG.Polygon expected");
					}
					csg.checkIfConvex();

					if (prev) {//generate walls
						if (flipped === null) {//not generated yet
							flipped = prev.plane.signedDistanceToPoint(csg.vertices[0].pos) < 0;
						}
						this._addWalls(polygons, prev, csg, flipped);

					} else {//the first - will be a bottom
						bottom = csg;
					}
					prev = csg;
				} //callback can return null to skip that slice
			}
			top = csg;

			if (bLoop) {
				var bSameTopBottom = bottom.vertices.length == top.vertices.length &&
									bottom.vertices.every(function(v, index){
										return v.pos.equals(top.vertices[index].pos)
									});
				//if top and bottom are not the same -
				//generate walls between them
				if (!bSameTopBottom) {
					this._addWalls(polygons, top, bottom, flipped);
				} //else - already generated
			} else {
				//save top and bottom
				//TODO: flip if necessary
				polygons.unshift(flipped ? bottom : bottom.flipped());
				polygons.push(flipped ? top.flipped() : top);
			}
			return CSG.fromPolygons(polygons);
		},
		/**
		 *
		 * @param walls Array of wall polygons
		 * @param bottom Bottom polygon
		 * @param top Top polygon
		 */
		_addWalls: function(walls, bottom, top, bFlipped) {
			var bottomPoints = bottom.vertices.slice(0),//make a copy
				topPoints = top.vertices.slice(0),//make a copy
				color = top.shared || null;

			//check if bottom perimeter is closed
			if (!bottomPoints[0].pos.equals(bottomPoints[bottomPoints.length - 1].pos)) {
				bottomPoints.push(bottomPoints[0]);
			}

			//check if top perimeter is closed
			if (!topPoints[0].pos.equals(topPoints[topPoints.length - 1].pos)) {
				topPoints.push(topPoints[0]);
			}
			if (bFlipped) {
				bottomPoints = bottomPoints.reverse();
				topPoints = topPoints.reverse();
			}

			var iTopLen = topPoints.length - 1,
				iBotLen = bottomPoints.length - 1,
				iExtra = iTopLen - iBotLen, //how many extra triangles we need
				bMoreTops = iExtra > 0,
				bMoreBottoms = iExtra < 0;

			var aMin = []; //indexes to start extra triangles (polygon with minimal square)
			//init - we need exactly /iExtra/ small triangles
			for (var i = Math.abs(iExtra); i > 0; i--) {
				aMin.push({len: Infinity, index: -1});
			}

			var len;
			if (bMoreBottoms) {
				for (var i = 0; i < iBotLen; i++) {
					len = bottomPoints[i].pos.distanceToSquared(bottomPoints[i+1].pos);
					//find the element to replace
					for (var j = aMin.length - 1; j >= 0; j--) {
						if (aMin[j].len > len) {
							aMin[j].len = len;
							aMin.index = j;
							break;
						}
					}//for
				}
			} else if (bMoreTops) {
				for (var i = 0; i < iTopLen; i++) {
					len = topPoints[i].pos.distanceToSquared(topPoints[i+1].pos);
					//find the element to replace
					for (var j = aMin.length - 1; j >= 0; j--) {
						if (aMin[j].len > len) {
							aMin[j].len = len;
							aMin.index = j;
							break;
						}
					}//for
				}
			}//if
			//sort by index
			aMin.sort(fnSortByIndex);
			var getTriangle = function addWallsPutTriangle (pointA, pointB, pointC, color) {
				return new CSG.Polygon([pointA, pointB, pointC], color);
				//return bFlipped ? triangle.flipped() : triangle;
			};

			var bpoint = bottomPoints[0],
				tpoint = topPoints[0],
				secondPoint,
				nBotFacet, nTopFacet; //length of triangle facet side
			for (var iB = 0, iT = 0, iMax = iTopLen + iBotLen; iB + iT < iMax;) {
				if (aMin.length) {
					if (bMoreTops && iT == aMin[0].index) {//one vertex is on the bottom, 2 - on the top
						secondPoint = topPoints[++iT];
						//console.log('<<< extra top: ' + secondPoint + ', ' + tpoint + ', bottom: ' + bpoint);
						walls.push(getTriangle(
							secondPoint, tpoint, bpoint, color
						));
						tpoint = secondPoint;
						aMin.shift();
						continue;
					} else if (bMoreBottoms && iB == aMin[0].index) {
						secondPoint = bottomPoints[++iB];
						walls.push(getTriangle(
							tpoint, bpoint, secondPoint, color
						));
						bpoint = secondPoint;
						aMin.shift();
						continue;
					}
				}
				//choose the shortest path
				if (iB < iBotLen) { //one vertex is on the top, 2 - on the bottom
					nBotFacet = tpoint.pos.distanceToSquared(bottomPoints[iB+1].pos);
				} else {
					nBotFacet = Infinity;
				}
				if (iT < iTopLen) { //one vertex is on the bottom, 2 - on the top
					nTopFacet = bpoint.pos.distanceToSquared(topPoints[iT+1].pos);
				} else {
					nTopFacet = Infinity;
				}
				if (nBotFacet <= nTopFacet) {
					secondPoint = bottomPoints[++iB];
					walls.push(getTriangle(
						tpoint, bpoint, secondPoint, color
					));
					bpoint = secondPoint;
				} else if (iT < iTopLen) { //nTopFacet < Infinity
					secondPoint = topPoints[++iT];
					//console.log('<<< top: ' + secondPoint + ', ' + tpoint + ', bottom: ' + bpoint);
					walls.push(getTriangle(
						secondPoint, tpoint, bpoint, color
					));
					tpoint = secondPoint;
				};
			}
			return walls;
		}
	};

	CSG.Polygon.verticesConvex = function(vertices, planenormal) {
		var numvertices = vertices.length;
		if(numvertices > 2) {
			var prevprevpos = vertices[numvertices - 2].pos;
			var prevpos = vertices[numvertices - 1].pos;
			for(var i = 0; i < numvertices; i++) {
				var pos = vertices[i].pos;
				if(!CSG.Polygon.isConvexPoint(prevprevpos, prevpos, pos, planenormal)) {
					return false;
				}
				prevprevpos = prevpos;
				prevpos = pos;
			}
		}
		return true;
	};

	// Create a polygon from the given points
	CSG.Polygon.createFromPoints = function(points, shared, plane) {
		var normal;
		if(arguments.length < 3) {
			// initially set a dummy vertex normal:
			normal = new CSG.Vector3D(0, 0, 0);
		} else {
			normal = plane.normal;
		}
		var vertices = [];
		points.map(function(p) {
			var vec = new CSG.Vector3D(p);
			var vertex = new CSG.Vertex(vec);
			vertices.push(vertex);
		});
		var polygon;
		if(arguments.length < 3) {
			polygon = new CSG.Polygon(vertices, shared);
		} else {
			polygon = new CSG.Polygon(vertices, shared, plane);
		}
		return polygon;
	};

	// calculate whether three points form a convex corner
	//  prevpoint, point, nextpoint: the 3 coordinates (CSG.Vector3D instances)
	//  normal: the normal vector of the plane
	CSG.Polygon.isConvexPoint = function(prevpoint, point, nextpoint, normal) {
		var crossproduct = point.minus(prevpoint).cross(nextpoint.minus(point));
		var crossdotnormal = crossproduct.dot(normal);
		return(crossdotnormal >= 0);
	};

	CSG.Polygon.isStrictlyConvexPoint = function(prevpoint, point, nextpoint, normal) {
		var crossproduct = point.minus(prevpoint).cross(nextpoint.minus(point));
		var crossdotnormal = crossproduct.dot(normal);
		return(crossdotnormal >= 1e-5);
	};

	// # class CSG.Polygon.Shared
	// Holds the shared properties for each polygon (currently only color)
	CSG.Polygon.Shared = function(color) {
		this.color = color;
	};

	CSG.Polygon.Shared.fromObject = function(obj) {
		return new CSG.Polygon.Shared(obj.color);
	};

	CSG.Polygon.Shared.prototype = {
		getTag: function() {
			var result = this.tag;
			if(!result) {
				result = CSG.getTag();
				this.tag = result;
			}
			return result;
		},
		// get a string uniquely identifying this object
		getHash: function() {
			if(!this.color) return "null";
			return "" + this.color[0] + "/" + this.color[1] + "/" + this.color[2] + "/" + this.color[3];
		}
	};

	CSG.Polygon.defaultShared = new CSG.Polygon.Shared(null);

	// # class PolygonTreeNode
	// This class manages hierarchical splits of polygons
	// At the top is a root node which doesn hold a polygon, only child PolygonTreeNodes
	// Below that are zero or more 'top' nodes; each holds a polygon. The polygons can be in different planes
	// splitByPlane() splits a node by a plane. If the plane intersects the polygon, two new child nodes
	// are created holding the splitted polygon.
	// getPolygons() retrieves the polygon from the tree. If for PolygonTreeNode the polygon is split but
	// the two split parts (child nodes) are still intact, then the unsplit polygon is returned.
	// This ensures that we can safely split a polygon into many fragments. If the fragments are untouched,
	//  getPolygons() will return the original unsplit polygon instead of the fragments.
	// remove() removes a polygon from the tree. Once a polygon is removed, the parent polygons are invalidated
	// since they are no longer intact.
	// constructor creates the root node:
	CSG.PolygonTreeNode = function() {
		this.parent = null;
		this.children = [];
		this.polygon = null;
		this.removed = false;
	};

	CSG.PolygonTreeNode.prototype = {
		// fill the tree with polygons. Should be called on the root node only; child nodes must
		// always be a derivate (split) of the parent node.
		addPolygons: function(polygons) {
			if(!this.isRootNode())
				// new polygons can only be added to root node; children can only be splitted polygons
				throw new Error("Assertion failed");
			var _this = this;
			polygons.map(function(polygon) {
				_this.addChild(polygon);
			});
		},

		// remove a node
		// - the siblings become toplevel nodes
		// - the parent is removed recursively
		remove: function() {
			if(!this.removed) {
				this.removed = true;

				if(_CSGDEBUG) {
					if(this.isRootNode()) throw new Error("Assertion failed"); // can't remove root node
					if(this.children.length) throw new Error("Assertion failed"); // we shouldn't remove nodes with children
				}

				// remove ourselves from the parent's children list:
				var parentschildren = this.parent.children;
				var i = parentschildren.indexOf(this);
				if(i < 0) throw new Error("Assertion failed");
				parentschildren.splice(i, 1);

				// invalidate the parent's polygon, and of all parents above it:
				this.parent.recursivelyInvalidatePolygon();
			}
		},

		isRemoved: function() {
			return this.removed;
		},

		isRootNode: function() {
			return !this.parent;
		},

		// invert all polygons in the tree. Call on the root node
		invert: function() {
			if(!this.isRootNode()) throw new Error("Assertion failed"); // can only call this on the root node
			this.invertSub();
		},

		getPolygon: function() {
			if(!this.polygon) throw new Error("Assertion failed"); // doesn't have a polygon, which means that it has been broken down
			return this.polygon;
		},

		getPolygons: function(result) {
			if(this.polygon) {
				// the polygon hasn't been broken yet. We can ignore the children and return our polygon:
				result.push(this.polygon);
			} else {
				// our polygon has been split up and broken, so gather all subpolygons from the children:
				var childpolygons = [];
				this.children.map(function(child) {
					child.getPolygons(childpolygons);
				});
				childpolygons.map(function(p) {
					result.push(p);
				});
			}
		},

		// split the node by a plane; add the resulting nodes to the frontnodes and backnodes array
		// If the plane doesn't intersect the polygon, the 'this' object is added to one of the arrays
		// If the plane does intersect the polygon, two new child nodes are created for the front and back fragments,
		//  and added to both arrays.
		splitByPlane: function(plane, coplanarfrontnodes, coplanarbacknodes, frontnodes, backnodes) {
			var children = this.children;
			var numchildren = children.length;
			if(numchildren > 0) {
				// if we have children, split the children
				for(var i = 0; i < numchildren; i++) {
					children[i].splitByPlane(plane, coplanarfrontnodes, coplanarbacknodes, frontnodes, backnodes);
				}
			} else {
				// no children. Split the polygon:
				var polygon = this.polygon;
				if(polygon) {
					var bound = polygon.boundingSphere();
					var sphereradius = bound[1] + 1e-4;
					var planenormal = plane.normal;
					var spherecenter = bound[0];
					var d = planenormal.dot(spherecenter) - plane.w;
					if(d > sphereradius) {
						frontnodes.push(this);
					} else if(d < -sphereradius) {
						backnodes.push(this);
					} else {
						var splitresult = plane.splitPolygon(polygon);
						switch(splitresult.type) {
						case 0:
							// coplanar front:
							coplanarfrontnodes.push(this);
							break;

						case 1:
							// coplanar back:
							coplanarbacknodes.push(this);
							break;

						case 2:
							// front:
							frontnodes.push(this);
							break;

						case 3:
							// back:
							backnodes.push(this);
							break;

						case 4:
							// spanning:
							if(splitresult.front) {
								var frontnode = this.addChild(splitresult.front);
								frontnodes.push(frontnode);
							}
							if(splitresult.back) {
								var backnode = this.addChild(splitresult.back);
								backnodes.push(backnode);
							}
							break;
						}
					}
				}
			}
		},


		// PRIVATE methods from here:
		// add child to a node
		// this should be called whenever the polygon is split
		// a child should be created for every fragment of the split polygon
		// returns the newly created child
		addChild: function(polygon) {
			var newchild = new CSG.PolygonTreeNode();
			newchild.parent = this;
			newchild.polygon = polygon;
			this.children.push(newchild);
			return newchild;
		},

		invertSub: function() {
			if(this.polygon) {
				this.polygon = this.polygon.flipped();
			}
			this.children.map(function(child) {
				child.invertSub();
			});
		},

		recursivelyInvalidatePolygon: function() {
			if(this.polygon) {
				this.polygon = null;
				if(this.parent) {
					this.parent.recursivelyInvalidatePolygon();
				}
			}
		}
	};



	// # class Tree
	// This is the root of a BSP tree
	// We are using this separate class for the root of the tree, to hold the PolygonTreeNode root
	// The actual tree is kept in this.rootnode
	CSG.Tree = function(polygons) {
		this.polygonTree = new CSG.PolygonTreeNode();
		this.rootnode = new CSG.Node(null);
		if(polygons) this.addPolygons(polygons);
	};

	CSG.Tree.prototype = {
		invert: function() {
			this.polygonTree.invert();
			this.rootnode.invert();
		},

		// Remove all polygons in this BSP tree that are inside the other BSP tree
		// `tree`.
		clipTo: function(tree, alsoRemovecoplanarFront) {
			alsoRemovecoplanarFront = alsoRemovecoplanarFront ? true : false;
			this.rootnode.clipTo(tree, alsoRemovecoplanarFront);
		},

		allPolygons: function() {
			var result = [];
			this.polygonTree.getPolygons(result);
			return result;
		},

		addPolygons: function(polygons) {
			var _this = this;
			var polygontreenodes = polygons.map(function(p) {
				return _this.polygonTree.addChild(p);
			});
			this.rootnode.addPolygonTreeNodes(polygontreenodes);
		}
	};

	// # class Node
	// Holds a node in a BSP tree. A BSP tree is built from a collection of polygons
	// by picking a polygon to split along.
	// Polygons are not stored directly in the tree, but in PolygonTreeNodes, stored in
	// this.polygontreenodes. Those PolygonTreeNodes are children of the owning
	// CSG.Tree.polygonTree
	// This is not a leafy BSP tree since there is
	// no distinction between internal and leaf nodes.
	CSG.Node = function(parent) {
		this.plane = null;
		this.front = null;
		this.back = null;
		this.polygontreenodes = [];
		this.parent = parent;
	};

	CSG.Node.prototype = {
		// Convert solid space to empty space and empty space to solid space.
		invert: function() {
			if(this.plane) this.plane = this.plane.flipped();
			if(this.front) this.front.invert();
			if(this.back) this.back.invert();
			var temp = this.front;
			this.front = this.back;
			this.back = temp;
		},

		// clip polygontreenodes to our plane
		// calls remove() for all clipped PolygonTreeNodes
		clipPolygons: function(polygontreenodes, alsoRemovecoplanarFront) {
			if(this.plane) {
				var backnodes = [];
				var frontnodes = [];
				var coplanarfrontnodes = alsoRemovecoplanarFront ? backnodes : frontnodes;
				var plane = this.plane;
				var numpolygontreenodes = polygontreenodes.length;
				for(var i = 0; i < numpolygontreenodes; i++) {
					var node = polygontreenodes[i];
					if(!node.isRemoved()) {
						node.splitByPlane(plane, coplanarfrontnodes, backnodes, frontnodes, backnodes);
					}
				}
				if(this.front && (frontnodes.length > 0)) {
					this.front.clipPolygons(frontnodes, alsoRemovecoplanarFront);
				}
				var numbacknodes = backnodes.length;
				if(this.back && (numbacknodes > 0)) {
					this.back.clipPolygons(backnodes, alsoRemovecoplanarFront);
				} else {
					// there's nothing behind this plane. Delete the nodes behind this plane:
					for(var i = 0; i < numbacknodes; i++) {
						backnodes[i].remove();
					}
				}
			}
		},

		// Remove all polygons in this BSP tree that are inside the other BSP tree
		// `tree`.
		clipTo: function(tree, alsoRemovecoplanarFront) {
			if(this.polygontreenodes.length > 0) {
				tree.rootnode.clipPolygons(this.polygontreenodes, alsoRemovecoplanarFront);
			}
			if(this.front) this.front.clipTo(tree, alsoRemovecoplanarFront);
			if(this.back) this.back.clipTo(tree, alsoRemovecoplanarFront);
		},

		addPolygonTreeNodes: function(polygontreenodes) {
			if(polygontreenodes.length === 0) return;
			var _this = this;
			if(!this.plane) {
				var bestplane = polygontreenodes[0].getPolygon().plane;
				/*
		  var parentnormals = [];
		  this.getParentPlaneNormals(parentnormals, 6);
	//parentnormals = [];
		  var numparentnormals = parentnormals.length;
		  var minmaxnormal = 1.0;
		  polygontreenodes.map(function(polygontreenode){
			var plane = polygontreenodes[0].getPolygon().plane;
			var planenormal = plane.normal;
			var maxnormaldot = -1.0;
			parentnormals.map(function(parentnormal){
			  var dot = parentnormal.dot(planenormal);
			  if(dot > maxnormaldot) maxnormaldot = dot;
			});
			if(maxnormaldot < minmaxnormal)
			{
			  minmaxnormal = maxnormaldot;
			  bestplane = plane;
			}
		  });
	*/
				this.plane = bestplane;
			}
			var frontnodes = [];
			var backnodes = [];
			polygontreenodes.map(function(polygontreenode) {
				polygontreenode.splitByPlane(_this.plane, _this.polygontreenodes, backnodes, frontnodes, backnodes);
			});
			if(frontnodes.length > 0) {
				if(!this.front) this.front = new CSG.Node(this);
				this.front.addPolygonTreeNodes(frontnodes);
			}
			if(backnodes.length > 0) {
				if(!this.back) this.back = new CSG.Node(this);
				this.back.addPolygonTreeNodes(backnodes);
			}
		},

		getParentPlaneNormals: function(normals, maxdepth) {
			if(maxdepth > 0) {
				if(this.parent) {
					normals.push(this.parent.plane.normal);
					this.parent.getParentPlaneNormals(normals, maxdepth - 1);
				}
			}
		}
	};

	//////////
	// # class Matrix4x4:
	// Represents a 4x4 matrix. Elements are specified in row order
	CSG.Matrix4x4 = function(elements) {
		if(arguments.length >= 1) {
			this.elements = elements;
		} else {
			// if no arguments passed: create unity matrix
			this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
		}
	};

	CSG.Matrix4x4.prototype = {
		plus: function(m) {
			var r = [];
			for(var i = 0; i < 16; i++) {
				r[i] = this.elements[i] + m.elements[i];
			}
			return new CSG.Matrix4x4(r);
		},

		minus: function(m) {
			var r = [];
			for(var i = 0; i < 16; i++) {
				r[i] = this.elements[i] - m.elements[i];
			}
			return new CSG.Matrix4x4(r);
		},

		// right multiply by another 4x4 matrix:
		multiply: function(m) {
			// cache elements in local variables, for speedup:
			var this0 = this.elements[0];
			var this1 = this.elements[1];
			var this2 = this.elements[2];
			var this3 = this.elements[3];
			var this4 = this.elements[4];
			var this5 = this.elements[5];
			var this6 = this.elements[6];
			var this7 = this.elements[7];
			var this8 = this.elements[8];
			var this9 = this.elements[9];
			var this10 = this.elements[10];
			var this11 = this.elements[11];
			var this12 = this.elements[12];
			var this13 = this.elements[13];
			var this14 = this.elements[14];
			var this15 = this.elements[15];
			var m0 = m.elements[0];
			var m1 = m.elements[1];
			var m2 = m.elements[2];
			var m3 = m.elements[3];
			var m4 = m.elements[4];
			var m5 = m.elements[5];
			var m6 = m.elements[6];
			var m7 = m.elements[7];
			var m8 = m.elements[8];
			var m9 = m.elements[9];
			var m10 = m.elements[10];
			var m11 = m.elements[11];
			var m12 = m.elements[12];
			var m13 = m.elements[13];
			var m14 = m.elements[14];
			var m15 = m.elements[15];

			var result = [];
			result[0] = this0 * m0 + this1 * m4 + this2 * m8 + this3 * m12;
			result[1] = this0 * m1 + this1 * m5 + this2 * m9 + this3 * m13;
			result[2] = this0 * m2 + this1 * m6 + this2 * m10 + this3 * m14;
			result[3] = this0 * m3 + this1 * m7 + this2 * m11 + this3 * m15;
			result[4] = this4 * m0 + this5 * m4 + this6 * m8 + this7 * m12;
			result[5] = this4 * m1 + this5 * m5 + this6 * m9 + this7 * m13;
			result[6] = this4 * m2 + this5 * m6 + this6 * m10 + this7 * m14;
			result[7] = this4 * m3 + this5 * m7 + this6 * m11 + this7 * m15;
			result[8] = this8 * m0 + this9 * m4 + this10 * m8 + this11 * m12;
			result[9] = this8 * m1 + this9 * m5 + this10 * m9 + this11 * m13;
			result[10] = this8 * m2 + this9 * m6 + this10 * m10 + this11 * m14;
			result[11] = this8 * m3 + this9 * m7 + this10 * m11 + this11 * m15;
			result[12] = this12 * m0 + this13 * m4 + this14 * m8 + this15 * m12;
			result[13] = this12 * m1 + this13 * m5 + this14 * m9 + this15 * m13;
			result[14] = this12 * m2 + this13 * m6 + this14 * m10 + this15 * m14;
			result[15] = this12 * m3 + this13 * m7 + this14 * m11 + this15 * m15;
			return new CSG.Matrix4x4(result);
		},

		clone: function() {
			var elements = this.elements.map(function(p) {
				return p;
			});
			return new CSG.Matrix4x4(elements);
		},

		// Right multiply the matrix by a CSG.Vector3D (interpreted as 3 row, 1 column)
		// (result = M*v)
		// Fourth element is taken as 1
		rightMultiply1x3Vector: function(v) {
			var v0 = v._x;
			var v1 = v._y;
			var v2 = v._z;
			var v3 = 1;
			var x = v0 * this.elements[0] + v1 * this.elements[1] + v2 * this.elements[2] + v3 * this.elements[3];
			var y = v0 * this.elements[4] + v1 * this.elements[5] + v2 * this.elements[6] + v3 * this.elements[7];
			var z = v0 * this.elements[8] + v1 * this.elements[9] + v2 * this.elements[10] + v3 * this.elements[11];
			var w = v0 * this.elements[12] + v1 * this.elements[13] + v2 * this.elements[14] + v3 * this.elements[15];
			// scale such that fourth element becomes 1:
			if(w != 1) {
				var invw = 1.0 / w;
				x *= invw;
				y *= invw;
				z *= invw;
			}
			return new CSG.Vector3D(x, y, z);
		},

		// Multiply a CSG.Vector3D (interpreted as 3 column, 1 row) by this matrix
		// (result = v*M)
		// Fourth element is taken as 1
		leftMultiply1x3Vector: function(v) {
			var v0 = v._x;
			var v1 = v._y;
			var v2 = v._z;
			var v3 = 1;
			var x = v0 * this.elements[0] + v1 * this.elements[4] + v2 * this.elements[8] + v3 * this.elements[12];
			var y = v0 * this.elements[1] + v1 * this.elements[5] + v2 * this.elements[9] + v3 * this.elements[13];
			var z = v0 * this.elements[2] + v1 * this.elements[6] + v2 * this.elements[10] + v3 * this.elements[14];
			var w = v0 * this.elements[3] + v1 * this.elements[7] + v2 * this.elements[11] + v3 * this.elements[15];
			// scale such that fourth element becomes 1:
			if(w != 1) {
				var invw = 1.0 / w;
				x *= invw;
				y *= invw;
				z *= invw;
			}
			return new CSG.Vector3D(x, y, z);
		},

		// Right multiply the matrix by a CSG.Vector2D (interpreted as 2 row, 1 column)
		// (result = M*v)
		// Fourth element is taken as 1
		rightMultiply1x2Vector: function(v) {
			var v0 = v.x;
			var v1 = v.y;
			var v2 = 0;
			var v3 = 1;
			var x = v0 * this.elements[0] + v1 * this.elements[1] + v2 * this.elements[2] + v3 * this.elements[3];
			var y = v0 * this.elements[4] + v1 * this.elements[5] + v2 * this.elements[6] + v3 * this.elements[7];
			var z = v0 * this.elements[8] + v1 * this.elements[9] + v2 * this.elements[10] + v3 * this.elements[11];
			var w = v0 * this.elements[12] + v1 * this.elements[13] + v2 * this.elements[14] + v3 * this.elements[15];
			// scale such that fourth element becomes 1:
			if(w != 1) {
				var invw = 1.0 / w;
				x *= invw;
				y *= invw;
				z *= invw;
			}
			return new CSG.Vector2D(x, y);
		},

		// Multiply a CSG.Vector2D (interpreted as 2 column, 1 row) by this matrix
		// (result = v*M)
		// Fourth element is taken as 1
		leftMultiply1x2Vector: function(v) {
			var v0 = v.x;
			var v1 = v.y;
			var v2 = 0;
			var v3 = 1;
			var x = v0 * this.elements[0] + v1 * this.elements[4] + v2 * this.elements[8] + v3 * this.elements[12];
			var y = v0 * this.elements[1] + v1 * this.elements[5] + v2 * this.elements[9] + v3 * this.elements[13];
			var z = v0 * this.elements[2] + v1 * this.elements[6] + v2 * this.elements[10] + v3 * this.elements[14];
			var w = v0 * this.elements[3] + v1 * this.elements[7] + v2 * this.elements[11] + v3 * this.elements[15];
			// scale such that fourth element becomes 1:
			if(w != 1) {
				var invw = 1.0 / w;
				x *= invw;
				y *= invw;
				z *= invw;
			}
			return new CSG.Vector2D(x, y);
		},

		// determine whether this matrix is a mirroring transformation
		isMirroring: function() {
			var u = new CSG.Vector3D(this.elements[0], this.elements[4], this.elements[8]);
			var v = new CSG.Vector3D(this.elements[1], this.elements[5], this.elements[9]);
			var w = new CSG.Vector3D(this.elements[2], this.elements[6], this.elements[10]);

			// for a true orthogonal, non-mirrored base, u.cross(v) == w
			// If they have an opposite direction then we are mirroring
			var mirrorvalue = u.cross(v).dot(w);
			var ismirror = (mirrorvalue < 0);
			return ismirror;
		}
	};

	// return the unity matrix
	CSG.Matrix4x4.unity = function() {
		return new CSG.Matrix4x4();
	};

	// Create a rotation matrix for rotating around the x axis
	CSG.Matrix4x4.rotationX = function(degrees) {
		var radians = degrees * Math.PI * (1.0 / 180.0);
		var cos = Math.cos(radians);
		var sin = Math.sin(radians);
		var els = [
		1, 0, 0, 0, 0, cos, sin, 0, 0, -sin, cos, 0, 0, 0, 0, 1];
		return new CSG.Matrix4x4(els);
	};

	// Create a rotation matrix for rotating around the y axis
	CSG.Matrix4x4.rotationY = function(degrees) {
		var radians = degrees * Math.PI * (1.0 / 180.0);
		var cos = Math.cos(radians);
		var sin = Math.sin(radians);
		var els = [
		cos, 0, -sin, 0, 0, 1, 0, 0, sin, 0, cos, 0, 0, 0, 0, 1];
		return new CSG.Matrix4x4(els);
	};

	// Create a rotation matrix for rotating around the z axis
	CSG.Matrix4x4.rotationZ = function(degrees) {
		var radians = degrees * Math.PI * (1.0 / 180.0);
		var cos = Math.cos(radians);
		var sin = Math.sin(radians);
		var els = [
		cos, sin, 0, 0, -sin, cos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
		return new CSG.Matrix4x4(els);
	};

	// Matrix for rotation about arbitrary point and axis
	CSG.Matrix4x4.rotation = function(rotationCenter, rotationAxis, degrees) {
		rotationCenter = new CSG.Vector3D(rotationCenter);
		rotationAxis = new CSG.Vector3D(rotationAxis);
		var rotationPlane = CSG.Plane.fromNormalAndPoint(rotationAxis, rotationCenter);
		var orthobasis = new CSG.OrthoNormalBasis(rotationPlane);
		var transformation = CSG.Matrix4x4.translation(rotationCenter.negated());
		transformation = transformation.multiply(orthobasis.getProjectionMatrix());
		transformation = transformation.multiply(CSG.Matrix4x4.rotationZ(degrees));
		transformation = transformation.multiply(orthobasis.getInverseProjectionMatrix());
		transformation = transformation.multiply(CSG.Matrix4x4.translation(rotationCenter));
		return transformation;
	};

	// Create an affine matrix for translation:
	CSG.Matrix4x4.translation = function(v) {
		// parse as CSG.Vector3D, so we can pass an array or a CSG.Vector3D
		var vec = new CSG.Vector3D(v);
		var els = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, vec.x, vec.y, vec.z, 1];
		return new CSG.Matrix4x4(els);
	};

	// Create an affine matrix for mirroring into an arbitrary plane:
	CSG.Matrix4x4.mirroring = function(plane) {
		var nx = plane.normal.x;
		var ny = plane.normal.y;
		var nz = plane.normal.z;
		var w = plane.w;
		var els = [
			(1.0 - 2.0 * nx * nx), (-2.0 * ny * nx), (-2.0 * nz * nx), 0,
			(-2.0 * nx * ny), (1.0 - 2.0 * ny * ny), (-2.0 * nz * ny), 0,
			(-2.0 * nx * nz), (-2.0 * ny * nz), (1.0 - 2.0 * nz * nz), 0,
			(-2.0 * nx * w), (-2.0 * ny * w), (-2.0 * nz * w), 1
		];
		return new CSG.Matrix4x4(els);
	};

	// Create an affine matrix for scaling:
	CSG.Matrix4x4.scaling = function(v) {
		// parse as CSG.Vector3D, so we can pass an array or a CSG.Vector3D
		var vec = new CSG.Vector3D(v);
		var els = [
		vec.x, 0, 0, 0, 0, vec.y, 0, 0, 0, 0, vec.z, 0, 0, 0, 0, 1];
		return new CSG.Matrix4x4(els);
	};

	///////////////////////////////////////////////////
	// # class Vector2D:
	// Represents a 2 element vector
	CSG.Vector2D = function(x, y) {
		if(arguments.length == 2) {
			this._x = parseFloat(x);
			this._y = parseFloat(y);
		} else {
			var ok = true;
			if(arguments.length == 1) {
				if(typeof(x) == "object") {
					if(x instanceof CSG.Vector2D) {
						this._x = x._x;
						this._y = x._y;
					} else if(x instanceof Array) {
						this._x = parseFloat(x[0]);
						this._y = parseFloat(x[1]);
					} else if(('x' in x) && ('y' in x)) {
						this._x = parseFloat(x.x);
						this._y = parseFloat(x.y);
					} else ok = false;
				} else {
					var v = parseFloat(x);
					this._x = v;
					this._y = v;
				}
			} else ok = false;
			if(ok) {
				if((!CSG.IsFloat(this._x)) || (!CSG.IsFloat(this._y))) ok = false;
			}
			if(!ok) {
				throw new Error("wrong arguments");
			}
		}
	};

	CSG.Vector2D.fromAngle = function(radians) {
		return CSG.Vector2D.fromAngleRadians(radians);
	};

	CSG.Vector2D.fromAngleDegrees = function(degrees) {
		var radians = Math.PI * degrees / 180;
		return CSG.Vector2D.fromAngleRadians(radians);
	};

	CSG.Vector2D.fromAngleRadians = function(radians) {
		return new CSG.Vector2D(Math.cos(radians), Math.sin(radians));
	};

	CSG.Vector2D.prototype = {
		get x() {
			return this._x;
		}, get y() {
			return this._y;
		},

		set x(v) {
			throw new Error("Vector2D is immutable");
		}, set y(v) {
			throw new Error("Vector2D is immutable");
		},

		// extend to a 3D vector by adding a z coordinate:
		toVector3D: function(z) {
			return new CSG.Vector3D(this._x, this._y, z);
		},

		equals: function(a) {
			return(this._x == a._x) && (this._y == a._y);
		},

		clone: function() {
			return new CSG.Vector2D(this._x, this._y);
		},

		negated: function() {
			return new CSG.Vector2D(-this._x, -this._y);
		},

		plus: function(a) {
			return new CSG.Vector2D(this._x + a._x, this._y + a._y);
		},

		minus: function(a) {
			return new CSG.Vector2D(this._x - a._x, this._y - a._y);
		},

		times: function(a) {
			return new CSG.Vector2D(this._x * a, this._y * a);
		},

		dividedBy: function(a) {
			return new CSG.Vector2D(this._x / a, this._y / a);
		},

		dot: function(a) {
			return this._x * a._x + this._y * a._y;
		},

		lerp: function(a, t) {
			return this.plus(a.minus(this).times(t));
		},

		length: function() {
			return Math.sqrt(this.dot(this));
		},

		distanceTo: function(a) {
			return this.minus(a).length();
		},

		distanceToSquared: function(a) {
			return this.minus(a).lengthSquared();
		},

		lengthSquared: function() {
			return this.dot(this);
		},

		unit: function() {
			return this.dividedBy(this.length());
		},

		cross: function(a) {
			return this._x * a._y - this._y * a._x;
		},

		// returns the vector rotated by 90 degrees clockwise
		normal: function() {
			return new CSG.Vector2D(this._y, -this._x);
		},

		// Right multiply by a 4x4 matrix (the vector is interpreted as a row vector)
		// Returns a new CSG.Vector2D
		multiply4x4: function(matrix4x4) {
			return matrix4x4.leftMultiply1x2Vector(this);
		},

		transform: function(matrix4x4) {
			return matrix4x4.leftMultiply1x2Vector(this);
		},

		angle: function() {
			return this.angleRadians();
		},

		angleDegrees: function() {
			var radians = this.angleRadians();
			return 180 * radians / Math.PI;
		},

		angleRadians: function() {
			// y=sin, x=cos
			return Math.atan2(this._y, this._x);
		},

		min: function(p) {
			return new CSG.Vector2D(
			Math.min(this._x, p._x), Math.min(this._y, p._y));
		},

		max: function(p) {
			return new CSG.Vector2D(
			Math.max(this._x, p._x), Math.max(this._y, p._y));
		},

		toString: function() {
			return "("+this._x.toFixed(2)+", "+this._y.toFixed(2)+")";
		}
	};


	// # class Line2D
	// Represents a directional line in 2D space
	// A line is parametrized by its normal vector (perpendicular to the line, rotated 90 degrees counter clockwise)
	// and w. The line passes through the point <normal>.times(w).
	// normal must be a unit vector!
	// Equation: p is on line if normal.dot(p)==w
	CSG.Line2D = function(normal, w) {
		normal = new CSG.Vector2D(normal);
		w = parseFloat(w);
		var l = normal.length();
		// normalize:
		w *= l;
		normal = normal.times(1.0 / l);
		this.normal = normal;
		this.w = w;
	};

	CSG.Line2D.fromPoints = function(p1, p2) {
		p1 = new CSG.Vector2D(p1);
		p2 = new CSG.Vector2D(p2);
		var direction = p2.minus(p1);
		var normal = direction.normal().negated().unit();
		var w = p1.dot(normal);
		return new CSG.Line2D(normal, w);
	};

	CSG.Line2D.prototype = {
		// same line but opposite direction:
		reverse: function() {
			return new CSG.Line2D(this.normal.negated(), -this.w);
		},

		equals: function(l) {
			return(l.normal.equals(this.normal) && (l.w == this.w));
		},

		origin: function() {
			return this.normal.times(this.w);
		},

		direction: function() {
			return this.normal.normal();
		},

		xAtY: function(y) {
			// (py == y) && (normal * p == w)
			// -> px = (w - normal._y * y) / normal.x
			var x = (this.w - this.normal._y * y) / this.normal.x;
			return x;
		},

		absDistanceToPoint: function(point) {
			point = new CSG.Vector2D(point);
			var point_projected = point.dot(this.normal);
			var distance = Math.abs(point_projected - this.w);
			return distance;
		},
		/*FIXME: has error - origin is not defined, the method is never used
		closestPoint: function(point) {
			point = new CSG.Vector2D(point);
			var vector = point.dot(this.direction());
			return origin.plus(vector);
		},
		*/

		// intersection between two lines, returns point as Vector2D
		intersectWithLine: function(line2d) {
			var point = CSG.solve2Linear(this.normal.x, this.normal.y, line2d.normal.x, line2d.normal.y, this.w, line2d.w);
			point = new CSG.Vector2D(point); // make  vector2d
			return point;
		},

		transform: function(matrix4x4) {
			var origin = new CSG.Vector2D(0, 0);
			var pointOnPlane = this.normal.times(this.w);
			var neworigin = origin.multiply4x4(matrix4x4);
			var neworiginPlusNormal = this.normal.multiply4x4(matrix4x4);
			var newnormal = neworiginPlusNormal.minus(neworigin);
			var newpointOnPlane = pointOnPlane.multiply4x4(matrix4x4);
			var neww = newnormal.dot(newpointOnPlane);
			return new CSG.Line2D(newnormal, neww);
		}
	};

	// # class Line3D
	// Represents a line in 3D space
	// direction must be a unit vector
	// point is a random point on the line
	CSG.Line3D = function(point, direction) {
		point = new CSG.Vector3D(point);
		direction = new CSG.Vector3D(direction);
		this.point = point;
		this.direction = direction.unit();
	};

	CSG.Line3D.fromPoints = function(p1, p2) {
		p1 = new CSG.Vector3D(p1);
		p2 = new CSG.Vector3D(p2);
		var direction = p2.minus(p1).unit();
		return new CSG.Line3D(p1, direction);
	};

	CSG.Line3D.fromPlanes = function(p1, p2) {
		var direction = p1.normal.cross(p2.normal);
		var l = direction.length();
		if(l < 1e-10) {
			throw new Error("Parallel planes");
		}
		direction = direction.times(1.0 / l);

		var mabsx = Math.abs(direction.x);
		var mabsy = Math.abs(direction.y);
		var mabsz = Math.abs(direction.z);
		var origin;
		if((mabsx >= mabsy) && (mabsx >= mabsz)) {
			// direction vector is mostly pointing towards x
			// find a point p for which x is zero:
			var r = CSG.solve2Linear(p1.normal.y, p1.normal.z, p2.normal.y, p2.normal.z, p1.w, p2.w);
			origin = new CSG.Vector3D(0, r[0], r[1]);
		} else if((mabsy >= mabsx) && (mabsy >= mabsz)) {
			// find a point p for which y is zero:
			var r = CSG.solve2Linear(p1.normal.x, p1.normal.z, p2.normal.x, p2.normal.z, p1.w, p2.w);
			origin = new CSG.Vector3D(r[0], 0, r[1]);
		} else {
			// find a point p for which z is zero:
			var r = CSG.solve2Linear(p1.normal.x, p1.normal.y, p2.normal.x, p2.normal.y, p1.w, p2.w);
			origin = new CSG.Vector3D(r[0], r[1], 0);
		}
		return new CSG.Line3D(origin, direction);
	};


	CSG.Line3D.prototype = {
		intersectWithPlane: function(plane) {
			// plane: plane.normal * p = plane.w
			// line: p=line.point + labda * line.direction
			var labda = (plane.w - plane.normal.dot(this.point)) / plane.normal.dot(this.direction);
			var point = this.point.plus(this.direction.times(labda));
			return point;
		},

		clone: function(line) {
			return new CSG.Line3D(this.point.clone(), this.direction.clone());
		},

		reverse: function() {
			return new CSG.Line3D(this.point.clone(), this.direction.negated());
		},

		transform: function(matrix4x4) {
			var newpoint = this.point.multiply4x4(matrix4x4);
			var pointPlusDirection = this.point.plus(this.direction);
			var newPointPlusDirection = pointPlusDirection.multiply4x4(matrix4x4);
			var newdirection = newPointPlusDirection.minus(newpoint);
			return new CSG.Line3D(newpoint, newdirection);
		},

		closestPointOnLine: function(point) {
			point = new CSG.Vector3D(point);
			var t = point.minus(this.point).dot(this.direction) / this.direction.dot(this.direction);
			var closestpoint = this.point.plus(this.direction.times(t));
			return closestpoint;
		},

		distanceToPoint: function(point) {
			point = new CSG.Vector3D(point);
			var closestpoint = this.closestPointOnLine(point);
			var distancevector = point.minus(closestpoint);
			var distance = distancevector.length();
			return distance;
		},

		equals: function(line3d) {
			if(!this.direction.equals(line3d.direction)) return false;
			var distance = this.distanceToPoint(line3d.point);
			if(distance > 1e-8) return false;
			return true;
		}
	};


	// # class OrthoNormalBasis
	// Reprojects points on a 3D plane onto a 2D plane
	// or from a 2D plane back onto the 3D plane
	CSG.OrthoNormalBasis = function(plane, rightvector) {
		if(arguments.length < 2) {
			// choose an arbitrary right hand vector, making sure it is somewhat orthogonal to the plane normal:
			rightvector = plane.normal.randomNonParallelVector();
		} else {
			rightvector = new CSG.Vector3D(rightvector);
		}
		this.v = plane.normal.cross(rightvector).unit();
		this.u = this.v.cross(plane.normal);
		this.plane = plane;
		this.planeorigin = plane.normal.times(plane.w);
	};

	// The z=0 plane, with the 3D x and y vectors mapped to the 2D x and y vector
	CSG.OrthoNormalBasis.Z0Plane = function() {
		var plane = new CSG.Plane(new CSG.Vector3D([0, 0, 1]), 0);
		return new CSG.OrthoNormalBasis(plane, new CSG.Vector3D([1, 0, 0]));
	};

	CSG.OrthoNormalBasis.prototype = {
		getProjectionMatrix: function() {
			return new CSG.Matrix4x4([
				this.u.x, this.v.x, this.plane.normal.x, 0,
				this.u.y, this.v.y, this.plane.normal.y, 0,
				this.u.z, this.v.z, this.plane.normal.z, 0,
				0, 0, -this.plane.w, 1]);
		},

		getInverseProjectionMatrix: function() {
			var p = this.plane.normal.times(this.plane.w);
			return new CSG.Matrix4x4([
				this.u.x, this.u.y, this.u.z, 0,
				this.v.x, this.v.y, this.v.z, 0,
				this.plane.normal.x, this.plane.normal.y, this.plane.normal.z, 0,
				p.x, p.y, p.z, 1]);
		},

		to2D: function(vec3) {
			return new CSG.Vector2D(vec3.dot(this.u), vec3.dot(this.v));
		},

		to3D: function(vec2) {
			return this.planeorigin.plus(this.u.times(vec2.x)).plus(this.v.times(vec2.y));
		},

		line3Dto2D: function(line3d) {
			var a = line3d.point;
			var b = line3d.direction.plus(a);
			var a2d = this.to2D(a);
			var b2d = this.to2D(b);
			return CSG.Line2D.fromPoints(a2d, b2d);
		},

		line2Dto3D: function(line2d) {
			var a = line2d.origin();
			var b = line2d.direction().plus(a);
			var a3d = this.to3D(a);
			var b3d = this.to3D(b);
			return CSG.Line3D.fromPoints(a3d, b3d);
		},

		transform: function(matrix4x4) {
			// todo: this may not work properly in case of mirroring
			var newplane = this.plane.transform(matrix4x4);
			var rightpoint_transformed = this.u.transform(matrix4x4);
			var origin_transformed = new CSG.Vector3D(0, 0, 0).transform(matrix4x4);
			var newrighthandvector = rightpoint_transformed.minus(origin_transformed);
			var newbasis = new CSG.OrthoNormalBasis(newplane, newrighthandvector);
			return newbasis;
		}
	};

	function insertSorted(array, element, comparefunc) {
		var leftbound = 0;
		var rightbound = array.length;
		while(rightbound > leftbound) {
			var testindex = Math.floor((leftbound + rightbound) / 2);
			var testelement = array[testindex];
			var compareresult = comparefunc(element, testelement);
			if(compareresult > 0) // element > testelement
			{
				leftbound = testindex + 1;
			} else {
				rightbound = testindex;
			}
		}
		array.splice(leftbound, 0, element);
	}

	// Get the x coordinate of a point with a certain y coordinate, interpolated between two
	// points (CSG.Vector2D).
	// Interpolation is robust even if the points have the same y coordinate
	CSG.interpolateBetween2DPointsForY = function(point1, point2, y) {
		var f1 = y - point1.y;
		var f2 = point2.y - point1.y;
		if(f2 < 0) {
			f1 = -f1;
			f2 = -f2;
		}
		var t;
		if(f1 <= 0) {
			t = 0.0;
		} else if(f1 >= f2) {
			t = 1.0;
		} else if(f2 < 1e-10) {
			t = 0.5;
		} else {
			t = f1 / f2;
		}
		var result = point1.x + t * (point2.x - point1.x);
		return result;
	};

	// Retesselation function for a set of coplanar polygons. See the introduction at the top of
	// this file.
	CSG.reTesselateCoplanarPolygons = function(sourcepolygons, destpolygons) {
		var EPS = 1e-5;

		var numpolygons = sourcepolygons.length;
		if(numpolygons > 0) {
			var plane = sourcepolygons[0].plane;
			var shared = sourcepolygons[0].shared;
			var orthobasis = new CSG.OrthoNormalBasis(plane);
			var polygonvertices2d = []; // array of array of CSG.Vector2D
			var polygontopvertexindexes = []; // array of indexes of topmost vertex per polygon
			var topy2polygonindexes = {};
			var ycoordinatetopolygonindexes = {};

			var xcoordinatebins = {};
			var ycoordinatebins = {};

			// convert all polygon vertices to 2D
			// Make a list of all encountered y coordinates
			// And build a map of all polygons that have a vertex at a certain y coordinate:
			var ycoordinateBinningFactor = 1.0 / EPS * 10;
			for(var polygonindex = 0; polygonindex < numpolygons; polygonindex++) {
				var poly3d = sourcepolygons[polygonindex];
				var vertices2d = [];
				var numvertices = poly3d.vertices.length;
				var minindex = -1;
				if(numvertices > 0) {
					var miny, maxy, maxindex;
					for(var i = 0; i < numvertices; i++) {
						var pos2d = orthobasis.to2D(poly3d.vertices[i].pos);
						// perform binning of y coordinates: If we have multiple vertices very
						// close to each other, give them the same y coordinate:
						var ycoordinatebin = Math.floor(pos2d.y * ycoordinateBinningFactor);
						var newy;
						if(ycoordinatebin in ycoordinatebins) {
							newy = ycoordinatebins[ycoordinatebin];
						} else if(ycoordinatebin + 1 in ycoordinatebins) {
							newy = ycoordinatebins[ycoordinatebin + 1];
						} else if(ycoordinatebin - 1 in ycoordinatebins) {
							newy = ycoordinatebins[ycoordinatebin - 1];
						} else {
							newy = pos2d.y;
							ycoordinatebins[ycoordinatebin] = pos2d.y;
						}
						pos2d = new CSG.Vector2D(pos2d.x, newy);
						vertices2d.push(pos2d);
						var y = pos2d.y;
						if((i === 0) || (y < miny)) {
							miny = y;
							minindex = i;
						}
						if((i === 0) || (y > maxy)) {
							maxy = y;
							maxindex = i;
						}
						if(!(y in ycoordinatetopolygonindexes)) {
							ycoordinatetopolygonindexes[y] = {};
						}
						ycoordinatetopolygonindexes[y][polygonindex] = true;
					}
					if(miny >= maxy) {
						// degenerate polygon, all vertices have same y coordinate. Just ignore it from now:
						vertices2d = [];
					} else {
						if(!(miny in topy2polygonindexes)) {
							topy2polygonindexes[miny] = [];
						}
						topy2polygonindexes[miny].push(polygonindex);
					}
				} // if(numvertices > 0)
				// reverse the vertex order:
				vertices2d.reverse();
				minindex = numvertices - minindex - 1;
				polygonvertices2d.push(vertices2d);
				polygontopvertexindexes.push(minindex);
			}
			var ycoordinates = [];
			for(var ycoordinate in ycoordinatetopolygonindexes) ycoordinates.push(ycoordinate);
			ycoordinates.sort(fnNumberSort);

			// Now we will iterate over all y coordinates, from lowest to highest y coordinate
			// activepolygons: source polygons that are 'active', i.e. intersect with our y coordinate
			//   Is sorted so the polygons are in left to right order
			// Each element in activepolygons has these properties:
			//        polygonindex: the index of the source polygon (i.e. an index into the sourcepolygons
			//                      and polygonvertices2d arrays)
			//        leftvertexindex: the index of the vertex at the left side of the polygon (lowest x)
			//                         that is at or just above the current y coordinate
			//        rightvertexindex: dito at right hand side of polygon
			//        topleft, bottomleft: coordinates of the left side of the polygon crossing the current y coordinate
			//        topright, bottomright: coordinates of the right hand side of the polygon crossing the current y coordinate
			var activepolygons = [];
			var prevoutpolygonrow = [];
			for(var yindex = 0; yindex < ycoordinates.length; yindex++) {
				var newoutpolygonrow = [];
				var ycoordinate_as_string = ycoordinates[yindex];
				var ycoordinate = Number(ycoordinate_as_string);

				// update activepolygons for this y coordinate:
				// - Remove any polygons that end at this y coordinate
				// - update leftvertexindex and rightvertexindex (which point to the current vertex index
				//   at the the left and right side of the polygon
				// Iterate over all polygons that have a corner at this y coordinate:
				var polygonindexeswithcorner = ycoordinatetopolygonindexes[ycoordinate_as_string];
				for(var activepolygonindex = 0; activepolygonindex < activepolygons.length; ++activepolygonindex) {
					var activepolygon = activepolygons[activepolygonindex];
					var polygonindex = activepolygon.polygonindex;
					if(polygonindexeswithcorner[polygonindex]) {
						// this active polygon has a corner at this y coordinate:
						var vertices2d = polygonvertices2d[polygonindex];
						var numvertices = vertices2d.length;
						var newleftvertexindex = activepolygon.leftvertexindex;
						var newrightvertexindex = activepolygon.rightvertexindex;
						// See if we need to increase leftvertexindex or decrease rightvertexindex:
						while(true) {
							var nextleftvertexindex = newleftvertexindex + 1;
							if(nextleftvertexindex >= numvertices) nextleftvertexindex = 0;
							if(vertices2d[nextleftvertexindex].y != ycoordinate) break;
							newleftvertexindex = nextleftvertexindex;
						}
						var nextrightvertexindex = newrightvertexindex - 1;
						if(nextrightvertexindex < 0) nextrightvertexindex = numvertices - 1;
						if(vertices2d[nextrightvertexindex].y == ycoordinate) {
							newrightvertexindex = nextrightvertexindex;
						}
						if((newleftvertexindex != activepolygon.leftvertexindex) && (newleftvertexindex == newrightvertexindex)) {
							// We have increased leftvertexindex or decreased rightvertexindex, and now they point to the same vertex
							// This means that this is the bottom point of the polygon. We'll remove it:
							activepolygons.splice(activepolygonindex, 1);
							--activepolygonindex;
						} else {
							activepolygon.leftvertexindex = newleftvertexindex;
							activepolygon.rightvertexindex = newrightvertexindex;
							activepolygon.topleft = vertices2d[newleftvertexindex];
							activepolygon.topright = vertices2d[newrightvertexindex];
							var nextleftvertexindex = newleftvertexindex + 1;
							if(nextleftvertexindex >= numvertices) nextleftvertexindex = 0;
							activepolygon.bottomleft = vertices2d[nextleftvertexindex];
							var nextrightvertexindex = newrightvertexindex - 1;
							if(nextrightvertexindex < 0) nextrightvertexindex = numvertices - 1;
							activepolygon.bottomright = vertices2d[nextrightvertexindex];
						}
					} // if polygon has corner here
				} // for activepolygonindex
				var nextycoordinate;
				if(yindex >= ycoordinates.length - 1) {
					// last row, all polygons must be finished here:
					activepolygons = [];
					nextycoordinate = null;
				} else // yindex < ycoordinates.length-1
				{
					nextycoordinate = Number(ycoordinates[yindex + 1]);
					var middleycoordinate = 0.5 * (ycoordinate + nextycoordinate);
					// update activepolygons by adding any polygons that start here:
					var startingpolygonindexes = topy2polygonindexes[ycoordinate_as_string];
					for(var polygonindex_key in startingpolygonindexes) {
						var polygonindex = startingpolygonindexes[polygonindex_key];
						var vertices2d = polygonvertices2d[polygonindex];
						var numvertices = vertices2d.length;
						var topvertexindex = polygontopvertexindexes[polygonindex];
						// the top of the polygon may be a horizontal line. In that case topvertexindex can point to any point on this line.
						// Find the left and right topmost vertices which have the current y coordinate:
						var topleftvertexindex = topvertexindex;
						while(true) {
							var i = topleftvertexindex + 1;
							if(i >= numvertices) i = 0;
							if(vertices2d[i].y != ycoordinate) break;
							if(i == topvertexindex) break; // should not happen, but just to prevent endless loops
							topleftvertexindex = i;
						}
						var toprightvertexindex = topvertexindex;
						while(true) {
							var i = toprightvertexindex - 1;
							if(i < 0) i = numvertices - 1;
							if(vertices2d[i].y != ycoordinate) break;
							if(i == topleftvertexindex) break; // should not happen, but just to prevent endless loops
							toprightvertexindex = i;
						}
						var nextleftvertexindex = topleftvertexindex + 1;
						if(nextleftvertexindex >= numvertices) nextleftvertexindex = 0;
						var nextrightvertexindex = toprightvertexindex - 1;
						if(nextrightvertexindex < 0) nextrightvertexindex = numvertices - 1;
						var newactivepolygon = {
							polygonindex: polygonindex,
							leftvertexindex: topleftvertexindex,
							rightvertexindex: toprightvertexindex,
							topleft: vertices2d[topleftvertexindex],
							topright: vertices2d[toprightvertexindex],
							bottomleft: vertices2d[nextleftvertexindex],
							bottomright: vertices2d[nextrightvertexindex],
						};
						insertSorted(activepolygons, newactivepolygon, function(el1, el2) {
							var x1 = CSG.interpolateBetween2DPointsForY(
										el1.topleft, el1.bottomleft, middleycoordinate);
							var x2 = CSG.interpolateBetween2DPointsForY(
										el2.topleft, el2.bottomleft, middleycoordinate);
							if(x1 > x2) return 1;
							if(x1 < x2) return -1;
							return 0;
						});
					} // for(var polygonindex in startingpolygonindexes)
				} //  yindex < ycoordinates.length-1
				//if( (yindex == ycoordinates.length-1) || (nextycoordinate - ycoordinate > EPS) )
				if(true) {
					// Now activepolygons is up to date
					// Build the output polygons for the next row in newoutpolygonrow:
					for(var activepolygon_key in activepolygons) {
						var activepolygon = activepolygons[activepolygon_key];
						var polygonindex = activepolygon.polygonindex;
						var vertices2d = polygonvertices2d[polygonindex];
						var numvertices = vertices2d.length;

						var x = CSG.interpolateBetween2DPointsForY(activepolygon.topleft, activepolygon.bottomleft, ycoordinate);
						var topleft = new CSG.Vector2D(x, ycoordinate);
						x = CSG.interpolateBetween2DPointsForY(activepolygon.topright, activepolygon.bottomright, ycoordinate);
						var topright = new CSG.Vector2D(x, ycoordinate);
						x = CSG.interpolateBetween2DPointsForY(activepolygon.topleft, activepolygon.bottomleft, nextycoordinate);
						var bottomleft = new CSG.Vector2D(x, nextycoordinate);
						x = CSG.interpolateBetween2DPointsForY(activepolygon.topright, activepolygon.bottomright, nextycoordinate);
						var bottomright = new CSG.Vector2D(x, nextycoordinate);
						var outpolygon = {
							topleft: topleft,
							topright: topright,
							bottomleft: bottomleft,
							bottomright: bottomright,
							leftline: CSG.Line2D.fromPoints(topleft, bottomleft),
							rightline: CSG.Line2D.fromPoints(bottomright, topright)
						};
						if(newoutpolygonrow.length > 0) {
							var prevoutpolygon = newoutpolygonrow[newoutpolygonrow.length - 1];
							var d1 = outpolygon.topleft.distanceTo(prevoutpolygon.topright);
							var d2 = outpolygon.bottomleft.distanceTo(prevoutpolygon.bottomright);
							if((d1 < EPS) && (d2 < EPS)) {
								// we can join this polygon with the one to the left:
								outpolygon.topleft = prevoutpolygon.topleft;
								outpolygon.leftline = prevoutpolygon.leftline;
								outpolygon.bottomleft = prevoutpolygon.bottomleft;
								newoutpolygonrow.splice(newoutpolygonrow.length - 1, 1);
							}
						}
						newoutpolygonrow.push(outpolygon);
					} // for(activepolygon in activepolygons)
					if(yindex > 0) {
						// try to match the new polygons against the previous row:
						var prevcontinuedindexes = {};
						var matchedindexes = {};
						for(var i = 0; i < newoutpolygonrow.length; i++) {
							var thispolygon = newoutpolygonrow[i];
							for(var ii = 0; ii < prevoutpolygonrow.length; ii++) {
								if(!matchedindexes[ii]) // not already processed?
								{
									// We have a match if the sidelines are equal or if the top coordinates
									// are on the sidelines of the previous polygon
									var prevpolygon = prevoutpolygonrow[ii];
									if(prevpolygon.bottomleft.distanceTo(thispolygon.topleft) < EPS) {
										if(prevpolygon.bottomright.distanceTo(thispolygon.topright) < EPS) {
											// Yes, the top of this polygon matches the bottom of the previous:
											matchedindexes[ii] = true;
											// Now check if the joined polygon would remain convex:
											var d1 = thispolygon.leftline.direction().x - prevpolygon.leftline.direction().x;
											var d2 = thispolygon.rightline.direction().x - prevpolygon.rightline.direction().x;
											var leftlinecontinues = Math.abs(d1) < EPS;
											var rightlinecontinues = Math.abs(d2) < EPS;
											var leftlineisconvex = leftlinecontinues || (d1 >= 0);
											var rightlineisconvex = rightlinecontinues || (d2 >= 0);
											if(leftlineisconvex && rightlineisconvex) {
												// yes, both sides have convex corners:
												// This polygon will continue the previous polygon
												thispolygon.outpolygon = prevpolygon.outpolygon;
												thispolygon.leftlinecontinues = leftlinecontinues;
												thispolygon.rightlinecontinues = rightlinecontinues;
												prevcontinuedindexes[ii] = true;
											}
											break;
										}
									}
								} // if(!prevcontinuedindexes[ii])
							} // for ii
						} // for i
						for(var ii = 0; ii < prevoutpolygonrow.length; ii++) {
							if(!prevcontinuedindexes[ii]) {
								// polygon ends here
								// Finish the polygon with the last point(s):
								var prevpolygon = prevoutpolygonrow[ii];
								prevpolygon.outpolygon.rightpoints.push(prevpolygon.bottomright);
								if(prevpolygon.bottomright.distanceTo(prevpolygon.bottomleft) > EPS) {
									// polygon ends with a horizontal line:
									prevpolygon.outpolygon.leftpoints.push(prevpolygon.bottomleft);
								}
								// reverse the left half so we get a counterclockwise circle:
								prevpolygon.outpolygon.leftpoints.reverse();
								var points2d = prevpolygon.outpolygon.rightpoints.concat(prevpolygon.outpolygon.leftpoints);
								var vertices3d = [];
								points2d.map(function(point2d) {
									var point3d = orthobasis.to3D(point2d);
									var vertex3d = new CSG.Vertex(point3d);
									vertices3d.push(vertex3d);
								});
								var polygon = new CSG.Polygon(vertices3d, shared, plane);
								destpolygons.push(polygon);
							}
						}
					} // if(yindex > 0)
					for(var i = 0; i < newoutpolygonrow.length; i++) {
						var thispolygon = newoutpolygonrow[i];
						if(!thispolygon.outpolygon) {
							// polygon starts here:
							thispolygon.outpolygon = {
								leftpoints: [],
								rightpoints: []
							};
							thispolygon.outpolygon.leftpoints.push(thispolygon.topleft);
							if(thispolygon.topleft.distanceTo(thispolygon.topright) > EPS) {
								// we have a horizontal line at the top:
								thispolygon.outpolygon.rightpoints.push(thispolygon.topright);
							}
						} else {
							// continuation of a previous row
							if(!thispolygon.leftlinecontinues) {
								thispolygon.outpolygon.leftpoints.push(thispolygon.topleft);
							}
							if(!thispolygon.rightlinecontinues) {
								thispolygon.outpolygon.rightpoints.push(thispolygon.topright);
							}
						}
					}
					prevoutpolygonrow = newoutpolygonrow;
				}
			} // for yindex
		} // if(numpolygons > 0)
	};

	////////////////////////////////
	// ## class fuzzyFactory
	// This class acts as a factory for objects. We can search for an object with approximately
	// the desired properties (say a rectangle with width 2 and height 1)
	// The lookupOrCreate() method looks for an existing object (for example it may find an existing rectangle
	// with width 2.0001 and height 0.999. If no object is found, the user supplied callback is
	// called, which should generate a new object. The new object is inserted into the database
	// so it can be found by future lookupOrCreate() calls.
	// Constructor:
	//   numdimensions: the number of parameters for each object
	//     for example for a 2D rectangle this would be 2
	//   tolerance: The maximum difference for each parameter allowed to be considered a match
	CSG.fuzzyFactory = function(numdimensions, tolerance) {
		var lookuptable = [];
		for(var i = 0; i < numdimensions; i++) {
			lookuptable.push({});
		}
		this.lookuptable = lookuptable;
		this.nextElementId = 1;
		this.multiplier = 1.0 / tolerance;
		this.objectTable = {};
	};

	CSG.fuzzyFactory.prototype = {
		// var obj = f.lookupOrCreate([el1, el2, el3], function(elements) {/* create the new object */});
		// Performs a fuzzy lookup of the object with the specified elements.
		// If found, returns the existing object
		// If not found, calls the supplied callback function which should create a new object with
		// the specified properties. This object is inserted in the lookup database.
		lookupOrCreate: function(els, creatorCallback) {
			var object;
			var key = this.lookupKey(els);
			if(key === null) {
				object = creatorCallback(els);
				key = this.nextElementId++;
				this.objectTable[key] = object;
				for(var dimension = 0; dimension < els.length; dimension++) {
					var elementLookupTable = this.lookuptable[dimension];
					var value = els[dimension];
					var valueMultiplied = value * this.multiplier;
					var valueQuantized1 = Math.floor(valueMultiplied);
					var valueQuantized2 = Math.ceil(valueMultiplied);
					CSG.fuzzyFactory.insertKey(key, elementLookupTable, valueQuantized1);
					CSG.fuzzyFactory.insertKey(key, elementLookupTable, valueQuantized2);
				}
			} else {
				object = this.objectTable[key];
			}
			return object;
		},

		// ----------- PRIVATE METHODS:
		lookupKey: function(els) {
			var keyset = {};
			for(var dimension = 0; dimension < els.length; dimension++) {
				var elementLookupTable = this.lookuptable[dimension];
				var value = els[dimension];
				var valueQuantized = Math.round(value * this.multiplier);
				valueQuantized += "";
				if(valueQuantized in elementLookupTable) {
					if(dimension === 0) {
						keyset = elementLookupTable[valueQuantized];
					} else {
						keyset = CSG.fuzzyFactory.intersectSets(keyset, elementLookupTable[valueQuantized]);
					}
				} else {
					return null;
				}
				if(CSG.fuzzyFactory.isEmptySet(keyset)) return null;
			}
			// return first matching key:
			for(var key in keyset) return key;
			return null;
		},

		lookupKeySetForDimension: function(dimension, value) {
			var result;
			var elementLookupTable = this.lookuptable[dimension];
			var valueMultiplied = value * this.multiplier;
			var valueQuantized = Math.floor(value * this.multiplier);
			if(valueQuantized in elementLookupTable) {
				result = elementLookupTable[valueQuantized];
			} else {
				result = {};
			}
			return result;
		}
	};

	CSG.fuzzyFactory.insertKey = function(key, lookuptable, quantizedvalue) {
		if(quantizedvalue in lookuptable) {
			lookuptable[quantizedvalue][key] = true;
		} else {
			var newset = {};
			newset[key] = true;
			lookuptable[quantizedvalue] = newset;
		}
	};

	CSG.fuzzyFactory.isEmptySet = function(obj) {
		for(var key in obj) return false;
		return true;
	};

	CSG.fuzzyFactory.intersectSets = function(set1, set2) {
		var result = {};
		for(var key in set1) {
			if(key in set2) {
				result[key] = true;
			}
		}
		return result;
	};

	CSG.fuzzyFactory.joinSets = function(set1, set2) {
		var result = {}, key;
		for(key in set1) {
			result[key] = true;
		}
		for(key in set2) {
			result[key] = true;
		}
		return result;
	};

	//////////////////////////////////////
	CSG.fuzzyCSGFactory = function() {
		this.vertexfactory = new CSG.fuzzyFactory(3, 1e-5);
		this.planefactory = new CSG.fuzzyFactory(4, 1e-5);
		this.polygonsharedfactory = {};
	};

	CSG.fuzzyCSGFactory.prototype = {
		getPolygonShared: function(sourceshared) {
			var hash = sourceshared.getHash();
			if(hash in this.polygonsharedfactory) {
				return this.polygonsharedfactory[hash];
			} else {
				this.polygonsharedfactory[hash] = sourceshared;
				return sourceshared;
			}
		},

		getVertex: function(sourcevertex) {
			var elements = [sourcevertex.pos._x, sourcevertex.pos._y, sourcevertex.pos._z];
			var result = this.vertexfactory.lookupOrCreate(elements, function(els) {
				return sourcevertex;
			});
			return result;
		},

		getPlane: function(sourceplane) {
			var elements = [sourceplane.normal._x, sourceplane.normal._y, sourceplane.normal._z, sourceplane.w];
			var result = this.planefactory.lookupOrCreate(elements, function(els) {
				return sourceplane;
			});
			return result;
		},

		getPolygon: function(sourcepolygon) {
			var newplane = this.getPlane(sourcepolygon.plane);
			var newshared = this.getPolygonShared(sourcepolygon.shared);
			var _this = this;
			var newvertices = sourcepolygon.vertices.map(function(vertex) {
				return _this.getVertex(vertex);
			});
			return new CSG.Polygon(newvertices, newshared, newplane);
		},

		getCSG: function(sourcecsg) {
			var _this = this;
			var newpolygons = sourcecsg.polygons.map(function(polygon) {
				return _this.getPolygon(polygon);
			});
			return CSG.fromPolygons(newpolygons);
		}
	};

	//////////////////////////////////////
	// Tag factory: we can request a unique tag through CSG.getTag()
	CSG.staticTag = 1;

	CSG.getTag = function() {
		return CSG.staticTag++;
	};

	//////////////////////////////////////
	// # Class Properties
	// This class is used to store properties of a solid
	// A property can for example be a CSG.Vertex, a CSG.Plane or a CSG.Line3D
	// Whenever an affine transform is applied to the CSG solid, all its properties are
	// transformed as well.
	// The properties can be stored in a complex nested structure (using arrays and objects)
	CSG.Properties = function() {};

	CSG.Properties.prototype = {
		_transform: function(matrix4x4) {
			var result = new CSG.Properties();
			CSG.Properties.transformObj(this, result, matrix4x4);
			return result;
		},
		_merge: function(otherproperties) {
			var result = new CSG.Properties();
			CSG.Properties.cloneObj(this, result);
			CSG.Properties.addFrom(result, otherproperties);
			return result;
		}
	};

	CSG.Properties.transformObj = function(source, result, matrix4x4) {
		for(var propertyname in source) {
			if(propertyname == "_transform") continue;
			if(propertyname == "_merge") continue;
			var propertyvalue = source[propertyname];
			var transformed = propertyvalue;
			if(typeof(propertyvalue) == "object") {
				if(('transform' in propertyvalue) && (typeof(propertyvalue.transform) == "function")) {
					transformed = propertyvalue.transform(matrix4x4);
				} else if(propertyvalue instanceof Array) {
					transformed = [];
					CSG.Properties.transformObj(propertyvalue, transformed, matrix4x4);
				} else if(propertyvalue instanceof CSG.Properties) {
					transformed = new CSG.Properties();
					CSG.Properties.transformObj(propertyvalue, transformed, matrix4x4);
				}
			}
			result[propertyname] = transformed;
		}
	};

	CSG.Properties.cloneObj = function(source, result) {
		for(var propertyname in source) {
			if(propertyname == "_transform") continue;
			if(propertyname == "_merge") continue;
			var propertyvalue = source[propertyname];
			var cloned = propertyvalue;
			if(typeof(propertyvalue) == "object") {
				if(propertyvalue instanceof Array) {
					cloned = [];
					for(var i = 0; i < propertyvalue.length; i++) {
						cloned.push(propertyvalue[i]);
					}
				} else if(propertyvalue instanceof CSG.Properties) {
					cloned = new CSG.Properties();
					CSG.Properties.cloneObj(propertyvalue, cloned);
				}
			}
			result[propertyname] = cloned;
		}
	};

	CSG.Properties.addFrom = function(result, otherproperties) {
		for(var propertyname in otherproperties) {
			if(propertyname == "_transform") continue;
			if(propertyname == "_merge") continue;
			if((propertyname in result) &&
					(typeof(result[propertyname]) == "object") &&
					(result[propertyname] instanceof CSG.Properties) &&
					(typeof(otherproperties[propertyname]) == "object") &&
					(otherproperties[propertyname] instanceof CSG.Properties)) {
				CSG.Properties.addFrom(result[propertyname], otherproperties[propertyname]);
			} else if(!(propertyname in result)) {
				result[propertyname] = otherproperties[propertyname];
			}
		}
	};

	//////////////////////////////////////
	// # class Connector
	// A connector allows to attach two objects at predefined positions
	// For example a servo motor and a servo horn:
	// Both can have a Connector called 'shaft'
	// The horn can be moved and rotated such that the two connectors match
	// and the horn is attached to the servo motor at the proper position.
	// Connectors are stored in the properties of a CSG solid so they are
	// ge the same transformations applied as the solid
	CSG.Connector = function(point, axisvector, normalvector) {
		this.point = new CSG.Vector3D(point);
		this.axisvector = new CSG.Vector3D(axisvector).unit();
		this.normalvector = new CSG.Vector3D(normalvector).unit();
	};

	CSG.Connector.prototype = {
		normalized: function() {
			var axisvector = this.axisvector.unit();
			// make the normal vector truly normal:
			var n = this.normalvector.cross(axisvector).unit();
			var normalvector = axisvector.cross(n);
			return new CSG.Connector(this.point, axisvector, normalvector);
		},

		transform: function(matrix4x4) {
			var point = this.point.multiply4x4(matrix4x4);
			var axisvector = this.point.plus(this.axisvector).multiply4x4(matrix4x4).minus(point);
			var normalvector = this.point.plus(this.normalvector).multiply4x4(matrix4x4).minus(point);
			return new CSG.Connector(point, axisvector, normalvector);
		},

		// Get the transformation matrix to connect this Connector to another connector
		//   other: a CSG.Connector to which this connector should be connected
		//   mirror: false: the 'axis' vectors of the connectors should point in the same direction
		//           true: the 'axis' vectors of the connectors should point in opposite direction
		//   normalrotation: degrees of rotation between the 'normal' vectors of the two
		//                   connectors
		getTransformationTo: function(other, mirror, normalrotation) {
			mirror = mirror ? true : false;
			normalrotation = normalrotation ? Number(normalrotation) : 0;
			var us = this.normalized();
			other = other.normalized();
			// shift to the origin:
			var transformation = CSG.Matrix4x4.translation(this.point.negated());
			// construct the plane crossing through the origin and the two axes:
			var axesplane = CSG.Plane.anyPlaneFromVector3Ds(
			new CSG.Vector3D(0, 0, 0), us.axisvector, other.axisvector);
			var axesbasis = new CSG.OrthoNormalBasis(axesplane);
			var angle1 = axesbasis.to2D(us.axisvector).angle();
			var angle2 = axesbasis.to2D(other.axisvector).angle();
			var rotation = 180.0 * (angle2 - angle1) / Math.PI;
			if(mirror) rotation += 180.0;
			transformation = transformation.multiply(axesbasis.getProjectionMatrix());
			transformation = transformation.multiply(CSG.Matrix4x4.rotationZ(rotation));
			transformation = transformation.multiply(axesbasis.getInverseProjectionMatrix());
			var usAxesAligned = us.transform(transformation);
			// Now we have done the transformation for aligning the axes.
			// We still need to align the normals:
			var normalsplane = CSG.Plane.fromNormalAndPoint(other.axisvector, new CSG.Vector3D(0, 0, 0));
			var normalsbasis = new CSG.OrthoNormalBasis(normalsplane);
			angle1 = normalsbasis.to2D(usAxesAligned.normalvector).angle();
			angle2 = normalsbasis.to2D(other.normalvector).angle();
			rotation = 180.0 * (angle2 - angle1) / Math.PI;
			rotation += normalrotation;
			transformation = transformation.multiply(normalsbasis.getProjectionMatrix());
			transformation = transformation.multiply(CSG.Matrix4x4.rotationZ(rotation));
			transformation = transformation.multiply(normalsbasis.getInverseProjectionMatrix());
			// and translate to the destination point:
			transformation = transformation.multiply(CSG.Matrix4x4.translation(other.point));
			var usAligned = us.transform(transformation);
			return transformation;
		},

		axisLine: function() {
			return new CSG.Line3D(this.point, this.axisvector);
		},

		// creates a new Connector, with the connection point moved in the direction of the axisvector
		extend: function(distance) {
			var newpoint = this.point.plus(this.axisvector.unit().times(distance));
			return new CSG.Connector(newpoint, this.axisvector, this.normalvector);
		}
	};


	//////////////////////////////////////
	// # Class Path2D
	CSG.Path2D = function(points, closed) {
		closed = !! closed;
		points = points || [];
		// re-parse the points into CSG.Vector2D
		// and remove any duplicate points
		var prevpoint = null;
		if(closed && (points.length > 0)) {
			prevpoint = new CSG.Vector2D(points[points.length - 1]);
		}
		var newpoints = [];
		points.map(function(point) {
			point = new CSG.Vector2D(point);
			var skip = false;
			if(prevpoint !== null) {
				var distance = point.distanceTo(prevpoint);
				skip = distance < 1e-5;
			}
			if(!skip) newpoints.push(point);
			prevpoint = point;
		});
		this.points = newpoints;
		this.closed = closed;
	};

	/*
	Construct a (part of a) circle. Parameters:
	  options.center: the center point of the arc (CSG.Vector2D or array [x,y])
	  options.radius: the circle radius (float)
	  options.startangle: the starting angle of the arc, in degrees
		0 degrees corresponds to [1,0]
		90 degrees to [0,1]
		and so on
	  options.endangle: the ending angle of the arc, in degrees
	  options.resolution: number of points per 360 degree of rotation
	  options.maketangent: adds two extra tiny line segments at both ends of the circle
		this ensures that the gradients at the edges are tangent to the circle
	Returns a CSG.Path2D. The path is not closed (even if it is a 360 degree arc).
	close() the resultin path if you want to create a true circle.
	*/
	CSG.Path2D.arc = function(options) {
		var center = CSG.parseOptionAs2DVector(options, "center", 0);
		var radius = CSG.parseOptionAsFloat(options, "radius", 1);
		var startangle = CSG.parseOptionAsFloat(options, "startangle", 0);
		var endangle = CSG.parseOptionAsFloat(options, "endangle", 360);
		var resolution = CSG.parseOptionAsInt(options, "resolution", CSG.defaultResolution2D);
		var maketangent = CSG.parseOptionAsBool(options, "maketangent", false);
		// no need to make multiple turns:
		while(endangle - startangle >= 720) {
			endangle -= 360;
		}
		while(endangle - startangle <= -720) {
			endangle += 360;
		}
		var points = [], point;
		var absangledif = Math.abs(endangle - startangle);
		if(absangledif < 1e-5) {
			point = CSG.Vector2D.fromAngle(startangle / 180.0 * Math.PI).times(radius);
			points.push(point.plus(center));
		} else {
			var numsteps = Math.floor(resolution * absangledif / 360) + 1;
			var edgestepsize = numsteps * 0.5 / absangledif; // step size for half a degree
			if(edgestepsize > 0.25) edgestepsize = 0.25;
			var numsteps_mod = maketangent ? (numsteps + 2) : numsteps;
			for(var i = 0; i <= numsteps_mod; i++) {
				var step = i;
				if(maketangent) {
					step = (i - 1) * (numsteps - 2 * edgestepsize) / numsteps + edgestepsize;
					if(step < 0) step = 0;
					if(step > numsteps) step = numsteps;
				}
				var angle = startangle + step * (endangle - startangle) / numsteps;
				point = CSG.Vector2D.fromAngle(angle / 180.0 * Math.PI).times(radius);
				points.push(point.plus(center));
			}
		}
		return new CSG.Path2D(points, false);
	};

	CSG.Path2D.prototype = {
		concat: function(otherpath) {
			if(this.closed || otherpath.closed) {
				throw new Error("Paths must not be closed");
			}
			var newpoints = this.points.concat(otherpath.points);
			return new CSG.Path2D(newpoints);
		},

		appendPoint: function(point) {
			if(this.closed) {
				throw new Error("Paths must not be closed");
			}
			var newpoints = this.points.concat([point]);
			return new CSG.Path2D(newpoints);
		},

		close: function() {
			return new CSG.Path2D(this.points, true);
		},

		// Extrude the path by following it with a rectangle (upright, perpendicular to the path direction)
		// Returns a CSG solid
		//   width: width of the extrusion, in the z=0 plane
		//   height: height of the extrusion in the z direction
		//   resolution: number of segments per 360 degrees for the curve in a corner
		rectangularExtrude: function(width, height, resolution) {
			var cag = this.expandToCAG(width / 2, resolution);
			var result = cag.extrude({
				offset: [0, 0, height]
			});
			return result;
		},

		// Expand the path to a CAG
		// This traces the path with a circle with radius pathradius
		expandToCAG: function(pathradius, resolution) {
			var sides = [];
			var numpoints = this.points.length;
			var startindex = 0;
			if(this.closed && (numpoints > 2)) startindex = -1;
			var prevvertex;
			for(var i = startindex; i < numpoints; i++) {
				var pointindex = i;
				if(pointindex < 0) pointindex = numpoints - 1;
				var point = this.points[pointindex];
				var vertex = new CAG.Vertex(point);
				if(i > startindex) {
					var side = new CAG.Side(prevvertex, vertex);
					sides.push(side);
				}
				prevvertex = vertex;
			}
			var shellcag = CAG.fromSides(sides);
			var expanded = shellcag.expandedShell(pathradius, resolution);
			return expanded;
		},

		innerToCAG: function() {
			if(!this.closed) throw new Error("The path should be closed!");
			return CAG.fromPoints(this.points);
		},

		transform: function(matrix4x4) {
			var newpoints = this.points.map(function(point) {
				return point.multiply4x4(matrix4x4);
			});
			return new CSG.Path2D(newpoints, this.closed);
		}
	};

	// Add several convenience methods to the classes that support a transform() method:
	CSG.addTransformationMethodsToPrototype = function(prot) {
		prot.mirrored = function(plane) {
			return this.transform(CSG.Matrix4x4.mirroring(plane));
		};

		prot.mirroredX = function() {
			var plane = new CSG.Plane(new CSG.Vector3D(1, 0, 0), 0);
			return this.mirrored(plane);
		};

		prot.mirroredY = function() {
			var plane = new CSG.Plane(new CSG.Vector3D(0, 1, 0), 0);
			return this.mirrored(plane);
		};

		prot.mirroredZ = function() {
			var plane = new CSG.Plane(new CSG.Vector3D(0, 0, 1), 0);
			return this.mirrored(plane);
		};

		prot.translate = function(v) {
			return this.transform(CSG.Matrix4x4.translation(v));
		};

		prot.scale = function(f) {
			return this.transform(CSG.Matrix4x4.scaling(f));
		};

		prot.rotateX = function(deg) {
			return this.transform(CSG.Matrix4x4.rotationX(deg));
		};

		prot.rotateY = function(deg) {
			return this.transform(CSG.Matrix4x4.rotationY(deg));
		};

		prot.rotateZ = function(deg) {
			return this.transform(CSG.Matrix4x4.rotationZ(deg));
		};

		prot.rotate = function(rotationCenter, rotationAxis, degrees) {
			return this.transform(CSG.Matrix4x4.rotation(rotationCenter, rotationAxis, degrees));
		};
	};

	//////////////////
	// CAG: solid area geometry: like CSG but 2D
	// Each area consists of a number of sides
	// Each side is a line between 2 points
	var CAG = function() {
		this.sides = [];
	};

	// Construct a CAG from a list of `CAG.Side` instances.
	CAG.fromSides = function(sides) {
		var cag = new CAG();
		cag.sides = sides;
		return cag;
	};

	// Construct a CAG from a list of points (a polygon)
	// Rotation direction of the points is not relevant. Points can be a convex or concave polygon.
	// Polygon must not self intersect
	CAG.fromPoints = function(points) {
		var numpoints = points.length;
		if(numpoints < 3) throw new Error("CAG shape needs at least 3 points");
		var sides = [];
		var prevpoint = new CSG.Vector2D(points[numpoints - 1]);
		var prevvertex = new CAG.Vertex(prevpoint);
		points.map(function(p) {
			var point = new CSG.Vector2D(p);
			var vertex = new CAG.Vertex(point);
			var side = new CAG.Side(prevvertex, vertex);
			sides.push(side);
			prevvertex = vertex;
		});
		var result = CAG.fromSides(sides);
		if(result.isSelfIntersecting()) {
			throw new Error("Polygon is self intersecting!");
		}
		var area = result.area();
		if(Math.abs(area) < 1e-5) {
			throw new Error("Degenerate polygon!");
		}
		if(area < 0) {
			result = result.flipped();
		}
		result = result.canonicalized();
		return result;
	};

	// Like CAG.fromPoints but does not check if it's a valid polygon.
	// Points should rotate counter clockwise
	CAG.fromPointsNoCheck = function(points) {
		var sides = [];
		var prevpoint = new CSG.Vector2D(points[points.length - 1]);
		var prevvertex = new CAG.Vertex(prevpoint);
		points.map(function(p) {
			var point = new CSG.Vector2D(p);
			var vertex = new CAG.Vertex(point);
			var side = new CAG.Side(prevvertex, vertex);
			sides.push(side);
			prevvertex = vertex;
		});
		return CAG.fromSides(sides);
	};

	// Converts a CSG to a CAG. The CSG must consist of polygons with only z coordinates +1 and -1
	// as constructed by CAG.toCSG(-1, 1). This is so we can use the 3D union(), intersect() etc
	CAG.fromFakeCSG = function(csg) {
		var sides = csg.polygons.map(function(p) {
			return CAG.Side.fromFakePolygon(p);
		});
		return CAG.fromSides(sides);
	};

	// see if the line between p0start and p0end intersects with the line between p1start and p1end
	// returns true if the lines strictly intersect, the end points are not counted!
	CAG.linesIntersect = function(p0start, p0end, p1start, p1end) {
		if(p0end.equals(p1start) || p1end.equals(p0start)) {
			var d = p1end.minus(p1start).unit().plus(p0end.minus(p0start).unit()).length();
			if(d < 1e-5) {
				return true;
			}
		} else {
			var d0 = p0end.minus(p0start);
			var d1 = p1end.minus(p1start);
			if(Math.abs(d0.cross(d1)) < 1e-9) return false; // lines are parallel
			var alphas = CSG.solve2Linear(-d0.x, d1.x, -d0.y, d1.y, p0start.x - p1start.x, p0start.y - p1start.y);
			if((alphas[0] > 1e-6) && (alphas[0] < 0.999999) && (alphas[1] > 1e-5) && (alphas[1] < 0.999999)) return true;
			//    if( (alphas[0] >= 0) && (alphas[0] <= 1) && (alphas[1] >= 0) && (alphas[1] <= 1) ) return true;
		}
		return false;
	};

	/* Construct a circle
	   options:
		 center: a 2D center point
		 radius: a scalar
		 resolution: number of sides per 360 degree rotation
	   returns a CAG object
	*/
	CAG.circle = function(options) {
		options = options || {};
		var center = CSG.parseOptionAs2DVector(options, "center", [0, 0]);
		var radius = CSG.parseOptionAsFloat(options, "radius", 1);
		var resolution = CSG.parseOptionAsInt(options, "resolution", CSG.defaultResolution2D);
		var sides = [];
		var prevvertex;
		for(var i = 0; i <= resolution; i++) {
			var radians = 2 * Math.PI * i / resolution;
			var point = CSG.Vector2D.fromAngleRadians(radians).times(radius).plus(center);
			var vertex = new CAG.Vertex(point);
			if(i > 0) {
				sides.push(new CAG.Side(prevvertex, vertex));
			}
			prevvertex = vertex;
		}
		return CAG.fromSides(sides);
	};

	/* Construct a rectangle
	   options:
		 center: a 2D center point
		 radius: a 2D vector with width and height
	   returns a CAG object
	*/
	CAG.rectangle = function(options) {
		options = options || {};
		var c = CSG.parseOptionAs2DVector(options, "center", [0, 0]);
		var r = CSG.parseOptionAs2DVector(options, "radius", [1, 1]);
		var rswap = new CSG.Vector2D(r.x, -r.y);
		var points = [
		c.plus(r), c.plus(rswap), c.minus(r), c.minus(rswap)];
		return CAG.fromPoints(points);
	};

	//     var r = CSG.roundedRectangle({
	//       center: [0, 0],
	//       radius: [2, 1],
	//       roundradius: 0.2,
	//       resolution: 8,
	//     });
	CAG.roundedRectangle = function(options) {
		options = options || {};
		var center = CSG.parseOptionAs2DVector(options, "center", [0, 0]);
		var radius = CSG.parseOptionAs2DVector(options, "radius", [1, 1]);
		var roundradius = CSG.parseOptionAsFloat(options, "roundradius", 0.2);
		var resolution = CSG.parseOptionAsInt(options, "resolution", CSG.defaultResolution2D);
		var maxroundradius = Math.min(radius.x, radius.y);
		maxroundradius -= 0.1;
		roundradius = Math.min(roundradius, maxroundradius);
		roundradius = Math.max(0, roundradius);
		radius = new CSG.Vector2D(radius.x - roundradius, radius.y - roundradius);
		var rect = CAG.rectangle({
			center: center,
			radius: radius
		});
		if(roundradius > 0) {
			rect = rect.expand(roundradius, resolution);
		}
		return rect;
	};

	// Reconstruct a CAG from the output of toCompactBinary()
	CAG.fromCompactBinary = function(bin) {
		if(bin['class'] != "CAG") throw new Error("Not a CAG");
		var vertices = [];
		var vertexData = bin.vertexData;
		var numvertices = vertexData.length / 2;
		var arrayindex = 0;
		for(var vertexindex = 0; vertexindex < numvertices; vertexindex++) {
			var x = vertexData[arrayindex++];
			var y = vertexData[arrayindex++];
			var pos = new CSG.Vector2D(x, y);
			var vertex = new CAG.Vertex(pos);
			vertices.push(vertex);
		}

		var sides = [];
		var numsides = bin.sideVertexIndices.length / 2;
		arrayindex = 0;
		for(var sideindex = 0; sideindex < numsides; sideindex++) {
			var vertexindex0 = bin.sideVertexIndices[arrayindex++];
			var vertexindex1 = bin.sideVertexIndices[arrayindex++];
			var side = new CAG.Side(vertices[vertexindex0], vertices[vertexindex1]);
			sides.push(side);
		}
		var cag = CAG.fromSides(sides);
		cag.isCanonicalized = true;
		return cag;
	};

	function fnSortByIndex(a, b) {
		return a.index - b.index;
	}

	CAG.prototype = {
		toString: function() {
			var result = "CAG (" + this.sides.length + " sides):\n";
			this.sides.map(function(side) {
				result += "  " + side.toString() + "\n";
			});
			return result;
		},

		toCSG: function(z0, z1) {
			var polygons = this.sides.map(function(side) {
				return side.toPolygon3D(z0, z1);
			});
			return CSG.fromPolygons(polygons);
		},

		toDebugString1: function() {
			this.sides.sort(function(a, b) {
				return a.vertex0.pos.x - b.vertex0.pos.x;
			});
			var str = "";
			this.sides.map(function(side) {
				str += "(" + side.vertex0.pos.x + "," + side.vertex0.pos.y + ") - (" + side.vertex1.pos.x + "," + side.vertex1.pos.y + ")\n";
			});
			return str;
		},

		toDebugString: function() {
			//    this.sides.sort(function(a,b){
			//      return a.vertex0.pos.x - b.vertex0.pos.x;
			//    });
			var str = "CAG.fromSides([\n";
			this.sides.map(function(side) {
				str += "  new CAG.Side(new CAG.Vertex(new CSG.Vector2D(" +
						side.vertex0.pos.x + "," + side.vertex0.pos.y +
					")), new CAG.Vertex(new CSG.Vector2D(" +
						side.vertex1.pos.x + "," + side.vertex1.pos.y + "))),\n";
			});
			str += "]);\n";
			return str;
		},

		union: function(cag) {
			var cags;
			if(cag instanceof Array) {
				cags = cag;
			} else {
				cags = [cag];
			}
			var r = this.toCSG(-1, 1);
			cags.map(function(cag) {
				r = r.unionSub(cag.toCSG(-1, 1), false, false);
			});
			r = r.reTesselated();
			r = r.canonicalized();
			cag = CAG.fromFakeCSG(r);
			var cag_canonicalized = cag.canonicalized();
			return cag_canonicalized;
		},

		subtract: function(cag) {
			var cags;
			if(cag instanceof Array) {
				cags = cag;
			} else {
				cags = [cag];
			}
			var r = this.toCSG(-1, 1);
			cags.map(function(cag) {
				r = r.subtractSub(cag.toCSG(-1, 1), false, false);
			});
			r = r.reTesselated();
			r = r.canonicalized();
			r = CAG.fromFakeCSG(r);
			r = r.canonicalized();
			return r;
		},

		intersect: function(cag) {
			var cags;
			if(cag instanceof Array) {
				cags = cag;
			} else {
				cags = [cag];
			}
			var r = this.toCSG(-1, 1);
			cags.map(function(cag) {
				r = r.intersectSub(cag.toCSG(-1, 1), false, false);
			});
			r = r.reTesselated();
			r = r.canonicalized();
			r = CAG.fromFakeCSG(r);
			r = r.canonicalized();
			return r;
		},

		transform: function(matrix4x4) {
			var ismirror = matrix4x4.isMirroring();
			var newsides = this.sides.map(function(side) {
				return side.transform(matrix4x4);
			});
			var result = CAG.fromSides(newsides);
			if(ismirror) {
				result = result.flipped();
			}
			return result;
		},

		// see http://local.wasp.uwa.edu.au/~pbourke/geometry/polyarea/ :
		// Area of the polygon. For a counter clockwise rotating polygon the area is positive, otherwise negative
		area: function() {
			var polygonArea = 0;
			this.sides.map(function(side) {
				polygonArea += side.vertex0.pos.cross(side.vertex1.pos);
			});
			polygonArea *= 0.5;
			return polygonArea;
		},

		flipped: function() {
			var newsides = this.sides.map(function(side) {
				return side.flipped();
			});
			newsides.reverse();
			return CAG.fromSides(newsides);
		},

		getBounds: function() {
			var minpoint;
			if(this.sides.length === 0) {
				minpoint = new CSG.Vector2D(0, 0);
			} else {
				minpoint = this.sides[0].vertex0.pos;
			}
			var maxpoint = minpoint;
			this.sides.map(function(side) {
				minpoint = minpoint.min(side.vertex0.pos);
				minpoint = minpoint.min(side.vertex1.pos);
				maxpoint = maxpoint.max(side.vertex0.pos);
				maxpoint = maxpoint.max(side.vertex1.pos);
			});
			return [minpoint, maxpoint];
		},

	   center: function(c) {
	      if(!c.length) c = [c,c];
	      var b = this.getBounds();
	      return this.translate([
	         c[0]?-(b[1].x-b[0].x)/2-b[0].x:0,
	         c[1]?-(b[1].y-b[0].y)/2-b[0].y:0]);
	   },

		isSelfIntersecting: function() {
			var numsides = this.sides.length;
			for(var i = 0; i < numsides; i++) {
				var side0 = this.sides[i];
				for(var ii = i + 1; ii < numsides; ii++) {
					var side1 = this.sides[ii];
					if(CAG.linesIntersect(side0.vertex0.pos, side0.vertex1.pos, side1.vertex0.pos, side1.vertex1.pos)) {
						return true;
					}
				}
			}
			return false;
		},

		expandedShell: function(radius, resolution) {
			resolution = resolution || 8;
			if(resolution < 4) resolution = 4;
			var cags = [];
			var pointmap = {};
			var cag = this.canonicalized();
			cag.sides.map(function(side) {
				var d = side.vertex1.pos.minus(side.vertex0.pos);
				var dl = d.length();
				if(dl > 1e-5) {
					d = d.times(1.0 / dl);
					var normal = d.normal().times(radius);
					var shellpoints = [
						side.vertex1.pos.plus(normal),
						side.vertex1.pos.minus(normal),
						side.vertex0.pos.minus(normal),
						side.vertex0.pos.plus(normal)
					];
					//      var newcag = CAG.fromPointsNoCheck(shellpoints);
					var newcag = CAG.fromPoints(shellpoints);
					cags.push(newcag);
					for(var step = 0; step < 2; step++) {
						var p1 = (step === 0) ? side.vertex0.pos : side.vertex1.pos;
						var p2 = (step === 0) ? side.vertex1.pos : side.vertex0.pos;
						var tag = p1.x + " " + p1.y;
						if(!(tag in pointmap)) {
							pointmap[tag] = [];
						}
						pointmap[tag].push({
							"p1": p1,
							"p2": p2
						});
					}
				}
			});
			for(var tag in pointmap) {
				var m = pointmap[tag];
				var angle1, angle2;
				var pcenter = m[0].p1;
				if(m.length == 2) {
					var end1 = m[0].p2;
					var end2 = m[1].p2;
					angle1 = end1.minus(pcenter).angleDegrees();
					angle2 = end2.minus(pcenter).angleDegrees();
					if(angle2 < angle1) angle2 += 360;
					if(angle2 >= (angle1 + 360)) angle2 -= 360;
					if(angle2 < angle1 + 180) {
						var t = angle2;
						angle2 = angle1 + 360;
						angle1 = t;
					}
					angle1 += 90;
					angle2 -= 90;
				} else {
					angle1 = 0;
					angle2 = 360;
				}
				var fullcircle = (angle2 > angle1 + 359.999);
				if(fullcircle) {
					angle1 = 0;
					angle2 = 360;
				}
				if(angle2 > (angle1 + 1e-5)) {
					var points = [];
					if(!fullcircle) {
						points.push(pcenter);
					}
					var numsteps = Math.round(resolution * (angle2 - angle1) / 360);
					if(numsteps < 1) numsteps = 1;
					for(var step = 0; step <= numsteps; step++) {
						var angle = angle1 + step / numsteps * (angle2 - angle1);
						if(step == numsteps) angle = angle2; // prevent rounding errors
						var point = pcenter.plus(CSG.Vector2D.fromAngleDegrees(angle).times(radius));
						if((!fullcircle) || (step > 0)) {
							points.push(point);
						}
					}
					var newcag = CAG.fromPointsNoCheck(points);
					cags.push(newcag);
				}
			}
			var result = new CAG();
			result = result.union(cags);
			return result;
		},

		expand: function(radius, resolution) {
			var result = this.union(this.expandedShell(radius, resolution));
			return result;
		},

		contract: function(radius, resolution) {
			var result = this.subtract(this.expandedShell(radius, resolution));
			return result;
		},

		// extruded=cag.extrude({offset: [0,0,10], twistangle: 360, twiststeps: 100});
		// linear extrusion of 2D shape, with optional twist
		// The 2d shape is placed in in z=0 plane and extruded into direction <offset> (a CSG.Vector3D)
		// The final face is rotated <twistangle> degrees. Rotation is done around the origin of the 2d shape (i.e. x=0, y=0)
		// twiststeps determines the resolution of the twist (should be >= 1)
		// returns a CSG object
		extrude: function(options) {
			if(this.sides.length == 0) {
			// empty!
			return new CSG();
		}
		var offsetvector = CSG.parseOptionAs3DVector(options, "offset", [0,0,1]);
		var twistangle = CSG.parseOptionAsFloat(options, "twistangle", 0);
		var twiststeps = CSG.parseOptionAsInt(options, "twiststeps", 10);

		if(twistangle == 0) twiststeps = 1;
		if(twiststeps < 1) twiststeps = 1;

		var newpolygons = [];
		var prevtransformedcag;
		var prevstepz;
		for(var step=0; step <= twiststeps; step++) {
			var stepfraction = step / twiststeps;
			var transformedcag = this;
			var angle = twistangle * stepfraction;
			if(angle != 0) {
				transformedcag = transformedcag.rotateZ(angle);
			}
			var translatevector = new CSG.Vector2D(offsetvector.x, offsetvector.y).times(stepfraction);
			transformedcag = transformedcag.translate(translatevector);
			var bounds = transformedcag.getBounds();
			bounds[0] = bounds[0].minus(new CSG.Vector2D(1,1));
			bounds[1] = bounds[1].plus(new CSG.Vector2D(1,1));
			var stepz = offsetvector.z * stepfraction;
			if( (step == 0) || (step == twiststeps) ) {
				// bottom or top face:
				var csgshell = transformedcag.toCSG(stepz-1, stepz+1);
				var csgplane = CSG.fromPolygons([new CSG.Polygon([
					new CSG.Vertex(new CSG.Vector3D(bounds[0].x, bounds[0].y, stepz)),
					new CSG.Vertex(new CSG.Vector3D(bounds[1].x, bounds[0].y, stepz)),
					new CSG.Vertex(new CSG.Vector3D(bounds[1].x, bounds[1].y, stepz)),
					new CSG.Vertex(new CSG.Vector3D(bounds[0].x, bounds[1].y, stepz))
				])]);
				var flip = (step == 0);
				if(offsetvector.z < 0) flip = !flip;
				if(flip) {
					csgplane = csgplane.inverse();
				}
				csgplane = csgplane.intersect(csgshell);
				// only keep the polygons in the z plane:
				csgplane.polygons.map(function(polygon){
					if(Math.abs(polygon.plane.normal.z) > 0.99) {
						newpolygons.push(polygon);
					}
				});
			}
			if(step > 0) {
				var numsides = transformedcag.sides.length;
				for(var sideindex = 0; sideindex < numsides; sideindex++) {
					var thisside = transformedcag.sides[sideindex];
					var prevside = prevtransformedcag.sides[sideindex];
					var p1 = new CSG.Polygon([
						new CSG.Vertex(thisside.vertex1.pos.toVector3D(stepz)),
						new CSG.Vertex(thisside.vertex0.pos.toVector3D(stepz)),
						new CSG.Vertex(prevside.vertex0.pos.toVector3D(prevstepz))
					]);
					var p2 = new CSG.Polygon([
						new CSG.Vertex(thisside.vertex1.pos.toVector3D(stepz)),
						new CSG.Vertex(prevside.vertex0.pos.toVector3D(prevstepz)),
						new CSG.Vertex(prevside.vertex1.pos.toVector3D(prevstepz))
					]);
					if(offsetvector.z < 0) {
						p1 = p1.flipped();
						p2 = p2.flipped();
					}
					newpolygons.push(p1);
					newpolygons.push(p2);
				}
			}
			prevtransformedcag = transformedcag;
			prevstepz = stepz;
		} // for step
		return CSG.fromPolygons(newpolygons);
		},

		// check if we are a valid CAG (for debugging)
		check: function() {
			var errors = [];
			if(this.isSelfIntersecting()) {
				errors.push("Self intersects");
			}
			var pointcount = {};
			this.sides.map(function(side) {
				function mappoint(p) {
					var tag = p.x + " " + p.y;
					if(!(tag in pointcount)) pointcount[tag] = 0;
					pointcount[tag]++;
				}
				mappoint(side.vertex0.pos);
				mappoint(side.vertex1.pos);
			});
			for(var tag in pointcount) {
				var count = pointcount[tag];
				if(count & 1) {
					errors.push("Uneven number of sides (" + count + ") for point " + tag);
				}
			}
			var area = this.area();
			if(area < 1e-5) {
				errors.push("Area is " + area);
			}
			if(errors.length > 0) {
				var ertxt = "";
				errors.map(function(err) {
					ertxt += err + "\n";
				});
				throw new Error(ertxt);
			}
		},

		canonicalized: function() {
			if(this.isCanonicalized) {
				return this;
			} else {
				var factory = new CAG.fuzzyCAGFactory();
				var result = factory.getCAG(this);
				result.isCanonicalized = true;
				return result;
			}
		},

		toCompactBinary: function() {
			var cag = this.canonicalized();
			var numsides = cag.sides.length;
			var vertexmap = {};
			var vertices = [];
			var numvertices = 0;
			var sideVertexIndices = new Uint32Array(2 * numsides);
			var sidevertexindicesindex = 0;
			cag.sides.map(function(side) {
				[side.vertex0, side.vertex1].map(function(v) {
					var vertextag = v.getTag();
					var vertexindex;
					if(!(vertextag in vertexmap)) {
						vertexindex = numvertices++;
						vertexmap[vertextag] = vertexindex;
						vertices.push(v);
					} else {
						vertexindex = vertexmap[vertextag];
					}
					sideVertexIndices[sidevertexindicesindex++] = vertexindex;
				});
			});
			var vertexData = new Float64Array(numvertices * 2);
			var verticesArrayIndex = 0;
			vertices.map(function(v) {
				var pos = v.pos;
				vertexData[verticesArrayIndex++] = pos._x;
				vertexData[verticesArrayIndex++] = pos._y;
			});
			var result = {
				'class': "CAG",
				sideVertexIndices: sideVertexIndices,
				vertexData: vertexData
			};
			return result;
		},

		getOutlinePaths: function() {
			var cag = this.canonicalized();
			var sideTagToSideMap = {};
			var startVertexTagToSideTagMap = {};
			cag.sides.map(function(side) {
				var sidetag = side.getTag();
				sideTagToSideMap[sidetag] = side;
				var startvertextag = side.vertex0.getTag();
				if(!(startvertextag in startVertexTagToSideTagMap)) {
					startVertexTagToSideTagMap[startvertextag] = [];
				}
				startVertexTagToSideTagMap[startvertextag].push(sidetag);
			});
			var paths = [];
			while(true) {
				var startsidetag = null;
				for(var aVertexTag in startVertexTagToSideTagMap) {
					var sidesForThisVertex = startVertexTagToSideTagMap[aVertexTag];
					startsidetag = sidesForThisVertex[0];
					sidesForThisVertex.splice(0, 1);
					if(sidesForThisVertex.length === 0) {
						delete startVertexTagToSideTagMap[aVertexTag];
					}
					break;
				}
				if(startsidetag === null) break; // we've had all sides
				var connectedVertexPoints = [];
				var sidetag = startsidetag;
				var thisside = sideTagToSideMap[sidetag];
				var startvertextag = thisside.vertex0.getTag();
				while(true) {
					connectedVertexPoints.push(thisside.vertex0.pos);
					var nextvertextag = thisside.vertex1.getTag();
					if(nextvertextag == startvertextag) break; // we've closed the polygon
					if(!(nextvertextag in startVertexTagToSideTagMap)) {
						throw new Error("Area is not closed!");
					}
					var nextpossiblesidetags = startVertexTagToSideTagMap[nextvertextag];
					var nextsideindex = -1;
					if(nextpossiblesidetags.length == 1) {
						nextsideindex = 0;
					} else {
						// more than one side starting at the same vertex. This means we have
						// two shapes touching at the same corner
						var bestangle = null;
						var thisangle = thisside.direction().angleDegrees();
						for(var sideindex = 0; sideindex < nextpossiblesidetags.length; sideindex++) {
							var nextpossiblesidetag = nextpossiblesidetags[sideindex];
							var possibleside = sideTagToSideMap[nextpossiblesidetag];
							var angle = possibleside.direction().angleDegrees();
							var angledif = angle - thisangle;
							if(angledif < -180) angledif += 360;
							if(angledif >= 180) angledif -= 360;
							if((nextsideindex < 0) || (angledif > bestangle)) {
								nextsideindex = sideindex;
								bestangle = angledif;
							}
						}
					}
					var nextsidetag = nextpossiblesidetags[nextsideindex];
					nextpossiblesidetags.splice(nextsideindex, 1);
					if(nextpossiblesidetags.length === 0) {
						delete startVertexTagToSideTagMap[nextvertextag];
					}
					thisside = sideTagToSideMap[nextsidetag];
				} // inner loop
				var path = new CSG.Path2D(connectedVertexPoints, true);
				paths.push(path);
			} // outer loop
			return paths;
		},

		toDxf: function() {
			var paths = this.getOutlinePaths();
			return CAG.PathsToDxf(paths);
		}
	};

	CAG.PathsToDxf = function(paths) {
		var str = "999\nDXF generated by OpenJsCad\n";
		str += "  0\nSECTION\n  2\nHEADER\n";
		str += "  0\nENDSEC\n";
		str += "  0\nSECTION\n  2\nTABLES\n";
		str += "  0\nTABLE\n  2\nLTYPE\n  70\n1\n";
		str += "  0\nLTYPE\n  2\nCONTINUOUS\n  3\nSolid Line\n  72\n65\n  73\n0\n  40\n0.0\n";
		str += "  0\nENDTAB\n";
		str += "  0\nTABLE\n  2\nLAYER\n  70\n1\n";
		str += "  0\nLAYER\n  2\nOpenJsCad\n  62\n7\n  6\ncontinuous\n";
		str += "  0\nENDTAB\n";
		str += "  0\nTABLE\n  2\nSTYLE\n  70\n0\n  0\nENDTAB\n";
		str += "  0\nTABLE\n  2\nVIEW\n  70\n0\n  0\nENDTAB\n";
		str += "  0\nENDSEC\n";
		str += "  0\nSECTION\n  2\nBLOCKS\n";
		str += "  0\nENDSEC\n";
		str += "  0\nSECTION\n  2\nENTITIES\n";
		paths.map(function(path) {
			var numpoints_closed = path.points.length + (path.closed ? 1 : 0);
			str += "  0\nLWPOLYLINE\n  8\nOpenJsCad\n  90\n" + numpoints_closed + "\n  70\n" + (path.closed ? 1 : 0) + "\n";
			for(var pointindex = 0; pointindex < numpoints_closed; pointindex++) {
				var pointindexwrapped = pointindex;
				if(pointindexwrapped >= path.points.length) pointindexwrapped -= path.points.length;
				var point = path.points[pointindexwrapped];
				str += " 10\n" + point.x + "\n 20\n" + point.y + "\n 30\n0.0\n";
			}
		});
		str += "  0\nENDSEC\n  0\nEOF\n";
		return new Blob([str], {
			type: "application/dxf"
		});
	};

	CAG.Vertex = function(pos) {
		this.pos = pos;
	};

	CAG.Vertex.prototype = {
		toString: function() {
			return "("+this.pos.x.toFixed(2)+","+this.pos.y.toFixed(2)+")";
		},
		getTag: function() {
			var result = this.tag;
			if(!result) {
				result = CSG.getTag();
				this.tag = result;
			}
			return result;
		}
	};

	CAG.Side = function(vertex0, vertex1) {
		if(!(vertex0 instanceof CAG.Vertex)) throw new Error("Assertion failed");
		if(!(vertex1 instanceof CAG.Vertex)) throw new Error("Assertion failed");
		this.vertex0 = vertex0;
		this.vertex1 = vertex1;
	};

	CAG.Side.fromFakePolygon = function(polygon) {
		if(polygon.vertices.length != 4) {
			throw new Error("Assertion failed - 1");
		}
		var pointsZeroZ = [];
		var indicesZeroZ = [];
		for(var i = 0; i < 4; i++) {
			var pos = polygon.vertices[i].pos;
			if((pos.z >= -1.001) && (pos.z < -0.999)) {
			} else if((pos.z >= 0.999) && (pos.z < 1.001)) {
			} else {
				throw new Error("Assertion failed - 2");
			}
			if(pos.z > 0) {
				pointsZeroZ.push(new CSG.Vector2D(pos.x, pos.y));
				indicesZeroZ.push(i);
			}
		}
		if(pointsZeroZ.length != 2) {
			throw new Error("Assertion failed - 3");
		}
		var d = indicesZeroZ[1] - indicesZeroZ[0];
		var p1, p2;
		if(d == 1) {
			p1 = pointsZeroZ[1];
			p2 = pointsZeroZ[0];
		} else if(d == 3) {
			p1 = pointsZeroZ[0];
			p2 = pointsZeroZ[1];
		} else {
			throw new Error("Assertion failed - 4");
		}
		var result = new CAG.Side(new CAG.Vertex(p1), new CAG.Vertex(p2));
		return result;
	};

	CAG.Side.prototype = {
		toString: function() {
			return this.vertex0 + " -> "+ this.vertex1;
		},

		toPolygon3D: function(z0, z1) {
			var vertices = [
				new CSG.Vertex(this.vertex0.pos.toVector3D(z0)),
				new CSG.Vertex(this.vertex1.pos.toVector3D(z0)),
				new CSG.Vertex(this.vertex1.pos.toVector3D(z1)),
				new CSG.Vertex(this.vertex0.pos.toVector3D(z1))
			];
			return new CSG.Polygon(vertices);
		},

		transform: function(matrix4x4) {
			var newp1 = this.vertex0.pos.transform(matrix4x4);
			var newp2 = this.vertex1.pos.transform(matrix4x4);
			return new CAG.Side(new CAG.Vertex(newp1), new CAG.Vertex(newp2));
		},

		flipped: function() {
			return new CAG.Side(this.vertex1, this.vertex0);
		},

		direction: function() {
			return this.vertex1.pos.minus(this.vertex0.pos);
		},

		getTag: function() {
			var result = this.tag;
			if(!result) {
				result = CSG.getTag();
				this.tag = result;
			}
			return result;
		},

		lengthSquared: function() {
			var x = this.vertex1.pos.x - this.vertex0.pos.x,
			y = this.vertex1.pos.y - this.vertex0.pos.y;
			return x*x + y*y;
		},

		length: function() {
			return Math.sqrt(this.lengthSquared());
		}
	};

	//////////////////////////////////////
	CAG.fuzzyCAGFactory = function() {
		this.vertexfactory = new CSG.fuzzyFactory(2, 1e-5);
	};

	CAG.fuzzyCAGFactory.prototype = {
		getVertex: function(sourcevertex) {
			var elements = [sourcevertex.pos._x, sourcevertex.pos._y];
			var result = this.vertexfactory.lookupOrCreate(elements, function(els) {
				return sourcevertex;
			});
			return result;
		},

		getSide: function(sourceside) {
			var vertex0 = this.getVertex(sourceside.vertex0);
			var vertex1 = this.getVertex(sourceside.vertex1);
			return new CAG.Side(vertex0, vertex1);
		},

		getCAG: function(sourcecag) {
			var _this = this;
			var newsides = sourcecag.sides.map(function(side) {
				return _this.getSide(side);
			});
			return CAG.fromSides(newsides);
		}
	};

	//////////////////////////////////////
	CSG.addTransformationMethodsToPrototype(CSG.prototype);
	CSG.addTransformationMethodsToPrototype(CSG.Vector2D.prototype);
	CSG.addTransformationMethodsToPrototype(CSG.Vector3D.prototype);
	CSG.addTransformationMethodsToPrototype(CSG.Vertex.prototype);
	CSG.addTransformationMethodsToPrototype(CSG.Plane.prototype);
	CSG.addTransformationMethodsToPrototype(CSG.Polygon.prototype);
	CSG.addTransformationMethodsToPrototype(CSG.Line3D.prototype);
	CSG.addTransformationMethodsToPrototype(CSG.Connector.prototype);
	CSG.addTransformationMethodsToPrototype(CSG.Path2D.prototype);
	CSG.addTransformationMethodsToPrototype(CSG.Line2D.prototype);
	CSG.addTransformationMethodsToPrototype(CAG.prototype);
	CSG.addTransformationMethodsToPrototype(CAG.Side.prototype);

	/*
	  2D polygons are now supported through the CAG class.
	  With many improvements (see documentation):
		- shapes do no longer have to be convex
		- union/intersect/subtract is supported
		- expand / contract are supported

	  But we'll keep CSG.Polygon2D as a stub for backwards compatibility
	*/
	CSG.Polygon2D = function(points) {
		var cag = CAG.fromPoints(points);
		this.sides = cag.sides;
	};
	CSG.Polygon2D.prototype = CAG.prototype;


	module.CSG = CSG;
	module.CAG = CAG;
	// module.exports.CSG = CSG;
	// module.exports.CAG = CAG;
	})(this); //module to export to


/***/ },

/***/ 200:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(33)

/***/ },

/***/ 201:
/***/ function(module, exports, __webpack_require__) {

	exports.parse = __webpack_require__(204);
	// exports.stringify = require('./lib/stringify');


/***/ },

/***/ 202:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }

	  return parts;
	}

	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};

	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;

	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();

	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }

	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }

	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)

	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');

	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};

	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';

	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');

	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }

	  return (isAbsolute ? '/' : '') + path;
	};

	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};

	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};


	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);

	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }

	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }

	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }

	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));

	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }

	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }

	  outputParts = outputParts.concat(toParts.slice(samePartsLength));

	  return outputParts.join('/');
	};

	exports.sep = '/';
	exports.delimiter = ':';

	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];

	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }

	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }

	  return root + dir;
	};


	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};


	exports.extname = function(path) {
	  return splitPath(path)[3];
	};

	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}

	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(205)))

/***/ },

/***/ 203:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/**
	 * @license
	 * Lo-Dash 3.0.0-pre (Custom Build) <https://lodash.com/>
	 * Build: `lodash -o ./dist/lodash.compat.js`
	 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	;(function() {

	  /** Used as a safe reference for `undefined` in pre ES5 environments. */
	  var undefined;

	  /** Used as the semantic version number. */
	  var VERSION = '3.0.0-pre';

	  /** Used to compose bitmasks for wrapper metadata. */
	  var BIND_FLAG = 1,
	      BIND_KEY_FLAG = 2,
	      CURRY_BOUND_FLAG = 4,
	      CURRY_FLAG = 8,
	      CURRY_RIGHT_FLAG = 16,
	      PARTIAL_FLAG = 32,
	      PARTIAL_RIGHT_FLAG = 64,
	      REARG_FLAG = 128,
	      ARY_FLAG = 256;

	  /** Used as default options for `_.trunc`. */
	  var DEFAULT_TRUNC_LENGTH = 30,
	      DEFAULT_TRUNC_OMISSION = '...';

	  /** Used to detect when a function becomes hot. */
	  var HOT_COUNT = 150,
	      HOT_SPAN = 16;

	  /** Used to indicate the type of lazy iteratees. */
	  var LAZY_FILTER_FLAG = 0,
	      LAZY_MAP_FLAG = 1,
	      LAZY_WHILE_FLAG = 2;

	  /** Used as the `TypeError` message for "Functions" methods. */
	  var FUNC_ERROR_TEXT = 'Expected a function';

	  /** Used as the internal argument placeholder. */
	  var PLACEHOLDER = '__lodash_placeholder__';

	  /** Used to match empty string literals in compiled template source. */
	  var reEmptyStringLeading = /\b__p \+= '';/g,
	      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
	      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

	  /** Used to match HTML entities and HTML characters. */
	  var reEscapedHtml = /&(?:amp|lt|gt|quot|#39|#96);/g,
	      reUnescapedHtml = /[&<>"'`]/g,
	      reHasEscapedHtml = RegExp(reEscapedHtml.source),
	      reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

	  /** Used to match template delimiters. */
	  var reEscape = /<%-([\s\S]+?)%>/g,
	      reEvaluate = /<%([\s\S]+?)%>/g,
	      reInterpolate = /<%=([\s\S]+?)%>/g;

	  /**
	   * Used to match ES6 template delimiters.
	   * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-template-literal-lexical-components)
	   * for more details.
	   */
	  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

	  /** Used to match `RegExp` flags from their coerced string values. */
	  var reFlags = /\w*$/;

	  /** Used to detect named functions. */
	  var reFuncName = /^\s*function[ \n\r\t]+\w/;

	  /** Used to detect hexadecimal string values. */
	  var reHexPrefix = /^0[xX]/;

	  /** Used to detect host constructors (Safari > 5). */
	  var reHostCtor = /^\[object .+?Constructor\]$/;

	  /** Used to match latin-1 supplementary letters (excluding mathematical operators). */
	  var reLatin1 = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g;

	  /** Used to ensure capturing order of template delimiters. */
	  var reNoMatch = /($^)/;

	  /**
	   * Used to match `RegExp` special characters.
	   * See this [article on `RegExp` characters](http://www.regular-expressions.info/characters.html#special)
	   * for more details.
	   */
	  var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
	      reHasRegExpChars = RegExp(reRegExpChars.source);

	  /** Used to detect functions containing a `this` reference. */
	  var reThis = /\bthis\b/;

	  /** Used to match unescaped characters in compiled string literals. */
	  var reUnescapedString = /['\n\r\u2028\u2029\\]/g;

	  /** Used to match words to create compound words. */
	  var reWords = (function() {
	    var upper = '[A-Z\\xc0-\\xd6\\xd8-\\xde]',
	        lower = '[a-z\\xdf-\\xf6\\xf8-\\xff]+';

	    return RegExp(upper + '{2,}(?=' + upper + lower + ')|' + upper + '?' + lower + '|' + upper + '+|[0-9]+', 'g');
	  }());

	  /** Used to detect and test for whitespace. */
	  var whitespace = (
	    // Basic whitespace characters.
	    ' \t\x0b\f\xa0\ufeff' +

	    // Line terminators.
	    '\n\r\u2028\u2029' +

	    // Unicode category "Zs" space separators.
	    '\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000'
	  );

	  /** Used to assign default `context` object properties. */
	  var contextProps = [
	    'Array', 'ArrayBuffer', 'Date', 'Error', 'Float32Array', 'Float64Array',
	    'Function', 'Int8Array', 'Int16Array', 'Int32Array', 'Math', 'Number',
	    'Object', 'RegExp', 'Set', 'String', '_', 'clearTimeout', 'document',
	    'isFinite', 'parseInt', 'setTimeout', 'TypeError', 'Uint8Array',
	    'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'WeakMap',
	    'window', 'WinRTError'
	  ];

	  /** Used to fix the JScript `[[DontEnum]]` bug. */
	  var shadowProps = [
	    'constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable',
	    'toLocaleString', 'toString', 'valueOf'
	  ];

	  /** Used to make template sourceURLs easier to identify. */
	  var templateCounter = -1;

	  /** `Object#toString` result references. */
	  var argsClass = '[object Arguments]',
	      arrayClass = '[object Array]',
	      boolClass = '[object Boolean]',
	      dateClass = '[object Date]',
	      errorClass = '[object Error]',
	      funcClass = '[object Function]',
	      mapClass = '[object Map]',
	      numberClass = '[object Number]',
	      objectClass = '[object Object]',
	      regexpClass = '[object RegExp]',
	      setClass = '[object Set]',
	      stringClass = '[object String]',
	      weakMapClass = '[object WeakMap]';

	  var arrayBufferClass = '[object ArrayBuffer]',
	      float32Class = '[object Float32Array]',
	      float64Class = '[object Float64Array]',
	      int8Class = '[object Int8Array]',
	      int16Class = '[object Int16Array]',
	      int32Class = '[object Int32Array]',
	      uint8Class = '[object Uint8Array]',
	      uint8ClampedClass = '[object Uint8ClampedArray]',
	      uint16Class = '[object Uint16Array]',
	      uint32Class = '[object Uint32Array]';

	  /** Used to identify object classifications that are treated like arrays. */
	  var arrayLikeClasses = {};
	  arrayLikeClasses[argsClass] =
	  arrayLikeClasses[arrayClass] = arrayLikeClasses[float32Class] =
	  arrayLikeClasses[float64Class] = arrayLikeClasses[int8Class] =
	  arrayLikeClasses[int16Class] = arrayLikeClasses[int32Class] =
	  arrayLikeClasses[uint8Class] = arrayLikeClasses[uint8ClampedClass] =
	  arrayLikeClasses[uint16Class] = arrayLikeClasses[uint32Class] = true;
	  arrayLikeClasses[arrayBufferClass] = arrayLikeClasses[boolClass] =
	  arrayLikeClasses[dateClass] = arrayLikeClasses[errorClass] =
	  arrayLikeClasses[funcClass] = arrayLikeClasses[mapClass] =
	  arrayLikeClasses[numberClass] = arrayLikeClasses[objectClass] =
	  arrayLikeClasses[regexpClass] = arrayLikeClasses[setClass] =
	  arrayLikeClasses[stringClass] = arrayLikeClasses[weakMapClass] = false;

	  /** Used to identify object classifications that `_.clone` supports. */
	  var cloneableClasses = {};
	  cloneableClasses[argsClass] = cloneableClasses[arrayClass] =
	  cloneableClasses[arrayBufferClass] = cloneableClasses[boolClass] =
	  cloneableClasses[dateClass] = cloneableClasses[float32Class] =
	  cloneableClasses[float64Class] = cloneableClasses[int8Class] =
	  cloneableClasses[int16Class] = cloneableClasses[int32Class] =
	  cloneableClasses[numberClass] = cloneableClasses[objectClass] =
	  cloneableClasses[regexpClass] = cloneableClasses[stringClass] =
	  cloneableClasses[uint8Class] = cloneableClasses[uint8ClampedClass] =
	  cloneableClasses[uint16Class] = cloneableClasses[uint32Class] = true;
	  cloneableClasses[errorClass] =
	  cloneableClasses[funcClass] = cloneableClasses[mapClass] =
	  cloneableClasses[setClass] = cloneableClasses[weakMapClass] = false;

	  /** Used as an internal `_.debounce` options object by `_.throttle`. */
	  var debounceOptions = {
	    'leading': false,
	    'maxWait': 0,
	    'trailing': false
	  };

	  /** Used to map latin-1 supplementary letters to basic latin letters. */
	  var deburredLetters = {
	    '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
	    '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
	    '\xc7': 'C',  '\xe7': 'c',
	    '\xd0': 'D',  '\xf0': 'd',
	    '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
	    '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
	    '\xcC': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
	    '\xeC': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
	    '\xd1': 'N',  '\xf1': 'n',
	    '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
	    '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
	    '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
	    '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
	    '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
	    '\xc6': 'Ae', '\xe6': 'ae',
	    '\xde': 'Th', '\xfe': 'th',
	    '\xdf': 'ss'
	  };

	  /** Used to map characters to HTML entities. */
	  var htmlEscapes = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#39;',
	    '`': '&#96;'
	  };

	  /** Used to map HTML entities to characters. */
	  var htmlUnescapes = {
	    '&amp;': '&',
	    '&lt;': '<',
	    '&gt;': '>',
	    '&quot;': '"',
	    '&#39;': "'",
	    '&#96;': '`'
	  };

	  /** Used to determine if values are of the language type `Object`. */
	  var objectTypes = {
	    'function': true,
	    'object': true
	  };

	  /** Used to escape characters for inclusion in compiled string literals. */
	  var stringEscapes = {
	    '\\': '\\',
	    "'": "'",
	    '\n': 'n',
	    '\r': 'r',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  /**
	   * Used as a reference to the global object.
	   *
	   * The `this` value is used if it is the global object to avoid Greasemonkey's
	   * restricted `window` object, otherwise the `window` object is used.
	   */
	  var root = (objectTypes[typeof window] && window !== (this && this.window)) ? window : this;

	  /** Detect free variable `exports`. */
	  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

	  /** Detect free variable `module`. */
	  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

	  /** Detect free variable `global` from Node.js or Browserified code and use it as `root`. */
	  var freeGlobal = freeExports && freeModule && typeof global == 'object' && global;
	  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
	    root = freeGlobal;
	  }

	  /** Detect the popular CommonJS extension `module.exports`. */
	  var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;

	  /*--------------------------------------------------------------------------*/

	  /**
	   * A specialized version of `_.forEach` for arrays without support for callback
	   * shorthands or `this` binding.
	   *
	   * @private
	   * @param {Array} array The array to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Array} Returns `array`.
	   */
	  function arrayEach(array, iteratee) {
	    var index = -1,
	        length = array.length;

	    while (++index < length) {
	      if (iteratee(array[index], index, array) === false) {
	        break;
	      }
	    }
	    return array;
	  }

	  /**
	   * A specialized version of `_.forEachRight` for arrays without support for
	   * callback shorthands or `this` binding.
	   *
	   * @private
	   * @param {Array} array The array to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Array} Returns `array`.
	   */
	  function arrayEachRight(array, iteratee) {
	    var length = array.length;

	    while (length--) {
	      if (iteratee(array[length], length, array) === false) {
	        break;
	      }
	    }
	    return array;
	  }

	  /**
	   * A specialized version of `_.every` for arrays without support for callback
	   * shorthands or `this` binding.
	   *
	   * @private
	   * @param {Array} array The array to iterate over.
	   * @param {Function} predicate The function invoked per iteration.
	   * @returns {Array} Returns `true` if all elements pass the predicate check,
	   *  else `false`.
	   */
	  function arrayEvery(array, predicate) {
	    var index = -1,
	        length = array.length;

	    while (++index < length) {
	      if (!predicate(array[index], index, array)) {
	        return false;
	      }
	    }
	    return true;
	  }

	  /**
	   * A specialized version of `_.filter` for arrays without support for callback
	   * shorthands or `this` binding.
	   *
	   * @private
	   * @param {Array} array The array to iterate over.
	   * @param {Function} predicate The function invoked per iteration.
	   * @returns {Array} Returns the new filtered array.
	   */
	  function arrayFilter(array, predicate) {
	    var index = -1,
	        length = array.length,
	        resIndex = -1,
	        result = [];

	    while (++index < length) {
	      var value = array[index];
	      if (predicate(value, index, array)) {
	        result[++resIndex] = value;
	      }
	    }
	    return result;
	  }

	  /**
	   * A specialized version of `_.map` for arrays without support for callback
	   * shorthands or `this` binding.
	   *
	   * @private
	   * @param {Array} array The array to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Array} Returns the new mapped array.
	   */
	  function arrayMap(array, iteratee) {
	    var index = -1,
	        length = array.length,
	        result = Array(length);

	    while (++index < length) {
	      result[index] = iteratee(array[index], index, array);
	    }
	    return result;
	  }

	  /**
	   * A specialized version of `_.reduce` for arrays without support for callback
	   * shorthands or `this` binding.
	   *
	   * @private
	   * @param {Array} array The array to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @param {*} [accumulator] The initial value.
	   * @param {boolean} [initFromArray] Specify using the first element of
	   *  `array` as the initial value.
	   * @returns {*} Returns the accumulated value.
	   */
	  function arrayReduce(array, iteratee, accumulator, initFromArray) {
	    var index = -1,
	        length = array.length;

	    if (initFromArray && length) {
	      accumulator = array[++index];
	    }
	    while (++index < length) {
	      accumulator = iteratee(accumulator, array[index], index, array);
	    }
	    return accumulator;
	  }

	  /**
	   * A specialized version of `_.reduceRight` for arrays without support for
	   * callback shorthands or `this` binding.
	   *
	   * @private
	   * @param {Array} array The array to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @param {*} [accumulator] The initial value.
	   * @param {boolean} [initFromArray] Specify using the last element of
	   *  `array` as the initial value.
	   * @returns {*} Returns the accumulated value.
	   */
	  function arrayReduceRight(array, iteratee, accumulator, initFromArray) {
	    var length = array.length;
	    if (initFromArray && length) {
	      accumulator = array[--length];
	    }
	    while (length--) {
	      accumulator = iteratee(accumulator, array[length], length, array);
	    }
	    return accumulator;
	  }

	  /**
	   * A specialized version of `_.some` for arrays without support for callback
	   * shorthands or `this` binding.
	   *
	   * @private
	   * @param {Array} array The array to iterate over.
	   * @param {Function} predicate The function invoked per iteration.
	   * @returns {boolean} Returns `true` if any element passes the predicate check,
	   *  else `false`.
	   */
	  function arraySome(array, predicate) {
	    var index = -1,
	        length = array.length;

	    while (++index < length) {
	      if (predicate(array[index], index, array)) {
	        return true;
	      }
	    }
	    return false;
	  }

	  /**
	   * The base implementation of `compareAscending` which compares values and
	   * sorts them in ascending order without guaranteeing a stable sort.
	   *
	   * @private
	   * @param {*} value The value to compare to `other`.
	   * @param {*} other The value to compare to `value`.
	   * @returns {number} Returns the sort order indicator for `value`.
	   */
	  function baseCompareAscending(value, other) {
	    if (value !== other) {
	      var valIsReflexive = value === value,
	          othIsReflexive = other === other;

	      if (value > other || !valIsReflexive || (typeof value == 'undefined' && othIsReflexive)) {
	        return 1;
	      }
	      if (value < other || !othIsReflexive || (typeof other == 'undefined' && valIsReflexive)) {
	        return -1;
	      }
	    }
	    return 0;
	  }

	  /**
	   * The base implementation of `_.indexOf` without support for binary searches.
	   *
	   * @private
	   * @param {Array} array The array to search.
	   * @param {*} value The value to search for.
	   * @param {number} [fromIndex=0] The index to search from.
	   * @returns {number} Returns the index of the matched value, else `-1`.
	   */
	  function baseIndexOf(array, value, fromIndex) {
	    if (value !== value) {
	      return indexOfNaN(array, fromIndex);
	    }
	    var index = (fromIndex || 0) - 1,
	        length = array.length;

	    while (++index < length) {
	      if (array[index] === value) {
	        return index;
	      }
	    }
	    return -1;
	  }

	  /**
	   * The base implementation of `_.slice` without support for `start` and `end`
	   * arguments.
	   *
	   * @private
	   * @param {Array} array The array to slice.
	   * @returns {Array} Returns the slice of `array`.
	   */
	  function baseSlice(array) {
	    var index = -1,
	        length = array.length,
	        result = Array(length);

	    while (++index < length) {
	      result[index] = array[index];
	    }
	    return result;
	  }

	  /**
	   * The base implementation of `_.sortBy` and `_.sortByAll` which uses `comparer`
	   * to define the sort order of `array` and replaces criteria objects with their
	   * corresponding values.
	   *
	   * @private
	   * @param {Array} array The array to sort.
	   * @param {Function} comparer The function to define sort order.
	   * @returns {Array} Returns `array`.
	   */
	  function baseSortBy(array, comparer) {
	    var length = array.length;

	    array.sort(comparer);
	    while (length--) {
	      array[length] = array[length].value;
	    }
	    return array;
	  }

	  /**
	   * Used by `_.max` and `_.min` as the default callback for string values.
	   *
	   * @private
	   * @param {string} string The string to inspect.
	   * @returns {number} Returns the code unit of the first character of the string.
	   */
	  function charAtCallback(string) {
	    return string.charCodeAt(0);
	  }

	  /**
	   * Used by `_.trim` and `_.trimLeft` to get the index of the first character
	   * of `string` that is not found in `chars`.
	   *
	   * @private
	   * @param {string} string The string to inspect.
	   * @param {string} chars The characters to find.
	   * @returns {number} Returns the index of the first character not found in `chars`.
	   */
	  function charsLeftIndex(string, chars) {
	    var index = -1,
	        length = string.length;

	    while (++index < length && chars.indexOf(string.charAt(index)) > -1) {}
	    return index;
	  }

	  /**
	   * Used by `_.trim` and `_.trimRight` to get the index of the last character
	   * of `string` that is not found in `chars`.
	   *
	   * @private
	   * @param {string} string The string to inspect.
	   * @param {string} chars The characters to find.
	   * @returns {number} Returns the index of the last character not found in `chars`.
	   */
	  function charsRightIndex(string, chars) {
	    var index = string.length;

	    while (index-- && chars.indexOf(string.charAt(index)) > -1) {}
	    return index;
	  }

	  /**
	   * Used by `_.sortBy` to compare transformed elements of a collection and stable
	   * sort them in ascending order.
	   *
	   * @private
	   * @param {Object} object The object to compare to `other`.
	   * @param {Object} other The object to compare to `object`.
	   * @returns {number} Returns the sort order indicator for `object`.
	   */
	  function compareAscending(object, other) {
	    return baseCompareAscending(object.criteria, other.criteria) || (object.index - other.index);
	  }

	  /**
	   * Used by `_.sortByAll` to compare multiple properties of each element
	   * in a collection and stable sort them in ascending order.
	   *
	   * @private
	   * @param {Object} object The object to compare to `other`.
	   * @param {Object} other The object to compare to `object`.
	   * @returns {number} Returns the sort order indicator for `object`.
	   */
	  function compareMultipleAscending(object, other) {
	    var index = -1,
	        objCriteria = object.criteria,
	        othCriteria = other.criteria,
	        length = objCriteria.length;

	    while (++index < length) {
	      var result = baseCompareAscending(objCriteria[index], othCriteria[index]);
	      if (result) {
	        return result;
	      }
	    }
	    // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
	    // that causes it, under certain circumstances, to provide the same value
	    // for `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247.
	    //
	    // This also ensures a stable sort in V8 and other engines.
	    // See https://code.google.com/p/v8/issues/detail?id=90.
	    return object.index - other.index;
	  }

	  /**
	   * Used by `_.deburr` to convert latin-1 supplementary letters to basic latin letters.
	   *
	   * @private
	   * @param {string} letter The matched letter to deburr.
	   * @returns {string} Returns the deburred letter.
	   */
	  function deburrLetter(letter) {
	    return deburredLetters[letter];
	  }

	  /**
	   * Used by `_.escape` to convert characters to HTML entities.
	   *
	   * @private
	   * @param {string} chr The matched character to escape.
	   * @returns {string} Returns the escaped character.
	   */
	  function escapeHtmlChar(chr) {
	    return htmlEscapes[chr];
	  }

	  /**
	   * Used by `_.template` to escape characters for inclusion in compiled
	   * string literals.
	   *
	   * @private
	   * @param {string} chr The matched character to escape.
	   * @returns {string} Returns the escaped character.
	   */
	  function escapeStringChar(chr) {
	    return '\\' + stringEscapes[chr];
	  }

	  /**
	   * Gets the index at which the first occurrence of `NaN` is found in `array`.
	   * If `fromRight` is provided elements of `array` are iterated from right to left.
	   *
	   * @private
	   * @param {Array} array The array to search.
	   * @param {number} [fromIndex] The index to search from.
	   * @param {boolean} [fromRight] Specify iterating from right to left.
	   * @returns {number} Returns the index of the matched `NaN`, else `-1`.
	   */
	  function indexOfNaN(array, fromIndex, fromRight) {
	    var length = array.length,
	        index = fromRight ? (fromIndex || length) : ((fromIndex || 0) - 1);

	    while ((fromRight ? index-- : ++index < length)) {
	      var other = array[index];
	      if (other !== other) {
	        return index;
	      }
	    }
	    return -1;
	  }

	  /**
	   * Checks if `value` is a host object in IE < 9.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	   */
	  var isHostObject = (function() {
	    try {
	      String({ 'toString': 0 } + '');
	    } catch(e) {
	      return function() { return false; };
	    }
	    return function(value) {
	      // IE < 9 presents many host objects as `Object` objects that can coerce
	      // to strings despite having improperly defined `toString` methods.
	      return typeof value.toString != 'function' && typeof (value + '') == 'string';
	    };
	  }());

	  /**
	   * Checks if `value` is a valid array-like index.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @param {number} [length] The upper bounds of a valid index.
	   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	   */
	  function isIndex(value, length) {
	    value = +value;
	    return value > -1 && value % 1 == 0 && (length == null || value < length);
	  }

	  /**
	   * Checks if `value` is object-like.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	   */
	  function isObjectLike(value) {
	    return (value && typeof value == 'object') || false;
	  }

	  /**
	   * Used by `trimmedLeftIndex` and `trimmedRightIndex` to determine if a
	   * character code is whitespace.
	   *
	   * @private
	   * @param {number} charCode The character code to inspect.
	   * @returns {boolean} Returns `true` if `charCode` is whitespace, else `false`.
	   */
	  function isSpace(charCode) {
	    return ((charCode <= 160 && (charCode >= 9 && charCode <= 13) || charCode == 32 || charCode == 160) || charCode == 5760 || charCode == 6158 ||
	      (charCode >= 8192 && (charCode <= 8202 || charCode == 8232 || charCode == 8233 || charCode == 8239 || charCode == 8287 || charCode == 12288 || charCode == 65279)));
	  }

	  /**
	   * Replaces all `placeholder` elements in `array` with an internal placeholder
	   * and returns an array of their indexes.
	   *
	   * @private
	   * @param {Array} array The array to modify.
	   * @param {*} placeholder The placeholder to replace.
	   * @returns {Array} Returns the new array of placeholder indexes.
	   */
	  function replaceHolders(array, placeholder) {
	    var index = -1,
	        length = array.length,
	        resIndex = -1,
	        result = [];

	    while (++index < length) {
	      if (array[index] === placeholder) {
	        array[index] = PLACEHOLDER;
	        result[++resIndex] = index;
	      }
	    }
	    return result;
	  }

	  /**
	   * An implementation of `_.uniq` optimized for sorted arrays without support
	   * for callback shorthands and `this` binding.
	   *
	   * @private
	   * @param {Array} array The array to inspect.
	   * @param {Function} [iteratee] The function invoked per iteration.
	   * @returns {Array} Returns the new duplicate-value-free array.
	   */
	  function sortedUniq(array, iteratee) {
	    var seen,
	        index = -1,
	        length = array.length,
	        resIndex = -1,
	        result = [];

	    while (++index < length) {
	      var value = array[index],
	          computed = iteratee ? iteratee(value, index, array) : value;

	      if (!index || seen !== computed) {
	        seen = computed;
	        result[++resIndex] = value;
	      }
	    }
	    return result;
	  }

	  /**
	   * Used by `_.trim` and `_.trimLeft` to get the index of the first non-whitespace
	   * character of `string`.
	   *
	   * @private
	   * @param {string} string The string to inspect.
	   * @returns {number} Returns the index of the first non-whitespace character.
	   */
	  function trimmedLeftIndex(string) {
	    var index = -1,
	        length = string.length;

	    while (++index < length && isSpace(string.charCodeAt(index))) {}
	    return index;
	  }

	  /**
	   * Used by `_.trim` and `_.trimRight` to get the index of the last non-whitespace
	   * character of `string`.
	   *
	   * @private
	   * @param {string} string The string to inspect.
	   * @returns {number} Returns the index of the last non-whitespace character.
	   */
	  function trimmedRightIndex(string) {
	    var index = string.length;

	    while (index-- && isSpace(string.charCodeAt(index))) {}
	    return index;
	  }

	  /**
	   * Used by `_.unescape` to convert HTML entities to characters.
	   *
	   * @private
	   * @param {string} chr The matched character to unescape.
	   * @returns {string} Returns the unescaped character.
	   */
	  function unescapeHtmlChar(chr) {
	    return htmlUnescapes[chr];
	  }

	  /*--------------------------------------------------------------------------*/

	  /**
	   * Create a new pristine `lodash` function using the given `context` object.
	   *
	   * @static
	   * @memberOf _
	   * @category Utility
	   * @param {Object} [context=root] The context object.
	   * @returns {Function} Returns a new `lodash` function.
	   * @example
	   *
	   * _.mixin({ 'add': function(a, b) { return a + b; } }, false);
	   *
	   * var lodash = _.runInContext();
	   * lodash.mixin({ 'sub': function(a, b) { return a - b; } }, false);
	   *
	   * _.isFunction(_.add);
	   * // => true
	   *
	   * _.isFunction(_.sub);
	   * // => false
	   *
	   * lodash.isFunction(lodash.add);
	   * // => false
	   *
	   * lodash.isFunction(lodash.sub);
	   * // => true
	   */
	  function runInContext(context) {
	    // Avoid issues with some ES3 environments that attempt to use values, named
	    // after built-in constructors like `Object`, for the creation of literals.
	    // ES5 clears this up by stating that literals must use built-in constructors.
	    // See http://es5.github.io/#x11.1.5.
	    context = context ? _.defaults(root.Object(), context, _.pick(root, contextProps)) : root;

	    /** Native constructor references. */
	    var Array = context.Array,
	        Date = context.Date,
	        Error = context.Error,
	        Function = context.Function,
	        Math = context.Math,
	        Number = context.Number,
	        Object = context.Object,
	        RegExp = context.RegExp,
	        String = context.String,
	        TypeError = context.TypeError;

	    /** Used for native method references. */
	    var arrayProto = Array.prototype,
	        errorProto = Error.prototype,
	        objectProto = Object.prototype,
	        stringProto = String.prototype;

	    /** Used to detect DOM support. */
	    var document = (document = context.window) && document.document;

	    /** Used to resolve the decompiled source of functions. */
	    var fnToString = Function.prototype.toString;

	    /** Used to the length of n-tuples for `_.unzip`. */
	    var getLength = baseProperty('length');

	    /** Used to check objects for own properties. */
	    var hasOwnProperty = objectProto.hasOwnProperty;

	    /** Used to generate unique IDs. */
	    var idCounter = 0;

	    /** Used to restore the original `_` reference in `_.noConflict`. */
	    var oldDash = context._;

	    /** Used to resolve the internal `[[Class]]` of values. */
	    var toString = objectProto.toString;

	    /** Used to detect if a method is native. */
	    var reNative = RegExp('^' +
	      escapeRegExp(toString)
	      .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	    );

	    /** Native method references. */
	    var ArrayBuffer = isNative(ArrayBuffer = context.ArrayBuffer) && ArrayBuffer,
	        bufferSlice = isNative(bufferSlice = ArrayBuffer && new ArrayBuffer(0).slice) && bufferSlice,
	        ceil = Math.ceil,
	        clearTimeout = context.clearTimeout,
	        floor = Math.floor,
	        getPrototypeOf = isNative(getPrototypeOf = Object.getPrototypeOf) && getPrototypeOf,
	        push = arrayProto.push,
	        propertyIsEnumerable = objectProto.propertyIsEnumerable,
	        Set = isNative(Set = context.Set) && Set,
	        setTimeout = context.setTimeout,
	        splice = arrayProto.splice,
	        Uint8Array = isNative(Uint8Array = context.Uint8Array) && Uint8Array,
	        unshift = arrayProto.unshift,
	        WeakMap = isNative(WeakMap = context.WeakMap) && WeakMap;

	    /** Used to clone array buffers. */
	    var Float64Array = (function() {
	      // Safari 5 errors when using an array buffer to initialize a typed array
	      // where the array buffer's `byteLength` is not a multiple of the typed
	      // array's `BYTES_PER_ELEMENT`.
	      try {
	        var func = isNative(func = context.Float64Array) && func,
	            result = new func(new ArrayBuffer(10), 0, 1) && func;
	      } catch(e) {}
	      return result;
	    }());

	    /* Native method references for those with the same name as other `lodash` methods. */
	    var nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray,
	        nativeIsFinite = context.isFinite,
	        nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys,
	        nativeMax = Math.max,
	        nativeMin = Math.min,
	        nativeNow = isNative(nativeNow = Date.now) && nativeNow,
	        nativeNumIsFinite = isNative(nativeNumIsFinite = Number.isFinite) && nativeNumIsFinite,
	        nativeParseInt = context.parseInt,
	        nativeRandom = Math.random;

	    /** Used as references for `-Infinity` and `Infinity`. */
	    var NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY,
	        POSITIVE_INFINITY = Number.POSITIVE_INFINITY;

	    /** Used as references for the maximum length and index of an array. */
	    var MAX_ARRAY_LENGTH = Math.pow(2, 32) - 1,
	        MAX_ARRAY_INDEX =  MAX_ARRAY_LENGTH - 1,
	        HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;

	    /** Used as the size, in bytes, of each `Float64Array` element. */
	    var FLOAT64_BYTES_PER_ELEMENT = Float64Array ? Float64Array.BYTES_PER_ELEMENT : 0;

	    /**
	     * Used as the maximum length of an array-like value.
	     * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
	     * for more details.
	     */
	    var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

	    /** Used to store function metadata. */
	    var metaMap = WeakMap && new WeakMap;

	    /** Used to lookup a built-in constructor by `[[Class]]`. */
	    var ctorByClass = {};
	    ctorByClass[float32Class] = context.Float32Array;
	    ctorByClass[float64Class] = context.Float64Array;
	    ctorByClass[int8Class] = context.Int8Array;
	    ctorByClass[int16Class] = context.Int16Array;
	    ctorByClass[int32Class] = context.Int32Array;
	    ctorByClass[uint8Class] = context.Uint8Array;
	    ctorByClass[uint8ClampedClass] = context.Uint8ClampedArray;
	    ctorByClass[uint16Class] = context.Uint16Array;
	    ctorByClass[uint32Class] = context.Uint32Array;

	    /** Used to avoid iterating over non-enumerable properties in IE < 9. */
	    var nonEnumProps = {};
	    nonEnumProps[arrayClass] = nonEnumProps[dateClass] = nonEnumProps[numberClass] = { 'constructor': true, 'toLocaleString': true, 'toString': true, 'valueOf': true };
	    nonEnumProps[boolClass] = nonEnumProps[stringClass] = { 'constructor': true, 'toString': true, 'valueOf': true };
	    nonEnumProps[errorClass] = nonEnumProps[funcClass] = nonEnumProps[regexpClass] = { 'constructor': true, 'toString': true };
	    nonEnumProps[objectClass] = { 'constructor': true };

	    arrayEach(shadowProps, function(key) {
	      for (var className in nonEnumProps) {
	        if (hasOwnProperty.call(nonEnumProps, className)) {
	          var props = nonEnumProps[className];
	          props[key] = hasOwnProperty.call(props, key);
	        }
	      }
	    });

	    /*------------------------------------------------------------------------*/

	    /**
	     * Creates a `lodash` object which wraps `value` to enable intuitive chaining.
	     * Methods that operate on and return arrays, collections, and functions can
	     * be chained together. Methods that return a boolean or single value will
	     * automatically end the chain returning the unwrapped value. Explicit chaining
	     * may be enabled using `_.chain`. The execution of chained methods is lazy,
	     * that is, execution is deferred until `_#value` is implicitly or explicitly
	     * called.
	     *
	     * Lazy evaluation allows several methods to support shortcut fusion. Shortcut
	     * fusion is an optimization that merges iteratees to avoid creating intermediate
	     * arrays and reduce the number of iteratee executions.
	     *
	     * Chaining is supported in custom builds as long as the `_#value` method is
	     * directly or indirectly included in the build.
	     *
	     * In addition to Lo-Dash methods, wrappers also have the following `Array` methods:
	     * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`, `splice`,
	     * and `unshift`
	     *
	     * The wrapper functons that support shortcut fusion are:
	     * `drop`, `dropRight`, `dropRightWhile`, `dropWhile`, `filter`, `first`,
	     * `initial`, `last`, `map`, `pluck`, `reject`, `rest`, `reverse`, `slice`,
	     * `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `where`
	     *
	     * The chainable wrapper functions are:
	     * `after`, `ary`, `assign`, `at`, `before`, `bind`, `bindAll`, `bindKey`,
	     * `callback`, `chain`, `chunk`, `compact`, `concat`, `constant`, `countBy`,
	     * `create`, `curry`, `debounce`, `defaults`, `defer`, `delay`, `difference`,
	     * `drop`, `dropRight`, `dropRightWhile`, `dropWhile`, `filter`, `flatten`,
	     * `flattenDeep`, `flow`, `flowRight`, `forEach`, `forEachRight`, `forIn`,
	     * `forInRight`, `forOwn`, `forOwnRight`, `functions`, `groupBy`, `indexBy`,
	     * `initial`, `intersection`, `invert`, `invoke`, `keys`, `keysIn`, `map`,
	     * `mapValues`, `matches`, `memoize`, `merge`, `mixin`, `negate`, `noop`,
	     * `omit`, `once`, `pairs`, `partial`, `partialRight`, `partition`, `pick`,
	     * `pluck`, `property`, `propertyOf`, `pull`, `pullAt`, `push`, `range`,
	     * `rearg`, `reject`, `remove`, `rest`, `reverse`, `shuffle`, `slice`, `sort`,
	     * `sortBy`, `sortByAll`, `splice`, `take`, `takeRight`, `takeRightWhile`,
	     * `takeWhile`, `tap`, `throttle`, `thru`, `times`, `toArray`, `transform`,
	     * `union`, `uniq`, `unshift`, `unzip`, `values`, `valuesIn`, `where`,
	     * `without`, `wrap`, `xor`, `zip`, and `zipObject`
	     *
	     * The wrapper functions that are **not** chainable by default are:
	     * `attempt`, `camelCase`, `capitalize`, `clone`, `cloneDeep`, `deburr`,
	     * `endsWith`, `escape`, `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`,
	     * `findLast`, `findLastIndex`, `findLastKey`, `findWhere`, `first`, `has`,
	     * `identity`, `includes`, `indexOf`, `isArguments`, `isArray`, `isBoolean`,
	     * `isDate`, `isElement`, `isEmpty`, `isEqual`, `isError`, `isFinite`,
	     * `isFunction`, `isMatch` , `isNative`, `isNaN`, `isNull`, `isNumber`,
	     * `isObject`, `isPlainObject`, `isRegExp`, `isString`, `isUndefined`, `join`,
	     * `kebabCase`, `last`, `lastIndexOf`, `max`, `min`, `noConflict`, `now`, `pad`,
	     * `padLeft`, `padRight`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
	     * `repeat`, `result`, `runInContext`, `shift`, `size`, `snakeCase`, `some`,
	     * `sortedIndex`, `sortedLastIndex`, `startsWith`, `template`, `trim`, `trimLeft`,
	     * `trimRight`, `trunc`, `unescape`, `uniqueId`, `value`, and `words`
	     *
	     * The wrapper function `sample` will return a wrapped value when `n` is provided,
	     * otherwise an unwrapped value is returned.
	     *
	     * @name _
	     * @constructor
	     * @category Chain
	     * @param {*} value The value to wrap in a `lodash` instance.
	     * @returns {Object} Returns a `lodash` instance.
	     * @example
	     *
	     * var wrapped = _([1, 2, 3]);
	     *
	     * // returns an unwrapped value
	     * wrapped.reduce(function(sum, n) { return sum + n; });
	     * // => 6
	     *
	     * // returns a wrapped value
	     * var squares = wrapped.map(function(n) { return n * n; });
	     *
	     * _.isArray(squares);
	     * // => false
	     *
	     * _.isArray(squares.value());
	     * // => true
	     */
	    function lodash(value) {
	      if (isObjectLike(value) && !isArray(value)) {
	        if (value instanceof LodashWrapper) {
	          return value;
	        }
	        if (hasOwnProperty.call(value, '__wrapped__')) {
	          return new LodashWrapper(value.__wrapped__, value.__chain__, baseSlice(value.__actions__));
	        }
	      }
	      return new LodashWrapper(value);
	    }

	    /**
	     * The base constructor for creating `lodash` wrapper objects.
	     *
	     * @private
	     * @param {*} value The value to wrap.
	     * @param {boolean} [chainAll] Enable chaining for all wrapper methods.
	     * @param {Array} [actions=[]] Actions to peform to resolve the unwrapped value.
	     */
	    function LodashWrapper(value, chainAll, actions) {
	      this.__actions__ = actions || [];
	      this.__chain__ = !!chainAll;
	      this.__wrapped__ = value;
	    }

	    /**
	     * An object environment feature flags.
	     *
	     * @static
	     * @memberOf _
	     * @type Object
	     */
	    var support = lodash.support = {};

	    (function(x) {
	      var Ctor = function() { this.x = 1; },
	          object = { '0': 1, 'length': 1 },
	          props = [];

	      Ctor.prototype = { 'valueOf': 1, 'y': 1 };
	      for (var key in new Ctor) { props.push(key); }

	      /**
	       * Detect if the `[[Class]]` of `arguments` objects is resolvable
	       * (all but Firefox < 4, IE < 9).
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.argsClass = toString.call(arguments) == argsClass;

	      /**
	       * Detect if `name` or `message` properties of `Error.prototype` are
	       * enumerable by default (IE < 9, Safari < 5.1).
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.enumErrorProps = propertyIsEnumerable.call(errorProto, 'message') ||
	        propertyIsEnumerable.call(errorProto, 'name');

	      /**
	       * Detect if `prototype` properties are enumerable by default.
	       *
	       * Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1
	       * (if the prototype or a property on the prototype has been set)
	       * incorrectly set the `[[Enumerable]]` value of a function's `prototype`
	       * property to `true`.
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.enumPrototypes = propertyIsEnumerable.call(Ctor, 'prototype');

	      /**
	       * Detect if functions can be decompiled by `Function#toString`
	       * (all but Firefox OS certified apps, older Opera mobile browsers, and
	       * the PlayStation 3; forced `false` for Windows 8 apps).
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.funcDecomp = !isNative(context.WinRTError) && reThis.test(runInContext);

	      /**
	       * Detect if `Function#name` is supported (all but IE).
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.funcNames = typeof Function.name == 'string';

	      /**
	       * Detect if the `[[Class]]` of DOM nodes is resolvable (all but IE < 9).
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.nodeClass = toString.call(document) != objectClass;

	      /**
	       * Detect if string indexes are non-enumerable
	       * (IE < 9, RingoJS, Rhino, Narwhal).
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.nonEnumStrings = !propertyIsEnumerable.call('x', 0);

	      /**
	       * Detect if properties shadowing those on `Object.prototype` are
	       * non-enumerable.
	       *
	       * In IE < 9 an object's own properties, shadowing non-enumerable ones,
	       * are made non-enumerable as well (a.k.a the JScript `[[DontEnum]]` bug).
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.nonEnumShadows = !/valueOf/.test(props);

	      /**
	       * Detect if own properties are iterated after inherited properties (IE < 9).
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.ownLast = props[0] != 'x';

	      /**
	       * Detect if `Array#shift` and `Array#splice` augment array-like objects
	       * correctly.
	       *
	       * Firefox < 10, compatibility modes of IE 8, and IE < 9 have buggy Array `shift()`
	       * and `splice()` functions that fail to remove the last element, `value[0]`,
	       * of array-like objects even though the `length` property is set to `0`.
	       * The `shift()` method is buggy in compatibility modes of IE 8, while `splice()`
	       * is buggy regardless of mode in IE < 9.
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.spliceObjects = (splice.call(object, 0, 1), !object[0]);

	      /**
	       * Detect lack of support for accessing string characters by index.
	       *
	       * IE < 8 can't access characters by index. IE 8 can only access characters
	       * by index on string literals, not string objects.
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.unindexedChars = ('x'[0] + Object('x')[0]) != 'xx';

	      /**
	       * Detect if the DOM is supported.
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      try {
	        support.dom = document.createDocumentFragment().nodeType === 11;
	      } catch(e) {
	        support.dom = false;
	      }

	      /**
	       * Detect if `arguments` object indexes are non-enumerable.
	       *
	       * In Firefox < 4, IE < 9, PhantomJS, and Safari < 5.1 `arguments` object
	       * indexes are non-enumerable. Chrome < 25 and Node.js < 0.11.0 treat
	       * `arguments` object indexes as non-enumerable and fail `hasOwnProperty`
	       * checks for indexes that exceed their function's formal parameters with
	       * associated values of `0`.
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      try {
	        support.nonEnumArgs = !propertyIsEnumerable.call(arguments, 1);
	      } catch(e) {
	        support.nonEnumArgs = true;
	      }
	    }(0, 0));

	    /**
	     * By default, the template delimiters used by Lo-Dash are like those in
	     * embedded Ruby (ERB). Change the following template settings to use
	     * alternative delimiters.
	     *
	     * @static
	     * @memberOf _
	     * @type Object
	     */
	    lodash.templateSettings = {

	      /**
	       * Used to detect `data` property values to be HTML-escaped.
	       *
	       * @memberOf _.templateSettings
	       * @type RegExp
	       */
	      'escape': reEscape,

	      /**
	       * Used to detect code to be evaluated.
	       *
	       * @memberOf _.templateSettings
	       * @type RegExp
	       */
	      'evaluate': reEvaluate,

	      /**
	       * Used to detect `data` property values to inject.
	       *
	       * @memberOf _.templateSettings
	       * @type RegExp
	       */
	      'interpolate': reInterpolate,

	      /**
	       * Used to reference the data object in the template text.
	       *
	       * @memberOf _.templateSettings
	       * @type string
	       */
	      'variable': '',

	      /**
	       * Used to import variables into the compiled template.
	       *
	       * @memberOf _.templateSettings
	       * @type Object
	       */
	      'imports': {

	        /**
	         * A reference to the `lodash` function.
	         *
	         * @memberOf _.templateSettings.imports
	         * @type Function
	         */
	        '_': lodash
	      }
	    };

	    /*------------------------------------------------------------------------*/

	    /**
	     * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
	     *
	     * @private
	     * @param {*} value The value to wrap.
	     */
	    function LazyWrapper(value) {
	      this.actions = null;
	      this.dir = 1;
	      this.dropCount = 0;
	      this.filtered = false;
	      this.iteratees = null;
	      this.takeCount = POSITIVE_INFINITY;
	      this.views = null;
	      this.wrapped = value;
	    }

	    /**
	     * Creates a clone of the lazy wrapper object.
	     *
	     * @private
	     * @name clone
	     * @memberOf LazyWrapper
	     * @returns {Object} Returns the cloned `LazyWrapper` object.
	     */
	    function lazyClone() {
	      var actions = this.actions,
	          iteratees = this.iteratees,
	          views = this.views,
	          result = new LazyWrapper(this.wrapped);

	      result.actions = actions ? baseSlice(actions) : null;
	      result.dir = this.dir;
	      result.dropCount = this.dropCount;
	      result.filtered = this.filtered;
	      result.iteratees = iteratees ? baseSlice(iteratees) : null;
	      result.takeCount = this.takeCount;
	      result.views = views ? baseSlice(views) : null;
	      return result;
	    }

	    /**
	     * Reverses the direction of lazy iteration.
	     *
	     * @private
	     * @name reverse
	     * @memberOf LazyWrapper
	     * @returns {Object} Returns the new reversed `LazyWrapper` object.
	     */
	    function lazyReverse() {
	      var filtered = this.filtered,
	          result = filtered ? new LazyWrapper(this) : this.clone();

	      result.dir = this.dir * -1;
	      result.filtered = filtered;
	      return result;
	    }

	    /**
	     * Extracts the unwrapped value from its lazy wrapper.
	     *
	     * @private
	     * @name value
	     * @memberOf LazyWrapper
	     * @returns {*} Returns the unwrapped value.
	     */
	    function lazyValue() {
	      var array = this.wrapped.value();
	      if (!isArray(array)) {
	        return baseWrapperValue(array, this.actions);
	      }
	      var dir = this.dir,
	          isRight = dir < 0,
	          length = array.length,
	          view = getView(0, length, this.views),
	          start = view.start,
	          end = view.end,
	          dropCount = this.dropCount,
	          takeCount = nativeMin(end - start, this.takeCount - dropCount),
	          index = isRight ? end : start - 1,
	          iteratees = this.iteratees,
	          iterLength = iteratees ? iteratees.length : 0,
	          resIndex = 0,
	          result = [];

	      outer:
	      while (length-- && resIndex < takeCount) {
	        index += dir;

	        var iterIndex = -1,
	            value = array[index];

	        while (++iterIndex < iterLength) {
	          var data = iteratees[iterIndex],
	              iteratee = data.iteratee,
	              computed = iteratee(value, index, array),
	              type = data.type;

	          if (type == LAZY_MAP_FLAG) {
	            value = computed;
	          } else if (!computed) {
	            if (type == LAZY_FILTER_FLAG) {
	              continue outer;
	            } else {
	              break outer;
	            }
	          }
	        }
	        if (dropCount) {
	          dropCount--;
	        } else {
	          result[resIndex++] = value;
	        }
	      }
	      return isRight ? result.reverse() : result;
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Creates a cache object to store key/value pairs.
	     *
	     * @private
	     * @static
	     * @name Cache
	     * @memberOf _.memoize
	     */
	    function MapCache() {
	      this.__data__ = {};
	    }

	    /**
	     * Removes `key` and its value from the cache.
	     *
	     * @private
	     * @name delete
	     * @memberOf _.memoize.Cache
	     * @param {string} key The key of the value to remove.
	     * @returns {boolean} Returns `true` if the entry was removed successfully, else `false`.
	     */
	    function mapDelete(key) {
	      return this.has(key) && delete this.__data__[key];
	    }

	    /**
	     * Gets the cached value for `key`.
	     *
	     * @private
	     * @name get
	     * @memberOf _.memoize.Cache
	     * @param {string} key The key of the value to retrieve.
	     * @returns {*} Returns the cached value.
	     */
	    function mapGet(key) {
	      return key == '__proto__' ? undefined : this.__data__[key];
	    }

	    /**
	     * Checks if a cached value for `key` exists.
	     *
	     * @private
	     * @name has
	     * @memberOf _.memoize.Cache
	     * @param {string} key The name of the entry to check.
	     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	     */
	    function mapHas(key) {
	      return key != '__proto__' && hasOwnProperty.call(this.__data__, key);
	    }

	    /**
	     * Adds `value` to `key` of the cache.
	     *
	     * @private
	     * @name set
	     * @memberOf _.memoize.Cache
	     * @param {string} key The key of the value to cache.
	     * @param {*} value The value to cache.
	     * @returns {Object} Returns the cache object.
	     */
	    function mapSet(key, value) {
	      if (key != '__proto__') {
	        this.__data__[key] = value;
	      }
	      return this;
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     *
	     * Creates a cache object to store unique values.
	     *
	     * @private
	     * @param {Array} [values] The values to cache.
	     */
	    function SetCache(values) {
	      var length = values ? values.length : 0;

	      this.data = { 'number': {}, 'set': new Set };
	      while (length--) {
	        this.push(values[length]);
	      }
	    }

	    /**
	     * Checks if `value` is in `cache` mimicking the return signature of
	     * `_.indexOf` by returning `0` if the value is found, else `-1`.
	     *
	     * @private
	     * @param {Object} cache The cache to search.
	     * @param {*} value The value to search for.
	     * @returns {number} Returns `0` if `value` is found, else `-1`.
	     */
	    function cacheIndexOf(cache, value) {
	      var type = typeof value,
	          data = cache.data,
	          result = type == 'number' ? data[type][value] : data.set.has(value);

	      return result ? 0 : -1;
	    }

	    /**
	     * Adds `value` to the cache.
	     *
	     * @private
	     * @name push
	     * @memberOf SetCache
	     * @param {*} value The value to cache.
	     */
	    function cachePush(value) {
	      var data = this.data,
	          type = typeof value;

	      if (type == 'number') {
	        data[type][value] = true;
	      } else {
	        data.set.add(value);
	      }
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Converts an `arguments` object to a plain `Object` object.
	     *
	     * @private
	     * @param {Object} args The `arguments` object to convert.
	     * @returns {Object} Returns the new converted object.
	     */
	    function argsToObject(args) {
	      var result = { 'length': 0 };
	      push.apply(result, args);
	      return result;
	    }

	    /**
	     * A specialized version of `_.max` for arrays without support for iteratees.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @returns {*} Returns the maximum value.
	     */
	    function arrayMax(array) {
	      var index = -1,
	          length = array.length,
	          result = NEGATIVE_INFINITY;

	      while (++index < length) {
	        var value = array[index];
	        if (value > result) {
	          result = value;
	        }
	      }
	      return result;
	    }

	    /**
	     * A specialized version of `_.min` for arrays without support for iteratees.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @returns {*} Returns the minimum value.
	     */
	    function arrayMin(array) {
	      var index = -1,
	          length = array.length,
	          result = POSITIVE_INFINITY;

	      while (++index < length) {
	        var value = array[index];
	        if (value < result) {
	          result = value;
	        }
	      }
	      return result;
	    }

	    /**
	     * Used by `_.defaults` to customize its `_.assign` use.
	     *
	     * @private
	     * @param {*} objectValue The destination object property value.
	     * @param {*} sourceValue The source object property value.
	     * @returns {*} Returns the value to assign to the destination object.
	     */
	    function assignDefaults(objectValue, sourceValue) {
	      return typeof objectValue == 'undefined' ? sourceValue : objectValue;
	    }

	    /**
	     * Used by `_.template` to customize its `_.assign` use.
	     *
	     * **Note:** This method is like `assignDefaults` except that it ignores
	     * inherited property values when checking if a property is `undefined`.
	     *
	     * @private
	     * @param {*} objectValue The destination object property value.
	     * @param {*} sourceValue The source object property value.
	     * @param {string} key The key associated with the object and source values.
	     * @param {Object} object The destination object.
	     * @returns {*} Returns the value to assign to the destination object.
	     */
	    function assignOwnDefaults(objectValue, sourceValue, key, object) {
	      return (typeof objectValue == 'undefined' || !hasOwnProperty.call(object, key))
	        ? sourceValue
	        : objectValue;
	    }

	    /**
	     * The base implementation of `_.assign` without support for argument juggling,
	     * multiple sources, and `this` binding `customizer` functions.
	     *
	     * @private
	     * @param {Object} object The destination object.
	     * @param {Object} source The source object.
	     * @param {Function} [customizer] The function to customize assigning values.
	     * @returns {Object} Returns the destination object.
	     */
	    function baseAssign(object, source, customizer) {
	      var index = -1,
	          props = keys(source),
	          length = props.length;

	      while (++index < length) {
	        var key = props[index];
	        object[key] = customizer
	          ? customizer(object[key], source[key], key, object, source)
	          : source[key];
	      }
	      return object;
	    }

	    /**
	     * The base implementation of `_.at` without support for strings and individual
	     * key arguments.
	     *
	     * @private
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {number[]|string[]} [props] The property names or indexes of elements to pick.
	     * @returns {Array} Returns the new array of picked elements.
	     */
	    function baseAt(collection, props) {
	      var index = -1,
	          length = collection.length,
	          isArr = isLength(length),
	          propsLength = props.length,
	          result = Array(propsLength);

	      while(++index < propsLength) {
	        var key = props[index];
	        if (isArr) {
	          key = parseFloat(key);
	          result[index] = isIndex(key, length) ? collection[key] : undefined;
	        } else {
	          result[index] = collection[key];
	        }
	      }
	      return result;
	    }

	    /**
	     * The base implementation of `binaryIndex` which supports large arrays and
	     * determining the insert index for `NaN` and `undefined`.
	     *
	     * @private
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {boolean} [retHighest] Specify returning the highest, instead
	     *  of the lowest, index at which a value should be inserted into `array`.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     */
	    function baseBinaryIndex(array, value, iteratee, retHighest) {
	      iteratee = iteratee == null ? identity : iteratee;
	      value = iteratee(value);

	      var low = 0,
	          high = array.length,
	          valIsNaN = value !== value,
	          valIsUndef = typeof value == 'undefined';

	      while (low < high) {
	        var mid = floor((low + high) / 2),
	            computed = iteratee(array[mid]),
	            isReflexive = computed === computed;

	        if (valIsNaN) {
	          var setLow = isReflexive || retHighest;
	        } else if (valIsUndef) {
	          setLow = isReflexive && (retHighest || typeof computed != 'undefined');
	        } else {
	          setLow = retHighest ? (computed <= value) : (computed < value);
	        }
	        if (setLow) {
	          low = mid + 1;
	        } else {
	          high = mid;
	        }
	      }
	      return nativeMin(high, MAX_ARRAY_INDEX);
	    }

	    /**
	     * The base implementation of `_.bindAll` without support for individual
	     * method name arguments.
	     *
	     * @private
	     * @param {Object} object The object to bind and assign the bound methods to.
	     * @param {string[]} methodNames The object method names to bind.
	     * @returns {Object} Returns `object`.
	     */
	    function baseBindAll(object, methodNames) {
	      var index = -1,
	          length = methodNames.length;

	      while (++index < length) {
	        var key = methodNames[index];
	        object[key] = createWrapper(object[key], BIND_FLAG, object);
	      }
	      return object;
	    }

	    /**
	     * The base implementation of `_.callback` which supports specifying the
	     * number of arguments to provide to `func`.
	     *
	     * @private
	     * @param {*} [func=_.identity] The value to convert to a callback.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param {number} [argCount] The number of arguments to provide to `func`.
	     * @returns {Function} Returns the callback.
	     */
	    function baseCallback(func, thisArg, argCount) {
	      var type = typeof func;

	      if (type == 'function') {
	        return (typeof thisArg != 'undefined' && isBindable(func))
	          ? bindCallback(func, thisArg, argCount)
	          : func;
	      }
	      if (func == null) {
	        return identity;
	      }
	      // Handle "_.pluck" and "_.where" style callback shorthands.
	      return type == 'object'
	        ? baseMatches(func, argCount)
	        : baseProperty(argCount ? String(func) : func);
	    }

	    /**
	     * The base implementation of `_.clone` without support for argument juggling
	     * and `this` binding `customizer` functions.
	     *
	     * @private
	     * @param {*} value The value to clone.
	     * @param {boolean} [isDeep] Specify a deep clone.
	     * @param {Function} [customizer] The function to customize cloning values.
	     * @param {string} [key] The key of `value`.
	     * @param {Object} [object] The object `value` belongs to.
	     * @param {Array} [stackA=[]] Tracks traversed source objects.
	     * @param {Array} [stackB=[]] Associates clones with source counterparts.
	     * @returns {*} Returns the cloned value.
	     */
	    function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
	      var result;
	      if (customizer) {
	        result = object ? customizer(value, key, object) : customizer(value);
	      }
	      if (typeof result != 'undefined') {
	        return result;
	      }
	      var isArr = isArray(value);
	      result = value;
	      if (isArr) {
	        result = initArrayClone(value, isDeep);
	      } else if (isObject(value)) {
	        result = initObjectClone(value, isDeep);
	        if (result === null) {
	          isDeep = false;
	          result = {};
	        } else if (isDeep) {
	          isDeep = toString.call(result) == objectClass;
	        }
	      }
	      if (!isDeep || result === value) {
	        return result;
	      }
	      // Check for circular references and return corresponding clone.
	      stackA || (stackA = []);
	      stackB || (stackB = []);

	      var length = stackA.length;
	      while (length--) {
	        if (stackA[length] == value) {
	          return stackB[length];
	        }
	      }
	      // Add the source value to the stack of traversed objects and associate it with its clone.
	      stackA.push(value);
	      stackB.push(result);

	      // Recursively populate clone (susceptible to call stack limits).
	      (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
	        result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
	      });
	      return result;
	    }

	    /**
	     * The base implementation of `_.create` without support for assigning
	     * properties to the created object.
	     *
	     * @private
	     * @param {Object} prototype The object to inherit from.
	     * @returns {Object} Returns the new object.
	     */
	    var baseCreate = (function() {
	      function Object() {}
	      return function(prototype) {
	        if (isObject(prototype)) {
	          Object.prototype = prototype;
	          var result = new Object;
	          Object.prototype = null;
	        }
	        return result || context.Object();
	      };
	    }());

	    /**
	     * The base implementation of `_.delay` and `_.defer` which accepts an index
	     * of where to slice the arguments to provide to `func`.
	     *
	     * @private
	     * @param {Function} func The function to delay.
	     * @param {number} wait The number of milliseconds to delay invocation.
	     * @param {Object} args The `arguments` object to slice and provide to `func`.
	     * @returns {number} Returns the timer id.
	     */
	    function baseDelay(func, wait, args, fromIndex) {
	      if (!isFunction(func)) {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      return setTimeout(function() { func.apply(undefined, slice(args, fromIndex)); }, wait);
	    }

	    /**
	     * The base implementation of `_.difference` which accepts a single array
	     * of values to exclude.
	     *
	     * @private
	     * @param {Array} array The array to inspect.
	     * @param {Array} values The values to exclude.
	     * @returns {Array} Returns the new array of filtered values.
	     */
	    function baseDifference(array, values) {
	      var length = array ? array.length : 0,
	          result = [];

	      if (!length) {
	        return result;
	      }
	      var index = -1,
	          indexOf = getIndexOf(),
	          isCommon = indexOf == baseIndexOf,
	          cache = isCommon && values.length >= 200 && createCache(values),
	          valuesLength = values.length;

	      if (cache) {
	        indexOf = cacheIndexOf;
	        isCommon = false;
	        values = cache;
	      }
	      outer:
	      while (++index < length) {
	        var value = array[index];

	        if (isCommon && value === value) {
	          var valuesIndex = valuesLength;
	          while (valuesIndex--) {
	            if (values[valuesIndex] === value) {
	              continue outer;
	            }
	          }
	          result.push(value);
	        }
	        else if (indexOf(values, value) < 0) {
	          result.push(value);
	        }
	      }
	      return result;
	    }

	    /**
	     * The base implementation of `_.forEach` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array|Object|string} Returns `collection`.
	     */
	    function baseEach(collection, iteratee) {
	      var length = collection ? collection.length : 0;
	      if (!isLength(length)) {
	        return baseForOwn(collection, iteratee);
	      }
	      var index = -1,
	          iterable = toObject(collection);

	      while (++index < length) {
	        if (iteratee(iterable[index], index, iterable) === false) {
	          break;
	        }
	      }
	      return collection;
	    }

	    /**
	     * The base implementation of `_.forEachRight` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array|Object|string} Returns `collection`.
	     */
	    function baseEachRight(collection, iteratee) {
	      var length = collection ? collection.length : 0;
	      if (!isLength(length)) {
	        return baseForOwnRight(collection, iteratee);
	      }
	      var iterable = toObject(collection);
	      while (length--) {
	        if (iteratee(iterable[length], length, iterable) === false) {
	          break;
	        }
	      }
	      return collection;
	    }

	    /**
	     * The base implementation of `_.every` without support for callback
	     * shorthands or `this` binding.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {Array} Returns `true` if all elements pass the predicate check,
	     *  else `false`
	     */
	    function baseEvery(collection, predicate) {
	      var result = true;

	      baseEach(collection, function(value, index, collection) {
	        result = !!predicate(value, index, collection);
	        return result;
	      });
	      return result;
	    }

	    /**
	     * The base implementation of `_.filter` without support for callback
	     * shorthands or `this` binding.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {Array} Returns the new filtered array.
	     */
	    function baseFilter(collection, predicate) {
	      var result = [];

	      baseEach(collection, function(value, index, collection) {
	        if (predicate(value, index, collection)) {
	          result.push(value);
	        }
	      });
	      return result;
	    }

	    /**
	     * The base implementation of `_.find`, `_.findLast`, `_.findKey`, and `_.findLastKey`,
	     * without support for callback shorthands and `this` binding, which iterates
	     * over `collection` using the provided `eachFunc`.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to search.
	     * @param {Function} predicate The function invoked per iteration.
	     * @param {Function} eachFunc The function to iterate over `collection`.
	     * @param {boolean} [retKey] Specify returning the key of the found
	     *  element instead of the element itself.
	     * @returns {*} Returns the found element or its key, else `undefined`.
	     */
	    function baseFind(collection, predicate, eachFunc, retKey) {
	      var result;

	      eachFunc(collection, function(value, key, collection) {
	        if (predicate(value, key, collection)) {
	          result = retKey ? key : value;
	          return false;
	        }
	      });
	      return result;
	    }

	    /**
	     * The base implementation of `_.flatten` with added support for restricting
	     * flattening and specifying the start index.
	     *
	     * @private
	     * @param {Array} array The array to flatten.
	     * @param {boolean} [isDeep] Specify a deep flatten.
	     * @param {boolean} [isStrict] Restrict flattening to arrays and `arguments` objects.
	     * @param {number} [fromIndex=0] The index to start from.
	     * @returns {Array} Returns the new flattened array.
	     */
	    function baseFlatten(array, isDeep, isStrict, fromIndex) {
	      var index = (fromIndex || 0) - 1,
	          length = array.length,
	          resIndex = -1,
	          result = [];

	      while (++index < length) {
	        var value = array[index];

	        if (isObjectLike(value) && isLength(value.length) && (isArray(value) || isArguments(value))) {
	          // Recursively flatten arrays (susceptible to call stack limits).
	          if (isDeep) {
	            value = baseFlatten(value, isDeep, isStrict);
	          }
	          var valIndex = -1,
	              valLength = value.length;

	          result.length += valLength;
	          while (++valIndex < valLength) {
	            result[++resIndex] = value[valIndex];
	          }
	        } else if (!isStrict) {
	          result[++resIndex] = value;
	        }
	      }
	      return result;
	    }

	    /**
	     * The base implementation of `baseForIn` and `baseForOwn` which iterates
	     * over `object` properties returned by `keysFunc` invoking `iteratee` for
	     * each property. Iterator functions may exit iteration early by explicitly
	     * returning `false`.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {Function} keysFunc The function to get the keys of `object`.
	     * @returns {Object} Returns `object`.
	     */
	    function baseFor(object, iteratee, keysFunc) {
	      var index = -1,
	          iterable = toObject(object),
	          props = keysFunc(object),
	          length = props.length;

	      while (++index < length) {
	        var key = props[index];
	        if (iteratee(iterable[key], key, iterable) === false) {
	          break;
	        }
	      }
	      return object;
	    }

	    /**
	     * This function is like `baseFor` except that it iterates over properties
	     * in the opposite order.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {Function} keysFunc The function to get the keys of `object`.
	     * @returns {Object} Returns `object`.
	     */
	    function baseForRight(object, iteratee, keysFunc) {
	      var iterable = toObject(object),
	          props = keysFunc(object),
	          length = props.length;

	      while (length--) {
	        var key = props[length];
	        if (iteratee(iterable[key], key, iterable) === false) {
	          break;
	        }
	      }
	      return object;
	    }

	    /**
	     * The base implementation of `_.forIn` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     */
	    function baseForIn(object, iteratee) {
	      return baseFor(object, iteratee, keysIn);
	    }

	    /**
	     * The base implementation of `_.forOwn` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     */
	    function baseForOwn(object, iteratee) {
	      return baseFor(object, iteratee, keys);
	    }

	    /**
	     * The base implementation of `_.forOwnRight` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     */
	    function baseForOwnRight(object, iteratee) {
	      return baseForRight(object, iteratee, keys);
	    }

	    /**
	     * The base implementation of `_.functions` which creates an array of
	     * `object` function property names filtered from those provided.
	     *
	     * @private
	     * @param {Object} object The object to inspect.
	     * @param {Array} props The property names to filter.
	     * @returns {Array} Returns the new array of filtered property names.
	     */
	    function baseFunctions(object, props) {
	      var index = -1,
	          length = props.length,
	          resIndex = -1,
	          result = [];

	      while (++index < length) {
	        var key = props[index];
	        if (isFunction(object[key])) {
	          result[++resIndex] = key;
	        }
	      }
	      return result;
	    }

	    /**
	     * The base implementation of `_.invoke` which requires additional arguments
	     * to be provided as an array of arguments rather than individually.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|string} methodName The name of the method to invoke or
	     *  the function invoked per iteration.
	     * @param {Array} [args] The arguments to invoke the method with.
	     * @returns {Array} Returns the array of results.
	     */
	    function baseInvoke(collection, methodName, args) {
	      var index = -1,
	          isFunc = typeof methodName == 'function',
	          length = collection ? collection.length : 0,
	          result = isLength(length) ? Array(length) : [];

	      baseEach(collection, function(value) {
	        var func = isFunc ? methodName : (value != null && value[methodName]);
	        result[++index] = func ? func.apply(value, args) : undefined;
	      });
	      return result;
	    }

	    /**
	     * The base implementation of `_.isEqual` without support for `this` binding
	     * `customizer` functions.
	     *
	     * @private
	     * @param {*} value The value to compare to `other`.
	     * @param {*} other The value to compare to `value`.
	     * @param {Function} [customizer] The function to customize comparing values.
	     * @param {boolean} [isWhere] Specify performing partial comparisons.
	     * @param {Array} [stackA] Tracks traversed `value` objects.
	     * @param {Array} [stackB] Tracks traversed `other` objects.
	     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	     */
	    function baseIsEqual(value, other, customizer, isWhere, stackA, stackB) {
	      // Exit early for identical values.
	      if (value === other) {
	        // Treat `+0` vs. `-0` as not equal.
	        return value !== 0 || (1 / value == 1 / other);
	      }
	      var valType = typeof value,
	          othType = typeof other;

	      // Exit early for unlike primitive values.
	      if ((valType != 'function' && valType != 'object' && othType != 'function' && othType != 'object') ||
	          value == null || other == null) {
	        // Return `false` unless both values are `NaN`.
	        return value !== value && other !== other;
	      }
	      return baseIsEqualDeep(value, other, baseIsEqual, customizer, isWhere, stackA, stackB);
	    }

	    /**
	     * A specialized version of `baseIsEqual` for arrays and objects which performs
	     * a deep comparison between objects and tracks traversed objects enabling
	     * objects with circular references to be compared.
	     *
	     * @private
	     * @param {Array} object The object to compare to `other`.
	     * @param {Array} other The object to compare to `value`.
	     * @param {Function} equalFunc The function to determine equivalents of arbitrary values.
	     * @param {Function} [customizer] The function to customize comparing objects.
	     * @param {boolean} [isWhere] Specify performing partial comparisons.
	     * @param {Array} [stackA=[]] Tracks traversed `value` objects.
	     * @param {Array} [stackB=[]] Tracks traversed `other` objects.
	     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	     */
	    function baseIsEqualDeep(object, other, equalFunc, customizer, isWhere, stackA, stackB) {
	      var objClass = isArray(object) ? arrayClass : toString.call(object),
	          objIsArg = objClass == argsClass,
	          objIsArr = !objIsArg && arrayLikeClasses[objClass],
	          othClass = isArray(other) ? arrayClass : toString.call(other),
	          othIsArg = othClass == argsClass,
	          othIsArr = !othIsArg && arrayLikeClasses[othClass];

	      if (!lodash.support.argsClass) {
	        objIsArg = !objIsArr && typeof object.length == 'number' && isArguments(object);
	        othIsArg = !othIsArr && typeof other.length == 'number' && isArguments(other);
	      }
	      if (objIsArg) {
	        object = argsToObject(object);
	        objClass = objectClass;
	      }
	      if (othIsArg) {
	        other = argsToObject(other);
	        othClass = objectClass;
	      }
	      var objIsObj = objClass == objectClass && !isHostObject(object),
	          othIsObj = othClass == objectClass && !isHostObject(other),
	          isSameClass = objClass == othClass;

	      if (isSameClass && !(objIsArr || objIsObj)) {
	        return equalByClass(object, other, objClass);
	      }
	      var valWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	          othWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	      if (valWrapped || othWrapped) {
	        return equalFunc(valWrapped ? object.value() : object, othWrapped ? other.value() : other, customizer, isWhere, stackA, stackB);
	      }
	      if (!isSameClass) {
	        return false;
	      }
	      // Assume cyclic structures are equal.
	      // The algorithm for detecting cyclic structures is adapted from ES 5.1
	      // section 15.12.3, abstract operation `JO` (http://es5.github.io/#x15.12.3).
	      stackA || (stackA = []);
	      stackB || (stackB = []);

	      var length = stackA.length;
	      while (length--) {
	        if (stackA[length] == object) {
	          return stackB[length] == other;
	        }
	      }
	      // Add `object` and `other` to the stack of traversed objects.
	      stackA.push(object);
	      stackB.push(other);

	      // Recursively compare objects and arrays (susceptible to call stack limits).
	      var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isWhere, stackA, stackB);

	      stackA.pop();
	      stackB.pop();

	      return result;
	    }

	    /**
	     * The base implementation of `_.isMatch` without support for callback
	     * shorthands or `this` binding.
	     *
	     * @private
	     * @param {Object} source The object to inspect.
	     * @param {Array} props The source property names to match.
	     * @param {Array} values The source values to match.
	     * @param {Array} strictCompareFlags Strict comparison flags for source values.
	     * @param {Function} [customizer] The function to customize comparing objects.
	     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	     */
	    function baseIsMatch(object, props, values, strictCompareFlags, customizer) {
	      var length = props.length;
	      if (object == null) {
	        return !length;
	      }
	      var index = -1,
	          noCustomizer = !customizer;

	      while (++index < length) {
	        if ((noCustomizer && strictCompareFlags[index])
	              ? values[index] !== object[props[index]]
	              : !hasOwnProperty.call(object, props[index])
	            ) {
	          return false;
	        }
	      }
	      index = -1;
	      while (++index < length) {
	        var key = props[index];
	        if (noCustomizer && strictCompareFlags[index]) {
	          var result = hasOwnProperty.call(object, key);
	        } else {
	          var objValue = object[key],
	              srcValue = values[index];

	          result = customizer ? customizer(objValue, srcValue, key) : undefined;
	          if (typeof result == 'undefined') {
	            result = baseIsEqual(srcValue, objValue, customizer, true);
	          }
	        }
	        if (!result) {
	          return false;
	        }
	      }
	      return true;
	    }

	    /**
	     * The base implementation of `_.map` without support for callback shorthands
	     * or `this` binding.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array} Returns the new mapped array.
	     */
	    function baseMap(collection, iteratee) {
	      var result = [];

	      baseEach(collection, function(value, key, collection) {
	        result.push(iteratee(value, key, collection));
	      });
	      return result;
	    }

	    /**
	     * The base implementation of `_.matches` which supports specifying whether
	     * `source` is cloned.
	     *
	     * @private
	     * @param {Object} source The object of property values to match.
	     * @param {boolean} [isCloned] Specify cloning the source object.
	     * @returns {Function} Returns the new function.
	     */
	    function baseMatches(source, isCloned) {
	      var props = keys(source),
	          length = props.length;

	      if (length == 1) {
	        var key = props[0],
	            value = source[key];

	        if (isStrictComparable(value)) {
	          return function(object) {
	            return object != null && value === object[key] && hasOwnProperty.call(object, key);
	          };
	        }
	      }
	      var notCloned = !isCloned,
	          values = Array(length),
	          strictCompareFlags = Array(length);

	      while (length--) {
	        value = source[props[length]];
	        var isStrict = isStrictComparable(value);

	        values[length] = (isStrict || notCloned) ? value : baseClone(value, true, clonePassthru);
	        strictCompareFlags[length] = isStrict;
	      }
	      return function(object) {
	        return baseIsMatch(object, props, values, strictCompareFlags);
	      };
	    }

	    /**
	     * The base implementation of `_.merge` without support for argument juggling,
	     * multiple sources, and `this` binding `customizer` functions.
	     *
	     * @private
	     * @param {Object} object The destination object.
	     * @param {Object} source The source object.
	     * @param {Function} [customizer] The function to customize merging properties.
	     * @param {Array} [stackA=[]] Tracks traversed source objects.
	     * @param {Array} [stackB=[]] Associates values with source counterparts.
	     * @returns {Object} Returns the destination object.
	     */
	    function baseMerge(object, source, customizer, stackA, stackB) {
	      var isSrcArr = isArrayLike(source);

	      (isSrcArr ? arrayEach : baseForOwn)(source, function(srcValue, key, source) {
	        var isArr = isArrayLike(srcValue),
	            isObj = isPlainObject(srcValue),
	            value = object[key];

	        if (!(isArr || isObj)) {
	          result = customizer ? customizer(value, srcValue, key, object, source) : undefined;
	          if (typeof result == 'undefined') {
	            result = srcValue;
	          }
	          if (isSrcArr || typeof result != 'undefined') {
	            object[key] = result;
	          }
	          return;
	        }
	        // Avoid merging previously merged cyclic sources.
	        stackA || (stackA = []);
	        stackB || (stackB = []);

	        var length = stackA.length;
	        while (length--) {
	          if (stackA[length] == srcValue) {
	            object[key] = stackB[length];
	            return;
	          }
	        }
	        var result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	            isDeep = typeof result == 'undefined';

	        if (isDeep) {
	          result = isArr
	            ? (isArray(value) ? value : [])
	            : (isPlainObject(value) ? value : {});
	        }
	        // Add the source value to the stack of traversed objects and associate
	        // it with its merged value.
	        stackA.push(srcValue);
	        stackB.push(result);

	        // Recursively merge objects and arrays (susceptible to call stack limits).
	        if (isDeep) {
	          baseMerge(result, srcValue, customizer, stackA, stackB);
	        }
	        object[key] = result;
	      });
	      return object;
	    }

	    /**
	     * The base implementation of `_.property` which does not coerce `key` to a string.
	     *
	     * @private
	     * @param {string} key The name of the property to retrieve.
	     * @returns {Function} Returns the new function.
	     */
	    function baseProperty(key) {
	      return function(object) {
	        return object == null ? undefined : object[key];
	      };
	    }

	    /**
	     * The base implementation of `_.pullAt` without support for individual
	     * index arguments.
	     *
	     * @private
	     * @param {Array} array The array to modify.
	     * @param {number[]} indexes The indexes of elements to remove.
	     * @returns {Array} Returns the new array of removed elements.
	     */
	    function basePullAt(array, indexes) {
	      var length = indexes.length,
	          result = baseAt(array, indexes);

	      indexes.sort(baseCompareAscending);
	      while (length--) {
	        var index = parseFloat(indexes[length]);
	        if (index != previous && isIndex(index)) {
	          var previous = index;
	          splice.call(array, index, 1);
	        }
	      }
	      return result;
	    }

	    /**
	     * The base implementation of `_.random` without support for argument juggling
	     * and returning floating-point numbers.
	     *
	     * @private
	     * @param {number} min The minimum possible value.
	     * @param {number} max The maximum possible value.
	     * @returns {number} Returns the random number.
	     */
	    function baseRandom(min, max) {
	      return min + floor(nativeRandom() * (max - min + 1));
	    }

	    /**
	     * The base implementation of `_.reduce` and `_.reduceRight` without support
	     * for callback shorthands or `this` binding, which iterates over `collection`
	     * using the provided `eachFunc`.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {*} accumulator The initial value.
	     * @param {boolean} initFromCollection Specify using the first or last element
	     *  of `collection` as the initial value.
	     * @param {Function} eachFunc The function to iterate over `collection`.
	     * @returns {*} Returns the accumulated value.
	     */
	    function baseReduce(collection, iteratee, accumulator, initFromCollection, eachFunc) {
	      eachFunc(collection, function(value, index, collection) {
	        accumulator = initFromCollection
	          ? (initFromCollection = false, value)
	          : iteratee(accumulator, value, index, collection)
	      });
	      return accumulator;
	    }

	    /**
	     * The base implementation of `setData` without support for hot loop detection.
	     *
	     * @private
	     * @param {Function} func The function to associate metadata with.
	     * @param {*} data The metadata.
	     * @returns {Function} Returns `func`.
	     */
	    var baseSetData = !metaMap ? identity : function(func, data) {
	      metaMap.set(func, data);
	      return func;
	    };

	    /**
	     * The base implementation of `_.some` without support for callback shorthands
	     * or `this` binding.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {boolean} Returns `true` if any element passes the predicate check,
	     *  else `false`.
	     */
	    function baseSome(collection, predicate) {
	      var result;

	      baseEach(collection, function(value, index, collection) {
	        result = predicate(value, index, collection);
	        return !result;
	      });
	      return !!result;
	    }

	    /**
	     * The base implementation of `_.uniq` without support for callback shorthands
	     * and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to inspect.
	     * @param {Function} [iteratee] The function invoked per iteration.
	     * @returns {Array} Returns the new duplicate-value-free array.
	     */
	    function baseUniq(array, iteratee) {
	      var index = -1,
	          indexOf = getIndexOf(),
	          length = array.length,
	          isCommon = indexOf == baseIndexOf,
	          isLarge = isCommon && length >= 200,
	          seen = isLarge && createCache(),
	          result = [];

	      if (seen) {
	        indexOf = cacheIndexOf;
	        isCommon = false;
	      } else {
	        isLarge = false;
	        seen = iteratee ? [] : result;
	      }
	      outer:
	      while (++index < length) {
	        var value = array[index],
	            computed = iteratee ? iteratee(value, index, array) : value;

	        if (isCommon && value === value) {
	          var seenIndex = seen.length;
	          while (seenIndex--) {
	            if (seen[seenIndex] === computed) {
	              continue outer;
	            }
	          }
	          if (iteratee) {
	            seen.push(computed);
	          }
	          result.push(value);
	        }
	        else if (indexOf(seen, computed) < 0) {
	          if (iteratee || isLarge) {
	            seen.push(computed);
	          }
	          result.push(value);
	        }
	      }
	      return result;
	    }

	    /**
	     * The base implementation of `_.values` and `_.valuesIn` which creates an
	     * array of `object` property values corresponding to the property names
	     * returned by `keysFunc`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Array} props The property names to get values for.
	     * @returns {Object} Returns the array of property values.
	     */
	    function baseValues(object, props) {
	      var index = -1,
	          length = props.length,
	          result = Array(length);

	      while (++index < length) {
	        result[index] = object[props[index]];
	      }
	      return result;
	    }

	    /**
	     * The base implementation of `wrapperValue` which returns the result of
	     * performing a sequence of actions on the unwrapped `value`, where each
	     * successive action is supplied the return value of the previous.
	     *
	     * @private
	     * @param {*} value The unwrapped value.
	     * @param {Array} actions Actions to peform to resolve the unwrapped value.
	     * @returns {*} Returns the resolved unwrapped value.
	     */
	    function baseWrapperValue(value, actions) {
	      var result = value;
	      if (result instanceof LazyWrapper) {
	        result = result.value();
	      }
	      var index = -1,
	          length = actions.length;

	      while (++index < length) {
	        var args = [result],
	            action = actions[index],
	            object = action.object;

	        push.apply(args, action.args);
	        result = object[action.name].apply(object, args);
	      }
	      return result;
	    }

	    /**
	     * Performs a binary search of `array` to determine the index at which `value`
	     * should be inserted into `array` in order to maintain its sort order. If
	     * `iteratee` is provided it is invoked for `value` and each element of
	     * `array` to compute their sort ranking. The iteratee is invoked with one
	     * argument; (value).
	     *
	     * @private
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {Function} [iteratee] The function invoked per iteration.
	     * @param {boolean} [retHighest] Specify returning the highest, instead
	     *  of the lowest, index at which a value should be inserted into `array`.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     */
	    function binaryIndex(array, value, iteratee, retHighest) {
	      var low = 0,
	          high = array ? array.length : low;

	      if (high && (iteratee || value !== value || typeof value == 'undefined' || high > HALF_MAX_ARRAY_LENGTH)) {
	        return baseBinaryIndex(array, value, iteratee, retHighest);
	      }
	      while (low < high) {
	        var mid = (low + high) >>> 1,
	            computed = array[mid];

	        if (retHighest ? (computed <= value) : (computed < value)) {
	          low = mid + 1;
	        } else {
	          high = mid;
	        }
	      }
	      return high;
	    }

	    /**
	     * A specialized version of `baseCallback` which only supports `this` binding
	     * and specifying the number of arguments to provide to `func`.
	     *
	     * @private
	     * @param {Function} func The function to bind.
	     * @param {*} thisArg The `this` binding of `func`.
	     * @param {number} [argCount] The number of arguments to provide to `func`.
	     * @returns {Function} Returns the callback.
	     */
	    function bindCallback(func, thisArg, argCount) {
	      if (typeof func != 'function') {
	        return identity;
	      }
	      if (typeof thisArg == 'undefined') {
	        return func;
	      }
	      switch (argCount) {
	        case 1: return function(value) {
	          return func.call(thisArg, value);
	        };
	        case 3: return function(value, index, collection) {
	          return func.call(thisArg, value, index, collection);
	        };
	        case 4: return function(accumulator, value, index, collection) {
	          return func.call(thisArg, accumulator, value, index, collection);
	        };
	        case 5: return function(value, other, key, object, source) {
	          return func.call(thisArg, value, other, key, object, source);
	        };
	      }
	      return function() {
	        return func.apply(thisArg, arguments);
	      };
	    }

	    /**
	     * Creates a clone of the given array buffer.
	     *
	     * @private
	     * @param {ArrayBuffer} buffer The array buffer to clone.
	     * @returns {ArrayBuffer} Returns the cloned array buffer.
	     */
	    function bufferClone(buffer) {
	      return bufferSlice.call(buffer, 0);
	    }
	    if (!bufferSlice) {
	      // PhantomJS has `ArrayBuffer` and `Uint8Array` but not `Float64Array`.
	      bufferClone = !(ArrayBuffer && Uint8Array) ? constant(null) : function(buffer) {
	        var byteLength = buffer.byteLength,
	            floatLength = Float64Array ? floor(byteLength / FLOAT64_BYTES_PER_ELEMENT) : 0,
	            offset = floatLength * FLOAT64_BYTES_PER_ELEMENT,
	            result = new ArrayBuffer(byteLength);

	        if (floatLength) {
	          var view = new Float64Array(result, 0, floatLength);
	          view.set(new Float64Array(buffer, 0, floatLength));
	        }
	        if (byteLength != offset) {
	          view = new Uint8Array(result, offset);
	          view.set(new Uint8Array(buffer, offset));
	        }
	        return result;
	      };
	    }

	    /**
	     * Used by `_.matches` to clone `source` values, letting uncloneable values
	     * passthu instead of returning empty objects.
	     *
	     * @private
	     * @param {*} value The value to clone.
	     * @returns {*} Returns the cloned value.
	     */
	    function clonePassthru(value) {
	      return isCloneable(value) ? undefined : value;
	    }

	    /**
	     * Creates an array that is the composition of partially applied arguments,
	     * placeholders, and provided arguments into a single array of arguments.
	     *
	     * @private
	     * @param {Array|Object} args The provided arguments.
	     * @param {Array} partials The arguments to prepend to those provided.
	     * @param {Array} holders The `partials` placeholder indexes.
	     * @returns {Array} Returns the new array of composed arguments.
	     */
	    function composeArgs(args, partials, holders) {
	      var holdersLength = holders.length,
	          argsIndex = -1,
	          argsLength = nativeMax(args.length - holdersLength, 0),
	          leftIndex = -1,
	          leftLength = partials.length,
	          result = Array(argsLength + leftLength);

	      while (++leftIndex < leftLength) {
	        result[leftIndex] = partials[leftIndex];
	      }
	      while (++argsIndex < holdersLength) {
	        result[holders[argsIndex]] = args[argsIndex];
	      }
	      while (argsLength--) {
	        result[leftIndex++] = args[argsIndex++];
	      }
	      return result;
	    }

	    /**
	     * This function is like `composeArgs` except that the arguments composition
	     * is tailored for `_.partialRight`.
	     *
	     * @private
	     * @param {Array|Object} args The provided arguments.
	     * @param {Array} partials The arguments to append to those provided.
	     * @param {Array} holders The `partials` placeholder indexes.
	     * @returns {Array} Returns the new array of composed arguments.
	     */
	    function composeArgsRight(args, partials, holders) {
	      var holdersIndex = -1,
	          holdersLength = holders.length,
	          argsIndex = -1,
	          argsLength = nativeMax(args.length - holdersLength, 0),
	          rightIndex = -1,
	          rightLength = partials.length,
	          result = Array(argsLength + rightLength);

	      while (++argsIndex < argsLength) {
	        result[argsIndex] = args[argsIndex];
	      }
	      var pad = argsIndex;
	      while (++rightIndex < rightLength) {
	        result[pad + rightIndex] = partials[rightIndex];
	      }
	      while (++holdersIndex < holdersLength) {
	        result[pad + holders[holdersIndex]] = args[argsIndex++];
	      }
	      return result;
	    }

	    /**
	     * Creates a function that aggregates a collection, creating an accumulator
	     * object composed from the results of running each element in the collection
	     * through `iteratee`. The given setter function sets the keys and values of
	     * the accumulator object. If `initializer` is provided it is used to initialize
	     * the accumulator object.
	     *
	     * @private
	     * @param {Function} setter The function to set keys and values of the accumulator object.
	     * @param {Function} [initializer] The function to initialize the accumulator object.
	     * @returns {Function} Returns the new aggregator function.
	     */
	    function createAggregator(setter, initializer) {
	      return function(collection, iteratee, thisArg) {
	        iteratee = getCallback(iteratee, thisArg, 3);

	        var result = initializer ? initializer() : {};
	        if (isArray(collection)) {
	          var index = -1,
	              length = collection.length;

	          while (++index < length) {
	            var value = collection[index];
	            setter(result, value, iteratee(value, index, collection), collection);
	          }
	        } else {
	          baseEach(collection, function(value, key, collection) {
	            setter(result, value, iteratee(value, key, collection), collection);
	          });
	        }
	        return result;
	      };
	    }

	    /**
	     * Creates a function that assigns properties of source object(s) to a given
	     * destination object.
	     *
	     * @private
	     * @param {Function} assigner The function to handle assigning values.
	     * @returns {Function} Returns the new assigner function.
	     */
	    function createAssigner(assigner) {
	      return function() {
	        var length = arguments.length,
	            object = arguments[0];

	        if (length < 2 || object == null) {
	          return object;
	        }
	        if (length > 3 && isIterateeCall(arguments[1], arguments[2], arguments[3])) {
	          length = 2;
	        }
	        // Juggle arguments.
	        if (length > 3 && typeof arguments[length - 2] == 'function') {
	          var customizer = bindCallback(arguments[--length - 1], arguments[length--], 5);
	        } else if (length > 2 && typeof arguments[length - 1] == 'function') {
	          customizer = arguments[--length];
	        }
	        var index = 0;
	        while (++index < length) {
	          assigner(object, arguments[index], customizer);
	        }
	        return object;
	      };
	    }

	    /**
	     * Creates a function that wraps `func` and invokes it with the `this`
	     * binding of `thisArg`.
	     *
	     * @private
	     * @param {Function} func The function to bind.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @returns {Function} Returns the new bound function.
	     */
	    function createBindWrapper(func, thisArg) {
	      var Ctor = createCtorWrapper(func);

	      function wrapper() {
	        return (this instanceof wrapper ? Ctor : func).apply(thisArg, arguments);
	      }
	      return wrapper;
	    }

	    /**
	     * Creates a `Set` cache object to optimize linear searches of large arrays.
	     *
	     * @private
	     * @param {Array} [values] The values to cache.
	     * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
	     */
	    var createCache = !Set ? constant(null) : function(values) {
	      return new SetCache(values);
	    };

	    /**
	     * Creates a function that produces compound words out of the words in a
	     * given string.
	     *
	     * @private
	     * @param {Function} callback The function invoked to combine each word.
	     * @returns {Function} Returns the new compounder function.
	     */
	    function createCompounder(callback) {
	      return function(string) {
	        var index = -1,
	            array = words(deburr(string)),
	            length = array.length,
	            result = '';

	        while (++index < length) {
	          result = callback(result, array[index], index);
	        }
	        return result;
	      };
	    }

	    /**
	     * Creates a function that produces an instance of `Ctor` regardless of
	     * whether it was invoked as part of a `new` expression or by `call` or `apply`.
	     *
	     * @private
	     * @param {Function} Ctor The constructor to wrap.
	     * @returns {Function} Returns the new wrapped function.
	     */
	    function createCtorWrapper(Ctor) {
	      return function() {
	        var thisBinding = baseCreate(Ctor.prototype),
	            result = Ctor.apply(thisBinding, arguments);

	        // Mimic the constructor's `return` behavior.
	        // See http://es5.github.io/#x13.2.2.
	        return isObject(result) ? result : thisBinding;
	      };
	    }

	    /**
	     * Creates a function that wraps `func` and invokes it with optional `this`
	     * binding of, partial application, and currying.
	     *
	     * @private
	     * @param {Function|string} func The function or method name to reference.
	     * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param {Array} [partials] The arguments to prepend to those provided to the new function.
	     * @param {Array} [holders] The `partials` placeholder indexes.
	     * @param {Array} [partialsRight] The arguments to append to those provided to the new function.
	     * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
	     * @param {Array} [argPos] The argument positions of the new function.
	     * @param {number} [ary] The arity cap of `func`.
	     * @param {number} [arity] The arity of `func`.
	     * @returns {Function} Returns the new wrapped function.
	     */
	    function createHybridWrapper(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
	      var isAry = bitmask & ARY_FLAG,
	          isBind = bitmask & BIND_FLAG,
	          isBindKey = bitmask & BIND_KEY_FLAG,
	          isCurry = bitmask & CURRY_FLAG,
	          isCurryBound = bitmask & CURRY_BOUND_FLAG,
	          isCurryRight = bitmask & CURRY_RIGHT_FLAG;

	      var Ctor = !isBindKey && createCtorWrapper(func),
	          key = func;

	      function wrapper() {
	        // Avoid `arguments` object use disqualifying optimizations by
	        // converting it to an array before providing it to other functions.
	        var length = arguments.length,
	            index = length,
	            args = Array(length);

	        while (index--) {
	          args[index] = arguments[index];
	        }
	        if (partials) {
	          args = composeArgs(args, partials, holders);
	        }
	        if (partialsRight) {
	          args = composeArgsRight(args, partialsRight, holdersRight);
	        }
	        if (isCurry || isCurryRight) {
	          var placeholder = wrapper.placeholder,
	              argsHolders = replaceHolders(args, placeholder);

	          length -= argsHolders.length;
	          if (length < arity) {
	            var newArgPos = argPos ? baseSlice(argPos) : null,
	                newArity = nativeMax(arity - length, 0),
	                newsHolders = isCurry ? argsHolders : null,
	                newHoldersRight = isCurry ? null : argsHolders,
	                newPartials = isCurry ? args : null,
	                newPartialsRight = isCurry ? null : args;

	            bitmask |= (isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG);
	            bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);

	            if (!isCurryBound) {
	              bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
	            }
	            var result = createHybridWrapper(func, bitmask, thisArg, newPartials, newsHolders, newPartialsRight, newHoldersRight, newArgPos, ary, newArity);
	            result.placeholder = placeholder;
	            return result;
	          }
	        }
	        var thisBinding = isBind ? thisArg : this;
	        if (isBindKey) {
	          func = thisBinding[key];
	        }
	        if (argPos) {
	          args = reorder(args, argPos);
	        }
	        if (isAry && ary < args.length) {
	          args.length = ary;
	        }
	        return (this instanceof wrapper ? (Ctor || createCtorWrapper(func)) : func).apply(thisBinding, args);
	      }
	      return wrapper;
	    }

	    /**
	     * Creates the pad required for `string` based on the given padding length.
	     * The `chars` string may be truncated if the number of padding characters
	     * exceeds the padding length.
	     *
	     * @private
	     * @param {string} string The string to create padding for.
	     * @param {number} [length=0] The padding length.
	     * @param {string} [chars=' '] The string used as padding.
	     * @returns {string} Returns the pad for `string`.
	     */
	    function createPad(string, length, chars) {
	      var strLength = string.length;
	      length = +length;

	      if (strLength >= length || !nativeIsFinite(length)) {
	        return '';
	      }
	      var padLength = length - strLength;
	      chars = chars == null ? ' ' : String(chars);
	      return repeat(chars, ceil(padLength / chars.length)).slice(0, padLength);
	    }

	    /**
	     * Creates a function that wraps `func` and invokes it with the optional `this`
	     * binding of `thisArg` and the `partials` prepended to those provided to
	     * the wrapper.
	     *
	     * @private
	     * @param {Function} func The function to partially apply arguments to.
	     * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
	     * @param {*} thisArg The `this` binding of `func`.
	     * @param {Array} partials The arguments to prepend to those provided to the new function.
	     * @returns {Function} Returns the new bound function.
	     */
	    function createPartialWrapper(func, bitmask, thisArg, partials) {
	      var isBind = bitmask & BIND_FLAG,
	          Ctor = createCtorWrapper(func);

	      function wrapper() {
	        // Avoid `arguments` object use disqualifying optimizations by
	        // converting it to an array before providing it `func`.
	        var argsIndex = -1,
	            argsLength = arguments.length,
	            leftIndex = -1,
	            leftLength = partials.length,
	            args = Array(argsLength + leftLength);

	        while (++leftIndex < leftLength) {
	          args[leftIndex] = partials[leftIndex];
	        }
	        while (argsLength--) {
	          args[leftIndex++] = arguments[++argsIndex];
	        }
	        return (this instanceof wrapper ? Ctor : func).apply(isBind ? thisArg : this, args);
	      }
	      return wrapper;
	    }

	    /**
	     * Creates a function that either curries or invokes `func` with optional
	     * `this` binding and partially applied arguments.
	     *
	     * @private
	     * @param {Function|string} func The function or method name to reference.
	     * @param {number} bitmask The bitmask of flags.
	     *  The bitmask may be composed of the following flags:
	     *     1 - `_.bind`
	     *     2 - `_.bindKey`
	     *     4 - `_.curry` or `_.curryRight` of a bound function
	     *     8 - `_.curry`
	     *    16 - `_.curryRight`
	     *    32 - `_.partial`
	     *    64 - `_.partialRight`
	     *   128 - `_.rearg`
	     *   256 - `_.ary`
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param {Array} [partials] The arguments to be partially applied.
	     * @param {Array} [holders] The `partials` placeholder indexes.
	     * @param {Array} [argPos] The argument positions of the new function.
	     * @param {number} [ary] The arity cap of `func`.
	     * @param {number} [arity] The arity of `func`.
	     * @returns {Function} Returns the new wrapped function.
	     */
	    function createWrapper(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
	      var isBindKey = bitmask & BIND_KEY_FLAG;
	      if (!isBindKey && !isFunction(func)) {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      var length = partials ? partials.length : 0;
	      if (!length) {
	        bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
	        partials = holders = null;
	      }
	      holders = (partials && !holders) ? [] : holders;
	      length -= (holders ? holders.length : 0);

	      if (bitmask & PARTIAL_RIGHT_FLAG) {
	        var partialsRight = partials,
	            holdersRight = holders;

	        partials = holders = null;
	      }
	      var data = !isBindKey && getData(func),
	          newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];

	      if (data && data !== true) {
	        mergeData(newData, data);
	      }
	      newData[9] = newData[9] == null
	        ? (isBindKey ? 0 : newData[0].length)
	        : (nativeMax(newData[9] - length, 0) || 0);

	      bitmask = newData[1];
	      if (bitmask == BIND_FLAG) {
	        var result = createBindWrapper(newData[0], newData[2]);
	      } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !newData[4].length) {
	        result = createPartialWrapper.apply(null, newData);
	      } else {
	        result = createHybridWrapper.apply(null, newData);
	      }
	      var setter = data ? baseSetData : setData;
	      return setter(result, newData);
	    }

	    /**
	     * A specialized version of `baseIsEqualDeep` for arrays with support for
	     * partial deep comparisons.
	     *
	     * @private
	     * @param {Array} array The array to compare to `other`.
	     * @param {Array} other The array to compare to `value`.
	     * @param {Function} equalFunc The function to determine equivalents of arbitrary values.
	     * @param {Function} [customizer] The function to customize comparing arrays.
	     * @param {boolean} [isWhere] Specify performing partial comparisons.
	     * @param {Array} [stackA] Tracks traversed `value` objects.
	     * @param {Array} [stackB] Tracks traversed `other` objects.
	     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	     */
	    function equalArrays(array, other, equalFunc, customizer, isWhere, stackA, stackB) {
	      var index = -1,
	          arrLength = array.length,
	          othLength = other.length,
	          result = true;

	      if (arrLength != othLength && !(isWhere && othLength > arrLength)) {
	        return false;
	      }
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (result && ++index < arrLength) {
	        var arrValue = array[index],
	            othValue = other[index];

	        result = undefined;
	        if (customizer) {
	          result = isWhere
	            ? customizer(othValue, arrValue, index)
	            : customizer(arrValue, othValue, index);
	        }
	        if (typeof result == 'undefined') {
	          if (isWhere) {
	            var othIndex = othLength;
	            while (othIndex--) {
	              othValue = other[othIndex];
	              result = (arrValue && arrValue === othValue) || equalFunc(arrValue, othValue, customizer, isWhere, stackA, stackB);
	              if (result) {
	                break;
	              }
	            }
	          } else {
	            result = (arrValue && arrValue === othValue) || equalFunc(arrValue, othValue, customizer, isWhere, stackA, stackB);
	          }
	        }
	      }
	      return !!result;
	    }

	    /**
	     * A specialized version of `baseIsEqualDeep` for comparing objects of
	     * the same `[[Class]]`.
	     *
	     * **Note:** This function only supports comparing values with `[[Class]]`
	     * values of `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	     *
	     * @private
	     * @param {Object} value The object to compare to `other`.
	     * @param {Object} other The object to compare to `object`.
	     * @param {string} className The `[[Class]]` of the objects to compare.
	     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	     */
	    function equalByClass(object, other, className) {
	      switch (className) {
	        case boolClass:
	        case dateClass:
	          // Coerce dates and booleans to numbers, dates to milliseconds and booleans
	          // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
	          return +object == +other;

	        case errorClass:
	          return object.name == other.name && object.message == other.message;

	        case numberClass:
	          // Treat `NaN` vs. `NaN` as equal.
	          return (object != +object)
	            ? other != +other
	            // But, treat `-0` vs. `+0` as not equal.
	            : (object == 0 ? ((1 / object) == (1 / other)) : object == +other);

	        case regexpClass:
	        case stringClass:
	          // Coerce regexes to strings (http://es5.github.io/#x15.10.6.4) and
	          // treat strings primitives and string objects as equal.
	          return object == String(other);
	      }
	      return false;
	    }

	    /**
	     * A specialized version of `baseIsEqualDeep` for objects with support for
	     * partial deep comparisons.
	     *
	     * @private
	     * @param {Object} object The object to compare to `other`.
	     * @param {Object} other The object to compare to `value`.
	     * @param {Function} equalFunc The function to determine equivalents of arbitrary values.
	     * @param {Function} [customizer] The function to customize comparing values.
	     * @param {boolean} [isWhere] Specify performing partial comparisons.
	     * @param {Array} [stackA] Tracks traversed `value` objects.
	     * @param {Array} [stackB] Tracks traversed `other` objects.
	     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	     */
	    function equalObjects(object, other, equalFunc, customizer, isWhere, stackA, stackB) {
	      var objProps = keys(object),
	          objLength = objProps.length,
	          othProps = keys(other),
	          othLength = othProps.length;

	      if (objLength != othLength && !isWhere) {
	        return false;
	      }
	      var hasCtor,
	          index = -1;

	      while (++index < objLength) {
	        var key = objProps[index],
	            result = hasOwnProperty.call(other, key);

	        if (result) {
	          var objValue = object[key],
	              othValue = other[key];

	          result = undefined;
	          if (customizer) {
	            result = isWhere
	              ? customizer(othValue, objValue, key)
	              : customizer(objValue, othValue, key);
	          }
	          if (typeof result == 'undefined') {
	            result = (objValue && objValue === othValue) || equalFunc(objValue, othValue, customizer, isWhere, stackA, stackB);
	          }
	        }
	        if (!result) {
	          return false;
	        }
	        hasCtor || (hasCtor = key == 'constructor');
	      }
	      if (!hasCtor) {
	        var objCtor = object.constructor,
	            othCtor = other.constructor;

	        // Non `Object` object instances with different constructors are not equal.
	        if (objCtor != othCtor && ('constructor' in object && 'constructor' in other) &&
	            !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	          return false;
	        }
	      }
	      return true;
	    }

	    /**
	     * Gets the appropriate "callback" function. If the `_.callback` method is
	     * customized this function returns the custom method, otherwise it returns
	     * the `baseCallback` function. If arguments are provided the chosen function
	     * is invoked with them and its result is returned.
	     *
	     * @private
	     * @returns {Function} Returns the chosen function or its result.
	     */
	    function getCallback(func, thisArg, argCount) {
	      var result = lodash.callback || callback;
	      result = result === callback ? baseCallback : result;
	      return argCount ? result(func, thisArg, argCount) : result;
	    }

	    /**
	     * Gets metadata for `func`.
	     *
	     * @private
	     * @param {Function} func The function to query.
	     * @returns {*} Returns the metadata for `func`.
	     */
	    var getData = !metaMap ? noop : function(func) {
	      return metaMap.get(func);
	    };

	    /**
	     * Gets the appropriate "indexOf" function. If the `_.indexOf` method is
	     * customized this function returns the custom method, otherwise it returns
	     * the `baseIndexOf` function. If arguments are provided the chosen function
	     * is invoked with them and its result is returned.
	     *
	     * @private
	     * @returns {Function|number} Returns the chosen function or its result.
	     */
	    function getIndexOf(collection, target, fromIndex) {
	      var result = lodash.indexOf || indexOf;
	      result = result === indexOf ? baseIndexOf : result;
	      return collection ? result(collection, target, fromIndex) : result;
	    }

	    /**
	     * Gets the view, applying any `transforms` to the `start` and `end` positions.
	     *
	     * @private
	     * @param {number} start The start of the view.
	     * @param {number} end The end of the view.
	     * @param {Array} [transforms] The transformations to apply to the view.
	     * @returns {Object} Returns an object containing the `start` and `end`
	     *  positions of the view.
	     */
	    function getView(start, end, transforms) {
	      var index = -1,
	          length = transforms ? transforms.length : 0;

	      while (++index < length) {
	        var data = transforms[index],
	            size = data.size;

	        switch (data.type) {
	          case 'drop':      start += size; break;
	          case 'dropRight': end -= size; break;
	          case 'take':      end = nativeMin(end, start + size); break;
	          case 'takeRight': start = nativeMax(start, end - size); break;
	        }
	      }
	      return { 'start': start, 'end': end };
	    }

	    /**
	     * Initializes an array clone.
	     *
	     * @private
	     * @param {Array} array The array to clone.
	     * @param {boolean} [isDeep] Specify a deep clone.
	     * @returns {Array} Returns the initialized array clone.
	     */
	    function initArrayClone(array, isDeep) {
	      var index = -1,
	          length = array.length,
	          result = new array.constructor(length);

	      if (!isDeep) {
	        while (++index < length) {
	          result[index] = array[index];
	        }
	      }
	      // Add array properties assigned by `RegExp#exec`.
	      if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	        result.index = array.index;
	        result.input = array.input;
	      }
	      return result;
	    }

	    /**
	     * Initializes an object clone.
	     *
	     * @private
	     * @param {Object} object The object to clone.
	     * @param {boolean} [isDeep] Specify a deep clone.
	     * @returns {null|Object} Returns the initialized object clone if an object
	     *  is cloneable, else `null`.
	     */
	    function initObjectClone(object, isDeep) {
	      if (!isCloneable(object)) {
	        return null;
	      }
	      var Ctor = object.constructor,
	          className = toString.call(object),
	          isArgs = className == argsClass || (!lodash.support.argsClass && isArguments(object)),
	          isObj = className == objectClass;

	      if (isObj && !(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
	        Ctor = Object;
	      }
	      if (isArgs || isObj) {
	        var result = isDeep ? new Ctor : baseAssign(new Ctor, object);
	        if (isArgs) {
	          result.length = object.length;
	        }
	        return result;
	      }
	      switch (className) {
	        case arrayBufferClass:
	          return bufferClone(object);

	        case boolClass:
	        case dateClass:
	          return new Ctor(+object);

	        case float32Class: case float64Class:
	        case int8Class: case int16Class: case int32Class:
	        case uint8Class: case uint8ClampedClass: case uint16Class: case uint32Class:
	          // Safari 5 mobile incorrectly has `Object` as the constructor of typed arrays.
	          if (Ctor instanceof Ctor) {
	            Ctor = ctorByClass[className];
	          }
	          var buffer = object.buffer;
	          return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);

	        case numberClass:
	        case stringClass:
	          return new Ctor(object);

	        case regexpClass:
	          result = new Ctor(object.source, reFlags.exec(object));
	          result.lastIndex = object.lastIndex;
	      }
	      return result;
	    }

	    /**
	     * Checks if `value` is an array-like object.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
	     */
	    function isArrayLike(value) {
	      return (isObjectLike(value) && isLength(value.length) &&
	        (arrayLikeClasses[toString.call(value)] || (!lodash.support.argsClass && isArguments(value)))) || false;
	    }

	    /**
	     * Checks if `func` is eligible for `this` binding.
	     *
	     * @private
	     * @param {Function} func The function to check.
	     * @returns {boolean} Returns `true` if `func` is eligible, else `false`.
	     */
	    function isBindable(func) {
	      var support = lodash.support,
	          result = !(support.funcNames ? func.name : support.funcDecomp);

	      if (!result) {
	        var source = fnToString.call(func);
	        if (!support.funcNames) {
	          result = !reFuncName.test(source);
	        }
	        if (!result) {
	          // Check if `func` references the `this` keyword and store the result.
	          result = reThis.test(source) || isNative(func);
	          baseSetData(func, result);
	        }
	      }
	      return result;
	    }

	    /**
	     * Checks if `value` is cloneable.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is cloneable, else `false`.
	     */
	    function isCloneable(value) {
	      return (value && cloneableClasses[toString.call(value)] && !isHostObject(value)) || false;
	    }

	    /**
	     * Checks if the provided arguments are from an iteratee call.
	     *
	     * @private
	     * @param {*} value The potential iteratee value argument.
	     * @param {*} index The potential iteratee index or key argument.
	     * @param {*} object The potential iteratee object argument.
	     * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	     */
	    function isIterateeCall(value, index, object) {
	      if (!isObject(object)) {
	        return false;
	      }
	      var type = typeof index;
	      if (type == 'number') {
	        var length = object.length,
	            prereq = isLength(length) && isIndex(index, length);
	      } else {
	        prereq = type == 'string';
	      }
	      return prereq && object[index] === value;
	    }

	    /**
	     * Checks if `value` is a valid array-like length.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	     */
	    function isLength(value) {
	      return typeof value == 'number' && value > -1 && value <= MAX_SAFE_INTEGER;
	    }

	    /**
	     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` if suitable for strict
	     *  equality comparisons, else `false`.
	     */
	    function isStrictComparable(value) {
	      return value === value && (value === 0 ? ((1 / value) > 0) : !isObject(value));
	    }

	    /**
	     * Merges the function metadata of `source` into `data`.
	     *
	     * Merging metadata reduces the number of wrappers required to invoke a function.
	     * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
	     * may be applied regardless of execution order. Methods like `_.ary` and `_.rearg`
	     * augment function arguments, making the order in which they are executed important,
	     * preventing the merging of metadata. However, we make an exception for a safe
	     * common case where curried functions have `_.ary` and or `_.rearg` applied.
	     *
	     * @private
	     * @param {Array} data The destination metadata.
	     * @param {Array} source The source metadata.
	     * @returns {Array} Returns `data`.
	     */
	    function mergeData(data, source) {
	      var bitmask = data[1],
	          srcBitmask = source[1],
	          newBitmask = bitmask | srcBitmask;

	      var arityFlags = ARY_FLAG | REARG_FLAG,
	          bindFlags = BIND_FLAG | BIND_KEY_FLAG,
	          comboFlags = arityFlags | bindFlags | CURRY_BOUND_FLAG | CURRY_RIGHT_FLAG;

	      var isAry = bitmask & ARY_FLAG && !(srcBitmask & ARY_FLAG),
	          isRearg = bitmask & REARG_FLAG && !(srcBitmask & REARG_FLAG),
	          argPos = (isRearg ? data : source)[7],
	          ary = (isAry ? data : source)[8];

	      var isCommon = !(bitmask >= REARG_FLAG && srcBitmask > bindFlags) &&
	        !(bitmask > bindFlags && srcBitmask >= REARG_FLAG);

	      var isCombo = (newBitmask >= arityFlags && newBitmask <= comboFlags) &&
	        (bitmask < REARG_FLAG || ((isRearg || isAry) && argPos.length <= ary));

	      // Exit early if metadata can't be merged.
	      if (!(isCommon || isCombo)) {
	        return data;
	      }
	      // Use source `thisArg` if available.
	      if (srcBitmask & BIND_FLAG) {
	        data[2] = source[2];
	        // Set when currying a bound function.
	        newBitmask |= (bitmask & BIND_FLAG) ? 0 : CURRY_BOUND_FLAG;
	      }
	      // Compose partial arguments.
	      var value = source[3];
	      if (value) {
	        var partials = data[3];
	        data[3] = partials ? composeArgs(partials, value, source[4]) : baseSlice(value);
	        data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : baseSlice(source[4]);
	      }
	      // Compose partial right arguments.
	      value = source[5];
	      if (value) {
	        partials = data[5];
	        data[5] = partials ? composeArgsRight(partials, value, source[6]) : baseSlice(value);
	        data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : baseSlice(source[6]);
	      }
	      // Use source `argPos` if available.
	      value = source[7];
	      if (value) {
	        data[7] = baseSlice(value);
	      }
	      // Use source `ary` if it's smaller.
	      if (srcBitmask & ARY_FLAG) {
	        data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
	      }
	      // Use source `arity` if one is not provided.
	      if (data[9] == null) {
	        data[9] = source[9];
	      }
	      // Use source `func` and merge bitmasks.
	      data[0] = source[0];
	      data[1] = newBitmask;

	      return data;
	    }

	    /**
	     * A specialized version of `_.pick` that picks `object` properties
	     * specified by the `props` array.
	     *
	     * @private
	     * @param {Object} object The source object.
	     * @param {string[]} props The property names to pick.
	     * @returns {Object} Returns the new object.
	     */
	    function pickByArray(object, props) {
	      object = toObject(object);

	      var index = -1,
	          length = props.length,
	          result = {};

	      while (++index < length) {
	        var key = props[index];
	        if (key in object) {
	          result[key] = object[key];
	        }
	      }
	      return result;
	    }

	    /**
	     * A specialized version of `_.pick` that picks `object` properties `predicate`
	     * returns truthy for.
	     *
	     * @private
	     * @param {Object} object The source object.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {Object} Returns the new object.
	     */
	    function pickByCallback(object, predicate) {
	      var result = {};

	      baseForIn(object, function(value, key, object) {
	        if (predicate(value, key, object)) {
	          result[key] = value;
	        }
	      });
	      return result;
	    }

	    /**
	     * Reorder `array` according to the specified indexes where the element at
	     * the first index is assigned as the first element, the element at
	     * the second index is assigned as the second element, and so on.
	     *
	     * @private
	     * @param {Array} array The array to reorder.
	     * @param {Array} indexes The arranged array indexes.
	     * @returns {Array} Returns `array`.
	     */
	    function reorder(array, indexes) {
	      var arrLength = array.length,
	          length = nativeMin(indexes.length, arrLength),
	          oldArray = baseSlice(array);

	      while (length--) {
	        var index = indexes[length];
	        array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
	      }
	      return array;
	    }

	    /**
	     * Sets metadata for `func`.
	     *
	     * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
	     * period of time, it will trip its breaker and transition to an identity function
	     * to avoid garbage collection pauses in V8. See https://code.google.com/p/v8/issues/detail?id=2070.
	     *
	     * @private
	     * @param {Function} func The function to associate metadata with.
	     * @param {*} data The metadata.
	     * @returns {Function} Returns `func`.
	     */
	    var setData = (function() {
	      var count = 0,
	          lastCalled = 0;

	      return function(key, value) {
	        var stamp = now(),
	            remaining = HOT_SPAN - (stamp - lastCalled);

	        lastCalled = stamp;
	        if (remaining > 0) {
	          if (++count >= HOT_COUNT) {
	            return key;
	          }
	        } else {
	          count = 0;
	        }
	        return baseSetData(key, value);
	      };
	    }());

	    /**
	     * A fallback implementation of `_.isPlainObject` which checks if `value`
	     * is an object created by the `Object` constructor or has a `[[Prototype]]`
	     * of `null`.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	     */
	    function shimIsPlainObject(value) {
	      var Ctor,
	          support = lodash.support;

	      // Exit early for non `Object` objects.
	      if (!(isObjectLike(value) && toString.call(value) == objectClass && !isHostObject(value)) ||
	          (!hasOwnProperty.call(value, 'constructor') &&
	            (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor))) ||
	          (!support.argsClass && isArguments(value))) {
	        return false;
	      }
	      // IE < 9 iterates inherited properties before own properties. If the first
	      // iterated property is an object's own property then there are no inherited
	      // enumerable properties.
	      var result;
	      if (support.ownLast) {
	        baseForIn(value, function(subValue, key, object) {
	          result = hasOwnProperty.call(object, key);
	          return false;
	        });
	        return result !== false;
	      }
	      // In most environments an object's own properties are iterated before
	      // its inherited properties. If the last iterated property is an object's
	      // own property then there are no inherited enumerable properties.
	      baseForIn(value, function(subValue, key) {
	        result = key;
	      });
	      return typeof result == 'undefined' || hasOwnProperty.call(value, result);
	    }

	    /**
	     * A fallback implementation of `Object.keys` which creates an array of the
	     * own enumerable property names of `object`.
	     *
	     * @private
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns the array of property names.
	     */
	    function shimKeys(object) {
	      var props = keysIn(object),
	          propsLength = props.length,
	          length = propsLength && object.length,
	          support = lodash.support;

	      var allowIndexes = length && isLength(length) &&
	        (isArray(object) || (support.nonEnumStrings && isString(object)) ||
	          (support.nonEnumArgs && isArguments(object)));

	      var index = -1,
	          result = [];

	      while (++index < propsLength) {
	        var key = props[index];
	        if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	          result.push(key);
	        }
	      }
	      return result;
	    }

	    /**
	     * Converts `value` to an array-like object if it is not one.
	     *
	     * @private
	     * @param {*} value The value to process.
	     * @returns {Array|Object} Returns the array-like object.
	     */
	    function toIterable(value) {
	      if (value == null) {
	        return [];
	      }
	      if (!isLength(value.length)) {
	        return values(value);
	      }
	      if (lodash.support.unindexedChars && isString(value)) {
	        return value.split('');
	      }
	      return isObject(value) ? value : Object(value);
	    }

	    /**
	     * Converts `value` to an object if it is not one.
	     *
	     * @private
	     * @param {*} value The value to process.
	     * @returns {Object} Returns the object.
	     */
	    function toObject(value) {
	      if (lodash.support.unindexedChars && isString(value)) {
	        var index = -1,
	            length = value.length,
	            result = Object(value);

	        while (++index < length) {
	          result[index] = value.charAt(index);
	        }
	        return result;
	      }
	      return isObject(value) ? value : Object(value);
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Creates an array of elements split into groups the length of `size`.
	     * If `collection` can't be split evenly, the final chunk will be the remaining
	     * elements.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to process.
	     * @param {numer} [size=1] The length of each chunk.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the new array containing chunks.
	     * @example
	     *
	     * _.chunk(['a', 'b', 'c', 'd'], 2);
	     * // => [['a', 'b'], ['c', 'd']]
	     *
	     * _.chunk(['a', 'b', 'c', 'd'], 3);
	     * // => [['a', 'b', 'c'], ['d']]
	     */
	    function chunk(array, size, guard) {
	      if (guard ? isIterateeCall(array, size, guard) : size == null) {
	        size = 1;
	      } else {
	        size = nativeMax(+size || 1, 1);
	      }
	      var index = 0,
	          length = array ? array.length : 0,
	          resIndex = -1,
	          result = Array(ceil(length / size));

	      while (index < length) {
	        result[++resIndex] = slice(array, index, (index += size));
	      }
	      return result;
	    }

	    /**
	     * Creates an array with all falsey values removed. The values `false`, `null`,
	     * `0`, `""`, `undefined`, and `NaN` are all falsey.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to compact.
	     * @returns {Array} Returns the new array of filtered values.
	     * @example
	     *
	     * _.compact([0, 1, false, 2, '', 3]);
	     * // => [1, 2, 3]
	     */
	    function compact(array) {
	      var index = -1,
	          length = array ? array.length : 0,
	          resIndex = -1,
	          result = [];

	      while (++index < length) {
	        var value = array[index];
	        if (value) {
	          result[++resIndex] = value;
	        }
	      }
	      return result;
	    }

	    /**
	     * Creates an array excluding all values of the provided arrays using
	     * `SameValueZero` for equality comparisons.
	     *
	     * **Note:** `SameValueZero` comparisons are like strict equality comparisons,
	     * e.g. `===`, except that `NaN` matches `NaN`. See the
	     * [ES6 spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
	     * for more details.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {...Array} [values] The arrays of values to exclude.
	     * @returns {Array} Returns the new array of filtered values.
	     * @example
	     *
	     * _.difference([1, 2, 3], [5, 2, 10]);
	     * // => [1, 3]
	     */
	    function difference() {
	      var index = -1,
	          length = arguments.length;

	      while (++index < length) {
	        var value = arguments[index];
	        if (isArray(value) || isArguments(value)) {
	          break;
	        }
	      }
	      return baseDifference(value, baseFlatten(arguments, false, true, ++index));
	    }

	    /**
	     * Creates a slice of `array` with `n` elements dropped from the beginning.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {number} [n=1] The number of elements to drop.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.drop([1, 2, 3], 1);
	     * // => [2, 3]
	     *
	     * _.drop([1, 2, 3], 2);
	     * // => [3]
	     *
	     * _.drop([1, 2, 3], 5);
	     * // => []
	     *
	     * _.drop([1, 2, 3], 0);
	     * // => [1, 2, 3]
	     */
	    function drop(array, n, guard) {
	      if (guard ? isIterateeCall(array, n, guard) : n == null) {
	        n = 1;
	      }
	      return slice(array, n < 0 ? 0 : n);
	    }

	    /**
	     * Creates a slice of `array` with `n` elements dropped from the end.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {number} [n=1] The number of elements to drop.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.dropRight([1, 2, 3], 1);
	     * // => [1, 2]
	     *
	     * _.dropRight([1, 2, 3], 2);
	     * // => [1]
	     *
	     * _.dropRight([1, 2, 3], 5);
	     * // => []
	     *
	     * _.dropRight([1, 2, 3], 0);
	     * // => [1, 2, 3]
	     */
	    function dropRight(array, n, guard) {
	      if (guard ? isIterateeCall(array, n, guard) : n == null) {
	        n = 1;
	      }
	      n = array ? (array.length - (+n || 0)) : 0;
	      return slice(array, 0, n < 0 ? 0 : n);
	    }

	    /**
	     * Creates a slice of `array` excluding elements dropped from the end.
	     * Elements are dropped until `predicate` returns falsey. The predicate is
	     * bound to `thisArg` and invoked with three arguments; (value, index, array).
	     *
	     * If a property name is provided for `predicate` the created "_.pluck" style
	     * callback returns the property value of the given element.
	     *
	     * If an object is provided for `predicate` the created "_.where" style callback
	     * returns `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per element.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.dropRightWhile([1, 2, 3], function(n) { return n > 1; });
	     * // => [1]
	     *
	     * var users = [
	     *   { 'user': 'barney',  'status': 'busy', 'active': false },
	     *   { 'user': 'fred',    'status': 'busy', 'active': true },
	     *   { 'user': 'pebbles', 'status': 'away', 'active': true }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.pluck(_.dropRightWhile(users, 'active'), 'user');
	     * // => ['barney']
	     *
	     * // using "_.where" callback shorthand
	     * _.pluck(_.dropRightWhile(users, { 'status': 'away' }), 'user');
	     * // => ['barney', 'fred']
	     */
	    function dropRightWhile(array, predicate, thisArg) {
	      var length = array ? array.length : 0;

	      predicate = getCallback(predicate, thisArg, 3);
	      while (length-- && predicate(array[length], length, array)) {}
	      return slice(array, 0, length + 1);
	    }

	    /**
	     * Creates a slice of `array` excluding elements dropped from the beginning.
	     * Elements are dropped until `predicate` returns falsey. The predicate is
	     * bound to `thisArg` and invoked with three arguments; (value, index, array).
	     *
	     * If a property name is provided for `predicate` the created "_.pluck" style
	     * callback returns the property value of the given element.
	     *
	     * If an object is provided for `predicate` the created "_.where" style callback
	     * returns `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per element.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.dropWhile([1, 2, 3], function(n) { return n < 3; });
	     * // => [3]
	     *
	     * var users = [
	     *   { 'user': 'barney',  'status': 'busy', 'active': true },
	     *   { 'user': 'fred',    'status': 'busy', 'active': false },
	     *   { 'user': 'pebbles', 'status': 'away', 'active': true }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.pluck(_.dropWhile(users, 'active'), 'user');
	     * // => ['fred', 'pebbles']
	     *
	     * // using "_.where" callback shorthand
	     * _.pluck(_.dropWhile(users, { 'status': 'busy' }), 'user');
	     * // => ['pebbles']
	     */
	    function dropWhile(array, predicate, thisArg) {
	      var index = -1,
	          length = array ? array.length : 0;

	      predicate = getCallback(predicate, thisArg, 3);
	      while (++index < length && predicate(array[index], index, array)) {}
	      return slice(array, index);
	    }

	    /**
	     * This method is like `_.find` except that it returns the index of the first
	     * element `predicate` returns truthy for, instead of the element itself.
	     *
	     * If a property name is provided for `predicate` the created "_.pluck" style
	     * callback returns the property value of the given element.
	     *
	     * If an object is provided for `predicate` the created "_.where" style callback
	     * returns `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration. If a property name or object is provided it is used to
	     *  create a "_.pluck" or "_.where" style callback respectively.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {number} Returns the index of the found element, else `-1`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'age': 36, 'active': false },
	     *   { 'user': 'fred',    'age': 40, 'active': true },
	     *   { 'user': 'pebbles', 'age': 1,  'active': false }
	     * ];
	     *
	     * _.findIndex(users, function(chr) { return chr.age < 40; });
	     * // => 0
	     *
	     * // using "_.where" callback shorthand
	     * _.findIndex(users, { 'age': 1 });
	     * // => 2
	     *
	     * // using "_.pluck" callback shorthand
	     * _.findIndex(users, 'active');
	     * // => 1
	     */
	    function findIndex(array, predicate, thisArg) {
	      var index = -1,
	          length = array ? array.length : 0;

	      predicate = getCallback(predicate, thisArg, 3);
	      while (++index < length) {
	        if (predicate(array[index], index, array)) {
	          return index;
	        }
	      }
	      return -1;
	    }

	    /**
	     * This method is like `_.findIndex` except that it iterates over elements
	     * of `collection` from right to left.
	     *
	     * If a property name is provided for `predicate` the created "_.pluck" style
	     * callback returns the property value of the given element.
	     *
	     * If an object is provided for `predicate` the created "_.where" style callback
	     * returns `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration. If a property name or object is provided it is used to
	     *  create a "_.pluck" or "_.where" style callback respectively.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {number} Returns the index of the found element, else `-1`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'age': 36, 'active': true },
	     *   { 'user': 'fred',    'age': 40, 'active': false },
	     *   { 'user': 'pebbles', 'age': 1,  'active': false }
	     * ];
	     *
	     * _.findLastIndex(users, function(chr) { return chr.age < 40; });
	     * // => 2
	     *
	     * // using "_.where" callback shorthand
	     * _.findLastIndex(users, { 'age': 40 });
	     * // => 1
	     *
	     * // using "_.pluck" callback shorthand
	     * _.findLastIndex(users, 'active');
	     * // => 0
	     */
	    function findLastIndex(array, predicate, thisArg) {
	      var length = array ? array.length : 0;

	      predicate = getCallback(predicate, thisArg, 3);
	      while (length--) {
	        if (predicate(array[length], length, array)) {
	          return length;
	        }
	      }
	      return -1;
	    }

	    /**
	     * Gets the first element of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @alias head
	     * @category Array
	     * @param {Array} array The array to query.
	     * @returns {*} Returns the first element of `array`.
	     * @example
	     *
	     * _.first([1, 2, 3]);
	     * // => 1
	     *
	     * _.first([]);
	     * // => undefined
	     */
	    function first(array) {
	      return array ? array[0] : undefined;
	    }

	    /**
	     * Flattens a nested array. If `isDeep` is `true` the array is recursively
	     * flattened, otherwise it is only flattened a single level.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to flatten.
	     * @param {boolean} [isDeep] Specify a deep flatten.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the new flattened array.
	     * @example
	     *
	     * _.flatten([1, [2], [3, [[4]]]]);
	     * // => [1, 2, 3, [[4]]];
	     *
	     * // using `isDeep`
	     * _.flatten([1, [2], [3, [[4]]]], true);
	     * // => [1, 2, 3, 4];
	     */
	    function flatten(array, isDeep, guard) {
	      var length = array ? array.length : 0;
	      if (guard && isIterateeCall(array, isDeep, guard)) {
	        isDeep = false;
	      }
	      return length ? baseFlatten(array, isDeep) : [];
	    }

	    /**
	     * Recursively flattens a nested array.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to recursively flatten.
	     * @returns {Array} Returns the new flattened array.
	     * @example
	     *
	     * _.flattenDeep([1, [2], [3, [[4]]]]);
	     * // => [1, 2, 3, 4];
	     */
	    function flattenDeep(array) {
	      var length = array ? array.length : 0;
	      return length ? baseFlatten(array, true) : [];
	    }

	    /**
	     * Gets the index at which the first occurrence of `value` is found in `array`
	     * using `SameValueZero` for equality comparisons. If `fromIndex` is negative,
	     * it is used as the offset from the end of `array`. If `array` is sorted
	     * providing `true` for `fromIndex` performs a faster binary search.
	     *
	     * **Note:** `SameValueZero` comparisons are like strict equality comparisons,
	     * e.g. `===`, except that `NaN` matches `NaN`. See the
	     * [ES6 spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
	     * for more details.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to search.
	     * @param {*} value The value to search for.
	     * @param {boolean|number} [fromIndex=0] The index to search from or `true`
	     *  to perform a binary search on a sorted array.
	     * @returns {number} Returns the index of the matched value, else `-1`.
	     * @example
	     *
	     * _.indexOf([1, 2, 3, 1, 2, 3], 2);
	     * // => 1
	     *
	     * // using `fromIndex`
	     * _.indexOf([1, 2, 3, 1, 2, 3], 2, 3);
	     * // => 4
	     *
	     * // performing a binary search
	     * _.indexOf([4, 4, 5, 5, 6, 6], 5, true);
	     * // => 2
	     */
	    function indexOf(array, value, fromIndex) {
	      var length = array ? array.length : 0;
	      if (!length) {
	        return -1;
	      }
	      if (typeof fromIndex == 'number') {
	        fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : (fromIndex || 0);
	      } else if (fromIndex) {
	        var index = binaryIndex(array, value),
	            other = array[index];

	        return (value === value ? value === other : other !== other) ? index : -1;
	      }
	      return baseIndexOf(array, value, fromIndex);
	    }

	    /**
	     * Gets all but the last element of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.initial([1, 2, 3]);
	     * // => [1, 2]
	     */
	    function initial(array) {
	      return dropRight(array, 1);
	    }

	    /**
	     * Creates an array of unique values in all provided arrays using `SameValueZero`
	     * for equality comparisons.
	     *
	     * **Note:** `SameValueZero` comparisons are like strict equality comparisons,
	     * e.g. `===`, except that `NaN` matches `NaN`. See the
	     * [ES6 spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
	     * for more details.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {...Array} [arrays] The arrays to inspect.
	     * @returns {Array} Returns the new array of shared values.
	     * @example
	     *
	     * _.intersection([1, 2, 3], [5, 2, 1, 4], [2, 1]);
	     * // => [1, 2]
	     */
	    function intersection() {
	      var args = [],
	          argsIndex = -1,
	          argsLength = arguments.length,
	          caches = [],
	          indexOf = getIndexOf(),
	          isCommon = indexOf == baseIndexOf;

	      while (++argsIndex < argsLength) {
	        var value = arguments[argsIndex];
	        if (isArray(value) || isArguments(value)) {
	          args.push(value);
	          caches.push(isCommon && value.length >= 120 && createCache(argsIndex && value));
	        }
	      }
	      argsLength = args.length;
	      var array = args[0],
	          index = -1,
	          length = array ? array.length : 0,
	          result = [],
	          seen = caches[0];

	      outer:
	      while (++index < length) {
	        value = array[index];
	        if ((seen ? cacheIndexOf(seen, value) : indexOf(result, value)) < 0) {
	          argsIndex = argsLength;
	          while (--argsIndex) {
	            var cache = caches[argsIndex];
	            if ((cache ? cacheIndexOf(cache, value) : indexOf(args[argsIndex], value)) < 0) {
	              continue outer;
	            }
	          }
	          if (seen) {
	            seen.push(value);
	          }
	          result.push(value);
	        }
	      }
	      return result;
	    }

	    /**
	     * Gets the last element of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @returns {*} Returns the last element of `array`.
	     * @example
	     *
	     * _.last([1, 2, 3]);
	     * // => 3
	     */
	    function last(array) {
	      var length = array ? array.length : 0;
	      return length ? array[length - 1] : undefined;
	    }

	    /**
	     * This method is like `_.indexOf` except that it iterates over elements of
	     * `array` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to search.
	     * @param {*} value The value to search for.
	     * @param {boolean|number} [fromIndex=array.length-1] The index to search from
	     *  or `true` to perform a binary search on a sorted array.
	     * @returns {number} Returns the index of the matched value, else `-1`.
	     * @example
	     *
	     * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2);
	     * // => 4
	     *
	     * // using `fromIndex`
	     * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2, 3);
	     * // => 1
	     *
	     * // performing a binary search
	     * _.lastIndexOf([4, 4, 5, 5, 6, 6], 5, true);
	     * // => 3
	     */
	    function lastIndexOf(array, value, fromIndex) {
	      var length = array ? array.length : 0;
	      if (!length) {
	        return -1;
	      }
	      var index = length;
	      if (typeof fromIndex == 'number') {
	        index = (fromIndex < 0 ? nativeMax(length + fromIndex, 0) : nativeMin(fromIndex || 0, length - 1)) + 1;
	      } else if (fromIndex) {
	        index = binaryIndex(array, value, null, true) - 1;
	        var other = array[index];
	        return (value === value ? value === other : other !== other) ? index : -1;
	      }
	      if (value !== value) {
	        return indexOfNaN(array, index, true);
	      }
	      while (index--) {
	        if (array[index] === value) {
	          return index;
	        }
	      }
	      return -1;
	    }

	    /**
	     * Removes all provided values from `array` using `SameValueZero` for equality
	     * comparisons.
	     *
	     * **Notes:**
	     *  - Unlike `_.without`, this method mutates `array`.
	     *  - `SameValueZero` comparisons are like strict equality comparisons, e.g. `===`,
	     *    except that `NaN` matches `NaN`. See the [ES6 spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
	     *    for more details.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to modify.
	     * @param {...*} [values] The values to remove.
	     * @returns {Array} Returns `array`.
	     * @example
	     *
	     * var array = [1, 2, 3, 1, 2, 3];
	     * _.pull(array, 2, 3);
	     * console.log(array);
	     * // => [1, 1]
	     */
	    function pull() {
	      var array = arguments[0];
	      if (!(array && array.length)) {
	        return array;
	      }
	      var index = 0,
	          indexOf = getIndexOf(),
	          length = arguments.length;

	      while (++index < length) {
	        var fromIndex = 0,
	            value = arguments[index];

	        while ((fromIndex = indexOf(array, value, fromIndex)) > -1) {
	          splice.call(array, fromIndex, 1);
	        }
	      }
	      return array;
	    }

	    /**
	     * Removes elements from `array` corresponding to the specified indexes and
	     * returns an array of the removed elements. Indexes may be specified as an
	     * array of indexes or as individual arguments.
	     *
	     * **Note:** Unlike `_.at`, this method mutates `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to modify.
	     * @param {...(number|number[])} [indexes] The indexes of elements to remove,
	     *  specified as individual indexes or arrays of indexes.
	     * @returns {Array} Returns the new array of removed elements.
	     * @example
	     *
	     * var array = [5, 10, 15, 20];
	     * var evens = _.pullAt(array, [1, 3]);
	     *
	     * console.log(array);
	     * // => [5, 15]
	     *
	     * console.log(evens);
	     * // => [10, 20]
	     */
	    function pullAt(array) {
	      return basePullAt(array || [], baseFlatten(arguments, false, false, 1));
	    }

	    /**
	     * Removes all elements from `array` that `predicate` returns truthy for
	     * and returns an array of the removed elements. The predicate is bound to
	     * `thisArg` and invoked with three arguments; (value, index, array).
	     *
	     * If a property name is provided for `predicate` the created "_.pluck" style
	     * callback returns the property value of the given element.
	     *
	     * If an object is provided for `predicate` the created "_.where" style callback
	     * returns `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * **Note:** Unlike `_.filter`, this method mutates `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to modify.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration. If a property name or object is provided it is used to
	     *  create a "_.pluck" or "_.where" style callback respectively.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the new array of removed elements.
	     * @example
	     *
	     * var array = [1, 2, 3, 4];
	     * var evens = _.remove(array, function(n) { return n % 2 == 0; });
	     *
	     * console.log(array);
	     * // => [1, 3]
	     *
	     * console.log(evens);
	     * // => [2, 4]
	     */
	    function remove(array, predicate, thisArg) {
	      var index = -1,
	          length = array ? array.length : 0,
	          result = [];

	      predicate = getCallback(predicate, thisArg, 3);
	      while (++index < length) {
	        var value = array[index];
	        if (predicate(value, index, array)) {
	          result.push(value);
	          splice.call(array, index--, 1);
	          length--;
	        }
	      }
	      return result;
	    }

	    /**
	     * Gets all but the first element of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @alias tail
	     * @category Array
	     * @param {Array} array The array to query.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.rest([1, 2, 3]);
	     * // => [2, 3]
	     */
	    function rest(array) {
	      return drop(array, 1);
	    }

	    /**
	     * Creates a slice of `array` from `start` up to, but not including, `end`.
	     *
	     * **Note:** This function is used instead of `Array#slice` to support node
	     * lists in IE < 9 and to ensure dense arrays are returned.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to slice.
	     * @param {number} [start=0] The start position.
	     * @param {number} [end=array.length] The end position.
	     * @returns {Array} Returns the slice of `array`.
	     */
	    function slice(array, start, end) {
	      var index = -1,
	          length = array ? array.length : 0,
	          endType = typeof end;

	      if (end && endType != 'number' && isIterateeCall(array, start, end)) {
	        start = 0;
	        end = length;
	      }
	      start = start == null ? 0 : (+start || 0);
	      if (start < 0) {
	        start = -start > length ? 0 : (length + start);
	      }
	      end = (endType == 'undefined' || end > length) ? length : (+end || 0);
	      if (end < 0) {
	        end += length;
	      }
	      if (end && end == length && !start) {
	        return baseSlice(array);
	      }
	      length = start > end ? 0 : (end - start);

	      var result = Array(length);
	      while (++index < length) {
	        result[index] = array[index + start];
	      }
	      return result;
	    }

	    /**
	     * Uses a binary search to determine the lowest index at which `value` should
	     * be inserted into `array` in order to maintain its sort order. If an iteratee
	     * function is provided it is invoked for `value` and each element of `array`
	     * to compute their sort ranking. The iteratee is bound to `thisArg` and
	     * invoked with one argument; (value).
	     *
	     * If a property name is provided for `iteratee` the created "_.pluck" style
	     * callback returns the property value of the given element.
	     *
	     * If an object is provided for `iteratee` the created "_.where" style callback
	     * returns `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration. If a property name or object is provided it is used to
	     *  create a "_.pluck" or "_.where" style callback respectively.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     * @example
	     *
	     * _.sortedIndex([30, 50], 40);
	     * // => 1
	     *
	     * _.sortedIndex([4, 4, 5, 5, 6, 6], 5);
	     * // => 2
	     *
	     * var dict = { 'data': { 'thirty': 30, 'forty': 40, 'fifty': 50 } };
	     *
	     * // using an iteratee function
	     * _.sortedIndex(['thirty', 'fifty'], 'forty', function(word) {
	     *   return this.data[word];
	     * }, dict);
	     * // => 1
	     *
	     * // using "_.pluck" callback shorthand
	     * _.sortedIndex([{ 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
	     * // => 1
	     */
	    function sortedIndex(array, value, iteratee, thisArg) {
	      iteratee = iteratee == null ? iteratee : getCallback(iteratee, thisArg, 1);
	      return binaryIndex(array, value, iteratee);
	    }

	    /**
	     * This method is like `_.sortedIndex` except that it returns the highest
	     * index at which `value` should be inserted into `array` in order to
	     * maintain its sort order.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration. If a property name or object is provided it is used to
	     *  create a "_.pluck" or "_.where" style callback respectively.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     * @example
	     *
	     * _.sortedLastIndex([4, 4, 5, 5, 6, 6], 5);
	     * // => 4
	     */
	    function sortedLastIndex(array, value, iteratee, thisArg) {
	      iteratee = iteratee == null ? iteratee : getCallback(iteratee, thisArg, 1);
	      return binaryIndex(array, value, iteratee, true);
	    }

	    /**
	     * Creates a slice of `array` with `n` elements taken from the beginning.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {number} [n=1] The number of elements to take.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.take([1, 2, 3], 1);
	     * // => [1]
	     *
	     * _.take([1, 2, 3], 2);
	     * // => [1, 2]
	     *
	     * _.take([1, 2, 3], 5);
	     * // => [1, 2, 3]
	     *
	     * _.take([1, 2, 3], 0);
	     * // => []
	     */
	    function take(array, n, guard) {
	      if (guard ? isIterateeCall(array, n, guard) : n == null) {
	        n = 1;
	      }
	      return slice(array, 0, n < 0 ? 0 : n);
	    }

	    /**
	     * Creates a slice of `array` with `n` elements taken from the end.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {number} [n=1] The number of elements to take.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.takeRight([1, 2, 3], 1);
	     * // => [3]
	     *
	     * _.takeRight([1, 2, 3], 2);
	     * // => [2, 3]
	     *
	     * _.takeRight([1, 2, 3], 5);
	     * // => [1, 2, 3]
	     *
	     * _.takeRight([1, 2, 3], 0);
	     * // => []
	     */
	    function takeRight(array, n, guard) {
	      if (guard ? isIterateeCall(array, n, guard) : n == null) {
	        n = 1;
	      }
	      n = array ? (array.length - (+n || 0)) : 0;
	      return slice(array, n < 0 ? 0 : n);
	    }

	    /**
	     * Creates a slice of `array` with elements taken from the end. Elements are
	     * taken until `predicate` returns falsey. The predicate is bound to `thisArg`
	     * and invoked with three arguments; (value, index, array).
	     *
	     * If a property name is provided for `predicate` the created "_.pluck" style
	     * callback returns the property value of the given element.
	     *
	     * If an object is provided for `predicate` the created "_.where" style callback
	     * returns `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per element.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.takeRightWhile([1, 2, 3], function(n) { return n > 1; });
	     * // => [2, 3]
	     *
	     * var users = [
	     *   { 'user': 'barney',  'status': 'busy', 'active': false },
	     *   { 'user': 'fred',    'status': 'busy', 'active': true },
	     *   { 'user': 'pebbles', 'status': 'away', 'active': true }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.pluck(_.takeRightWhile(users, 'active'), 'user');
	     * // => ['fred', 'pebbles']
	     *
	     * // using "_.where" callback shorthand
	     * _.pluck(_.takeRightWhile(users, { 'status': 'away' }), 'user');
	     * // => ['pebbles']
	     */
	    function takeRightWhile(array, predicate, thisArg) {
	      var length = array ? array.length : 0;

	      predicate = getCallback(predicate, thisArg, 3);
	      while (length-- && predicate(array[length], length, array)) {}
	      return slice(array, length + 1);
	    }

	    /**
	     * Creates a slice of `array` with elements taken from the beginning. Elements
	     * are taken until `predicate` returns falsey. The predicate is bound to
	     * `thisArg` and invoked with three arguments; (value, index, array).
	     *
	     * If a property name is provided for `predicate` the created "_.pluck" style
	     * callback returns the property value of the given element.
	     *
	     * If an object is provided for `predicate` the created "_.where" style callback
	     * returns `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per element.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.takeWhile([1, 2, 3], function(n) { return n < 3; });
	     * // => [1, 2]
	     *
	     * var users = [
	     *   { 'user': 'barney',  'status': 'busy', 'active': true },
	     *   { 'user': 'fred',    'status': 'busy', 'active': false },
	     *   { 'user': 'pebbles', 'status': 'away', 'active': true }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.pluck(_.takeWhile(users, 'active'), 'user');
	     * // => ['barney']
	     *
	     * // using "_.where" callback shorthand
	     * _.pluck(_.takeWhile(users, { 'status': 'busy' }), 'user');
	     * // => ['barney', 'fred']
	     */
	    function takeWhile(array, predicate, thisArg) {
	      var index = -1,
	          length = array ? array.length : 0;

	      predicate = getCallback(predicate, thisArg, 3);
	      while (++index < length && predicate(array[index], index, array)) {}
	      return slice(array, 0, index);
	    }

	    /**
	     * Creates an array of unique values, in order, of the provided arrays using
	     * `SameValueZero` for equality comparisons.
	     *
	     * **Note:** `SameValueZero` comparisons are like strict equality comparisons,
	     * e.g. `===`, except that `NaN` matches `NaN`. See the
	     * [ES6 spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
	     * for more details.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {...Array} [arrays] The arrays to inspect.
	     * @returns {Array} Returns the new array of combined values.
	     * @example
	     *
	     * _.union([1, 2, 3], [5, 2, 1, 4], [2, 1]);
	     * // => [1, 2, 3, 5, 4]
	     */
	    function union() {
	      return baseUniq(baseFlatten(arguments, false, true));
	    }

	    /**
	     * Creates a duplicate-value-free version of an array using `SameValueZero`
	     * for equality comparisons. Providing `true` for `isSorted` performs a faster
	     * search algorithm for sorted arrays. If an iteratee function is provided it
	     * is invoked for each value in the array to generate the criterion by which
	     * uniqueness is computed. The `iteratee` is bound to `thisArg` and invoked
	     * with three arguments; (value, index, array).
	     *
	     * If a property name is provided for `iteratee` the created "_.pluck" style
	     * callback returns the property value of the given element.
	     *
	     * If an object is provided for `iteratee` the created "_.where" style callback
	     * returns `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * **Note:** `SameValueZero` comparisons are like strict equality comparisons,
	     * e.g. `===`, except that `NaN` matches `NaN`. See the
	     * [ES6 spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
	     * for more details.
	     *
	     * @static
	     * @memberOf _
	     * @alias unique
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {boolean} [isSorted] Specify the array is sorted.
	     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
	     *  If a property name or object is provided it is used to create a "_.pluck"
	     *  or "_.where" style callback respectively.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array} Returns the new duplicate-value-free array.
	     * @example
	     *
	     * _.uniq([1, 2, 1]);
	     * // => [1, 2]
	     *
	     * // using `isSorted`
	     * _.uniq([1, 1, 2], true);
	     * // => [1, 2]
	     *
	     * // using an iteratee function
	     * _.uniq([1, 2.5, 1.5, 2], function(n) { return this.floor(n); }, Math);
	     * // => [1, 2.5]
	     *
	     * // using "_.pluck" callback shorthand
	     * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
	     * // => [{ 'x': 1 }, { 'x': 2 }]
	     */
	    function uniq(array, isSorted, iteratee, thisArg) {
	      var length = array ? array.length : 0;
	      if (!length) {
	        return [];
	      }
	      // Juggle arguments.
	      if (typeof isSorted != 'boolean' && isSorted != null) {
	        thisArg = iteratee;
	        iteratee = isIterateeCall(array, isSorted, thisArg) ? null : isSorted;
	        isSorted = false;
	      }
	      iteratee = iteratee == null
	        ? iteratee
	        : getCallback(iteratee, thisArg, 3);

	      return (isSorted && getIndexOf() == baseIndexOf)
	        ? sortedUniq(array, iteratee)
	        : baseUniq(array, iteratee);
	    }

	    /**
	     * This method is like `_.zip` except that it accepts an array of grouped
	     * elements and creates an array regrouping the elements to their pre `_.zip`
	     * configuration.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array of grouped elements to process.
	     * @returns {Array} Returns the new array of regrouped elements.
	     * @example
	     *
	     * var zipped = _.zip(['fred', 'barney'], [30, 40], [true, false]);
	     * // => [['fred', 30, true], ['barney', 40, false]]
	     *
	     * _.unzip(zipped);
	     * // => [['fred', 'barney'], [30, 40], [true, false]]
	     */
	    function unzip(array) {
	      var index = -1,
	          length = (array && array.length && arrayMax(arrayMap(array, getLength))) >>> 0,
	          result = Array(length);

	      while (++index < length) {
	        result[index] = arrayMap(array, baseProperty(index));
	      }
	      return result;
	    }

	    /**
	     * Creates an array excluding all provided values using `SameValueZero` for
	     * equality comparisons.
	     *
	     * **Note:** `SameValueZero` comparisons are like strict equality comparisons,
	     * e.g. `===`, except that `NaN` matches `NaN`. See the
	     * [ES6 spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
	     * for more details.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to filter.
	     * @param {...*} [values] The values to exclude.
	     * @returns {Array} Returns the new array of filtered values.
	     * @example
	     *
	     * _.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
	     * // => [2, 3, 4]
	     */
	    function without(array) {
	      return baseDifference(array, slice(arguments, 1));
	    }

	    /**
	     * Creates an array that is the symmetric difference of the provided arrays.
	     * See [Wikipedia](http://en.wikipedia.org/wiki/Symmetric_difference) for
	     * more details.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {...Array} [arrays] The arrays to inspect.
	     * @returns {Array} Returns the new array of values.
	     * @example
	     *
	     * _.xor([1, 2, 3], [5, 2, 1, 4]);
	     * // => [3, 5, 4]
	     *
	     * _.xor([1, 2, 5], [2, 3, 5], [3, 4, 5]);
	     * // => [1, 4, 5]
	     */
	    function xor() {
	      var index = -1,
	          length = arguments.length;

	      while (++index < length) {
	        var array = arguments[index];
	        if (isArray(array) || isArguments(array)) {
	          var result = result
	            ? baseDifference(result, array).concat(baseDifference(array, result))
	            : array;
	        }
	      }
	      return result ? baseUniq(result) : [];
	    }

	    /**
	     * Creates an array of grouped elements, the first of which contains the first
	     * elements of the given arrays, the second of which contains the second elements
	     * of the given arrays, and so on.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {...Array} [arrays] The arrays to process.
	     * @returns {Array} Returns the new array of grouped elements.
	     * @example
	     *
	     * _.zip(['fred', 'barney'], [30, 40], [true, false]);
	     * // => [['fred', 30, true], ['barney', 40, false]]
	     */
	    function zip() {
	      var length = arguments.length,
	          array = Array(length);

	      while (length--) {
	        array[length] = arguments[length];
	      }
	      return unzip(array);
	    }

	    /**
	     * Creates an object composed from arrays of property names and values. Provide
	     * either a single two dimensional array, e.g. `[[key1, value1], [key2, value2]]`
	     * or two arrays, one of property names and one of corresponding values.
	     *
	     * @static
	     * @memberOf _
	     * @alias object
	     * @category Array
	     * @param {Array} props The property names.
	     * @param {Array} [values=[]] The property values.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * _.zipObject(['fred', 'barney'], [30, 40]);
	     * // => { 'fred': 30, 'barney': 40 }
	     */
	    function zipObject(props, values) {
	      var index = -1,
	          length = props ? props.length : 0,
	          result = {};

	      if (!values && length && !isArray(props[0])) {
	        values = [];
	      }
	      while (++index < length) {
	        var key = props[index];
	        if (values) {
	          result[key] = values[index];
	        } else if (key) {
	          result[key[0]] = key[1];
	        }
	      }
	      return result;
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Creates a `lodash` object that wraps `value` with explicit method
	     * chaining enabled.
	     *
	     * @static
	     * @memberOf _
	     * @category Chain
	     * @param {*} value The value to wrap.
	     * @returns {Object} Returns the new `lodash` object.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'age': 36 },
	     *   { 'user': 'fred',    'age': 40 },
	     *   { 'user': 'pebbles', 'age': 1 }
	     * ];
	     *
	     * var youngest = _.chain(users)
	     *   .sortBy('age')
	     *   .map(function(chr) { return chr.user + ' is ' + chr.age; })
	     *   .first()
	     *   .value();
	     * // => 'pebbles is 1'
	     */
	    function chain(value) {
	      var result = lodash(value);
	      result.__chain__ = true;
	      return result;
	    }

	    /**
	     * This method invokes `interceptor` and returns `value`. The interceptor is
	     * bound to `thisArg` and invoked with one argument; (value). The purpose of
	     * this method is to "tap into" a method chain in order to perform operations
	     * on intermediate results within the chain.
	     *
	     * @static
	     * @memberOf _
	     * @category Chain
	     * @param {*} value The value to provide to `interceptor`.
	     * @param {Function} interceptor The function to invoke.
	     * @param {*} [thisArg] The `this` binding of `interceptor`.
	     * @returns {*} Returns `value`.
	     * @example
	     *
	     * _([1, 2, 3])
	     *  .tap(function(array) { array.pop(); })
	     *  .reverse()
	     *  .value();
	     * // => [2, 1]
	     */
	    function tap(value, interceptor, thisArg) {
	      interceptor.call(thisArg, value);
	      return value;
	    }

	    /**
	     * This method is like `_.tap` except that it returns the result of `interceptor`.
	     *
	     * @static
	     * @memberOf _
	     * @category Chain
	     * @param {*} value The value to provide to `interceptor`.
	     * @param {Function} interceptor The function to invoke.
	     * @param {*} [thisArg] The `this` binding of `interceptor`.
	     * @returns {*} Returns the result of `interceptor`.
	     * @example
	     *
	     * _([1, 2, 3])
	     *  .last()
	     *  .thru(function(value) { return [value]; })
	     *  .value();
	     * // => [3]
	     */
	    function thru(value, interceptor, thisArg) {
	      return interceptor.call(thisArg, value);
	    }

	    /**
	     * Enables explicit method chaining on the wrapper object.
	     *
	     * @name chain
	     * @memberOf _
	     * @category Chain
	     * @returns {*} Returns the `lodash` object.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 40 }
	     * ];
	     *
	     * // without explicit chaining
	     * _(users).first();
	     * // => { 'user': 'barney', 'age': 36 }
	     *
	     * // with explicit chaining
	     * _(users).chain()
	     *   .first()
	     *   .pick('user')
	     *   .value();
	     * // => { 'user': 'barney' }
	     */
	    function wrapperChain() {
	      return chain(this);
	    }

	    /**
	     * Reverses the wrapped array so the first element becomes the last, the
	     * second element becomes the second to last, and so on.
	     *
	     * **Note:** This method mutates the wrapped array.
	     *
	     * @name reverse
	     * @memberOf _
	     * @category Chain
	     * @returns {Object} Returns the new reversed `lodash` object.
	     * @example
	     *
	     * var array = [1, 2, 3];
	     *
	     * _(array).reverse().value()
	     * // => [3, 2, 1]
	     *
	     * console.log(array);
	     * // => [3, 2, 1]
	     */
	    function wrapperReverse() {
	      var value = this.__wrapped__;
	      if (value instanceof LazyWrapper) {
	        return new LodashWrapper(value.reverse());
	      }
	      return this.thru(function(value) {
	        return value.reverse();
	      });
	    }

	    /**
	     * Produces the result of coercing the unwrapped value to a string.
	     *
	     * @name toString
	     * @memberOf _
	     * @category Chain
	     * @returns {string} Returns the coerced string value.
	     * @example
	     *
	     * _([1, 2, 3]).toString();
	     * // => '1,2,3'
	     */
	    function wrapperToString() {
	      return String(this.value());
	    }

	    /**
	     * Executes the chained sequence to extract the unwrapped value.
	     *
	     * @name value
	     * @memberOf _
	     * @alias toJSON, valueOf
	     * @category Chain
	     * @returns {*} Returns the resolved unwrapped value.
	     * @example
	     *
	     * _([1, 2, 3]).value();
	     * // => [1, 2, 3]
	     */
	    function wrapperValue() {
	      return baseWrapperValue(this.__wrapped__, this.__actions__);
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Creates an array of elements corresponding to the specified keys, or indexes,
	     * of `collection`. Keys may be specified as individual arguments or as arrays
	     * of keys.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {...(number|number[]|string|string[])} [props] The property names
	     *  or indexes of elements to pick, specified individually or in arrays.
	     * @returns {Array} Returns the new array of picked elements.
	     * @example
	     *
	     * _.at(['a', 'b', 'c', 'd', 'e'], [0, 2, 4]);
	     * // => ['a', 'c', 'e']
	     *
	     * _.at(['fred', 'barney', 'pebbles'], 0, 2);
	     * // => ['fred', 'pebbles']
	     */
	    function at(collection) {
	      var length = collection ? collection.length : 0;
	      if (isLength(length)) {
	        collection = toIterable(collection);
	      }
	      return baseAt(collection, baseFlatten(arguments, false, false, 1));
	    }

	    /**
	     * Checks if `value` is in `collection` using `SameValueZero` for equality
	     * comparisons. If `fromIndex` is negative, it is used as the offset from
	     * the end of `collection`.
	     *
	     * **Note:** `SameValueZero` comparisons are like strict equality comparisons,
	     * e.g. `===`, except that `NaN` matches `NaN`. See the
	     * [ES6 spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
	     * for more details.
	     *
	     * @static
	     * @memberOf _
	     * @alias contains, include
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to search.
	     * @param {*} target The value to search for.
	     * @param {number} [fromIndex=0] The index to search from.
	     * @returns {boolean} Returns `true` if a matching element is found, else `false`.
	     * @example
	     *
	     * _.includes([1, 2, 3], 1);
	     * // => true
	     *
	     * _.includes([1, 2, 3], 1, 2);
	     * // => false
	     *
	     * _.includes({ 'user': 'fred', 'age': 40 }, 'fred');
	     * // => true
	     *
	     * _.includes('pebbles', 'eb');
	     * // => true
	     */
	    function includes(collection, target, fromIndex) {
	      var length = collection ? collection.length : 0;
	      if (!isLength(length)) {
	        collection = values(collection);
	        length = collection.length;
	      }
	      if (!length) {
	        return false;
	      }
	      if (typeof fromIndex == 'number') {
	        fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : (fromIndex || 0);
	      } else {
	        fromIndex = 0;
	      }
	      return (typeof collection == 'string' || !isArray(collection) && isString(collection))
	        ? (fromIndex < length && collection.indexOf(target, fromIndex) > -1)
	        : (getIndexOf(collection, target, fromIndex) > -1);
	    }

	    /**
	     * Creates an object composed of keys generated from the results of running
	     * each element of `collection` through `iteratee`. The corresponding value
	     * of each key is the number of times the key was returned by `iteratee`.
	     * The `iteratee` is bound to `thisArg` and invoked with three arguments;
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `iteratee` the created "_.pluck" style
	     * callback returns the property value of the given element.
	     *
	     * If an object is provided for `iteratee` the created "_.where" style callback
	     * returns `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration. If a property name or object is provided it is used to
	     *  create a "_.pluck" or "_.where" style callback respectively.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns the composed aggregate object.
	     * @example
	     *
	     * _.countBy([4.3, 6.1, 6.4], function(n) { return Math.floor(n); });
	     * // => { '4': 1, '6': 2 }
	     *
	     * _.countBy([4.3, 6.1, 6.4], function(n) { return this.floor(n); }, Math);
	     * // => { '4': 1, '6': 2 }
	     *
	     * _.countBy(['one', 'two', 'three'], 'length');
	     * // => { '3': 2, '5': 1 }
	     */
	    var countBy = createAggregator(function(result, value, key) {
	      hasOwnProperty.call(result, key) ? ++result[key] : (result[key] = 1);
	    });

	    /**
	     * Checks if `predicate` returns truthy for **all** elements of `collection`.
	     * The predicate is bound to `thisArg` and invoked with three arguments;
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `predicate` the created "_.pluck" style
	     * callback returns the property value of the given element.
	     *
	     * If an object is provided for `predicate` the created "_.where" style callback
	     * returns `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias all
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration. If a property name or object is provided it is used to
	     *  create a "_.pluck" or "_.where" style callback respectively.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {boolean} Returns `true` if all elements pass the predicate check,
	     *  else `false`.
	     * @example
	     *
	     * _.every([true, 1, null, 'yes']);
	     * // => false
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 40 }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.every(users, 'age');
	     * // => true
	     *
	     * // using "_.where" callback shorthand
	     * _.every(users, { 'age': 36 });
	     * // => false
	     */
	    function every(collection, predicate, thisArg) {
	      var func = isArray(collection) ? arrayEvery : baseEvery;
	      if (typeof predicate != 'function' || typeof thisArg != 'undefined') {
	        predicate = getCallback(predicate, thisArg, 3);
	      }
	      return func(collection, predicate);
	    }

	    /**
	     * Iterates over elements of `collection`, returning an array of all elements
	     * `predicate` returns truthy for. The predicate is bound to `thisArg` and
	     * invoked with three arguments; (value, index|key, collection).
	     *
	     * If a property name is provided for `predicate` the created "_.pluck" style
	     * callback returns the property value of the given element.
	     *
	     * If an object is provided for `predicate` the created "_.where" style callback
	     * returns `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias select
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration. If a property name or object is provided it is used to
	     *  create a "_.pluck" or "_.where" style callback respectively.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the new filtered array.
	     * @example
	     *
	     * var evens = _.filter([1, 2, 3, 4], function(n) { return n % 2 == 0; });
	     * // => [2, 4]
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'active': false },
	     *   { 'user': 'fred',   'age': 40, 'active': true }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.pluck(_.filter(users, 'active'), 'user');
	     * // => ['fred']
	     *
	     * // using "_.where" callback shorthand
	     * _.pluck(_.filter(users, { 'age': 36 }), 'user');
	     * // => ['barney']
	     */
	    function filter(collection, predicate, thisArg) {
	      var func = isArray(collection) ? arrayFilter : baseFilter;

	      predicate = getCallback(predicate, thisArg, 3);
	      return func(collection, predicate);
	    }

	    /**
	     * Iterates over elements of `collection`, returning the first element
	     * `predicate` returns truthy for. The predicate is bound to `thisArg` and
	     * invoked with three arguments; (value, index|key, collection).
	     *
	     * If a property name is provided for `predicate` the created "_.pluck" style
	     * callback returns the property value of the given element.
	     *
	     * If an object is provided for `predicate` the created "_.where" style callback
	     * returns `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias detect
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration. If a property name or object is provided it is used to
	     *  create a "_.pluck" or "_.where" style callback respectively.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {*} Returns the matched element, else `undefined`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'age': 36, 'active': false },
	     *   { 'user': 'fred',    'age': 40, 'active': true },
	     *   { 'user': 'pebbles', 'age': 1,  'active': false }
	     * ];
	     *
	     * _.result(_.find(users, function(chr) { return chr.age < 40; }), 'user');
	     * // => 'barney'
	     *
	     * // using "_.where" callback shorthand
	     * _.result(_.find(users, { 'age': 1 }), 'user');
	     * // => 'pebbles'
	     *
	     * // using "_.pluck" callback shorthand
	     * _.result(_.find(users, 'active'), 'user');
	     * // => 'fred'
	     */
	    function find(collection, predicate, thisArg) {
	      if (isArray(collection)) {
	        var index = findIndex(collection, predicate, thisArg);
	        return index > -1 ? collection[index] : undefined;
	      }
	      predicate = getCallback(predicate, thisArg, 3);
	      return baseFind(collection, predicate, baseEach);
	    }

	    /**
	     * This method is like `_.find` except that it iterates over elements of
	     * `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration. If a property name or object is provided it is used to
	     *  create a "_.pluck" or "_.where" style callback respectively.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {*} Returns the matched element, else `undefined`.
	     * @example
	     *
	     * _.findLast([1, 2, 3, 4], function(n) { return n % 2 == 1; });
	     * // => 3
	     */
	    function findLast(collection, predicate, thisArg) {
	      predicate = getCallback(predicate, thisArg, 3);
	      return baseFind(collection, predicate, baseEachRight);
	    }

	    /**
	     * Performs a deep comparison between each element in `collection` and the
	     * source object, returning the first element that has equivalent property
	     * values.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to search.
	     * @param {Object} source The object of property values to match.
	     * @returns {*} Returns the matched element, else `undefined`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'status': 'busy' },
	     *   { 'user': 'fred',   'age': 40, 'status': 'busy' }
	     * ];
	     *
	     * _.result(_.findWhere(users, { 'status': 'busy' }), 'user');
	     * // => 'barney'
	     *
	     * _.result(_.findWhere(users, { 'age': 40 }), 'user');
	     * // => 'fred'
	     */
	    function findWhere(collection, source) {
	      return find(collection, matches(source));
	    }

	    /**
	     * Iterates over elements of `collection` invoking `iteratee` for each element.
	     * The `iteratee` is bound to `thisArg` and invoked with three arguments;
	     * (value, index|key, collection). Iterator functions may exit iteration early
	     * by explicitly returning `false`.
	     *
	     * **Note:** As with other "Collections" methods, objects with a `length` property
	     * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
	     * may be used for object iteration.
	     *
	     * @static
	     * @memberOf _
	     * @alias each
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array|Object|string} Returns `collection`.
	     * @example
	     *
	     * _([1, 2, 3]).forEach(function(n) { console.log(n); });
	     * // => logs each value from left to right and returns the array
	     *
	     * _.forEach({ 'one': 1, 'two': 2, 'three': 3 }, function(n, key) { console.log(n, key); });
	     * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
	     */
	    function forEach(collection, iteratee, thisArg) {
	      return (typeof iteratee == 'function' && typeof thisArg == 'undefined' && isArray(collection))
	        ? arrayEach(collection, iteratee)
	        : baseEach(collection, bindCallback(iteratee, thisArg, 3));
	    }

	    /**
	     * This method is like `_.forEach` except that it iterates over elements of
	     * `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @alias eachRight
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array|Object|string} Returns `collection`.
	     * @example
	     *
	     * _([1, 2, 3]).forEachRight(function(n) { console.log(n); }).join(',');
	     * // => logs each value from right to left and returns the array
	     */
	    function forEachRight(collection, iteratee, thisArg) {
	      return (typeof iteratee == 'function' && typeof thisArg == 'undefined' && isArray(collection))
	        ? arrayEachRight(collection, iteratee)
	        : baseEachRight(collection, bindCallback(iteratee, thisArg, 3));
	    }

	    /**
	     * Creates an object composed of keys generated from the results of running
	     * each element of `collection` through `iteratee`. The corresponding value
	     * of each key is an array of the elements responsible for generating the key.
	     * The `iteratee` is bound to `thisArg` and invoked with three arguments;
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `iteratee` the created "_.pluck" style
	     * callback returns the property value of the given element.
	     *
	     * If an object is provided for `iteratee` the created "_.where" style callback
	     * returns `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration. If a property name or object is provided it is used to
	     *  create a "_.pluck" or "_.where" style callback respectively.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns the composed aggregate object.
	     * @example
	     *
	     * _.groupBy([4.2, 6.1, 6.4], function(n) { return Math.floor(n); });
	     * // => { '4': [4.2], '6': [6.1, 6.4] }
	     *
	     * _.groupBy([4.2, 6.1, 6.4], function(n) { return this.floor(n); }, Math);
	     * // => { '4': [4.2], '6': [6.1, 6.4] }
	     *
	     * // using "_.pluck" callback shorthand
	     * _.groupBy(['one', 'two', 'three'], 'length');
	     * // => { '3': ['one', 'two'], '5': ['three'] }
	     */
	    var groupBy = createAggregator(function(result, value, key) {
	      if (hasOwnProperty.call(result, key)) {
	        result[key].push(value);
	      } else {
	        result[key] = [value];
	      }
	    });

	    /**
	     * Creates an object composed of keys generated from the results of running
	     * each element of `collection` through `iteratee`. The corresponding value
	     * of each key is the last element responsible for generating the key. The
	     * iteratee function is bound to `thisArg` and invoked with three arguments;
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `iteratee` the created "_.pluck" style
	     * callback returns the property value of the given element.
	     *
	     * If an object is provided for `iteratee` the created "_.where" style callback
	     * returns `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration. If a property name or object is provided it is used to
	     *  create a "_.pluck" or "_.where" style callback respectively.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns the composed aggregate object.
	     * @example
	     *
	     * var keyData = [
	     *   { 'dir': 'left', 'code': 97 },
	     *   { 'dir': 'right', 'code': 100 }
	     * ];
	     *
	     * _.indexBy(keyData, 'dir');
	     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
	     *
	     * _.indexBy(keyData, function(object) { return String.fromCharCode(object.code); });
	     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
	     *
	     * _.indexBy(keyData, function(object) { return this.fromCharCode(object.code); }, String);
	     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
	     */
	    var indexBy = createAggregator(function(result, value, key) {
	      result[key] = value;
	    });

	    /**
	     * Invokes the method named by `methodName` on each element in `collection`,
	     * returning an array of the results of each invoked method. Any additional
	     * arguments are provided to each invoked method. If `methodName` is a function
	     * it is invoked for, and `this` bound to, each element in `collection`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|string} methodName The name of the method to invoke or
	     *  the function invoked per iteration.
	     * @param {...*} [args] The arguments to invoke the method with.
	     * @returns {Array} Returns the array of results.
	     * @example
	     *
	     * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
	     * // => [[1, 5, 7], [1, 2, 3]]
	     *
	     * _.invoke([123, 456], String.prototype.split, '');
	     * // => [['1', '2', '3'], ['4', '5', '6']]
	     */
	    function invoke(collection, methodName) {
	      return baseInvoke(collection, methodName, slice(arguments, 2));
	    }

	    /**
	     * Creates an array of values by running each element in `collection` through
	     * `iteratee`. The `iteratee` is bound to `thisArg` and invoked with three
	     * arguments; (value, index|key, collection).
	     *
	     * If a property name is provided for `iteratee` the created "_.pluck" style
	     * callback returns the property value of the given element.
	     *
	     * If an object is provided for `iteratee` the created "_.where" style callback
	     * returns `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias collect
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration. If a property name or object is provided it is used to
	     *  create a "_.pluck" or "_.where" style callback respectively.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array} Returns the new mapped array.
	     * @example
	     *
	     * _.map([1, 2, 3], function(n) { return n * 3; });
	     * // => [3, 6, 9]
	     *
	     * _.map({ 'one': 1, 'two': 2, 'three': 3 }, function(n) { return n * 3; });
	     * // => [3, 6, 9] (iteration order is not guaranteed)
	     *
	     * var users = [
	     *   { 'user': 'barney' },
	     *   { 'user': 'fred' }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.map(users, 'user');
	     * // => ['barney', 'fred']
	     */
	    function map(collection, iteratee, thisArg) {
	      iteratee = getCallback(iteratee, thisArg, 3);

	      var func = isArray(collection) ? arrayMap : baseMap;
	      return func(collection, iteratee);
	    }

	    /**
	     * Retrieves the maximum value of `collection`. If `collection` is empty or
	     * falsey `-Infinity` is returned. If an iteratee function is provided it is
	     * invoked for each value in `collection` to generate the criterion by which
	     * the value is ranked. The `iteratee` is bound to `thisArg` and invoked with
	     * three arguments; (value, index, collection).
	     *
	     * If a property name is provided for `iteratee` the created "_.pluck" style
	     * callback returns the property value of the given element.
	     *
	     * If an object is provided for `iteratee` the created "_.where" style callback
	     * returns `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
	     *  If a property name or object is provided it is used to create a "_.pluck"
	     *  or "_.where" style callback respectively.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {*} Returns the maximum value.
	     * @example
	     *
	     * _.max([4, 2, 8, 6]);
	     * // => 8
	     *
	     * _.max([]);
	     * // => -Infinity
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 40 }
	     * ];
	     *
	     * _.max(users, function(chr) { return chr.age; });
	     * // => { 'user': 'fred', 'age': 40 };
	     *
	     * // using "_.pluck" callback shorthand
	     * _.max(users, 'age');
	     * // => { 'user': 'fred', 'age': 40 };
	     */
	    function max(collection, iteratee, thisArg) {
	      if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
	        iteratee = null;
	      }
	      var noIteratee = iteratee == null,
	          isArr = noIteratee && isArray(collection),
	          isStr = !isArr && isString(collection);

	      if (noIteratee && !isStr) {
	        return arrayMax(isArr ? collection : toIterable(collection));
	      }
	      var computed = NEGATIVE_INFINITY,
	          result = computed;

	      iteratee = (noIteratee && isStr)
	        ? charAtCallback
	        : getCallback(iteratee, thisArg, 3);

	      baseEach(collection, function(value, index, collection) {
	        var current = iteratee(value, index, collection);
	        if (current > computed || (current === NEGATIVE_INFINITY && current === result)) {
	          computed = current;
	          result = value;
	        }
	      });
	      return result;
	    }

	    /**
	     * Retrieves the minimum value of `collection`. If `collection` is empty or
	     * falsey `Infinity` is returned. If an iteratee function is provided it is
	     * invoked for each value in `collection` to generate the criterion by which
	     * the value is ranked. The `iteratee` is bound to `thisArg` and invoked with
	     * three arguments; (value, index, collection).
	     *
	     * If a property name is provided for `iteratee` the created "_.pluck" style
	     * callback returns the property value of the given element.
	     *
	     * If an object is provided for `iteratee` the created "_.where" style callback
	     * returns `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
	     *  If a property name or object is provided it is used to create a "_.pluck"
	     *  or "_.where" style callback respectively.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {*} Returns the minimum value.
	     * @example
	     *
	     * _.min([4, 2, 8, 6]);
	     * // => 2
	     *
	     * _.min([]);
	     * // => Infinity
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 40 }
	     * ];
	     *
	     * _.min(users, function(chr) { return chr.age; });
	     * // => { 'user': 'barney', 'age': 36 };
	     *
	     * // using "_.pluck" callback shorthand
	     * _.min(users, 'age');
	     * // => { 'user': 'barney', 'age': 36 };
	     */
	    function min(collection, iteratee, thisArg) {
	      if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
	        iteratee = null;
	      }
	      var noIteratee = iteratee == null,
	          isArr = noIteratee && isArray(collection),
	          isStr = !isArr && isString(collection);

	      if (noIteratee && !isStr) {
	        return arrayMin(isArr ? collection : toIterable(collection));
	      }
	      var computed = POSITIVE_INFINITY,
	          result = computed;

	      iteratee = (noIteratee && isStr)
	        ? charAtCallback
	        : getCallback(iteratee, thisArg, 3);

	      baseEach(collection, function(value, index, collection) {
	        var current = iteratee(value, index, collection);
	        if (current < computed || (current === POSITIVE_INFINITY && current === result)) {
	          computed = current;
	          result = value;
	        }
	      });
	      return result;
	    }

	    /**
	     * Creates an array of elements split into two groups, the first of which
	     * contains elements `predicate` returns truthy for, while the second of which
	     * contains elements `predicate` returns falsey for. The predicate is bound
	     * to `thisArg` and invoked with three arguments; (value, index|key, collection).
	     *
	     * If a property name is provided for `predicate` the created "_.pluck" style
	     * callback returns the property value of the given element.
	     *
	     * If an object is provided for `predicate` the created "_.where" style callback
	     * returns `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration. If a property name or object is provided it is used to
	     *  create a "_.pluck" or "_.where" style callback respectively.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the array of grouped elements.
	     * @example
	     *
	     * _.partition([1, 2, 3], function(n) { return n % 2; });
	     * // => [[1, 3], [2]]
	     *
	     * _.partition([1.2, 2.3, 3.4], function(n) { return this.floor(n) % 2; }, Math);
	     * // => [[1, 3], [2]]
	     *
	     * var users = [
	     *   { 'user': 'barney',  'age': 36, 'active': false },
	     *   { 'user': 'fred',    'age': 40, 'active': true },
	     *   { 'user': 'pebbles', 'age': 1,  'active': false }
	     * ];
	     *
	     * // using "_.where" callback shorthand
	     * _.map(_.partition(users, { 'age': 1 }), function(array) { return _.pluck(array, 'user'); });
	     * // => [['pebbles'], ['barney', 'fred']]
	     *
	     * // using "_.pluck" callback shorthand
	     * _.map(_.partition(users, 'active'), function(array) { return _.pluck(array, 'user'); });
	     * // => [['fred'], ['barney', 'pebbles']]
	     */
	    var partition = createAggregator(function(result, value, key) {
	      result[key ? 0 : 1].push(value);
	    }, function() { return [[], []]; });

	    /**
	     * Retrieves the value of a specified property from all elements in `collection`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {string} key The name of the property to pluck.
	     * @returns {Array} Returns the property values.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 40 }
	     * ];
	     *
	     * _.pluck(users, 'user');
	     * // => ['barney', 'fred']
	     *
	     * var userIndex = _.indexBy(users, 'user');
	     * _.pluck(userIndex, 'age');
	     * // => [36, 40] (iteration order is not guaranteed)
	     */
	    function pluck(collection, key) {
	      return map(collection, property(key));
	    }

	    /**
	     * Reduces `collection` to a value which is the accumulated result of running
	     * each element in `collection` through `iteratee`, where each successive
	     * invocation is supplied the return value of the previous. If `accumulator`
	     * is not provided the first element of `collection` is used as the initial
	     * value. The `iteratee` is bound to `thisArg`and invoked with four arguments;
	     * (accumulator, value, index|key, collection).
	     *
	     * @static
	     * @memberOf _
	     * @alias foldl, inject
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [accumulator] The initial value.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {*} Returns the accumulated value.
	     * @example
	     *
	     * var sum = _.reduce([1, 2, 3], function(sum, n) { return sum + n; });
	     * // => 6
	     *
	     * var mapped = _.reduce({ 'a': 1, 'b': 2, 'c': 3 }, function(result, n, key) {
	     *   result[key] = n * 3;
	     *   return result;
	     * }, {});
	     * // => { 'a': 3, 'b': 6, 'c': 9 } (iteration order is not guaranteed)
	     */
	    function reduce(collection, iteratee, accumulator, thisArg) {
	      var func = isArray(collection) ? arrayReduce : baseReduce;
	      return func(collection, getCallback(iteratee, thisArg, 4), accumulator, arguments.length < 3, baseEach);
	    }

	    /**
	     * This method is like `_.reduce` except that it iterates over elements of
	     * `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @alias foldr
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [accumulator] The initial value.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {*} Returns the accumulated value.
	     * @example
	     *
	     * var array = [[0, 1], [2, 3], [4, 5]];
	     * _.reduceRight(array, function(flattened, other) { return flattened.concat(other); }, []);
	     * // => [4, 5, 2, 3, 0, 1]
	     */
	    function reduceRight(collection, iteratee, accumulator, thisArg) {
	      var func = isArray(collection) ? arrayReduceRight : baseReduce;
	      return func(collection, getCallback(iteratee, thisArg, 4), accumulator, arguments.length < 3, baseEachRight);
	    }

	    /**
	     * The opposite of `_.filter`; this method returns the elements of `collection`
	     * that `predicate` does **not** return truthy for.
	     *
	     * If a property name is provided for `predicate` the created "_.pluck" style
	     * callback returns the property value of the given element.
	     *
	     * If an object is provided for `predicate` the created "_.where" style callback
	     * returns `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration. If a property name or object is provided it is used to
	     *  create a "_.pluck" or "_.where" style callback respectively.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the new filtered array.
	     * @example
	     *
	     * var odds = _.reject([1, 2, 3, 4], function(n) { return n % 2 == 0; });
	     * // => [1, 3]
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'active': false },
	     *   { 'user': 'fred',   'age': 40, 'active': true }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.pluck(_.reject(users, 'active'), 'user');
	     * // => ['barney']
	     *
	     * // using "_.where" callback shorthand
	     * _.pluck(_.reject(users, { 'age': 36 }), 'user');
	     * // => ['fred']
	     */
	    function reject(collection, predicate, thisArg) {
	      var func = isArray(collection) ? arrayFilter : baseFilter;

	      predicate = getCallback(predicate, thisArg, 3);
	      return func(collection, function(value, index, collection) {
	        return !predicate(value, index, collection);
	      });
	    }

	    /**
	     * Retrieves a random element or `n` random elements from a collection.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to sample.
	     * @param {number} [n] The number of elements to sample.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {*} Returns the random sample(s).
	     * @example
	     *
	     * _.sample([1, 2, 3, 4]);
	     * // => 2
	     *
	     * _.sample([1, 2, 3, 4], 2);
	     * // => [3, 1]
	     */
	    function sample(collection, n, guard) {
	      if (guard ? isIterateeCall(collection, n, guard) : n == null) {
	        collection = toIterable(collection);
	        var length = collection.length;
	        return length > 0 ? collection[baseRandom(0, length - 1)] : undefined;
	      }
	      var result = shuffle(collection);
	      result.length = nativeMin(n < 0 ? 0 : (+n || 0), result.length);
	      return result;
	    }

	    /**
	     * Creates an array of shuffled values, using a version of the Fisher-Yates
	     * shuffle. See [Wikipedia](http://en.wikipedia.org/wiki/Fisher-Yates_shuffle)
	     * for more details.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to shuffle.
	     * @returns {Array} Returns the new shuffled array.
	     * @example
	     *
	     * _.shuffle([1, 2, 3, 4]);
	     * // => [4, 1, 3, 2]
	     */
	    function shuffle(collection) {
	      collection = toIterable(collection);

	      var index = -1,
	          length = collection.length,
	          result = Array(length);

	      while (++index < length) {
	        var rand = baseRandom(0, index);
	        if (index != rand) {
	          result[index] = result[rand];
	        }
	        result[rand] = collection[index];
	      }
	      return result;
	    }

	    /**
	     * Gets the size of `collection` by returning `collection.length` for
	     * array-like values or the number of own enumerable properties for objects.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to inspect.
	     * @returns {number} Returns `collection.length` or number of own enumerable properties.
	     * @example
	     *
	     * _.size([1, 2]);
	     * // => 2
	     *
	     * _.size({ 'one': 1, 'two': 2, 'three': 3 });
	     * // => 3
	     *
	     * _.size('pebbles');
	     * // => 7
	     */
	    function size(collection) {
	      var length = collection ? collection.length : 0;
	      return isLength(length) ? length : keys(collection).length;
	    }

	    /**
	     * Checks if `predicate` returns truthy for **any** element of `collection`.
	     * The function returns as soon as it finds a passing value and does not iterate
	     * over the entire collection. The predicate is bound to `thisArg` and invoked
	     * with three arguments; (value, index|key, collection).
	     *
	     * If a property name is provided for `predicate` the created "_.pluck" style
	     * callback returns the property value of the given element.
	     *
	     * If an object is provided for `predicate` the created "_.where" style callback
	     * returns `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias any
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration. If a property name or object is provided it is used to
	     *  create a "_.pluck" or "_.where" style callback respectively.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {boolean} Returns `true` if any element passes the predicate check,
	     *  else `false`.
	     * @example
	     *
	     * _.some([null, 0, 'yes', false], Boolean);
	     * // => true
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'active': false },
	     *   { 'user': 'fred',   'age': 40, 'active': true }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.some(users, 'active');
	     * // => true
	     *
	     * // using "_.where" callback shorthand
	     * _.some(users, { 'age': 1 });
	     * // => false
	     */
	    function some(collection, predicate, thisArg) {
	      var func = isArray(collection) ? arraySome : baseSome;
	      if (typeof predicate != 'function' || typeof thisArg != 'undefined') {
	        predicate = getCallback(predicate, thisArg, 3);
	      }
	      return func(collection, predicate);
	    }

	    /**
	     * Creates an array of elements, sorted in ascending order by the results of
	     * running each element in a collection through `iteratee`. This method performs
	     * a stable sort, that is, it preserves the original sort order of equal elements.
	     * The `iteratee` is bound to `thisArg` and invoked with three arguments;
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `iteratee` the created "_.pluck" style
	     * callback returns the property value of the given element.
	     *
	     * If an object is provided for `iteratee` the created "_.where" style callback
	     * returns `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Array|Function|Object|string} [iteratee=_.identity] The function
	     *  invoked per iteration. If a property name or an object is provided it is
	     *  used to create a "_.pluck" or "_.where" style callback respectively.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array} Returns the new sorted array.
	     * @example
	     *
	     * _.sortBy([1, 2, 3], function(n) { return Math.sin(n); });
	     * // => [3, 1, 2]
	     *
	     * _.sortBy([1, 2, 3], function(n) { return this.sin(n); }, Math);
	     * // => [3, 1, 2]
	     *
	     * var users = [
	     *   { 'user': 'fred' },
	     *   { 'user': 'pebbles' },
	     *   { 'user': 'barney' }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.pluck(_.sortBy(users, 'user'), 'user');
	     * // => ['barney', 'fred', 'pebbles']
	     */
	    function sortBy(collection, iteratee, thisArg) {
	      if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
	        iteratee = null;
	      }
	      iteratee = getCallback(iteratee, thisArg, 3);

	      var index = -1,
	          length = collection ? collection.length : 0,
	          result = isLength(length) ? Array(length) : [];

	      baseEach(collection, function(value, key, collection) {
	        result[++index] = { 'criteria': iteratee(value, key, collection), 'index': index, 'value': value };
	      });
	      return baseSortBy(result, compareAscending);
	    }

	    /**
	     * This method is like `_.sortBy` except that it sorts by property names
	     * instead of an iteratee function.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {...(string|string[])} props The property names to sort by,
	     *  specified as individual property names or arrays of property names.
	     * @returns {Array} Returns the new sorted array.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 40 },
	     *   { 'user': 'barney', 'age': 26 },
	     *   { 'user': 'fred',   'age': 30 }
	     * ];
	     *
	     * _.map(_.sortByAll(users, ['user', 'age']), _.values);
	     * // => [['barney', 26], ['barney', 36], ['fred', 30], ['fred', 40]]
	     */
	    function sortByAll(collection) {
	      var args = arguments;
	      if (args.length == 4 && isIterateeCall(args[1], args[2], args[3])) {
	        args = [collection, args[1]];
	      }
	      var index = -1,
	          length = collection ? collection.length : 0,
	          props = baseFlatten(args, false, false, 1),
	          result = isLength(length) ? Array(length) : [];

	      baseEach(collection, function(value, key, collection) {
	        var length = props.length,
	            criteria = Array(length);

	        while (length--) {
	          criteria[length] = value == null ? undefined : value[props[length]];
	        }
	        result[++index] = { 'criteria': criteria, 'index': index, 'value': value };
	      });
	      return baseSortBy(result, compareMultipleAscending);
	    }

	    /**
	     * Converts `collection` to an array.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to convert.
	     * @returns {Array} Returns the new converted array.
	     * @example
	     *
	     * (function() { return _.toArray(arguments).slice(1); })(1, 2, 3, 4);
	     * // => [2, 3, 4]
	     */
	    function toArray(collection) {
	      var length = collection ? collection.length : 0;
	      if (!isLength(length)) {
	        return values(collection);
	      }
	      if (!length) {
	        return [];
	      }
	      return (lodash.support.unindexedChars && isString(collection))
	        ? collection.split('')
	        : baseSlice(collection);
	    }

	    /**
	     * Performs a deep comparison between each element in `collection` and the
	     * source object, returning an array of all elements that have equivalent
	     * property values.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to search.
	     * @param {Object} source The object of property values to match.
	     * @returns {Array} Returns the new filtered array.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'status': 'busy', 'pets': ['hoppy'] },
	     *   { 'user': 'fred',   'age': 40, 'status': 'busy', 'pets': ['baby puss', 'dino'] }
	     * ];
	     *
	     * _.pluck(_.where(users, { 'age': 36 }), 'user');
	     * // => ['barney']
	     *
	     * _.pluck(_.where(users, { 'pets': ['dino'] }), 'user');
	     * // => ['fred']
	     *
	     * _.pluck(_.where(users, { 'status': 'busy' }), 'user');
	     * // => ['barney', 'fred']
	     */
	    function where(collection, source) {
	      return filter(collection, matches(source));
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Gets the number of milliseconds that have elapsed since the Unix epoch
	     * (1 January 1970 00:00:00 UTC).
	     *
	     * @static
	     * @memberOf _
	     * @category Date
	     * @example
	     *
	     * _.defer(function(stamp) { console.log(_.now() - stamp); }, _.now());
	     * // => logs the number of milliseconds it took for the deferred function to be invoked
	     */
	    var now = nativeNow || function() {
	      return new Date().getTime();
	    };

	    /*------------------------------------------------------------------------*/

	    /**
	     * The opposite of `_.before`; this method creates a function that invokes
	     * `func` once it is called `n` or more times.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {number} n The number of calls before `func` is invoked.
	     * @param {Function} func The function to restrict.
	     * @returns {Function} Returns the new restricted function.
	     * @example
	     *
	     * var saves = ['profile', 'settings'];
	     *
	     * var done = _.after(saves.length, function() {
	     *   console.log('done saving!');
	     * });
	     *
	     * _.forEach(saves, function(type) {
	     *   asyncSave({ 'type': type, 'complete': done });
	     * });
	     * // => logs 'done saving!' after the two async saves have completed
	     */
	    function after(n, func) {
	      if (!isFunction(func)) {
	        if (isFunction(n)) {
	          var temp = n;
	          n = func;
	          func = temp;
	        } else {
	          throw new TypeError(FUNC_ERROR_TEXT);
	        }
	      }
	      n = nativeIsFinite(n = +n) ? n : 0;
	      return function() {
	        if (--n < 1) {
	          return func.apply(this, arguments);
	        }
	      };
	    }

	    /**
	     * Creates a function that accepts up to `n` arguments ignoring any
	     * additional arguments.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to cap arguments for.
	     * @param {number} [n=func.length] The arity cap.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * _.map(['6', '8', '10'], _.ary(parseInt, 1));
	     * // => [6, 8, 10]
	     */
	    function ary(func, n, guard) {
	      if (guard && isIterateeCall(func, n, guard)) {
	        n = null;
	      }
	      n = n == null ? func.length : (+n || 0);
	      return createWrapper(func, ARY_FLAG, null, null, null, null, n);
	    }

	    /**
	     * Creates a function that invokes `func`, with the `this` binding and arguments
	     * of the created function, while it is called less than `n` times. Subsequent
	     * calls to the created function return the result of the last `func` invocation.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {number} n The number of calls at which `func` is no longer invoked.
	     * @param {Function} func The function to restrict.
	     * @returns {Function} Returns the new restricted function.
	     * @example
	     *
	     * jQuery('#add').on('click', _.before(5, addContactToList));
	     * // => allows adding up to 4 contacts to the list
	     */
	    function before(n, func) {
	      var result;
	      if (!isFunction(func)) {
	        if (isFunction(n)) {
	          var temp = n;
	          n = func;
	          func = temp;
	        } else {
	          throw new TypeError(FUNC_ERROR_TEXT);
	        }
	      }
	      return function() {
	        if (--n > 0) {
	          result = func.apply(this, arguments);
	        } else {
	          func = null;
	        }
	        return result;
	      };
	    }

	    /**
	     * Creates a function that invokes `func` with the `this` binding of `thisArg`
	     * and prepends any additional `_.bind` arguments to those provided to the
	     * bound function.
	     *
	     * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
	     * may be used as a placeholder for partially applied arguments.
	     *
	     * **Note:** Unlike native `Function#bind` this method does not set the `length`
	     * property of bound functions.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to bind.
	     * @param {*} thisArg The `this` binding of `func`.
	     * @param {...*} [args] The arguments to be partially applied.
	     * @returns {Function} Returns the new bound function.
	     * @example
	     *
	     * var greet = function(greeting, punctuation) {
	     *   return greeting + ' ' + this.user + punctuation;
	     * };
	     *
	     * var object = { 'user': 'fred' };
	     *
	     * var bound = _.bind(greet, object, 'hi');
	     * bound('!');
	     * // => 'hi fred!'
	     *
	     * // using placeholders
	     * var bound = _.bind(greet, object, _, '!');
	     * bound('hi');
	     * // => 'hi fred!'
	     */
	    function bind(func, thisArg) {
	      var bitmask = BIND_FLAG;
	      if (arguments.length > 2) {
	        var partials = slice(arguments, 2),
	            holders = replaceHolders(partials, bind.placeholder);

	        bitmask |= PARTIAL_FLAG;
	      }
	      return createWrapper(func, bitmask, thisArg, partials, holders);
	    }

	    /**
	     * Binds methods of an object to the object itself, overwriting the existing
	     * method. Method names may be specified as individual arguments or as arrays
	     * of method names. If no method names are provided all enumerable function
	     * properties, own and inherited, of `object` are bound.
	     *
	     * **Note:** This method does not set the `length` property of bound functions.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Object} object The object to bind and assign the bound methods to.
	     * @param {...(string|string[])} [methodNames] The object method names to bind,
	     *  specified as individual method names or arrays of method names.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * var view = {
	     *   'label': 'docs',
	     *   'onClick': function() { console.log('clicked ' + this.label); }
	     * };
	     *
	     * _.bindAll(view);
	     * jQuery('#docs').on('click', view.onClick);
	     * // => logs 'clicked docs' when the element is clicked
	     */
	    function bindAll(object) {
	      return baseBindAll(object,
	        arguments.length > 1
	          ? baseFlatten(arguments, false, false, 1)
	          : functions(object)
	      );
	    }

	    /**
	     * Creates a function that invokes the method at `object[key]` and prepends
	     * any additional `_.bindKey` arguments to those provided to the bound function.
	     *
	     * This method differs from `_.bind` by allowing bound functions to reference
	     * methods that may be redefined or don't yet exist.
	     * See [Peter Michaux's article](http://michaux.ca/articles/lazy-function-definition-pattern)
	     * for more details.
	     *
	     * The `_.bindKey.placeholder` value, which defaults to `_` in monolithic
	     * builds, may be used as a placeholder for partially applied arguments.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Object} object The object the method belongs to.
	     * @param {string} key The key of the method.
	     * @param {...*} [args] The arguments to be partially applied.
	     * @returns {Function} Returns the new bound function.
	     * @example
	     *
	     * var object = {
	     *   'user': 'fred',
	     *   'greet': function(greeting, punctuation) {
	     *     return greeting + ' ' + this.user + punctuation;
	     *   }
	     * };
	     *
	     * var bound = _.bindKey(object, 'greet', 'hi');
	     * bound('!');
	     * // => 'hi fred!'
	     *
	     * object.greet = function(greeting, punctuation) {
	     *   return greeting + 'ya ' + this.user + punctuation;
	     * };
	     *
	     * bound('!');
	     * // => 'hiya fred!'
	     *
	     * // using placeholders
	     * var bound = _.bindKey(object, 'greet', _, '!');
	     * bound('hi');
	     * // => 'hiya fred!'
	     */
	    function bindKey(object, key) {
	      var bitmask = BIND_FLAG | BIND_KEY_FLAG;
	      if (arguments.length > 2) {
	        var partials = slice(arguments, 2),
	            holders = replaceHolders(partials, bindKey.placeholder);

	        bitmask |= PARTIAL_FLAG;
	      }
	      return createWrapper(key, bitmask, object, partials, holders);
	    }

	    /**
	     * Creates a function that accepts one or more arguments of `func` that when
	     * called either invokes `func` returning its result, if all `func` arguments
	     * have been provided, or returns a function that accepts one or more of the
	     * remaining `func` arguments, and so on. The arity of `func` can be specified
	     * if `func.length` is not sufficient.
	     *
	     * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
	     * may be used as a placeholder for provided arguments.
	     *
	     * **Note:** This method does not set the `length` property of curried functions.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to curry.
	     * @param {number} [arity=func.length] The arity of `func`.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Function} Returns the new curried function.
	     * @example
	     *
	     * var abc = function(a, b, c) {
	     *   return [a, b, c];
	     * };
	     *
	     * var curried = _.curry(abc);
	     *
	     * curried(1)(2)(3);
	     * // => [1, 2, 3]
	     *
	     * curried(1, 2)(3);
	     * // => [1, 2, 3]
	     *
	     * curried(1, 2, 3);
	     * // => [1, 2, 3]
	     *
	     * // using placeholders
	     * curried(1)(_, 3)(2);
	     * // => [1, 2, 3]
	     */
	    function curry(func, arity, guard) {
	      if (guard && isIterateeCall(func, arity, guard)) {
	        arity = null;
	      }
	      var result = createWrapper(func, CURRY_FLAG, null, null, null, null, null, arity);
	      result.placeholder = curry.placeholder;
	      return result;
	    }

	    /**
	     * This method is like `_.curry` except that arguments are applied to `func`
	     * in the manner of `_.partialRight` instead of `_.partial`.
	     *
	     * The `_.curryRight.placeholder` value, which defaults to `_` in monolithic
	     * builds, may be used as a placeholder for provided arguments.
	     *
	     * **Note:** This method does not set the `length` property of curried functions.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to curry.
	     * @param {number} [arity=func.length] The arity of `func`.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Function} Returns the new curried function.
	     * @example
	     *
	     * var abc = function(a, b, c) {
	     *   return [a, b, c];
	     * };
	     *
	     * var curried = _.curryRight(abc);
	     *
	     * curried(3)(2)(1);
	     * // => [1, 2, 3]
	     *
	     * curried(2, 3)(1);
	     * // => [1, 2, 3]
	     *
	     * curried(1, 2, 3);
	     * // => [1, 2, 3]
	     *
	     * // using placeholders
	     * curried(3)(1, _)(2);
	     * // => [1, 2, 3]
	     */
	    function curryRight(func, arity, guard) {
	      if (guard && isIterateeCall(func, arity, guard)) {
	        arity = null;
	      }
	      var result = createWrapper(func, CURRY_RIGHT_FLAG, null, null, null, null, null, arity);
	      result.placeholder = curryRight.placeholder;
	      return result;
	    }

	    /**
	     * Creates a function that delays invoking `func` until after `wait` milliseconds
	     * have elapsed since the last time it was invoked. The created function comes
	     * with a `cancel` method to cancel delayed invocations. Provide an options
	     * object to indicate that `func` should be invoked on the leading and/or
	     * trailing edge of the `wait` timeout. Subsequent calls to the debounced
	     * function return the result of the last `func` invocation.
	     *
	     * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
	     * on the trailing edge of the timeout only if the the debounced function is
	     * invoked more than once during the `wait` timeout.
	     *
	     * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
	     * for details over the differences between `_.debounce` and `_.throttle`.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to debounce.
	     * @param {number} wait The number of milliseconds to delay.
	     * @param {Object} [options] The options object.
	     * @param {boolean} [options.leading=false] Specify invoking on the leading
	     *  edge of the timeout.
	     * @param {number} [options.maxWait] The maximum time `func` is allowed to be
	     *  delayed before it is invoked.
	     * @param {boolean} [options.trailing=true] Specify invoking on the trailing
	     *  edge of the timeout.
	     * @returns {Function} Returns the new debounced function.
	     * @example
	     *
	     * // avoid costly calculations while the window size is in flux
	     * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	     *
	     * // invoke `sendMail` when the click event is fired, debouncing subsequent calls
	     * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
	     *   'leading': true,
	     *   'trailing': false
	     * });
	     *
	     * // ensure `batchLog` is invoked once after 1 second of debounced calls
	     * var source = new EventSource('/stream');
	     * jQuery(source).on('message', _.debounce(batchLog, 250, {
	     *   'maxWait': 1000
	     * }, false);
	     *
	     * // cancel a debounced call
	     * var todoChanges = _.debounce(batchLog, 1000);
	     * Object.observe(models.todo, todoChanges);
	     *
	     * Object.observe(models, function(changes) {
	     *   if (_.find(changes, { 'user': 'todo', 'type': 'delete'})) {
	     *     todoChanges.cancel();
	     *   }
	     * }, ['delete']);
	     *
	     * // ...at some point `models.todo` is changed
	     * models.todo.completed = true;
	     *
	     * // ...before 1 second has passed `models.todo` is deleted
	     * // which cancels the debounced `todoChanges` call
	     * delete models.todo;
	     */
	    function debounce(func, wait, options) {
	      var args,
	          maxTimeoutId,
	          result,
	          stamp,
	          thisArg,
	          timeoutId,
	          trailingCall,
	          lastCalled = 0,
	          maxWait = false,
	          trailing = true;

	      if (!isFunction(func)) {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      wait = wait < 0 ? 0 : wait;
	      if (options === true) {
	        var leading = true;
	        trailing = false;
	      } else if (isObject(options)) {
	        leading = options.leading;
	        maxWait = 'maxWait' in options && nativeMax(+options.maxWait || 0, wait);
	        trailing = 'trailing' in options ? options.trailing : trailing;
	      }

	      function cancel() {
	        if (timeoutId) {
	          clearTimeout(timeoutId);
	        }
	        if (maxTimeoutId) {
	          clearTimeout(maxTimeoutId);
	        }
	        maxTimeoutId = timeoutId = trailingCall = undefined;
	      }

	      function delayed() {
	        var remaining = wait - (now() - stamp);
	        if (remaining <= 0 || remaining > wait) {
	          if (maxTimeoutId) {
	            clearTimeout(maxTimeoutId);
	          }
	          var isCalled = trailingCall;
	          maxTimeoutId = timeoutId = trailingCall = undefined;
	          if (isCalled) {
	            lastCalled = now();
	            result = func.apply(thisArg, args);
	            if (!timeoutId && !maxTimeoutId) {
	              args = thisArg = null;
	            }
	          }
	        } else {
	          timeoutId = setTimeout(delayed, remaining);
	        }
	      }

	      function maxDelayed() {
	        if (timeoutId) {
	          clearTimeout(timeoutId);
	        }
	        maxTimeoutId = timeoutId = trailingCall = undefined;
	        if (trailing || (maxWait !== wait)) {
	          lastCalled = now();
	          result = func.apply(thisArg, args);
	          if (!timeoutId && !maxTimeoutId) {
	            args = thisArg = null;
	          }
	        }
	      }

	      function debounced() {
	        args = arguments;
	        stamp = now();
	        thisArg = this;
	        trailingCall = trailing && (timeoutId || !leading);

	        if (maxWait === false) {
	          var leadingCall = leading && !timeoutId;
	        } else {
	          if (!maxTimeoutId && !leading) {
	            lastCalled = stamp;
	          }
	          var remaining = maxWait - (stamp - lastCalled),
	              isCalled = remaining <= 0 || remaining > maxWait;

	          if (isCalled) {
	            if (maxTimeoutId) {
	              maxTimeoutId = clearTimeout(maxTimeoutId);
	            }
	            lastCalled = stamp;
	            result = func.apply(thisArg, args);
	          }
	          else if (!maxTimeoutId) {
	            maxTimeoutId = setTimeout(maxDelayed, remaining);
	          }
	        }
	        if (isCalled && timeoutId) {
	          timeoutId = clearTimeout(timeoutId);
	        }
	        else if (!timeoutId && wait !== maxWait) {
	          timeoutId = setTimeout(delayed, wait);
	        }
	        if (leadingCall) {
	          isCalled = true;
	          result = func.apply(thisArg, args);
	        }
	        if (isCalled && !timeoutId && !maxTimeoutId) {
	          args = thisArg = null;
	        }
	        return result;
	      }
	      debounced.cancel = cancel;
	      return debounced;
	    }

	    /**
	     * Defers invoking the `func` until the current call stack has cleared. Any
	     * additional arguments are provided to `func` when it is invoked.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to defer.
	     * @param {...*} [args] The arguments to invoke the function with.
	     * @returns {number} Returns the timer id.
	     * @example
	     *
	     * _.defer(function(text) { console.log(text); }, 'deferred');
	     * // logs 'deferred' after one or more milliseconds
	     */
	    function defer(func) {
	      return baseDelay(func, 1, arguments, 1);
	    }

	    /**
	     * Invokes `func` after `wait` milliseconds. Any additional arguments are
	     * provided to `func` when it is invoked.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to delay.
	     * @param {number} wait The number of milliseconds to delay invocation.
	     * @param {...*} [args] The arguments to invoke the function with.
	     * @returns {number} Returns the timer id.
	     * @example
	     *
	     * _.delay(function(text) { console.log(text); }, 1000, 'later');
	     * // => logs 'later' after one second
	     */
	    function delay(func, wait) {
	      return baseDelay(func, wait, arguments, 2);
	    }

	    /**
	     * Creates a function that returns the result of invoking the provided
	     * functions with the `this` binding of the created function, where each
	     * successive invocation is supplied the return value of the previous.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {...Function} [funcs] Functions to invoke.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * function add(x, y) {
	     *   return x + y;
	     * }
	     *
	     * function square(n) {
	     *   return n * n;
	     * }
	     *
	     * var addSquare = _.flow(add, square);
	     * addSquare(1, 2);
	     * // => 9
	     */
	    function flow() {
	      var funcs = arguments,
	          length = funcs.length;

	      if (!length) {
	        return function() {};
	      }
	      if (!arrayEvery(funcs, isFunction)) {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      return function() {
	        var index = 0,
	            result = funcs[index].apply(this, arguments);

	        while (++index < length) {
	          result = funcs[index].call(this, result);
	        }
	        return result;
	      };
	    }

	    /**
	     * This method is like `_.flow` except that it creates a function that
	     * invokes the provided functions from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @alias backflow, compose
	     * @category Function
	     * @param {...Function} [funcs] Functions to invoke.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * function add(x, y) {
	     *   return x + y;
	     * }
	     *
	     * function square(n) {
	     *   return n * n;
	     * }
	     *
	     * var addSquare = _.flowRight(square, add);
	     * addSquare(1, 2);
	     * // => 9
	     */
	    function flowRight() {
	      var funcs = arguments,
	          fromIndex = funcs.length - 1;

	      if (fromIndex < 0) {
	        return function() {};
	      }
	      if (!arrayEvery(funcs, isFunction)) {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      return function() {
	        var index = fromIndex,
	            result = funcs[index].apply(this, arguments);

	        while (index--) {
	          result = funcs[index].call(this, result);
	        }
	        return result;
	      };
	    }

	    /**
	     * Creates a function that memoizes the result of `func`. If `resolver` is
	     * provided it determines the cache key for storing the result based on the
	     * arguments provided to the memoized function. By default, the first argument
	     * provided to the memoized function is coerced to a string and used as the
	     * cache key. The `func` is invoked with the `this` binding of the memoized
	     * function.
	     *
	     * **Note:** The cache is exposed as the `cache` property on the memoized
	     * function. Its creation may be customized by replacing the `_.memoize.Cache`
	     * constructor with one whose instances implement the ES6 `Map` method interface
	     * of `get`, `has`, and `set`. See the
	     * [ES6 spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-properties-of-the-map-prototype-object)
	     * for more details.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to have its output memoized.
	     * @param {Function} [resolver] The function to resolve the cache key.
	     * @returns {Function} Returns the new memoizing function.
	     * @example
	     *
	     * var fibonacci = _.memoize(function(n) {
	     *   return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
	     * });
	     *
	     * fibonacci(9)
	     * // => 34
	     *
	     * // modifying the result cache
	     * var upperCase = _.memoize(function(string) {
	     *   return string.toUpperCase();
	     * });
	     *
	     * upperCase('fred');
	     * // => 'FRED'
	     *
	     * upperCase.cache.set('fred, 'BARNEY');
	     * upperCase('fred');
	     * // => 'BARNEY'
	     */
	    function memoize(func, resolver) {
	      if (!isFunction(func) || (resolver && !isFunction(resolver))) {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      var memoized = function() {
	        var cache = memoized.cache,
	            key = resolver ? resolver.apply(this, arguments) : arguments[0];

	        if (cache.has(key)) {
	          return cache.get(key);
	        }
	        var result = func.apply(this, arguments);
	        cache.set(key, result);
	        return result;
	      };
	      memoized.cache = new memoize.Cache;
	      return memoized;
	    }

	    /**
	     * Creates a function that negates the result of the predicate `func`. The
	     * `func` predicate is invoked with the `this` binding and arguments of the
	     * created function.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} predicate The predicate to negate.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * function isEven(n) {
	     *   return n % 2 == 0;
	     * }
	     *
	     * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
	     * // => [1, 3, 5]
	     */
	    function negate(predicate) {
	      if (!isFunction(predicate)) {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      return function() {
	        return !predicate.apply(this, arguments);
	      };
	    }

	    /**
	     * Creates a function that is restricted to invoking `func` once. Repeat calls
	     * to the function return the value of the first call. The `func` is invoked
	     * with the `this` binding of the created function.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Function
	     * @param {Function} func The function to restrict.
	     * @returns {Function} Returns the new restricted function.
	     * @example
	     *
	     * var initialize = _.once(createApplication);
	     * initialize();
	     * initialize();
	     * // `initialize` invokes `createApplication` once
	     */
	    function once(func) {
	      return before(func, 2);
	    }

	    /**
	     * Creates a function that invokes `func` with `partial` arguments prepended
	     * to those provided to the new function. This method is like `_.bind` except
	     * it does **not** alter the `this` binding.
	     *
	     * The `_.partial.placeholder` value, which defaults to `_` in monolithic
	     * builds, may be used as a placeholder for partially applied arguments.
	     *
	     * **Note:** This method does not set the `length` property of partially
	     * applied functions.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to partially apply arguments to.
	     * @param {...*} [args] The arguments to be partially applied.
	     * @returns {Function} Returns the new partially applied function.
	     * @example
	     *
	     * var greet = function(greeting, name) {
	     *   return greeting + ' ' + name;
	     * };
	     *
	     * var sayHelloTo = _.partial(greet, 'hello');
	     * sayHelloTo('fred');
	     * // => 'hello fred'
	     *
	     * // using placeholders
	     * var greetFred = _.partial(greet, _, 'fred');
	     * greetFred('hi');
	     * // => 'hi fred'
	     */
	    function partial(func) {
	      var partials = slice(arguments, 1),
	          holders = replaceHolders(partials, partial.placeholder);

	      return createWrapper(func, PARTIAL_FLAG, null, partials, holders);
	    }

	    /**
	     * This method is like `_.partial` except that partially applied arguments
	     * are appended to those provided to the new function.
	     *
	     * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
	     * builds, may be used as a placeholder for partially applied arguments.
	     *
	     * **Note:** This method does not set the `length` property of partially
	     * applied functions.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to partially apply arguments to.
	     * @param {...*} [args] The arguments to be partially applied.
	     * @returns {Function} Returns the new partially applied function.
	     * @example
	     *
	     * var greet = function(greeting, name) {
	     *   return greeting + ' ' + name;
	     * };
	     *
	     * var greetFred = _.partialRight(greet, 'fred');
	     * greetFred('hi');
	     * // => 'hi fred'
	     *
	     * // using placeholders
	     * var sayHelloTo = _.partialRight(greet, 'hello', _);
	     * sayHelloTo('fred');
	     * // => 'hello fred'
	     */
	    function partialRight(func) {
	      var partials = slice(arguments, 1),
	          holders = replaceHolders(partials, partialRight.placeholder);

	      return createWrapper(func, PARTIAL_RIGHT_FLAG, null, partials, holders);
	    }

	    /**
	     * Creates a function that invokes `func` with arguments arranged according
	     * to the specified indexes where the argument value at the first index is
	     * provided as the first argument, the argument value at the second index is
	     * provided as the second argument, and so on.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to rearrange arguments for.
	     * @param {...(number|number[])} indexes The arranged argument indexes,
	     *  specified as individual indexes or arrays of indexes.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var rearged = _.rearg(function(a, b, c) {
	     *   return [a, b, c];
	     * }, 2, 0, 1);
	     *
	     * rearged('b', 'c', 'a')
	     * // => ['a', 'b', 'c']
	     *
	     * var map = _.rearg(_.map, [1, 0]);
	     * map(function(n) { return n * 3; }, [1, 2, 3]);
	     * // => [3, 6, 9]
	     */
	    function rearg(func) {
	      var indexes = baseFlatten(arguments, false, false, 1);
	      return createWrapper(func, REARG_FLAG, null, null, null, indexes);
	    }

	    /**
	     * Creates a function that only invokes `func` at most once per every `wait`
	     * milliseconds. The created function comes with a `cancel` method to cancel
	     * delayed invocations. Provide an options object to indicate that `func`
	     * should be invoked on the leading and/or trailing edge of the `wait` timeout.
	     * Subsequent calls to the throttled function return the result of the last
	     * `func` call.
	     *
	     * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
	     * on the trailing edge of the timeout only if the the throttled function is
	     * invoked more than once during the `wait` timeout.
	     *
	     * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
	     * for details over the differences between `_.throttle` and `_.debounce`.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to throttle.
	     * @param {number} wait The number of milliseconds to throttle invocations to.
	     * @param {Object} [options] The options object.
	     * @param {boolean} [options.leading=true] Specify invoking on the leading
	     *  edge of the timeout.
	     * @param {boolean} [options.trailing=true] Specify invoking on the trailing
	     *  edge of the timeout.
	     * @returns {Function} Returns the new throttled function.
	     * @example
	     *
	     * // avoid excessively updating the position while scrolling
	     * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	     *
	     * // invoke `renewToken` when the click event is fired, but not more than once every 5 minutes
	     * var throttled =  _.throttle(renewToken, 300000, { 'trailing': false })
	     * jQuery('.interactive').on('click', throttled);
	     *
	     * // cancel a trailing throttled call
	     * jQuery(window).on('popstate', throttled.cancel);
	     */
	    function throttle(func, wait, options) {
	      var leading = true,
	          trailing = true;

	      if (!isFunction(func)) {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      if (options === false) {
	        leading = false;
	      } else if (isObject(options)) {
	        leading = 'leading' in options ? !!options.leading : leading;
	        trailing = 'trailing' in options ? !!options.trailing : trailing;
	      }
	      debounceOptions.leading = leading;
	      debounceOptions.maxWait = +wait;
	      debounceOptions.trailing = trailing;
	      return debounce(func, wait, debounceOptions);
	    }

	    /**
	     * Creates a function that provides `value` to the wrapper function as its
	     * first argument. Any additional arguments provided to the function are
	     * appended to those provided to the wrapper function. The wrapper is invoked
	     * with the `this` binding of the created function.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {*} value The value to wrap.
	     * @param {Function} wrapper The wrapper function.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var p = _.wrap(_.escape, function(func, text) {
	     *   return '<p>' + func(text) + '</p>';
	     * });
	     *
	     * p('fred, barney, & pebbles');
	     * // => '<p>fred, barney, &amp; pebbles</p>'
	     */
	    function wrap(value, wrapper) {
	      wrapper = wrapper == null ? identity : wrapper;
	      return createWrapper(wrapper, PARTIAL_FLAG, null, [value]);
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Creates a clone of `value`. If `isDeep` is `true` nested objects are cloned,
	     * otherwise they are assigned by reference. If `customizer` is provided it is
	     * invoked to produce the cloned values. If `customizer` returns `undefined`
	     * cloning is handled by the method instead. The `customizer` is bound to
	     * `thisArg` and invoked with two argument; (value, index|key).
	     *
	     * **Note:** This method is loosely based on the structured clone algorithm.
	     * The enumerable properties of `arguments` objects and objects created by
	     * constructors other than `Object` are cloned to plain `Object` objects. An
	     * empty object is returned for uncloneable values such as functions, DOM nodes,
	     * Maps, Sets, and WeakMaps. See the [HTML5 specification](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm)
	     * for more details.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to clone.
	     * @param {boolean} [isDeep] Specify a deep clone.
	     * @param {Function} [customizer] The function to customize cloning values.
	     * @param {*} [thisArg] The `this` binding of `customizer`.
	     * @returns {*} Returns the cloned value.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney' },
	     *   { 'user': 'fred' }
	     * ];
	     *
	     * var shallow = _.clone(users);
	     * shallow[0] === users[0];
	     * // => true
	     *
	     * var deep = _.clone(users, true);
	     * deep[0] === users[0];
	     * // => false
	     *
	     * _.mixin({
	     *   'clone': _.partialRight(_.clone, function(value) {
	     *     return _.isElement(value) ? value.cloneNode(false) : undefined;
	     *   })
	     * });
	     *
	     * var clone = _.clone(document.body);
	     * clone.childNodes.length;
	     * // => 0
	     */
	    function clone(value, isDeep, customizer, thisArg) {
	      // Juggle arguments.
	      if (typeof isDeep != 'boolean' && isDeep != null) {
	        thisArg = customizer;
	        customizer = isIterateeCall(value, isDeep, thisArg) ? null : isDeep;
	        isDeep = false;
	      }
	      customizer = typeof customizer == 'function' && bindCallback(customizer, thisArg, 1);
	      return baseClone(value, isDeep, customizer);
	    }

	    /**
	     * Creates a deep clone of `value`. If `customizer` is provided it is invoked
	     * to produce the cloned values. If `customizer` returns `undefined` cloning
	     * is handled by the method instead. The `customizer` is bound to `thisArg`
	     * and invoked with two argument; (value, index|key).
	     *
	     * **Note:** This method is loosely based on the structured clone algorithm.
	     * The enumerable properties of `arguments` objects and objects created by
	     * constructors other than `Object` are cloned to plain `Object` objects. An
	     * empty object is returned for uncloneable values such as functions, DOM nodes,
	     * Maps, Sets, and WeakMaps. See the [HTML5 specification](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm)
	     * for more details.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to deep clone.
	     * @param {Function} [customizer] The function to customize cloning values.
	     * @param {*} [thisArg] The `this` binding of `customizer`.
	     * @returns {*} Returns the deep cloned value.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney' },
	     *   { 'user': 'fred' }
	     * ];
	     *
	     * var deep = _.cloneDeep(users);
	     * deep[0] === users[0];
	     * // => false
	     *
	     * var view = {
	     *   'label': 'docs',
	     *   'node': element
	     * };
	     *
	     * var clone = _.cloneDeep(view, function(value) {
	     *   return _.isElement(value) ? value.cloneNode(true) : undefined;
	     * });
	     *
	     * clone.node == view.node;
	     * // => false
	     */
	    function cloneDeep(value, customizer, thisArg) {
	      customizer = typeof customizer == 'function' && bindCallback(customizer, thisArg, 1);
	      return baseClone(value, true, customizer);
	    }

	    /**
	     * Checks if `value` is classified as an `arguments` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * (function() { return _.isArguments(arguments); })();
	     * // => true
	     *
	     * _.isArguments([1, 2, 3]);
	     * // => false
	     */
	    function isArguments(value) {
	      var length = isObjectLike(value) ? value.length : undefined;
	      return (isLength(length) && toString.call(value) == argsClass) || false;
	    }
	    // Fallback for environments without a `[[Class]]` for `arguments` objects.
	    if (!support.argsClass) {
	      isArguments = function(value) {
	        var length = isObjectLike(value) ? value.length : undefined;
	        return (isLength(length) && hasOwnProperty.call(value, 'callee') &&
	          !propertyIsEnumerable.call(value, 'callee')) || false;
	      };
	    }

	    /**
	     * Checks if `value` is classified as an `Array` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isArray([1, 2, 3]);
	     * // => true
	     *
	     * (function() { return _.isArray(arguments); })();
	     * // => false
	     */
	    var isArray = nativeIsArray || function(value) {
	      return (isObjectLike(value) && isLength(value.length) && toString.call(value) == arrayClass) || false;
	    };

	    /**
	     * Checks if `value` is classified as a boolean primitive or object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isBoolean(false);
	     * // => true
	     *
	     * _.isBoolean(null);
	     * // => false
	     */
	    function isBoolean(value) {
	      return (value === true || value === false || isObjectLike(value) && toString.call(value) == boolClass) || false;
	    }

	    /**
	     * Checks if `value` is classified as a `Date` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isDate(new Date);
	     * // => true
	     *
	     * _.isDate('Mon April 23 2012');
	     * // => false
	     */
	    function isDate(value) {
	      return (isObjectLike(value) && toString.call(value) == dateClass) || false;
	    }

	    /**
	     * Checks if `value` is a DOM element.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
	     * @example
	     *
	     * _.isElement(document.body);
	     * // => true
	     *
	     * _.isElement('<body>');
	     * // => false
	     */
	    function isElement(value) {
	      return (value && value.nodeType === 1 && isObjectLike(value) &&
	        (lodash.support.nodeClass ? toString.call(value).indexOf('Element') > -1 : isHostObject(value))) || false;
	    }
	    // Fallback for environments without DOM support.
	    if (!support.dom) {
	      isElement = function(value) {
	        return (value && value.nodeType === 1 && isObjectLike(value) && !isPlainObject(value)) || false;
	      };
	    }

	    /**
	     * Checks if a value is empty. A value is considered empty unless it is an
	     * `arguments` object, array, string, or jQuery-like collection with a length
	     * greater than `0` or an object with own enumerable properties.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {Array|Object|string} value The value to inspect.
	     * @returns {boolean} Returns `true` if `value` is empty, else `false`.
	     * @example
	     *
	     * _.isEmpty(null);
	     * // => true
	     *
	     * _.isEmpty(true);
	     * // => true
	     *
	     * _.isEmpty(1);
	     * // => true
	     *
	     * _.isEmpty([1, 2, 3]);
	     * // => false
	     *
	     * _.isEmpty({ 'a': 1 });
	     * // => false
	     */
	    function isEmpty(value) {
	      if (value == null) {
	        return true;
	      }
	      var length = value.length;
	      if (isLength(length) && (isArray(value) || isString(value) || isArguments(value) ||
	          (isObjectLike(value) && isFunction(value.splice)))) {
	        return !length;
	      }
	      return !keys(value).length;
	    }

	    /**
	     * Performs a deep comparison between two values to determine if they are
	     * equivalent. If `customizer` is provided it is invoked to compare values.
	     * If `customizer` returns `undefined` comparisons are handled by the method
	     * instead. The `customizer` is bound to `thisArg` and invoked with three
	     * arguments; (value, other, key).
	     *
	     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
	     * numbers, `Object` objects, regexes, and strings. Functions and DOM nodes
	     * are **not** supported. Provide a customizer function to extend support
	     * for comparing other values.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to compare to `other`.
	     * @param {*} other The value to compare to `value`.
	     * @param {Function} [customizer] The function to customize comparing values.
	     * @param {*} [thisArg] The `this` binding of `customizer`.
	     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	     * @example
	     *
	     * var object = { 'user': 'fred' };
	     * var other = { 'user': 'fred' };
	     *
	     * object == other;
	     * // => false
	     *
	     * _.isEqual(object, other);
	     * // => true
	     *
	     * var words = ['hello', 'goodbye'];
	     * var otherWords = ['hi', 'goodbye'];
	     *
	     * _.isEqual(words, otherWords, function(value, other) {
	     *   return _.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/) || undefined;
	     * });
	     * // => true
	     */
	    function isEqual(value, other, customizer, thisArg) {
	      customizer = typeof customizer == 'function' && bindCallback(customizer, thisArg, 3);
	      if (!customizer && isStrictComparable(value) && isStrictComparable(other)) {
	        return value === other;
	      }
	      var result = customizer ? customizer(value, other) : undefined;
	      return typeof result == 'undefined' ? baseIsEqual(value, other, customizer) : !!result;
	    }

	    /**
	     * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
	     * `SyntaxError`, `TypeError`, or `URIError` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
	     * @example
	     *
	     * _.isError(new Error);
	     * // => true
	     *
	     * _.isError(Error);
	     * // => false
	     */
	    function isError(value) {
	      return (isObjectLike(value) && typeof value.message == 'string' && toString.call(value) == errorClass) || false;
	    }

	    /**
	     * Checks if `value` is a finite primitive number.
	     *
	     * **Note:** This method is based on ES6 `Number.isFinite`. See the
	     * [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.isfinite)
	     * for more details.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
	     * @example
	     *
	     * _.isFinite(10);
	     * // => true
	     *
	     * _.isFinite('10');
	     * // => false
	     *
	     * _.isFinite(true);
	     * // => false
	     *
	     * _.isFinite(Object(10));
	     * // => false
	     *
	     * _.isFinite(Infinity);
	     * // => false
	     */
	    var isFinite = nativeNumIsFinite || function(value) {
	      return typeof value == 'number' && nativeIsFinite(value);
	    };

	    /**
	     * Checks if `value` is classified as a `Function` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isFunction(_);
	     * // => true
	     *
	     * _.isFunction(/abc/);
	     * // => false
	     */
	    function isFunction(value) {
	      // Avoid a Chakra JIT bug in compatibility modes of IE 11.
	      // See https://github.com/jashkenas/underscore/issues/1621.
	      return typeof value == 'function' || false;
	    }
	    // Fallback for environments that return incorrect `typeof` operator results.
	    if (isFunction(/x/) || (Uint8Array && !isFunction(Uint8Array))) {
	      isFunction = function(value) {
	        // The use of `Object#toString` avoids issues with the `typeof` operator
	        // in older versions of Chrome and Safari which return 'function' for
	        // regexes and Safari 8 equivalents which return 'object' for typed
	        // array constructors.
	        return toString.call(value) == funcClass;
	      };
	    }

	    /**
	     * Checks if `value` is the language type of `Object`.
	     * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	     *
	     * **Note:** See the [ES5 spec](http://es5.github.io/#x8) for more details.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	     * @example
	     *
	     * _.isObject({});
	     * // => true
	     *
	     * _.isObject([1, 2, 3]);
	     * // => true
	     *
	     * _.isObject(1);
	     * // => false
	     */
	    function isObject(value) {
	      // Avoid a V8 JIT bug in Chrome 19-20.
	      // See https://code.google.com/p/v8/issues/detail?id=2291.
	      var type = typeof value;
	      return type == 'function' || (value && type == 'object') || false;
	    }

	    /**
	     * Performs a deep comparison between `object` and `source` to determine if
	     * `object` contains equivalent property values. If `customizer` is provided
	     * it is invoked to compare values. If `customizer` returns `undefined`
	     * comparisons are handled by the method instead. The `customizer` is bound
	     * to `thisArg` and invoked with three arguments; (value, other, key).
	     *
	     * **Note:** This method supports comparing properties of arrays, booleans,
	     * `Date` objects, numbers, `Object` objects, regexes, and strings. Functions
	     * and DOM nodes are **not** supported. Provide a customizer function to extend
	     * support for comparing other values.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {Object} source The object to inspect.
	     * @param {Object} source The object of property values to match.
	     * @param {Function} [customizer] The function to customize comparing values.
	     * @param {*} [thisArg] The `this` binding of `customizer`.
	     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	     * @example
	     *
	     * var object = { 'user': 'fred', 'age': 40 };
	     *
	     * _.isMatch(object, { 'age': 40 });
	     * // => true
	     *
	     * _.isMatch(object, { 'age': 36 });
	     * // => false
	     *
	     * var object = { 'greeting': 'hello' };
	     * var source = { 'greeting': 'hi' };
	     *
	     * _.isMatch(object, source, function(value, other) {
	     *   return _.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/) || undefined;
	     * });
	     * // => true
	     */
	    function isMatch(object, source, customizer, thisArg) {
	      var props = keys(source),
	          length = props.length;

	      customizer = typeof customizer == 'function' && bindCallback(customizer, thisArg, 3);
	      if (!customizer && length == 1) {
	        var key = props[0],
	            value = source[key];

	        if (isStrictComparable(value)) {
	          return object != null && value === object[key] && hasOwnProperty.call(object, key);
	        }
	      }
	      var values = Array(length),
	          strictCompareFlags = Array(length);

	      while (length--) {
	        value = values[length] = source[props[length]];
	        strictCompareFlags[length] = isStrictComparable(value);
	      }
	      return baseIsMatch(object, props, values, strictCompareFlags, customizer);
	    }

	    /**
	     * Checks if `value` is `NaN`.
	     *
	     * **Note:** This method is not the same as native `isNaN` which returns `true`
	     * for `undefined` and other non-numeric values. See the [ES5 spec](http://es5.github.io/#x15.1.2.4)
	     * for more details.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	     * @example
	     *
	     * _.isNaN(NaN);
	     * // => true
	     *
	     * _.isNaN(new Number(NaN));
	     * // => true
	     *
	     * isNaN(undefined);
	     * // => true
	     *
	     * _.isNaN(undefined);
	     * // => false
	     */
	    function isNaN(value) {
	      // `NaN` as a primitive is the only value that is not equal to itself
	      // (perform the `[[Class]]` check first to avoid errors with some host objects in IE).
	      return isNumber(value) && value != +value;
	    }

	    /**
	     * Checks if `value` is a native function.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	     * @example
	     *
	     * _.isNative(Array.prototype.push);
	     * // => true
	     *
	     * _.isNative(_);
	     * // => false
	     */
	    function isNative(value) {
	      if (value == null) {
	        return false;
	      }
	      if (toString.call(value) == funcClass) {
	        return reNative.test(fnToString.call(value));
	      }
	      return (isObjectLike(value) &&
	        (isHostObject(value) ? reNative : reHostCtor).test(value)) || false;
	    }

	    /**
	     * Checks if `value` is `null`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
	     * @example
	     *
	     * _.isNull(null);
	     * // => true
	     *
	     * _.isNull(void 0);
	     * // => false
	     */
	    function isNull(value) {
	      return value === null;
	    }

	    /**
	     * Checks if `value` is classified as a `Number` primitive or object.
	     *
	     * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
	     * as numbers, use the `_.isFinite` method.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isNumber(8.4);
	     * // => true
	     *
	     * _.isNumber(NaN);
	     * // => true
	     *
	     * _.isNumber('8.4');
	     * // => false
	     */
	    function isNumber(value) {
	      return typeof value == 'number' || (isObjectLike(value) && toString.call(value) == numberClass) || false;
	    }

	    /**
	     * Checks if `value` is an object created by the `Object` constructor or has
	     * a `[[Prototype]]` of `null`.
	     *
	     * **Note:** This method assumes objects created by the `Object` constructor
	     * have no inherited enumerable properties.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	     * @example
	     *
	     * function Shape() {
	     *   this.x = 0;
	     *   this.y = 0;
	     * }
	     *
	     * _.isPlainObject(new Shape);
	     * // => false
	     *
	     * _.isPlainObject([1, 2, 3]);
	     * // => false
	     *
	     * _.isPlainObject({ 'x': 0, 'y': 0 });
	     * // => true
	     *
	     * _.isPlainObject(Object.create(null));
	     * // => true
	     */
	    var isPlainObject = !getPrototypeOf ? shimIsPlainObject : function(value) {
	      if (!(value && toString.call(value) == objectClass) || (!lodash.support.argsClass && isArguments(value))) {
	        return false;
	      }
	      var valueOf = value.valueOf,
	          objProto = isNative(valueOf) && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);

	      return objProto
	        ? (value == objProto || getPrototypeOf(value) == objProto)
	        : shimIsPlainObject(value);
	    };

	    /**
	     * Checks if `value` is classified as a `RegExp` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isRegExp(/abc/);
	     * // => true
	     *
	     * _.isRegExp('/abc/');
	     * // => false
	     */
	    function isRegExp(value) {
	      return (isObject(value) && toString.call(value) == regexpClass) || false;
	    }

	    /**
	     * Checks if `value` is classified as a `String` primitive or object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isString('abc');
	     * // => true
	     *
	     * _.isString(1);
	     * // => false
	     */
	    function isString(value) {
	      return typeof value == 'string' || (isObjectLike(value) && toString.call(value) == stringClass) || false;
	    }

	    /**
	     * Checks if `value` is `undefined`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
	     * @example
	     *
	     * _.isUndefined(void 0);
	     * // => true
	     *
	     * _.isUndefined(null);
	     * // => false
	     */
	    function isUndefined(value) {
	      return typeof value == 'undefined';
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Assigns own enumerable properties of source object(s) to the destination
	     * object. Subsequent sources overwrite property assignments of previous sources.
	     * If `customizer` is provided it is invoked to produce the assigned values.
	     * The `customizer` is bound to `thisArg` and invoked with five arguments;
	     * (objectValue, sourceValue, key, object, source).
	     *
	     * @static
	     * @memberOf _
	     * @alias extend
	     * @category Object
	     * @param {Object} object The destination object.
	     * @param {...Object} [sources] The source objects.
	     * @param {Function} [customizer] The function to customize assigning values.
	     * @param {*} [thisArg] The `this` binding of `customizer`.
	     * @returns {Object} Returns the destination object.
	     * @example
	     *
	     * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred', 'status': 'busy' });
	     * // => { 'user': 'fred', 'age': 40, 'status': 'busy' }
	     *
	     * var defaults = _.partialRight(_.assign, function(value, other) {
	     *   return typeof value == 'undefined' ? other : value;
	     * });
	     *
	     * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred', 'status': 'busy' });
	     * // => { 'user': 'barney', 'age': 36, 'status': 'busy' }
	     */
	    var assign = createAssigner(baseAssign);

	    /**
	     * Creates an object that inherits from the given `prototype` object. If a
	     * `properties` object is provided its own enumerable properties are assigned
	     * to the created object.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} prototype The object to inherit from.
	     * @param {Object} [properties] The properties to assign to the object.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * function Shape() {
	     *   this.x = 0;
	     *   this.y = 0;
	     * }
	     *
	     * function Circle() {
	     *   Shape.call(this);
	     * }
	     *
	     * Circle.prototype = _.create(Shape.prototype, { 'constructor': Circle });
	     *
	     * var circle = new Circle;
	     * circle instanceof Circle;
	     * // => true
	     *
	     * circle instanceof Shape;
	     * // => true
	     */
	    function create(prototype, properties, guard) {
	      var result = baseCreate(prototype);
	      if (guard && isIterateeCall(prototype, properties, guard)) {
	        properties = null;
	      }
	      return properties ? baseAssign(result, properties) : result;
	    }

	    /**
	     * Assigns own enumerable properties of source object(s) to the destination
	     * object for all destination properties that resolve to `undefined`. Once a
	     * property is set, additional defaults of the same property are ignored.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The destination object.
	     * @param {...Object} [sources] The source objects.
	     * @returns {Object} Returns the destination object.
	     * @example
	     *
	     * _.defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred', 'status': 'busy' });
	     * // => { 'user': 'barney', 'age': 36, 'status': 'busy' }
	     */
	    function defaults(object) {
	      if (object == null) {
	        return object;
	      }
	      var args = baseSlice(arguments);
	      args.push(assignDefaults);
	      return assign.apply(undefined, args);
	    }

	    /**
	     * This method is like `_.findIndex` except that it returns the key of the
	     * first element `predicate` returns truthy for, instead of the element itself.
	     *
	     * If a property name is provided for `predicate` the created "_.pluck" style
	     * callback returns the property value of the given element.
	     *
	     * If an object is provided for `predicate` the created "_.where" style callback
	     * returns `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration. If a property name or object is provided it is used to
	     *  create a "_.pluck" or "_.where" style callback respectively.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {string|undefined} Returns the key of the matched element, else `undefined`.
	     * @example
	     *
	     * var users = {
	     *   'barney':  { 'age': 36, 'active': true },
	     *   'fred':    { 'age': 40, 'active': false },
	     *   'pebbles': { 'age': 1,  'active': true }
	     * };
	     *
	     * _.findKey(users, function(chr) { return chr.age < 40; });
	     * // => 'barney' (iteration order is not guaranteed)
	     *
	     * // using "_.where" callback shorthand
	     * _.findKey(users, { 'age': 1 });
	     * // => 'pebbles'
	     *
	     * // using "_.pluck" callback shorthand
	     * _.findKey(users, 'active');
	     * // => 'barney'
	     */
	    function findKey(object, predicate, thisArg) {
	      predicate = getCallback(predicate, thisArg, 3);
	      return baseFind(object, predicate, baseForOwn, true);
	    }

	    /**
	     * This method is like `_.findKey` except that it iterates over elements of
	     * a collection in the opposite order.
	     *
	     * If a property name is provided for `predicate` the created "_.pluck" style
	     * callback returns the property value of the given element.
	     *
	     * If an object is provided for `predicate` the created "_.where" style callback
	     * returns `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration. If a property name or object is provided it is used to
	     *  create a "_.pluck" or "_.where" style callback respectively.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {string|undefined} Returns the key of the matched element, else `undefined`.
	     * @example
	     *
	     * var users = {
	     *   'barney':  { 'age': 36, 'active': true },
	     *   'fred':    { 'age': 40, 'active': false },
	     *   'pebbles': { 'age': 1,  'active': true }
	     * };
	     *
	     * _.findLastKey(users, function(chr) { return chr.age < 40; });
	     * // => returns `pebbles` assuming `_.findKey` returns `barney`
	     *
	     * // using "_.where" callback shorthand
	     * _.findLastKey(users, { 'age': 40 });
	     * // => 'fred'
	     *
	     * // using "_.pluck" callback shorthand
	     * _.findLastKey(users, 'active');
	     * // => 'pebbles'
	     */
	    function findLastKey(object, predicate, thisArg) {
	      predicate = getCallback(predicate, thisArg, 3);
	      return baseFind(object, predicate, baseForOwnRight, true);
	    }

	    /**
	     * Iterates over own and inherited enumerable properties of an object invoking
	     * `iteratee` for each property. The `iteratee` is bound to `thisArg` and invoked
	     * with three arguments; (value, key, object). Iterator functions may exit
	     * iteration early by explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * function Shape() {
	     *   this.x = 0;
	     *   this.y = 0;
	     * }
	     *
	     * Shape.prototype.z = 0;
	     *
	     * _.forIn(new Shape, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'x', 'y', and 'z' (iteration order is not guaranteed)
	     */
	    function forIn(object, iteratee, thisArg) {
	      if (typeof iteratee != 'function' || typeof thisArg != 'undefined') {
	        iteratee = bindCallback(iteratee, thisArg, 3);
	      }
	      return baseFor(object, iteratee, keysIn);
	    }

	    /**
	     * This method is like `_.forIn` except that it iterates over properties of
	     * `object` in the opposite order.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * function Shape() {
	     *   this.x = 0;
	     *   this.y = 0;
	     * }
	     *
	     * Shape.prototype.z = 0;
	     *
	     * _.forInRight(new Shape, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'z', 'y', and 'x' assuming `_.forIn ` logs 'x', 'y', and 'z'
	     */
	    function forInRight(object, iteratee, thisArg) {
	      iteratee = bindCallback(iteratee, thisArg, 3);
	      return baseForRight(object, iteratee, keysIn);
	    }

	    /**
	     * Iterates over own enumerable properties of an object invoking `iteratee`
	     * for each property. The `iteratee` is bound to `thisArg` and invoked with
	     * three arguments; (value, key, object). Iterator functions may exit iteration
	     * early by explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * _.forOwn({ '0': 'zero', '1': 'one', 'length': 2 }, function(n, key) {
	     *   console.log(key);
	     * });
	     * // => logs '0', '1', and 'length' (iteration order is not guaranteed)
	     */
	    function forOwn(object, iteratee, thisArg) {
	      if (typeof iteratee != 'function' || typeof thisArg != 'undefined') {
	        iteratee = bindCallback(iteratee, thisArg, 3);
	      }
	      return baseForOwn(object, iteratee);
	    }

	    /**
	     * This method is like `_.forOwn` except that it iterates over properties of
	     * `object` in the opposite order.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * _.forOwnRight({ '0': 'zero', '1': 'one', 'length': 2 }, function(n, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'length', '1', and '0' assuming `_.forOwn` logs '0', '1', and 'length'
	     */
	    function forOwnRight(object, iteratee, thisArg) {
	      iteratee = bindCallback(iteratee, thisArg, 3);
	      return baseForRight(object, iteratee, keys);
	    }

	    /**
	     * Creates an array of function property names from all enumerable properties,
	     * own and inherited, of `object`.
	     *
	     * @static
	     * @memberOf _
	     * @alias methods
	     * @category Object
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns the new array of property names.
	     * @example
	     *
	     * _.functions(_);
	     * // => ['all', 'any', 'bind', ...]
	     */
	    function functions(object) {
	      return baseFunctions(object, keysIn(object));
	    }

	    /**
	     * Checks if the specified property name exists as a direct property of `object`,
	     * instead of an inherited property.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to inspect.
	     * @param {string} key The name of the property to check.
	     * @returns {boolean} Returns `true` if `key` is a direct property, else `false`.
	     * @example
	     *
	     * _.has({ 'a': 1, 'b': 2, 'c': 3 }, 'b');
	     * // => true
	     */
	    function has(object, key) {
	      return object ? hasOwnProperty.call(object, key) : false;
	    }

	    /**
	     * Creates an object composed of the inverted keys and values of `object`.
	     * If `object` contains duplicate values, subsequent values overwrite property
	     * assignments of previous values unless `multiValue` is `true`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to invert.
	     * @param {boolean} [multiValue] Allow multiple values per key.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Object} Returns the new inverted object.
	     * @example
	     *
	     * _.invert({ 'first': 'fred', 'second': 'barney' });
	     * // => { 'fred': 'first', 'barney': 'second' }
	     *
	     * // without `multiValue`
	     * _.invert({ 'first': 'fred', 'second': 'barney', 'third': 'fred' });
	     * // => { 'fred': 'third', 'barney': 'second' }
	     *
	     * // with `multiValue`
	     * _.invert({ 'first': 'fred', 'second': 'barney', 'third': 'fred' }, true);
	     * // => { 'fred': ['first', 'third'], 'barney': ['second'] }
	     */
	    function invert(object, multiValue, guard) {
	      if (guard && isIterateeCall(object, multiValue, guard)) {
	        multiValue = null;
	      }
	      var index = -1,
	          props = keys(object),
	          length = props.length,
	          result = {};

	      while (++index < length) {
	        var key = props[index],
	            value = object[key];

	        if (multiValue) {
	          if (hasOwnProperty.call(result, value)) {
	            result[value].push(key);
	          } else {
	            result[value] = [key];
	          }
	        }
	        else {
	          result[value] = key;
	        }
	      }
	      return result;
	    }

	    /**
	     * Creates an array of the own enumerable property names of `object`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns the array of property names.
	     * @example
	     *
	     * function Shape() {
	     *   this.x = 0;
	     *   this.y = 0;
	     * }
	     *
	     * Shape.prototype.z = 0;
	     *
	     * _.keys(new Shape);
	     * // => ['x', 'y'] (iteration order is not guaranteed)
	     */
	    var keys = !nativeKeys ? shimKeys : function(object) {
	      if (object) {
	        var Ctor = object.constructor,
	            length = object.length;
	      }
	      if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	         (typeof object == 'function' ? lodash.support.enumPrototypes : (length && isLength(length)))) {
	        return shimKeys(object);
	      }
	      return isObject(object) ? nativeKeys(object) : [];
	    };

	    /**
	     * Creates an array of the own and inherited enumerable property names of `object`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns the array of property names.
	     * @example
	     *
	     * function Shape() {
	     *   this.x = 0;
	     *   this.y = 0;
	     * }
	     *
	     * Shape.prototype.z = 0;
	     *
	     * _.keysIn(new Shape);
	     * // => ['x', 'y', 'z'] (iteration order is not guaranteed)
	     */
	    function keysIn(object) {
	      if (object == null) {
	        return [];
	      }
	      if (!isObject(object)) {
	        object = Object(object);
	      }
	      var length = object.length,
	          support = lodash.support;

	      length = (length && isLength(length) &&
	        (isArray(object) || (support.nonEnumStrings && isString(object)) ||
	          (support.nonEnumArgs && isArguments(object))) && length) || 0;

	      var Ctor = object.constructor,
	          index = -1,
	          proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto,
	          isProto = proto === object,
	          result = Array(length),
	          skipIndexes = length > 0,
	          skipErrorProps = support.enumErrorProps && (object === errorProto || object instanceof Error),
	          skipProto = support.enumPrototypes && typeof object == 'function';

	      while (++index < length) {
	        result[index] = String(index);
	      }
	      // Lo-Dash skips the `constructor` property when it infers it is iterating
	      // over a `prototype` object because IE < 9 can't set the `[[Enumerable]]`
	      // attribute of an existing property and the `constructor` property of a
	      // prototype defaults to non-enumerable.
	      for (var key in object) {
	        if (!(skipProto && key == 'prototype') &&
	            !(skipErrorProps && (key == 'message' || key == 'name')) &&
	            !(skipIndexes && isIndex(key, length)) &&
	            !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	          result.push(key);
	        }
	      }
	      if (support.nonEnumShadows && object !== objectProto) {
	        var className = object === stringProto ? stringClass : object === errorProto ? errorClass : toString.call(object),
	            nonEnums = nonEnumProps[className] || nonEnumProps[objectClass];

	        if (className == objectClass) {
	          proto = objectProto;
	        }
	        length = shadowProps.length;
	        while (length--) {
	          key = shadowProps[length];
	          var nonEnum = nonEnums[key];
	          if (!(isProto && nonEnum) &&
	              (nonEnum ? hasOwnProperty.call(object, key) : object[key] !== proto[key])) {
	            result.push(key);
	          }
	        }
	      }
	      return result;
	    }

	    /**
	     * Creates an object with the same keys as `object` and values generated by
	     * running each own enumerable property of `object` through `iteratee`. The
	     * iteratee function is bound to `thisArg` and invoked with three arguments;
	     * (value, key, object).
	     *
	     * If a property name is provided for `iteratee` the created "_.pluck" style
	     * callback returns the property value of the given element.
	     *
	     * If an object is provided for `iteratee` the created "_.where" style callback
	     * returns `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration. If a property name or object is provided it is used to
	     *  create a "_.pluck" or "_.where" style callback respectively.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns the new mapped object.
	     * @example
	     *
	     * _.mapValues({ 'a': 1, 'b': 2, 'c': 3} , function(n) { return n * 3; });
	     * // => { 'a': 3, 'b': 6, 'c': 9 }
	     *
	     * var users = {
	     *   'fred':    { 'user': 'fred',    'age': 40 },
	     *   'pebbles': { 'user': 'pebbles', 'age': 1 }
	     * };
	     *
	     * // using "_.pluck" callback shorthand
	     * _.mapValues(users, 'age');
	     * // => { 'fred': 40, 'pebbles': 1 }
	     */
	    function mapValues(object, iteratee, thisArg) {
	      iteratee = getCallback(iteratee, thisArg, 3);

	      var result = {};
	      baseForOwn(object, function(value, key, object) {
	        result[key] = iteratee(value, key, object);
	      });
	      return result;
	    }

	    /**
	     * Recursively merges own enumerable properties of the source object(s), that
	     * don't resolve to `undefined` into the destination object. Subsequent sources
	     * overwrite property assignments of previous sources. If `customizer` is
	     * provided it is invoked to produce the merged values of the destination and
	     * source properties. If `customizer` returns `undefined` merging is handled
	     * by the method instead. The `customizer` is bound to `thisArg` and invoked
	     * with five arguments; (objectValue, sourceValue, key, object, source).
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The destination object.
	     * @param {...Object} [sources] The source objects.
	     * @param {Function} [customizer] The function to customize merging properties.
	     * @param {*} [thisArg] The `this` binding of `customizer`.
	     * @returns {Object} Returns the destination object.
	     * @example
	     *
	     * var users = {
	     *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
	     * };
	     *
	     * var ages = {
	     *   'data': [{ 'age': 36 }, { 'age': 40 }]
	     * };
	     *
	     * _.merge(users, ages);
	     * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
	     *
	     * var food = {
	     *   'fruits': ['apple'],
	     *   'vegetables': ['beet']
	     * };
	     *
	     * var otherFood = {
	     *   'fruits': ['banana'],
	     *   'vegetables': ['carrot']
	     * };
	     *
	     * _.merge(food, otherFood, function(a, b) {
	     *   return _.isArray(a) ? a.concat(b) : undefined;
	     * });
	     * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
	     */
	    var merge = createAssigner(baseMerge);

	    /**
	     * The opposite of `_.pick`; this method creates an object composed of the
	     * own and inherited enumerable properties of `object` that are not omitted.
	     * Property names may be specified as individual arguments or as arrays of
	     * property names. If `predicate` is provided it is invoked for each property
	     * of `object` omitting the properties `predicate` returns truthy for. The
	     * predicate is bound to `thisArg` and invoked with three arguments;
	     * (value, key, object).
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The source object.
	     * @param {Function|...(string|string[])} [predicate] The function invoked per
	     *  iteration or property names to omit, specified as individual property
	     *  names or arrays of property names.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * var object = { 'user': 'fred', 'age': 40 };
	     *
	     * _.omit(object, 'age');
	     * // => { 'user': 'fred' }
	     *
	     * _.omit(object, _.isNumber);
	     * // => { 'user': 'fred' }
	     */
	    function omit(object, predicate, thisArg) {
	      if (object == null) {
	        return {};
	      }
	      if (typeof predicate != 'function') {
	        var props = arrayMap(baseFlatten(arguments, false, false, 1), String);
	        return pickByArray(object, baseDifference(keysIn(object), props));
	      }
	      predicate = getCallback(predicate, thisArg, 3);
	      return pickByCallback(object, function(value, key, object) {
	        return !predicate(value, key, object);
	      });
	    }

	    /**
	     * Creates a two dimensional array of the key-value pairs for `object`,
	     * e.g. `[[key1, value1], [key2, value2]]`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns the new array of key-value pairs.
	     * @example
	     *
	     * _.pairs({ 'barney': 36, 'fred': 40 });
	     * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
	     */
	    function pairs(object) {
	      var index = -1,
	          props = keys(object),
	          length = props.length,
	          result = Array(length);

	      while (++index < length) {
	        var key = props[index];
	        result[index] = [key, object[key]];
	      }
	      return result;
	    }

	    /**
	     * Creates an object composed of the picked `object` properties. Property
	     * names may be specified as individual arguments or as arrays of property
	     * names. If `predicate` is provided it is invoked for each property of `object`
	     * picking the properties `predicate` returns truthy for. The predicate is
	     * bound to `thisArg` and invoked with three arguments; (value, key, object).
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The source object.
	     * @param {Function|...(string|string[])} [predicate] The function invoked per
	     *  iteration or property names to pick, specified as individual property
	     *  names or arrays of property names.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * var object = { 'user': 'fred', 'age': 40 };
	     *
	     * _.pick(object, 'user');
	     * // => { 'user': 'fred' }
	     *
	     * _.pick(object, _.isString);
	     * // => { 'user': 'fred' }
	     */
	    function pick(object, predicate, thisArg) {
	      if (object == null) {
	        return {};
	      }
	      return typeof predicate == 'function'
	        ? pickByCallback(object, getCallback(predicate, thisArg, 3))
	        : pickByArray(object, baseFlatten(arguments, false, false, 1));
	    }

	    /**
	     * Resolves the value of property `key` on `object`. If the value of `key` is
	     * a function it is invoked with the `this` binding of `object` and its result
	     * is returned, else the property value is returned. If the property value is
	     * `undefined` the `defaultValue` is used in its place.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @param {string} key The name of the property to resolve.
	     * @param {*} [defaultValue] The value returned if the property value
	     *  resolves to `undefined`.
	     * @returns {*} Returns the resolved value.
	     * @example
	     *
	     * var object = { 'user': 'fred', 'age': _.constant(40) };
	     *
	     * _.result(object, 'user');
	     * // => 'fred'
	     *
	     * _.result(object, 'age');
	     * // => 40
	     *
	     * _.result(object, 'status', 'busy');
	     * // => 'busy'
	     *
	     * _.result(object, 'status', _.constant('busy'));
	     * // => 'busy'
	     */
	    function result(object, key, defaultValue) {
	      var value = object == null ? undefined : object[key];
	      if (typeof value == 'undefined') {
	        value = defaultValue;
	      }
	      return isFunction(value) ? value.call(object) : value;
	    }

	    /**
	     * An alternative to `_.reduce`; this method transforms `object` to a new
	     * `accumulator` object which is the result of running each of its own enumerable
	     * properties through `iteratee`, with each invocation potentially mutating
	     * the `accumulator` object. The `iteratee` is bound to `thisArg` and invoked
	     * with four arguments; (accumulator, value, key, object). Iterator functions
	     * may exit iteration early by explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Array|Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [accumulator] The custom accumulator value.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {*} Returns the accumulated value.
	     * @example
	     *
	     * var squares = _.transform([1, 2, 3, 4, 5, 6], function(result, n) {
	     *   n *= n;
	     *   if (n % 2) {
	     *     return result.push(n) < 3;
	     *   }
	     * });
	     * // => [1, 9, 25]
	     *
	     * var mapped = _.transform({ 'a': 1, 'b': 2, 'c': 3 }, function(result, n, key) {
	     *   result[key] = n * 3;
	     * });
	     * // => { 'a': 3, 'b': 6, 'c': 9 }
	     */
	    function transform(object, iteratee, accumulator, thisArg) {
	      iteratee = getCallback(iteratee, thisArg, 4);

	      var isArr = isArrayLike(object);
	      if (accumulator == null) {
	        if (isArr || isObject(object)) {
	          var Ctor = object.constructor;
	          if (isArr) {
	            accumulator = isArray(object) ? new Ctor : [];
	          } else {
	            accumulator = baseCreate(typeof Ctor == 'function' && Ctor.prototype);
	          }
	        } else {
	          accumulator = {};
	        }
	      }
	      (isArr ? arrayEach : baseForOwn)(object, function(value, index, object) {
	        return iteratee(accumulator, value, index, object);
	      });
	      return accumulator;
	    }

	    /**
	     * Creates an array of the own enumerable property values of `object`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property values.
	     * @example
	     *
	     * function Shape(x, y) {
	     *   this.x = x;
	     *   this.y = y;
	     * }
	     *
	     * Shape.prototype.z = 0;
	     *
	     * _.values(new Shape(2, 1));
	     * // => [2, 1] (iteration order is not guaranteed)
	     */
	    function values(object) {
	      return baseValues(object, keys(object));
	    }

	    /**
	     * Creates an array of the own and inherited enumerable property values
	     * of `object`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property values.
	     * @example
	     *
	     * function Shape(x, y) {
	     *   this.x = x;
	     *   this.y = y;
	     * }
	     *
	     * Shape.prototype.z = 0;
	     *
	     * _.valuesIn(new Shape(2, 1));
	     * // => [2, 1, 0] (iteration order is not guaranteed)
	     */
	    function valuesIn(object) {
	      return baseValues(object, keysIn(object));
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Produces a random number between `min` and `max` (inclusive). If only one
	     * argument is provided a number between `0` and the given number is returned.
	     * If `floating` is `true`, or either `min` or `max` are floats, a floating-point
	     * number is returned instead of an integer.
	     *
	     * @static
	     * @memberOf _
	     * @category Number
	     * @param {number} [min=0] The minimum possible value.
	     * @param {number} [max=1] The maximum possible value.
	     * @param {boolean} [floating] Specify returning a floating-point number.
	     * @returns {number} Returns the random number.
	     * @example
	     *
	     * _.random(0, 5);
	     * // => an integer between 0 and 5
	     *
	     * _.random(5);
	     * // => also an integer between 0 and 5
	     *
	     * _.random(5, true);
	     * // => a floating-point number between 0 and 5
	     *
	     * _.random(1.2, 5.2);
	     * // => a floating-point number between 1.2 and 5.2
	     */
	    function random(min, max, floating) {
	      if (floating && isIterateeCall(min, max, floating)) {
	        max = floating = null;
	      }
	      var noMin = min == null,
	          noMax = max == null;

	      if (floating == null) {
	        if (noMax && typeof min == 'boolean') {
	          floating = min;
	          min = 1;
	        }
	        else if (typeof max == 'boolean') {
	          floating = max;
	          noMax = true;
	        }
	      }
	      if (noMin && noMax) {
	        max = 1;
	        noMax = false;
	      }
	      min = +min || 0;
	      if (noMax) {
	        max = min;
	        min = 0;
	      } else {
	        max = +max || 0;
	      }
	      if (floating || min % 1 || max % 1) {
	        var rand = nativeRandom();
	        return nativeMin(min + (rand * (max - min + parseFloat('1e-' + (String(rand).length - 1)))), max);
	      }
	      return baseRandom(min, max);
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Converts `string` to camel case.
	     * See [Wikipedia](http://en.wikipedia.org/wiki/CamelCase) for more details.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to camel case.
	     * @returns {string} Returns the camel cased string.
	     * @example
	     *
	     * _.camelCase('Hello world');
	     * // => 'helloWorld'
	     *
	     * _.camelCase('--hello-world');
	     * // => 'helloWorld'
	     *
	     * _.camelCase('__hello_world__');
	     * // => 'helloWorld'
	     */
	    var camelCase = createCompounder(function(result, word, index) {
	      word = word.toLowerCase();
	      return index ? (result + word.charAt(0).toUpperCase() + word.slice(1)) : word;
	    });

	    /**
	     * Capitalizes the first character of `string`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to capitalize.
	     * @returns {string} Returns the capitalized string.
	     * @example
	     *
	     * _.capitalize('fred');
	     * // => 'Fred'
	     */
	    function capitalize(string) {
	      string = string == null ? '' : String(string);
	      return string ? (string.charAt(0).toUpperCase() + string.slice(1)) : string;
	    }

	    /**
	     * Deburrs `string` by converting latin-1 supplementary letters to basic latin letters.
	     * See [Wikipedia](http://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
	     * for more details.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to deburr.
	     * @returns {string} Returns the deburred string.
	     * @example
	     *
	     * _.deburr('déjà vu');
	     * // => 'deja vu'
	     */
	    function deburr(string) {
	      string = string == null ? '' : String(string);
	      return string ? string.replace(reLatin1, deburrLetter) : string;
	    }

	    /**
	     * Checks if `string` ends with the given target string.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to search.
	     * @param {string} [target] The string to search for.
	     * @param {number} [position=string.length] The position to search from.
	     * @returns {boolean} Returns `true` if `string` ends with `target`, else `false`.
	     * @example
	     *
	     * _.endsWith('abc', 'c');
	     * // => true
	     *
	     * _.endsWith('abc', 'b');
	     * // => false
	     *
	     * _.endsWith('abc', 'b', 2);
	     * // => true
	     */
	    function endsWith(string, target, position) {
	      string = string == null ? '' : String(string);
	      target = String(target);

	      var length = string.length;
	      position = (typeof position == 'undefined' ? length : nativeMin(position < 0 ? 0 : (+position || 0), length)) - target.length;
	      return position >= 0 && string.indexOf(target, position) == position;
	    }

	    /**
	     * Converts the characters "&", "<", ">", '"', "'", and '`', in `string` to
	     * their corresponding HTML entities.
	     *
	     * **Note:** No other characters are escaped. To escape additional characters
	     * use a third-party library like [_he_](http://mths.be/he).
	     *
	     * Though the ">" character is escaped for symmetry, characters like
	     * ">" and "/" don't require escaping in HTML and have no special meaning
	     * unless they're part of a tag or unquoted attribute value.
	     * See [Mathias Bynens's article](http://mathiasbynens.be/notes/ambiguous-ampersands)
	     * (under "semi-related fun fact") for more details.
	     *
	     * Backticks are escaped because in Internet Explorer < 9, they can break out
	     * of attribute values or HTML comments. See [#102](http://html5sec.org/#102),
	     * [#108](http://html5sec.org/#108), and [#133](http://html5sec.org/#133) of
	     * the [HTML5 Security Cheatsheet](http://html5sec.org/) for more details.
	     *
	     * When working with HTML you should always quote attribute values to reduce
	     * XSS vectors. See [Ryan Grove's article](http://wonko.com/post/html-escaping)
	     * for more details.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to escape.
	     * @returns {string} Returns the escaped string.
	     * @example
	     *
	     * _.escape('fred, barney, & pebbles');
	     * // => 'fred, barney, &amp; pebbles'
	     */
	    function escape(string) {
	      // Reset `lastIndex` because in IE < 9 `String#replace` does not.
	      string = string == null ? '' : String(string);
	      return (string && reHasUnescapedHtml.test(string))
	        ? string.replace(reUnescapedHtml, escapeHtmlChar)
	        : string;
	    }

	    /**
	     * Escapes the `RegExp` special characters "\", "^", "$", ".", "|", "?", "*",
	     * "+", "(", ")", "[", "]", "{" and "}" in `string`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to escape.
	     * @returns {string} Returns the escaped string.
	     * @example
	     *
	     * _.escapeRegExp('[lodash](https://lodash.com/)');
	     * // => '\[lodash\]\(https://lodash\.com/\)'
	     */
	    function escapeRegExp(string) {
	      string = string == null ? '' : String(string);
	      return (string && reHasRegExpChars.test(string))
	        ? string.replace(reRegExpChars, '\\$&')
	        : string;
	    }

	    /**
	     * Converts `string` to kebab case (a.k.a. spinal case).
	     * See [Wikipedia](http://en.wikipedia.org/wiki/Letter_case#Computers) for
	     * more details.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to kebab case.
	     * @returns {string} Returns the kebab cased string.
	     * @example
	     *
	     * _.kebabCase('Hello world');
	     * // => 'hello-world'
	     *
	     * _.kebabCase('helloWorld');
	     * // => 'hello-world'
	     *
	     * _.kebabCase('__hello_world__');
	     * // => 'hello-world'
	     */
	    var kebabCase = createCompounder(function(result, word, index) {
	      return result + (index ? '-' : '') + word.toLowerCase();
	    });

	    /**
	     * Pads `string` on the left and right sides if it is shorter then the given
	     * padding length. The `chars` string may be truncated if the number of padding
	     * characters can't be evenly divided by the padding length.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to pad.
	     * @param {number} [length=0] The padding length.
	     * @param {string} [chars=' '] The string used as padding.
	     * @returns {string} Returns the padded string.
	     * @example
	     *
	     * _.pad('abc', 8);
	     * // => '  abc   '
	     *
	     * _.pad('abc', 8, '_-');
	     * // => '_-abc_-_'
	     *
	     * _.pad('abc', 3);
	     * // => 'abc'
	     */
	    function pad(string, length, chars) {
	      string = string == null ? '' : String(string);
	      length = +length;

	      var strLength = string.length;
	      if (strLength >= length || !nativeIsFinite(length)) {
	        return string;
	      }
	      var mid = (length - strLength) / 2,
	          leftLength = floor(mid),
	          rightLength = ceil(mid);

	      chars = createPad('', rightLength, chars);
	      return chars.slice(0, leftLength) + string + chars;
	    }

	    /**
	     * Pads `string` on the left side if it is shorter then the given padding
	     * length. The `chars` string may be truncated if the number of padding
	     * characters exceeds the padding length.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to pad.
	     * @param {number} [length=0] The padding length.
	     * @param {string} [chars=' '] The string used as padding.
	     * @returns {string} Returns the padded string.
	     * @example
	     *
	     * _.padLeft('abc', 6);
	     * // => '   abc'
	     *
	     * _.padLeft('abc', 6, '_-');
	     * // => '_-_abc'
	     *
	     * _.padLeft('abc', 3);
	     * // => 'abc'
	     */
	    function padLeft(string, length, chars) {
	      string = string == null ? '' : String(string);
	      return string ? (createPad(string, length, chars) + string) : string;
	    }

	    /**
	     * Pads `string` on the right side if it is shorter then the given padding
	     * length. The `chars` string may be truncated if the number of padding
	     * characters exceeds the padding length.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to pad.
	     * @param {number} [length=0] The padding length.
	     * @param {string} [chars=' '] The string used as padding.
	     * @returns {string} Returns the padded string.
	     * @example
	     *
	     * _.padRight('abc', 6);
	     * // => 'abc   '
	     *
	     * _.padRight('abc', 6, '_-');
	     * // => 'abc_-_'
	     *
	     * _.padRight('abc', 3);
	     * // => 'abc'
	     */
	    function padRight(string, length, chars) {
	      string = string == null ? '' : String(string);
	      return string ? (string + createPad(string, length, chars)) : string;
	    }

	    /**
	     * Converts `string` to an integer of the specified radix. If `radix` is
	     * `undefined` or `0`, a `radix` of `10` is used unless `value` is a hexadecimal,
	     * in which case a `radix` of `16` is used.
	     *
	     * **Note:** This method aligns with the ES5 implementation of `parseInt`.
	     * See the [ES5 spec](http://es5.github.io/#E) for more details.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} string The string to parse.
	     * @param {number} [radix] The radix to interpret `value` by.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {number} Returns the converted integer.
	     * @example
	     *
	     * _.parseInt('08');
	     * // => 8
	     */
	    function parseInt(string, radix, guard) {
	      if (guard && isIterateeCall(string, radix, guard)) {
	        radix = 0;
	      }
	      return nativeParseInt(string, radix);
	    }
	    // Fallback for environments with pre-ES5 implementations.
	    if (nativeParseInt(whitespace + '08') != 8) {
	      parseInt = function(string, radix, guard) {
	        // Firefox < 21 and Opera < 15 follow ES3 for `parseInt` and
	        // Chrome fails to trim leading <BOM> whitespace characters.
	        // See https://code.google.com/p/v8/issues/detail?id=3109.
	        radix = (guard && isIterateeCall(string, radix, guard)) ? 0 : +radix;
	        string = trim(string);
	        return nativeParseInt(string, radix || (reHexPrefix.test(string) ? 16 : 10));
	      };
	    }

	    /**
	     * Repeats the given string `n` times.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to repeat.
	     * @param {number} [n=0] The number of times to repeat the string.
	     * @returns {string} Returns the repeated string.
	     * @example
	     *
	     * _.repeat('*', 3);
	     * // => '***'
	     *
	     * _.repeat('abc', 2);
	     * // => 'abcabc'
	     *
	     * _.repeat('abc', 0);
	     * // => ''
	     */
	    function repeat(string, n) {
	      var result = '';
	      n = +n;

	      if (n < 1 || string == null || !nativeIsFinite(n)) {
	        return result;
	      }
	      string = String(string);

	      // Leverage the exponentiation by squaring algorithm for a faster repeat.
	      // See http://en.wikipedia.org/wiki/Exponentiation_by_squaring.
	      do {
	        if (n % 2) {
	          result += string;
	        }
	        n = floor(n / 2);
	        string += string;
	      } while (n);

	      return result;
	    }

	    /**
	     * Converts `string` to snake case.
	     * See [Wikipedia](http://en.wikipedia.org/wiki/Snake_case) for more details.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to snake case.
	     * @returns {string} Returns the snake cased string.
	     * @example
	     *
	     * _.snakeCase('Hello world');
	     * // => 'hello_world'
	     *
	     * _.snakeCase('--hello-world');
	     * // => 'hello_world'
	     *
	     * _.snakeCase('helloWorld');
	     * // => 'hello_world'
	     */
	    var snakeCase = createCompounder(function(result, word, index) {
	      return result + (index ? '_' : '') + word.toLowerCase();
	    });

	    /**
	     * Checks if `string` starts with the given target string.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to search.
	     * @param {string} [target] The string to search for.
	     * @param {number} [position=0] The position to search from.
	     * @returns {boolean} Returns `true` if `string` starts with `target`, else `false`.
	     * @example
	     *
	     * _.startsWith('abc', 'a');
	     * // => true
	     *
	     * _.startsWith('abc', 'b');
	     * // => false
	     *
	     * _.startsWith('abc', 'b', 1);
	     * // => true
	     */
	    function startsWith(string, target, position) {
	      string = string == null ? '' : String(string);
	      position = typeof position == 'undefined' ? 0 : nativeMin(position < 0 ? 0 : (+position || 0), string.length);
	      return string.lastIndexOf(target, position) == position;
	    }

	    /**
	     * Creates a compiled template function that can interpolate data properties
	     * in "interpolate" delimiters, HTML-escape interpolated data properties in
	     * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
	     * properties may be accessed as free variables in the template. If a setting
	     * object is provided it takes precedence over `_.templateSettings` values.
	     *
	     * **Note:** In the development build `_.template` utilizes sourceURLs for easier debugging.
	     * See the [HTML5 Rocks article on sourcemaps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
	     * for more details.
	     *
	     * For more information on precompiling templates see
	     * [Lo-Dash's custom builds documentation](https://lodash.com/custom-builds).
	     *
	     * For more information on Chrome extension sandboxes see
	     * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The template string.
	     * @param {Object} [options] The options object.
	     * @param {RegExp} [options.escape] The HTML "escape" delimiter.
	     * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
	     * @param {Object} [options.imports] An object to import into the template as free variables.
	     * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
	     * @param {string} [options.sourceURL] The sourceURL of the template's compiled source.
	     * @param {string} [options.variable] The data object variable name.
	     * @param- {Object} [otherOptions] Enables the legacy `options` param signature.
	     * @returns {Function} Returns the compiled template function.
	     * @example
	     *
	     * // using the "interpolate" delimiter to create a compiled template
	     * var compiled = _.template('hello <%= user %>!');
	     * compiled({ 'user': 'fred' });
	     * // => 'hello fred!'
	     *
	     * // using the HTML "escape" delimiter to escape data property values
	     * var compiled = _.template('<b><%- value %></b>');
	     * compiled({ 'value': '<script>' });
	     * // => '<b>&lt;script&gt;</b>'
	     *
	     * // using the "evaluate" delimiter to execute JavaScript and generate HTML
	     * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
	     * compiled({ 'users': ['fred', 'barney'] });
	     * // => '<li>fred</li><li>barney</li>'
	     *
	     * // using the internal `print` function in "evaluate" delimiters
	     * var compiled = _.template('<% print("hello " + user); %>!');
	     * compiled({ 'user': 'barney' });
	     * // => 'hello barney!'
	     *
	     * // using the ES6 delimiter as an alternative to the default "interpolate" delimiter
	     * var compiled = _.template('hello ${ user }!');
	     * compiled({ 'user': 'pebbles' });
	     * // => 'hello pebbles!'
	     *
	     * // using custom template delimiters
	     * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
	     * var compiled = _.template('hello {{ user }}!');
	     * compiled({ 'user': 'mustache' });
	     * // => 'hello mustache!'
	     *
	     * // using backslashes to treat delimiters as plain text
	     * var compiled = _.template('<%= "\\<%- value %\\>" %>');
	     * compiled({ 'value': 'ignored' });
	     * // => '<%- value %>'
	     *
	     * // using the `imports` option to import `jQuery` as `jq`
	     * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
	     * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
	     * compiled({ 'users': ['fred', 'barney'] });
	     * // => '<li>fred</li><li>barney</li>'
	     *
	     * // using the `sourceURL` option to specify a custom sourceURL for the template
	     * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
	     * compiled(data);
	     * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
	     *
	     * // using the `variable` option to ensure a with-statement isn't used in the compiled template
	     * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
	     * compiled.source;
	     * // => function(data) {
	     *   var __t, __p = '';
	     *   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
	     *   return __p;
	     * }
	     *
	     * // using the `source` property to inline compiled templates for meaningful
	     * // line numbers in error messages and a stack trace
	     * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
	     *   var JST = {\
	     *     "main": ' + _.template(mainText).source + '\
	     *   };\
	     * ');
	     */
	    function template(string, options, otherOptions) {
	      // Based on John Resig's `tmpl` implementation (http://ejohn.org/blog/javascript-micro-templating/)
	      // and Laura Doktorova's doT.js (https://github.com/olado/doT).
	      var settings = lodash.templateSettings;

	      if (otherOptions && isIterateeCall(string, options, otherOptions)) {
	        options = otherOptions = null;
	      }
	      string = String(string == null ? '' : string);
	      options = baseAssign(baseAssign({}, otherOptions || options), settings, assignOwnDefaults);

	      var imports = baseAssign(baseAssign({}, options.imports), settings.imports, assignOwnDefaults),
	          importsKeys = keys(imports),
	          importsValues = baseValues(imports, importsKeys);

	      var isEscaping,
	          isEvaluating,
	          index = 0,
	          interpolate = options.interpolate || reNoMatch,
	          source = "__p += '";

	      // Compile the regexp to match each delimiter.
	      var reDelimiters = RegExp(
	        (options.escape || reNoMatch).source + '|' +
	        interpolate.source + '|' +
	        (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
	        (options.evaluate || reNoMatch).source + '|$'
	      , 'g');

	      // Use a sourceURL for easier debugging.
	      // See http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl.
	      var sourceURL = '//# sourceURL=' +
	        ('sourceURL' in options
	          ? options.sourceURL
	          : ('/lodash/template/source[' + (++templateCounter) + ']')
	        ) + '\n';

	      string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
	        interpolateValue || (interpolateValue = esTemplateValue);

	        // Escape characters that can't be included in string literals.
	        source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);

	        // Replace delimiters with snippets.
	        if (escapeValue) {
	          isEscaping = true;
	          source += "' +\n__e(" + escapeValue + ") +\n'";
	        }
	        if (evaluateValue) {
	          isEvaluating = true;
	          source += "';\n" + evaluateValue + ";\n__p += '";
	        }
	        if (interpolateValue) {
	          source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
	        }
	        index = offset + match.length;

	        // The JS engine embedded in Adobe products requires returning the `match`
	        // string in order to produce the correct `offset` value.
	        return match;
	      });

	      source += "';\n";

	      // If `variable` is not specified, wrap a with-statement around the generated
	      // code to add the data object to the top of the scope chain.
	      var variable = options.variable;
	      if (!variable) {
	        source = 'with (obj) {\n' + source + '\n}\n';
	      }
	      // Cleanup code by stripping empty strings.
	      source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
	        .replace(reEmptyStringMiddle, '$1')
	        .replace(reEmptyStringTrailing, '$1;');

	      // Frame code as the function body.
	      source = 'function(' + (variable || 'obj') + ') {\n' +
	        (variable
	          ? ''
	          : 'obj || (obj = {});\n'
	        ) +
	        "var __t, __p = ''" +
	        (isEscaping
	           ? ', __e = _.escape'
	           : ''
	        ) +
	        (isEvaluating
	          ? ', __j = Array.prototype.join;\n' +
	            "function print() { __p += __j.call(arguments, '') }\n"
	          : ';\n'
	        ) +
	        source +
	        'return __p\n}';

	      var result = attempt(function() {
	        return Function(importsKeys, sourceURL + 'return ' + source).apply(undefined, importsValues);
	      });

	      // Provide the compiled function's source by its `toString` method or
	      // the `source` property as a convenience for inlining compiled templates.
	      result.source = source;
	      if (isError(result)) {
	        throw result;
	      }
	      return result;
	    }

	    /**
	     * Removes leading and trailing whitespace or specified characters from `string`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to trim.
	     * @param {string} [chars=whitespace] The characters to trim.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {string} Returns the trimmed string.
	     * @example
	     *
	     * _.trim('  fred  ');
	     * // => 'fred'
	     *
	     * _.trim('-_-fred-_-', '_-');
	     * // => 'fred'
	     */
	    function trim(string, chars, guard) {
	      var value = string;
	      string = string == null ? '' : String(string);
	      if (!string) {
	        return string;
	      }
	      if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
	        return string.slice(trimmedLeftIndex(string), trimmedRightIndex(string) + 1);
	      }
	      chars = String(chars);
	      return string.slice(charsLeftIndex(string, chars), charsRightIndex(string, chars) + 1);
	    }

	    /**
	     * Removes leading whitespace or specified characters from `string`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to trim.
	     * @param {string} [chars=whitespace] The characters to trim.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {string} Returns the trimmed string.
	     * @example
	     *
	     * _.trimLeft('  fred  ');
	     * // => 'fred  '
	     *
	     * _.trimLeft('-_-fred-_-', '_-');
	     * // => 'fred-_-'
	     */
	    function trimLeft(string, chars, guard) {
	      var value = string;
	      string = string == null ? '' : String(string);
	      if (!string) {
	        return string;
	      }
	      if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
	        return string.slice(trimmedLeftIndex(string))
	      }
	      chars = String(chars);
	      return string.slice(charsLeftIndex(string, chars));
	    }

	    /**
	     * Removes trailing whitespace or specified characters from `string`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to trim.
	     * @param {string} [chars=whitespace] The characters to trim.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {string} Returns the trimmed string.
	     * @example
	     *
	     * _.trimRight('  fred  ');
	     * // => '  fred'
	     *
	     * _.trimRight('-_-fred-_-', '_-');
	     * // => '-_-fred'
	     */
	    function trimRight(string, chars, guard) {
	      var value = string;
	      string = string == null ? '' : String(string);
	      if (!string) {
	        return string;
	      }
	      if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
	        return string.slice(0, trimmedRightIndex(string) + 1)
	      }
	      chars = String(chars);
	      return string.slice(0, charsRightIndex(string, chars) + 1);
	    }

	    /**
	     * Truncates `string` if it is longer than the given maximum string length.
	     * The last characters of the truncated string are replaced with the omission
	     * string which defaults to "...".
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to truncate.
	     * @param {Object|number} [options] The options object or maximum string length.
	     * @param {number} [options.length=30] The maximum string length.
	     * @param {string} [options.omission='...'] The string to indicate text is omitted.
	     * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {string} Returns the truncated string.
	     * @example
	     *
	     * _.trunc('hi-diddly-ho there, neighborino');
	     * // => 'hi-diddly-ho there, neighbo...'
	     *
	     * _.trunc('hi-diddly-ho there, neighborino', 24);
	     * // => 'hi-diddly-ho there, n...'
	     *
	     * _.trunc('hi-diddly-ho there, neighborino', { 'length': 24, 'separator': ' ' });
	     * // => 'hi-diddly-ho there,...'
	     *
	     * _.trunc('hi-diddly-ho there, neighborino', { 'length': 24, 'separator': /,? +/ });
	     * //=> 'hi-diddly-ho there...'
	     *
	     * _.trunc('hi-diddly-ho there, neighborino', { 'omission': ' [...]' });
	     * // => 'hi-diddly-ho there, neig [...]'
	     */
	    function trunc(string, options, guard) {
	      if (guard && isIterateeCall(string, options, guard)) {
	        options = null;
	      }
	      var length = DEFAULT_TRUNC_LENGTH,
	          omission = DEFAULT_TRUNC_OMISSION;

	      if (isObject(options)) {
	        var separator = 'separator' in options ? options.separator : separator;
	        length = 'length' in options ? +options.length || 0 : length;
	        omission = 'omission' in options ? String(options.omission) : omission;
	      }
	      else if (options != null) {
	        length = +options || 0;
	      }
	      string = string == null ? '' : String(string);
	      if (length >= string.length) {
	        return string;
	      }
	      var end = length - omission.length;
	      if (end < 1) {
	        return omission;
	      }
	      var result = string.slice(0, end);
	      if (separator == null) {
	        return result + omission;
	      }
	      if (isRegExp(separator)) {
	        if (string.slice(end).search(separator)) {
	          var match,
	              newEnd,
	              substring = string.slice(0, end);

	          if (!separator.global) {
	            separator = RegExp(separator.source, (reFlags.exec(separator) || '') + 'g');
	          }
	          separator.lastIndex = 0;
	          while ((match = separator.exec(substring))) {
	            newEnd = match.index;
	          }
	          result = result.slice(0, newEnd == null ? end : newEnd);
	        }
	      } else if (string.indexOf(separator, end) != end) {
	        var index = result.lastIndexOf(separator);
	        if (index > -1) {
	          result = result.slice(0, index);
	        }
	      }
	      return result + omission;
	    }

	    /**
	     * The inverse of `_.escape`; this method converts the HTML entities
	     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;`, and `&#96;` in `string` to their
	     * corresponding characters.
	     *
	     * **Note:** No other HTML entities are unescaped. To unescape additional HTML
	     * entities use a third-party library like [_he_](http://mths.be/he).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to unescape.
	     * @returns {string} Returns the unescaped string.
	     * @example
	     *
	     * _.unescape('fred, barney, &amp; pebbles');
	     * // => 'fred, barney, & pebbles'
	     */
	    function unescape(string) {
	      string = string == null ? '' : String(string);
	      return (string && reHasEscapedHtml.test(string))
	        ? string.replace(reEscapedHtml, unescapeHtmlChar)
	        : string;
	    }

	    /**
	     * Splits `string` into an array of its words.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to inspect.
	     * @param {RegExp|string} [pattern] The pattern to match words.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the words of `string`.
	     * @example
	     *
	     * _.words('fred, barney, & pebbles');
	     * // => ['fred', 'barney', 'pebbles']
	     *
	     * _.words('fred, barney, & pebbles', /[^, ]+/g);
	     * // => ['fred', 'barney', '&', 'pebbles']
	     */
	    function words(string, pattern, guard) {
	      if (guard && isIterateeCall(string, pattern, guard)) {
	        pattern = null;
	      }
	      string = string != null && String(string);
	      return (string && string.match(pattern || reWords)) || [];
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Attempts to invoke `func`, returning either the result or the caught
	     * error object.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {*} func The function to attempt.
	     * @returns {*} Returns the `func` result or error object.
	     * @example
	     *
	     * // avoid throwing errors for invalid selectors
	     * var elements = _.attempt(function() {
	     *   return document.querySelectorAll(selector);
	     * });
	     *
	     * if (_.isError(elements)) {
	     *   elements = [];
	     * }
	     */
	    function attempt(func) {
	      try {
	        return func();
	      } catch(e) {
	        return isError(e) ? e : Error(e);
	      }
	    }

	    /**
	     * Creates a function bound to an optional `thisArg`. If `func` is a property
	     * name the created callback returns the property value for a given element.
	     * If `func` is an object the created callback returns `true` for elements
	     * that contain the equivalent object properties, otherwise it returns `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias iteratee
	     * @category Utility
	     * @param {*} [func=_.identity] The value to convert to a callback.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Function} Returns the callback.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 40 }
	     * ];
	     *
	     * // wrap to create custom callback shorthands
	     * _.callback = _.wrap(_.callback, function(callback, func, thisArg) {
	     *   var match = /^(.+?)__([gl]t)(.+)$/.exec(func);
	     *   if (!match) {
	     *     return callback(func, thisArg);
	     *   }
	     *   return function(object) {
	     *     return match[2] == 'gt' ? object[match[1]] > match[3] : object[match[1]] < match[3];
	     *   };
	     * });
	     *
	     * _.filter(users, 'age__gt36');
	     * // => [{ 'user': 'fred', 'age': 40 }]
	     */
	    function callback(func, thisArg, guard) {
	      if (guard && isIterateeCall(func, thisArg, guard)) {
	        thisArg = null;
	      }
	      return baseCallback(func, thisArg);
	    }

	    /**
	     * Creates a function that returns `value`.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {*} value The value to return from the new function.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var object = { 'user': 'fred' };
	     * var getter = _.constant(object);
	     * getter() === object;
	     * // => true
	     */
	    function constant(value) {
	      return function() {
	        return value;
	      };
	    }

	    /**
	     * This method returns the first argument provided to it.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {*} value Any value.
	     * @returns {*} Returns `value`.
	     * @example
	     *
	     * var object = { 'user': 'fred' };
	     * _.identity(object) === object;
	     * // => true
	     */
	    function identity(value) {
	      return value;
	    }

	    /**
	     * Creates a "_.where" style predicate function which performs a deep comparison
	     * between a given object and `source`, returning `true` if the given object
	     * has equivalent property values, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Object} source The object of property values to match.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'fred',   'age': 40 },
	     *   { 'user': 'barney', 'age': 36 }
	     * ];
	     *
	     * var matchesAge = _.matches({ 'age': 36 });
	     *
	     * _.filter(users, matchesAge);
	     * // => [{ 'user': 'barney', 'age': 36 }]
	     *
	     * _.find(users, matchesAge);
	     * // => { 'user': 'barney', 'age': 36 }
	     */
	    function matches(source) {
	      return baseMatches(source, true);
	    }

	    /**
	     * Adds all own enumerable function properties of a source object to the
	     * destination object. If `object` is a function then methods are added to
	     * its prototype as well.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Function|Object} [object=this] object The destination object.
	     * @param {Object} source The object of functions to add.
	     * @param {Object} [options] The options object.
	     * @param {boolean} [options.chain=true] Specify whether the functions added
	     *  are chainable.
	     * @returns {Function|Object} Returns `object`.
	     * @example
	     *
	     * function vowels(string) {
	     *   return _.filter(string, function(v) {
	     *     return /[aeiou]/i.test(v);
	     *   });
	     * }
	     *
	     * _.mixin({ 'vowels': vowels });
	     * _.vowels('fred');
	     * // => ['e']
	     *
	     * _('fred').vowels().value();
	     * // => ['e']
	     *
	     * _.mixin({ 'vowels': vowels }, { 'chain': false });
	     * _('fred').vowels();
	     * // => ['e']
	     */
	    function mixin(object, source, options) {
	      var chain = true,
	          isObj = isObject(source),
	          noOpts = options == null,
	          props = noOpts && isObj && keys(source),
	          methodNames = props && baseFunctions(source, props);

	      if ((props && props.length && !methodNames.length) || (noOpts && !isObj)) {
	        if (noOpts) {
	          options = source;
	        }
	        methodNames = false;
	        source = object;
	        object = this;
	      }
	      methodNames || (methodNames = baseFunctions(source, keys(source)));
	      if (options === false) {
	        chain = false;
	      } else if (isObject(options) && 'chain' in options) {
	        chain = options.chain;
	      }
	      var index = -1,
	          isFunc = isFunction(object),
	          length = methodNames.length;

	      while (++index < length) {
	        var methodName = methodNames[index];
	        object[methodName] = source[methodName];
	        if (isFunc) {
	          object.prototype[methodName] = (function(methodName) {
	            return function() {
	              var chainAll = this.__chain__;
	              if (chain || chainAll) {
	                var result = object(this.__wrapped__);
	                (result.__actions__ = baseSlice(this.__actions__)).push({ 'args': arguments, 'object': object, 'name': methodName });
	                result.__chain__ = chainAll;
	                return result;
	              }
	              var args = [this.value()];
	              push.apply(args, arguments);
	              return object[methodName].apply(object, args);
	            };
	          }(methodName));
	        }
	      }
	      return object;
	    }

	    /**
	     * Reverts the `_` variable to its previous value and returns a reference to
	     * the `lodash` function.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @returns {Function} Returns the `lodash` function.
	     * @example
	     *
	     * var lodash = _.noConflict();
	     */
	    function noConflict() {
	      context._ = oldDash;
	      return this;
	    }

	    /**
	     * A no-operation function.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @example
	     *
	     * var object = { 'user': 'fred' };
	     * _.noop(object) === undefined;
	     * // => true
	     */
	    function noop() {
	      // No operation performed.
	    }

	    /**
	     * Creates a "_.pluck" style function which returns the property value
	     * of `key` on a given object.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {string} key The name of the property to retrieve.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'fred' },
	     *   { 'user': 'barney' }
	     * ];
	     *
	     * var getName = _.property('user');
	     *
	     * _.map(users, getName);
	     * // => ['fred', barney']
	     *
	     * _.pluck(_.sortBy(users, getName), 'user');
	     * // => ['barney', 'fred']
	     */
	    function property(key) {
	      return baseProperty(String(key));
	    }

	    /**
	     * The inverse of `_.property`; this method creates a function which returns
	     * the property value of a given key on `object`.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Object} object The object to inspect.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var object = { 'user': 'fred', 'age': 40, 'active': true };
	     * _.map(['active', 'user'], _.propertyOf(object));
	     * // => [true, 'fred']
	     *
	     * var object = { 'a': 3, 'b': 1, 'c': 2 };
	     * _.sortBy(['a', 'b', 'c'], _.propertyOf(object));
	     * // => ['b', 'c', 'a']
	     */
	    function propertyOf(object) {
	      return function(key) {
	        return object == null ? undefined : object[key];
	      };
	    }

	    /**
	     * Creates an array of numbers (positive and/or negative) progressing from
	     * `start` up to, but not including, `end`. If `start` is less than `end` a
	     * zero-length range is created unless a negative `step` is specified.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {number} [start=0] The start of the range.
	     * @param {number} end The end of the range.
	     * @param {number} [step=1] The value to increment or decrement by.
	     * @returns {Array} Returns the new array of numbers.
	     * @example
	     *
	     * _.range(4);
	     * // => [0, 1, 2, 3]
	     *
	     * _.range(1, 5);
	     * // => [1, 2, 3, 4]
	     *
	     * _.range(0, 20, 5);
	     * // => [0, 5, 10, 15]
	     *
	     * _.range(0, -4, -1);
	     * // => [0, -1, -2, -3]
	     *
	     * _.range(1, 4, 0);
	     * // => [1, 1, 1]
	     *
	     * _.range(0);
	     * // => []
	     */
	    function range(start, end, step) {
	      if (step && isIterateeCall(start, end, step)) {
	        end = step = null;
	      }
	      start = +start || 0;
	      step = step == null ? 1 : (+step || 0);

	      if (end == null) {
	        end = start;
	        start = 0;
	      } else {
	        end = +end || 0;
	      }
	      // Use `Array(length)` so engines like Chakra and V8 avoid slower modes.
	      // See http://youtu.be/XAqIpGU8ZZk#t=17m25s.
	      var index = -1,
	          length = nativeMax(ceil((end - start) / (step || 1)), 0),
	          result = Array(length);

	      while (++index < length) {
	        result[index] = start;
	        start += step;
	      }
	      return result;
	    }

	    /**
	     * Invokes the iteratee function `n` times, returning an array of the results
	     * of each invocation. The `iteratee` is bound to `thisArg` and invoked with
	     * one argument; (index).
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {number} n The number of times to invoke `iteratee`.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array} Returns the array of results.
	     * @example
	     *
	     * var diceRolls = _.times(3, _.partial(_.random, 1, 6, false));
	     * // => [3, 6, 4]
	     *
	     * _.times(3, function(n) { mage.castSpell(n); });
	     * // => invokes `mage.castSpell(n)` three times with `n` of `0`, `1`, and `2` respectively
	     *
	     * _.times(3, function(n) { this.cast(n); }, mage);
	     * // => also invokes `mage.castSpell(n)` three times
	     */
	    function times(n, iteratee, thisArg) {
	      n = +n;

	      // Exit early to avoid a JSC JIT bug in Safari 8
	      // where `Array(0)` is treated as `Array(1)`.
	      if (n < 1 || !nativeIsFinite(n)) {
	        return [];
	      }
	      var index = -1,
	          result = Array(nativeMin(n, MAX_ARRAY_LENGTH));

	      iteratee = bindCallback(iteratee, thisArg, 1);
	      while (++index < n) {
	        if (index < MAX_ARRAY_LENGTH) {
	          result[index] = iteratee(index);
	        } else {
	          iteratee(index);
	        }
	      }
	      return result;
	    }

	    /**
	     * Generates a unique ID. If `prefix` is provided the ID is appended to it.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {string} [prefix] The value to prefix the ID with.
	     * @returns {string} Returns the unique ID.
	     * @example
	     *
	     * _.uniqueId('contact_');
	     * // => 'contact_104'
	     *
	     * _.uniqueId();
	     * // => '105'
	     */
	    function uniqueId(prefix) {
	      var id = ++idCounter;
	      return String(prefix == null ? '' : prefix) + id;
	    }

	    /*------------------------------------------------------------------------*/

	    // Ensure `new LodashWrapper` is an instance of `lodash`.
	    LodashWrapper.prototype = lodash.prototype;

	    // Add functions to the `Map` cache.
	    MapCache.prototype['delete'] = mapDelete;
	    MapCache.prototype.get = mapGet;
	    MapCache.prototype.has = mapHas;
	    MapCache.prototype.set = mapSet;

	    // Add functions to the `Set` cache.
	    SetCache.prototype.push = cachePush;

	    // Assign cache to `_.memoize`.
	    memoize.Cache = MapCache;

	    // Add functions that return wrapped values when chaining.
	    lodash.after = after;
	    lodash.ary = ary;
	    lodash.assign = assign;
	    lodash.at = at;
	    lodash.before = before;
	    lodash.bind = bind;
	    lodash.bindAll = bindAll;
	    lodash.bindKey = bindKey;
	    lodash.callback = callback;
	    lodash.chain = chain;
	    lodash.chunk = chunk;
	    lodash.compact = compact;
	    lodash.constant = constant;
	    lodash.countBy = countBy;
	    lodash.create = create;
	    lodash.curry = curry;
	    lodash.curryRight = curryRight;
	    lodash.debounce = debounce;
	    lodash.defaults = defaults;
	    lodash.defer = defer;
	    lodash.delay = delay;
	    lodash.difference = difference;
	    lodash.drop = drop;
	    lodash.dropRight = dropRight;
	    lodash.dropRightWhile = dropRightWhile;
	    lodash.dropWhile = dropWhile;
	    lodash.filter = filter;
	    lodash.flatten = flatten;
	    lodash.flattenDeep = flattenDeep;
	    lodash.flow = flow;
	    lodash.flowRight = flowRight;
	    lodash.forEach = forEach;
	    lodash.forEachRight = forEachRight;
	    lodash.forIn = forIn;
	    lodash.forInRight = forInRight;
	    lodash.forOwn = forOwn;
	    lodash.forOwnRight = forOwnRight;
	    lodash.functions = functions;
	    lodash.groupBy = groupBy;
	    lodash.indexBy = indexBy;
	    lodash.initial = initial;
	    lodash.intersection = intersection;
	    lodash.invert = invert;
	    lodash.invoke = invoke;
	    lodash.keys = keys;
	    lodash.keysIn = keysIn;
	    lodash.map = map;
	    lodash.mapValues = mapValues;
	    lodash.matches = matches;
	    lodash.memoize = memoize;
	    lodash.merge = merge;
	    lodash.mixin = mixin;
	    lodash.negate = negate;
	    lodash.omit = omit;
	    lodash.once = once;
	    lodash.pairs = pairs;
	    lodash.partial = partial;
	    lodash.partialRight = partialRight;
	    lodash.partition = partition;
	    lodash.pick = pick;
	    lodash.pluck = pluck;
	    lodash.property = property;
	    lodash.propertyOf = propertyOf;
	    lodash.pull = pull;
	    lodash.pullAt = pullAt;
	    lodash.range = range;
	    lodash.rearg = rearg;
	    lodash.reject = reject;
	    lodash.remove = remove;
	    lodash.rest = rest;
	    lodash.shuffle = shuffle;
	    lodash.slice = slice;
	    lodash.sortBy = sortBy;
	    lodash.sortByAll = sortByAll;
	    lodash.take = take;
	    lodash.takeRight = takeRight;
	    lodash.takeRightWhile = takeRightWhile;
	    lodash.takeWhile = takeWhile;
	    lodash.tap = tap;
	    lodash.throttle = throttle;
	    lodash.thru = thru;
	    lodash.times = times;
	    lodash.toArray = toArray;
	    lodash.transform = transform;
	    lodash.union = union;
	    lodash.uniq = uniq;
	    lodash.unzip = unzip;
	    lodash.values = values;
	    lodash.valuesIn = valuesIn;
	    lodash.where = where;
	    lodash.without = without;
	    lodash.wrap = wrap;
	    lodash.xor = xor;
	    lodash.zip = zip;
	    lodash.zipObject = zipObject;

	    // Add aliases.
	    lodash.backflow = flowRight;
	    lodash.collect = map;
	    lodash.compose = flowRight;
	    lodash.each = forEach;
	    lodash.eachRight = forEachRight;
	    lodash.extend = assign;
	    lodash.iteratee = callback;
	    lodash.methods = functions;
	    lodash.object = zipObject;
	    lodash.select = filter;
	    lodash.tail = rest;
	    lodash.unique = uniq;

	    // Add functions to `lodash.prototype`.
	    mixin(lodash, lodash);

	    /*------------------------------------------------------------------------*/

	    // Add functions that return unwrapped values when chaining.
	    lodash.attempt = attempt;
	    lodash.camelCase = camelCase;
	    lodash.capitalize = capitalize;
	    lodash.clone = clone;
	    lodash.cloneDeep = cloneDeep;
	    lodash.deburr = deburr;
	    lodash.endsWith = endsWith;
	    lodash.escape = escape;
	    lodash.escapeRegExp = escapeRegExp;
	    lodash.every = every;
	    lodash.find = find;
	    lodash.findIndex = findIndex;
	    lodash.findKey = findKey;
	    lodash.findLast = findLast;
	    lodash.findLastIndex = findLastIndex;
	    lodash.findLastKey = findLastKey;
	    lodash.findWhere = findWhere;
	    lodash.first = first;
	    lodash.has = has;
	    lodash.identity = identity;
	    lodash.includes = includes;
	    lodash.indexOf = indexOf;
	    lodash.isArguments = isArguments;
	    lodash.isArray = isArray;
	    lodash.isBoolean = isBoolean;
	    lodash.isDate = isDate;
	    lodash.isElement = isElement;
	    lodash.isEmpty = isEmpty;
	    lodash.isEqual = isEqual;
	    lodash.isError = isError;
	    lodash.isFinite = isFinite;
	    lodash.isFunction = isFunction;
	    lodash.isMatch = isMatch;
	    lodash.isNaN = isNaN;
	    lodash.isNative = isNative;
	    lodash.isNull = isNull;
	    lodash.isNumber = isNumber;
	    lodash.isObject = isObject;
	    lodash.isPlainObject = isPlainObject;
	    lodash.isRegExp = isRegExp;
	    lodash.isString = isString;
	    lodash.isUndefined = isUndefined;
	    lodash.kebabCase = kebabCase;
	    lodash.last = last;
	    lodash.lastIndexOf = lastIndexOf;
	    lodash.max = max;
	    lodash.min = min;
	    lodash.noConflict = noConflict;
	    lodash.noop = noop;
	    lodash.now = now;
	    lodash.pad = pad;
	    lodash.padLeft = padLeft;
	    lodash.padRight = padRight;
	    lodash.parseInt = parseInt;
	    lodash.random = random;
	    lodash.reduce = reduce;
	    lodash.reduceRight = reduceRight;
	    lodash.repeat = repeat;
	    lodash.result = result;
	    lodash.runInContext = runInContext;
	    lodash.size = size;
	    lodash.snakeCase = snakeCase;
	    lodash.some = some;
	    lodash.sortedIndex = sortedIndex;
	    lodash.sortedLastIndex = sortedLastIndex;
	    lodash.startsWith = startsWith;
	    lodash.template = template;
	    lodash.trim = trim;
	    lodash.trimLeft = trimLeft;
	    lodash.trimRight = trimRight;
	    lodash.trunc = trunc;
	    lodash.unescape = unescape;
	    lodash.uniqueId = uniqueId;
	    lodash.words = words;

	    // Add aliases.
	    lodash.all = every;
	    lodash.any = some;
	    lodash.contains = includes;
	    lodash.detect = find;
	    lodash.foldl = reduce;
	    lodash.foldr = reduceRight;
	    lodash.head = first;
	    lodash.include = includes;
	    lodash.inject = reduce;

	    mixin(lodash, (function() {
	      var source = {};
	      baseForOwn(lodash, function(func, methodName) {
	        if (!lodash.prototype[methodName]) {
	          source[methodName] = func;
	        }
	      });
	      return source;
	    }()), false);

	    /*------------------------------------------------------------------------*/

	    // Add functions capable of returning wrapped and unwrapped values when chaining.
	    lodash.sample = sample;

	    lodash.prototype.sample = function(n) {
	      if (!this.__chain__ && n == null) {
	        return lodash.sample(this.value());
	      }
	      return this.thru(function(value) {
	        return lodash.sample(value, n);
	      });
	    };

	    /*------------------------------------------------------------------------*/

	    /**
	     * The semantic version number.
	     *
	     * @static
	     * @memberOf _
	     * @type string
	     */
	    lodash.VERSION = VERSION;

	    // Assign default placeholders.
	    arrayEach(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function(methodName) {
	      lodash[methodName].placeholder = lodash;
	    });

	    // Add `LazyWrapper` methods that accept an `iteratee` value.
	    arrayEach(['filter', 'map', 'takeWhile'], function(methodName, index) {
	      var isFilter = index == LAZY_FILTER_FLAG;

	      LazyWrapper.prototype[methodName] = function(iteratee, thisArg) {
	        iteratee = getCallback(iteratee, thisArg, 3);

	        var result = this.clone(),
	            filtered = result.filtered,
	            iteratees = result.iteratees || (result.iteratees = []);

	        result.filtered = filtered || isFilter || (index == LAZY_WHILE_FLAG && result.dir < 0);
	        iteratees.push({ 'iteratee': iteratee, 'type': index });
	        return result;
	      };
	    });

	    // Add `LazyWrapper` methods for `_.drop` and `_.take` variants.
	    arrayEach(['drop', 'take'], function(methodName, index) {
	      var countName = methodName + 'Count',
	          whileName = methodName + 'While';

	      LazyWrapper.prototype[methodName] = function(n) {
	        n = n == null ? 1 : nativeMax(+n || 0, 0);

	        var result = this.clone();
	        if (result.filtered) {
	          var value = result[countName];
	          result[countName] = index ? nativeMin(value, n) : (value + n);
	        } else {
	          var views = result.views || (result.views = []);
	          views.push({ 'size': n, 'type': methodName + (result.dir < 0 ? 'Right' : '') });
	        }
	        return result;
	      };

	      LazyWrapper.prototype[methodName + 'Right'] = function(n) {
	        return this.reverse()[methodName](n).reverse();
	      };

	      LazyWrapper.prototype[methodName + 'RightWhile'] = function(predicate, thisArg) {
	        return this.reverse()[whileName](predicate, thisArg).reverse();
	      };
	    });

	    // Add `LazyWrapper` methods for `_.first` and `_.last`.
	    arrayEach(['first', 'last'], function(methodName, index) {
	      var takeName = 'take' + (index ? 'Right': '');

	      LazyWrapper.prototype[methodName] = function() {
	        return this[takeName](1).value()[0];
	      };
	    });

	    // Add `LazyWrapper` methods for `_.initial` and `_.rest`.
	    arrayEach(['initial', 'rest'], function(methodName, index) {
	      var dropName = 'drop' + (index ? '' : 'Right');

	      LazyWrapper.prototype[methodName] = function() {
	        return this[dropName](1);
	      };
	    });

	    // Add `LazyWrapper` methods for `_.pluck` and `_.where`.
	    arrayEach(['pluck', 'where'], function(methodName, index) {
	      var operationName = index ? 'filter' : 'map',
	          createCallback = index ? matches : property;

	      LazyWrapper.prototype[methodName] = function(value) {
	        return this[operationName](createCallback(value));
	      };
	    });

	    LazyWrapper.prototype.dropWhile = function(iteratee, thisArg) {
	      iteratee = getCallback(iteratee, thisArg, 3);

	      var done,
	          lastIndex,
	          isRight = this.dir < 0;

	      return this.filter(function(value, index, array) {
	        done = done && (isRight ? index < lastIndex : index > lastIndex);
	        lastIndex = index;
	        return done || (done = !iteratee(value, index, array));
	      });
	    };

	    LazyWrapper.prototype.reject = function(iteratee, thisArg) {
	      iteratee = getCallback(iteratee, thisArg, 3);

	      return this.filter(function(value, index, array) {
	        return !iteratee(value, index, array);
	      });
	    };

	    LazyWrapper.prototype.slice = function(start, end) {
	      start = start == null ? 0 : (+start || 0);
	      var result = start < 0 ? this.takeRight(-start) : this.drop(start);

	      if (typeof end != 'undefined') {
	        end = (+end || 0);
	        result = end < 0 ? result.dropRight(-end) : result.take(end - start);
	      }
	      return result;
	    };

	    // Add `LazyWrapper` methods to `lodash.prototype`.
	    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
	      var retUnwrapped = /^(?:first|last)$/.test(methodName);

	      lodash.prototype[methodName] = function() {
	        var value = this.__wrapped__,
	            args = arguments,
	            chainAll = this.__chain__,
	            isHybrid = !!this.__actions__.length,
	            isLazy = value instanceof LazyWrapper,
	            onlyLazy = isLazy && !isHybrid;

	        if (retUnwrapped && !chainAll) {
	          return onlyLazy
	            ? func.call(value)
	            : lodash[methodName](this.value());
	        }
	        var interceptor = function(value) {
	          var otherArgs = [value];
	          push.apply(otherArgs, args);
	          return lodash[methodName].apply(lodash, otherArgs);
	        };
	        if (isLazy || isArray(value)) {
	          var wrapper = onlyLazy ? value : new LazyWrapper(this),
	              result = func.apply(wrapper, args);

	          if (!retUnwrapped && (isHybrid || result.actions)) {
	            var actions = result.actions || (result.actions = []);
	            actions.push({ 'args': [interceptor], 'object': lodash, 'name': 'thru' });
	          }
	          return new LodashWrapper(result, chainAll);
	        }
	        return this.thru(interceptor);
	      };
	    });

	    // Add `Array.prototype` functions to `lodash.prototype`.
	    arrayEach(['concat', 'join', 'pop', 'push', 'shift', 'sort', 'splice', 'unshift'], function(methodName) {
	      var arrayFunc = arrayProto[methodName],
	          chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
	          fixObjects = !support.spliceObjects && /^(?:pop|shift|splice)$/.test(methodName),
	          retUnwrapped = /^(?:join|pop|shift)$/.test(methodName);

	      // Avoid array-like object bugs with `Array#shift` and `Array#splice` in
	      // IE < 9, Firefox < 10, Narwhal, and RingoJS.
	      var func = !fixObjects ? arrayFunc : function() {
	        var result = arrayFunc.apply(this, arguments);
	        if (this.length === 0) {
	          delete this[0];
	        }
	        return result;
	      };

	      lodash.prototype[methodName] = function() {
	        var args = arguments;
	        if (retUnwrapped && !this.__chain__) {
	          return func.apply(this.value(), args);
	        }
	        return this[chainName](function(value) {
	          return func.apply(value, args);
	        });
	      };
	    });

	    // Add functions to the lazy wrapper.
	    LazyWrapper.prototype.clone = lazyClone;
	    LazyWrapper.prototype.reverse = lazyReverse;
	    LazyWrapper.prototype.value = lazyValue;

	    // Add chaining functions to the lodash wrapper.
	    lodash.prototype.chain = wrapperChain;
	    lodash.prototype.reverse = wrapperReverse;
	    lodash.prototype.toString = wrapperToString;
	    lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;

	    // Add function aliases to the lodash wrapper.
	    lodash.prototype.collect = lodash.prototype.map;
	    lodash.prototype.head = lodash.prototype.first;
	    lodash.prototype.select = lodash.prototype.filter;
	    lodash.prototype.tail = lodash.prototype.rest;

	    return lodash;
	  }

	  /*--------------------------------------------------------------------------*/

	  // Export Lo-Dash.
	  var _ = runInContext();

	  // Some AMD build optimizers like r.js check for condition patterns like the following:
	  if (true) {
	    // Expose Lo-Dash to the global object when an AMD loader is present to avoid
	    // errors in cases where Lo-Dash is loaded by a script tag and not intended
	    // as an AMD module. See http://requirejs.org/docs/errors.html#mismatch.
	    root._ = _;

	    // Define as an anonymous module so, through path mapping, it can be
	    // referenced as the "underscore" module.
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	  // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
	  else if (freeExports && freeModule) {
	    // Export for Node.js or RingoJS.
	    if (moduleExports) {
	      (freeModule.exports = _)._ = _;
	    }
	    // Export for Narwhal or Rhino -require.
	    else {
	      freeExports._ = _;
	    }
	  }
	  else {
	    // Export for a browser or Rhino.
	    root._ = _;
	  }
	}.call(this));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(206)(module), (function() { return this; }())))

/***/ },

/***/ 204:
/***/ function(module, exports, __webpack_require__) {

	// http://www.w3.org/TR/CSS21/grammar.html
	// https://github.com/visionmedia/css-parse/pull/49#issuecomment-30088027
	var commentre = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g

	module.exports = function(css, options){
	  options = options || {};

	  /**
	   * Positional.
	   */

	  var lineno = 1;
	  var column = 1;

	  /**
	   * Update lineno and column based on `str`.
	   */

	  function updatePosition(str) {
	    var lines = str.match(/\n/g);
	    if (lines) lineno += lines.length;
	    var i = str.lastIndexOf('\n');
	    column = ~i ? str.length - i : column + str.length;
	  }

	  /**
	   * Mark position and patch `node.position`.
	   */

	  function position() {
	    var start = { line: lineno, column: column };
	    return function(node){
	      node.position = new Position(start);
	      whitespace();
	      return node;
	    };
	  }

	  /**
	   * Store position information for a node
	   */

	  function Position(start) {
	    this.start = start;
	    this.end = { line: lineno, column: column };
	    this.source = options.source;
	  }

	  /**
	   * Non-enumerable source string
	   */

	  Position.prototype.content = css;

	  /**
	   * Error `msg`.
	   */

	  function error(msg) {
	    if (options.silent === true) {
	      return false;
	    }

	    var err = new Error(options.source + ':' + lineno + ':' + column + ': ' + msg);
	    err.reason = msg;
	    err.filename = options.source;
	    err.line = lineno;
	    err.column = column;
	    err.source = css;
	    throw err;
	  }

	  /**
	   * Parse stylesheet.
	   */

	  function stylesheet() {
	    return {
	      type: 'stylesheet',
	      stylesheet: {
	        rules: rules()
	      }
	    };
	  }

	  /**
	   * Opening brace.
	   */

	  function open() {
	    return match(/^{\s*/);
	  }

	  /**
	   * Closing brace.
	   */

	  function close() {
	    return match(/^}/);
	  }

	  /**
	   * Parse ruleset.
	   */

	  function rules() {
	    var node;
	    var rules = [];
	    whitespace();
	    comments(rules);
	    while (css.length && css.charAt(0) != '}' && (node = atrule() || rule())) {
	      if (node !== false) {
	        rules.push(node);
	        comments(rules);
	      }
	    }
	    return rules;
	  }

	  /**
	   * Match `re` and return captures.
	   */

	  function match(re) {
	    var m = re.exec(css);
	    if (!m) return;
	    var str = m[0];
	    updatePosition(str);
	    css = css.slice(str.length);
	    return m;
	  }

	  /**
	   * Parse whitespace.
	   */

	  function whitespace() {
	    match(/^\s*/);
	  }

	  /**
	   * Parse comments;
	   */

	  function comments(rules) {
	    var c;
	    rules = rules || [];
	    while (c = comment()) {
	      if (c !== false) {
	        rules.push(c);
	      }
	    }
	    return rules;
	  }

	  /**
	   * Parse comment.
	   */

	  function comment() {
	    var pos = position();
	    if ('/' != css.charAt(0) || '*' != css.charAt(1)) return;

	    var i = 2;
	    while ("" != css.charAt(i) && ('*' != css.charAt(i) || '/' != css.charAt(i + 1))) ++i;
	    i += 2;

	    if ("" === css.charAt(i-1)) {
	      return error('End of comment missing');
	    }

	    var str = css.slice(2, i - 2);
	    column += 2;
	    updatePosition(str);
	    css = css.slice(i);
	    column += 2;

	    return pos({
	      type: 'comment',
	      comment: str
	    });
	  }

	  /**
	   * Parse selector.
	   */

	  function selector() {
	    var m = match(/^([^{]+)/);
	    if (!m) return;
	    /* @fix Remove all comments from selectors
	     * http://ostermiller.org/findcomment.html */
	    return trim(m[0])
	      .replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g, '')
	      .replace(/(?:"[^"]*"|'[^']*')/g, function(m) {
	        return m.replace(/,/g, '\u200C');
	      })
	      .split(/\s*(?![^(]*\)),\s*/)
	      .map(function(s) {
	        return s.replace(/\u200C/g, ',');
	      });
	  }

	  /**
	   * Parse declaration.
	   */

	  function declaration() {
	    var pos = position();

	    // prop
	    var prop = match(/^(\*?[-#\/\*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
	    if (!prop) return;
	    prop = trim(prop[0]);

	    // :
	    if (!match(/^:\s*/)) return error("property missing ':'");

	    // val
	    var val = match(/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^\)]*?\)|[^};])+)/);

	    var ret = pos({
	      type: 'declaration',
	      property: prop.replace(commentre, ''),
	      value: val ? trim(val[0]).replace(commentre, '') : ''
	    });

	    // ;
	    match(/^[;\s]*/);

	    return ret;
	  }

	  /**
	   * Parse declarations.
	   */

	  function declarations() {
	    var decls = [];

	    if (!open()) return error("missing '{'");
	    comments(decls);

	    // declarations
	    var decl;
	    while (decl = declaration()) {
	      if (decl !== false) {
	        decls.push(decl);
	        comments(decls);
	      }
	    }

	    if (!close()) return error("missing '}'");
	    return decls;
	  }

	  /**
	   * Parse keyframe.
	   */

	  function keyframe() {
	    var m;
	    var vals = [];
	    var pos = position();

	    while (m = match(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/)) {
	      vals.push(m[1]);
	      match(/^,\s*/);
	    }

	    if (!vals.length) return;

	    return pos({
	      type: 'keyframe',
	      values: vals,
	      declarations: declarations()
	    });
	  }

	  /**
	   * Parse keyframes.
	   */

	  function atkeyframes() {
	    var pos = position();
	    var m = match(/^@([-\w]+)?keyframes */);

	    if (!m) return;
	    var vendor = m[1];

	    // identifier
	    var m = match(/^([-\w]+)\s*/);
	    if (!m) return error("@keyframes missing name");
	    var name = m[1];

	    if (!open()) return error("@keyframes missing '{'");

	    var frame;
	    var frames = comments();
	    while (frame = keyframe()) {
	      frames.push(frame);
	      frames = frames.concat(comments());
	    }

	    if (!close()) return error("@keyframes missing '}'");

	    return pos({
	      type: 'keyframes',
	      name: name,
	      vendor: vendor,
	      keyframes: frames
	    });
	  }

	  /**
	   * Parse supports.
	   */

	  function atsupports() {
	    var pos = position();
	    var m = match(/^@supports *([^{]+)/);

	    if (!m) return;
	    var supports = trim(m[1]);

	    if (!open()) return error("@supports missing '{'");

	    var style = comments().concat(rules());

	    if (!close()) return error("@supports missing '}'");

	    return pos({
	      type: 'supports',
	      supports: supports,
	      rules: style
	    });
	  }

	  /**
	   * Parse host.
	   */

	  function athost() {
	    var pos = position();
	    var m = match(/^@host */);

	    if (!m) return;

	    if (!open()) return error("@host missing '{'");

	    var style = comments().concat(rules());

	    if (!close()) return error("@host missing '}'");

	    return pos({
	      type: 'host',
	      rules: style
	    });
	  }

	  /**
	   * Parse media.
	   */

	  function atmedia() {
	    var pos = position();
	    var m = match(/^@media *([^{]+)/);

	    if (!m) return;
	    var media = trim(m[1]);

	    if (!open()) return error("@media missing '{'");

	    var style = comments().concat(rules());

	    if (!close()) return error("@media missing '}'");

	    return pos({
	      type: 'media',
	      media: media,
	      rules: style
	    });
	  }


	  /**
	   * Parse custom-media.
	   */

	  function atcustommedia() {
	    var pos = position();
	    var m = match(/^@custom-media (--[^\s]+) *([^{;]+);/);
	    if (!m) return;

	    return pos({
	      type: 'custom-media',
	      name: trim(m[1]),
	      media: trim(m[2])
	    });
	  }

	  /**
	   * Parse paged media.
	   */

	  function atpage() {
	    var pos = position();
	    var m = match(/^@page */);
	    if (!m) return;

	    var sel = selector() || [];

	    if (!open()) return error("@page missing '{'");
	    var decls = comments();

	    // declarations
	    var decl;
	    while (decl = declaration()) {
	      decls.push(decl);
	      decls = decls.concat(comments());
	    }

	    if (!close()) return error("@page missing '}'");

	    return pos({
	      type: 'page',
	      selectors: sel,
	      declarations: decls
	    });
	  }

	  /**
	   * Parse document.
	   */

	  function atdocument() {
	    var pos = position();
	    var m = match(/^@([-\w]+)?document *([^{]+)/);
	    if (!m) return;

	    var vendor = trim(m[1]);
	    var doc = trim(m[2]);

	    if (!open()) return error("@document missing '{'");

	    var style = comments().concat(rules());

	    if (!close()) return error("@document missing '}'");

	    return pos({
	      type: 'document',
	      document: doc,
	      vendor: vendor,
	      rules: style
	    });
	  }

	  /**
	   * Parse font-face.
	   */

	  function atfontface() {
	    var pos = position();
	    var m = match(/^@font-face */);
	    if (!m) return;

	    if (!open()) return error("@font-face missing '{'");
	    var decls = comments();

	    // declarations
	    var decl;
	    while (decl = declaration()) {
	      decls.push(decl);
	      decls = decls.concat(comments());
	    }

	    if (!close()) return error("@font-face missing '}'");

	    return pos({
	      type: 'font-face',
	      declarations: decls
	    });
	  }

	  /**
	   * Parse import
	   */

	  var atimport = _compileAtrule('import');

	  /**
	   * Parse charset
	   */

	  var atcharset = _compileAtrule('charset');

	  /**
	   * Parse namespace
	   */

	  var atnamespace = _compileAtrule('namespace');

	  /**
	   * Parse non-block at-rules
	   */


	  function _compileAtrule(name) {
	    var re = new RegExp('^@' + name + ' *([^;\\n]+);');
	    return function() {
	      var pos = position();
	      var m = match(re);
	      if (!m) return;
	      var ret = { type: name };
	      ret[name] = m[1].trim();
	      return pos(ret);
	    }
	  }

	  /**
	   * Parse at rule.
	   */

	  function atrule() {
	    if (css[0] != '@') return;

	    return atkeyframes()
	      || atmedia()
	      || atcustommedia()
	      || atsupports()
	      || atimport()
	      || atcharset()
	      || atnamespace()
	      || atdocument()
	      || atpage()
	      || athost()
	      || atfontface();
	  }

	  /**
	   * Parse rule.
	   */

	  function rule() {
	    var pos = position();
	    var sel = selector();

	    if (!sel) return error('selector missing');
	    comments();

	    return pos({
	      type: 'rule',
	      selectors: sel,
	      declarations: declarations()
	    });
	  }

	  return addParent(stylesheet());
	};

	/**
	 * Trim `str`.
	 */

	function trim(str) {
	  return str ? str.replace(/^\s+|\s+$/g, '') : '';
	}

	/**
	 * Adds non-enumerable parent node reference to each node.
	 */

	function addParent(obj, parent) {
	  var isNode = obj && typeof obj.type === 'string';
	  var childParent = isNode ? obj : parent;

	  for (var k in obj) {
	    var value = obj[k];
	    if (Array.isArray(value)) {
	      value.forEach(function(v) { addParent(v, childParent); });
	    } else if (value && typeof value === 'object') {
	      addParent(value, childParent);
	    }
	  }

	  if (isNode) {
	    Object.defineProperty(obj, 'parent', {
	      configurable: true,
	      writable: true,
	      enumerable: false,
	      value: parent || null
	    });
	  }

	  return obj;
	}


/***/ },

/***/ 205:
/***/ function(module, exports, __webpack_require__) {

	// shim for using process in browser

	var process = module.exports = {};

	process.nextTick = (function () {
	    var canSetImmediate = typeof window !== 'undefined'
	    && window.setImmediate;
	    var canMutationObserver = typeof window !== 'undefined'
	    && window.MutationObserver;
	    var canPost = typeof window !== 'undefined'
	    && window.postMessage && window.addEventListener
	    ;

	    if (canSetImmediate) {
	        return function (f) { return window.setImmediate(f) };
	    }

	    var queue = [];

	    if (canMutationObserver) {
	        var hiddenDiv = document.createElement("div");
	        var observer = new MutationObserver(function () {
	            var queueList = queue.slice();
	            queue.length = 0;
	            queueList.forEach(function (fn) {
	                fn();
	            });
	        });

	        observer.observe(hiddenDiv, { attributes: true });

	        return function nextTick(fn) {
	            if (!queue.length) {
	                hiddenDiv.setAttribute('yes', 'no');
	            }
	            queue.push(fn);
	        };
	    }

	    if (canPost) {
	        window.addEventListener('message', function (ev) {
	            var source = ev.source;
	            if ((source === window || source === null) && ev.data === 'process-tick') {
	                ev.stopPropagation();
	                if (queue.length > 0) {
	                    var fn = queue.shift();
	                    fn();
	                }
	            }
	        }, true);

	        return function nextTick(fn) {
	            queue.push(fn);
	            window.postMessage('process-tick', '*');
	        };
	    }

	    return function nextTick(fn) {
	        setTimeout(fn, 0);
	    };
	})();

	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};


/***/ },

/***/ 206:
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }

/******/ })