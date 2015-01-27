var model = require('craft').model.define();

model.name('comb2')
    .author('dragosh')
    .version('1.0.0');

//
// Parameters
//
model.parameter('hole_radius').defaultValue(0.15)

model.parameter('handle_length').defaultValue(2)

model.parameter('handle_thickness').defaultValue(0.1)

model.parameter('no_of_teeth').defaultValue(10)

//
// Examples
//

model.example('default comb')

//
// Factory
//

model.factory(function($$$, params) {
     //vars  
     var hole_radius = params.handle_hole_radius;
     if(hole_radius <= 0 || hole_radius > 0.9) hole_radius = 0.15; 
     
     var handle_length = params.handle_length;
     if(handle_length < 1.5)handle_length = 2;
     
     var smooth_factor = params.handle_thickness;
     if(smooth_factor <= 0)smooth_factor = 10;
     
     var teeth = params.no_of_teeth;
     if(teeth <= 0 || teeth > 20) teeth = 10;
     //------------------
     
     var c = $$$.circle().translate([-1,0,0]);
     c = $$$.union(c,$$$.square([handle_length,2,0]));
     c = $$$.union(c,$$$.circle().translate([handle_length - 1,0,0])).translate([0,-1,0]);
     c = $$$.linear_extrude({height:0.4},c);
     
     var radius = sqrt(pow(handle_length/2,2) +  pow(1/smooth_factor,2)) - 1;     
     var handle_smoothing = $$$.circle({r : radius, fn : 64}).translate([handle_length/2 - radius,
                                                                     -radius,
                                                                     0]);
     handle_smoothing = handle_smoothing.translate([0,
                                                    1/smooth_factor,
                                                    0]);
          
     handle_smoothing = $$$.union(handle_smoothing,handle_smoothing.mirroredY());
     
     handle_smoothing = $$$.linear_extrude({height:0.4},handle_smoothing);
          
     c = $$$.difference(c, handle_smoothing);
     c = c.translate([0,0,-0.2]);
     
     var comb_head = $$$.cylinder({start:[0,0.5,0] ,
                               end:[0,-2.5,0],
                               r1 : 0.4*sin(45),
                               r2 : 0.4*sin(45) - 0.05*2,
                               fn : 4}).rotateY(45);
    
     var teeth_matrix = $$$.cube().center(true).scale([handle_length*3/4 + 0.1*2,4,1]).translate([handle_length*3/4 + handle_length,-2.5,0]);
    
     for(var i = 0; i < teeth; i++)
     {
         teeth_matrix = $$$.difference(teeth_matrix,comb_head.scale([0.2,1,6]).rotateX(180).translate([(i*((handle_length*3/4 + 0.05*2)/teeth) + handle_length*7/4 - handle_length*3/8),-2.8,0]));
     }
    
     comb_head = comb_head.scale([handle_length*3/(2*0.4),1,1]);
     comb_head = comb_head.translate([handle_length*3/4 + handle_length,0,0]);
    
     comb_head = $$$.union(comb_head,$$$.cube().center([false,false,true]).scale([handle_length*3/2 - 0.5,0.5,0.4]).translate([handle_length,0.5,0]));
     
     var comb_corner = $$$.cylinder({r : 0.5}).center([false,false,true]).scale([1,1,0.4]).translate([handle_length*3/2 + handle_length-0.5,0.5,0]);
     comb_corner = $$$.difference(comb_corner,$$$.cube().center([false,false,true]).scale([1,1,1]).translate([handle_length*3/2 + handle_length - 1,-0.5,0]) );
     comb_head = $$$.union(comb_head,comb_corner);
    
     c = $$$.union(c,comb_head);
     
     c = $$$.difference(c,$$$.cylinder({r : hole_radius}).center([false,false,true]).scale(1,1,3));
    
     c = $$$.difference(c,teeth_matrix);
     
     return c;
 });