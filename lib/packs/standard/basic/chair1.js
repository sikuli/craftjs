var model = module.exports = require('craft').model.define()

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
