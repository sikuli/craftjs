var model = require('craft').model.define();

model.name('chair2')
    .author('dragosh')
    .version('1.0.0');

//
// Parameters
//
model.parameter('leg_length').defaultValue(4)

//
// Examples
//

model.example('default chair2')

//
// Factory
//

model.factory(function($$$, params) {
    //vars
    
    var length = params.leg_length;
    
    if(length < 4) length = 4;
    
    //---------------------------
    
    var leg_board_thickness = 0.5;
    
    //four legs
    var c = $$$.cube([1,1,length + 4]).translate([0,0,-4]);
    c = $$$.union(c,$$$.cube([leg_board_thickness,3,1]).translate([(1 - leg_board_thickness)/2,1,length - 1]));
    c = $$$.union(c,$$$.cube([leg_board_thickness,3,1]).translate([(1 - leg_board_thickness)/2,1,(length - 1)/2]));
    
    c = $$$.union(c,$$$.cube([1,1,length + 4*2]).translate([4,0,-4]));
    c = $$$.union(c,$$$.cube([3,leg_board_thickness,1]).translate([1,(1 - leg_board_thickness)/2,length - 1]));
    c = $$$.union(c,$$$.cube([3,leg_board_thickness,1]).translate([1,(1 - leg_board_thickness)/2,(length - 1)/2]));
    
    c = $$$.union(c,$$$.cube([1,1,length + 4]).translate([0,4,-4]));
    c = $$$.union(c,$$$.cube([leg_board_thickness,3,1]).translate([4 + (1 - leg_board_thickness)/2,1,length - 1]));
    c = $$$.union(c,$$$.cube([leg_board_thickness,3,1]).translate([4 + (1 - leg_board_thickness)/2,1,(length - 1)/2]));
    
    c = $$$.union(c,$$$.cube([1,1,length + 4*2]).translate([4,4,-4]));
    c = $$$.union(c,$$$.cube([3,leg_board_thickness,1]).translate([1,4 + (1 - leg_board_thickness)/2,length - 1]));
    c = $$$.union(c,$$$.cube([3,leg_board_thickness,1]).translate([1,4 + (1 - leg_board_thickness)/2,(length - 1)/2]));
    
    //seat
    c = $$$.union(c.center([true,true,false]) , $$$.cube([5.2,5.2,0.5]).translate([0,0,length]).center([true,true,false]));
    
    //back
    c = $$$.union(c, $$$.cube([0.5,5.2,3]).center([true,true,false]).translate([1.5,0,length + 2]));
    
    //cut off artifacts
    c = $$$.difference(c,$$$.cube([100,100,20]).translate([0,0,-20]).center([true,true,false]));
    
    return c;
});