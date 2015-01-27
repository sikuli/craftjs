var model = require('craft').model.define();

model.name('button2')
    .author('dragosh')
    .version('1.0.0');

//
// Parameters
//
model.parameter('radius').defaultValue(2)

model.parameter('no_of_holes').defaultValue(4)

model.parameter('hole_size').defaultValue(0.2)

model.parameter('hole_distance').defaultValue(0.5)

//
// Examples
//

model.example('default button')

//
// Factory
//

model.factory(function($$$, params) {
     //vars
     var radius = params.radius;
     if(radius <= 0) radius = 2;
     
     var thickness = params.ring_thickness || radius/10;
     if(thickness >= radius) thickness = radius/10;
     
     var depth = params.depth || thickness*2;
     if(depth <= thickness) depth = thickness*2;
     
     var holes = params.no_of_holes;
     if(holes <= 0) holes = 4;
     
     var hole_size = params.hole_size || 0.2;
     
     var hole_distance = params.hole_distance || 0.5;
     //------------------------------
     
     var c = $$$.cylinder({'r' : radius , 'h' : depth});
     c = $$$.union(c,$$$.torus({'ro' : radius - thickness, 'ri' : thickness}).translate([0,0,depth]));
     c = $$$.union(c,$$$.intersection($$$.sphere({'r' : radius - thickness*2}).translate([0,0,depth + thickness*2]).scale([1,1,0.4]),$$$.cylinder({'h' : depth + thickness, 'r' : radius - thickness*2})));
     
     for(var i = 0; i < holes; i++)
     {
         c = $$$.difference(c, $$$.cylinder({'r': hole_size, 'h' : depth*2}).translate([hole_distance*cos(360/holes*i),hole_distance*sin(360/holes*i),-depth + thickness]));
     }
     
     c = $$$.difference(c,$$$.sphere({'r' : radius - thickness*2}).translate([0,0,depth*10]).scale([1,1,0.15]));
     
     return c;
 });
