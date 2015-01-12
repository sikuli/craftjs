var model = module.exports = require('craft').model.define()

model.name('chair1')
    .author('caleb')
    .version('1.0.0')

// Implement Later
// Width parameter

//
// Parameters
// 

model.parameter('size')
    .defaultValue(1)

model.parameter('length')
    .defaultValue(15)

model.parameter('leg_height')
    .defaultValue(14)


//
// Examples
// 

model.example('default chair')


model.example('a long chair')
    .length(25)

model.example('a tall chair')
    .leg_height(25)

model.example('a short, long chair')
    .length(30)
    .leg_height(5) 


// 
// Factory
//
 
model.factory(function($$$, params) {    
    var size = params.size;
    var leg_height = params.leg_height;
    var length = params.length;

    if (leg_height < 5)
        leg_height = 5;

    return seat().scale(size);

    // chair components
    function seat() {
        var c, d;

        // seat base
        c = $$$.cube({size: [length, 15, 1]}).translate([0, 0, 14]);

        // seat back
        var back_main = $$$.cube({size: [1, 15, 7.5]});
        var back_dome = $$$.cylinder({
            r:6.5, 
            h:1
        });
        var back_support_l = $$$.cube({size: [2, 2, 16]});
        var back_support_r = back_support_l;
        
        // legs
        var leg = $$$.cube({size: [2, 2, leg_height]});
        var leg_support = $$$.cube({size: [length - 1, 1.5, 1.5]});
        
        // seat back transformations
        back_main = back_main.translate([0.2, 0, 10]);
        back_dome = $$$.rotate([0, 90, 0], back_dome).translate([0.2, 7.5, 18.5]);
        back_support_l = back_support_l.translate([0, 0, 7]);
        back_support_r = back_support_r.translate([0, 13, 7]);
       
        d = $$$.union(
            back_main, 
            back_dome, 
            back_support_l, 
            back_support_r
        );
        d = d.translate([0, 0, 8]);

        d = $$$.union(
            c, 
            d
        );
        
        // leg transformations
        var leg_fl = leg.translate([length - 2, 0, 14 - leg_height]);
        var leg_fr = leg.translate([length - 2, 13, 14 - leg_height]);
        var leg_bl = leg.translate([0, 0, 14 - leg_height]);
        var leg_br = leg.translate([0, 13, 14 - leg_height]);
        
        var leg_support_l = leg_support.translate([1, 0, 17 - leg_height]);
        var leg_support_r = leg_support.translate([1, 13.5, 17 - leg_height]);
        
        return $$$.union(
            d, 
            leg_fl, 
            leg_fr, 
            leg_bl, 
            leg_br, 
            leg_support_l, 
            leg_support_r
        );
    }
})
