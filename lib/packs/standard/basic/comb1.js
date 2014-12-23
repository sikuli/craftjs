var model = module.exports = require('craft').model.define()

model.name('comb1')
    .author('caleb')
    .version('1.0.0')

// Implement Later
// Set min & max width
// Set min & max length
// Teeth spacing parameter?

// 
// Parameters
//

model.parameter('size')
    .defaultValue(3)

model.parameter('width')
    .defaultValue(2)

model.parameter('length')
    .defaultValue(6)

model.parameter('height')
    .defaultValue(0.5)

//
// Examples
//

model.example('default comb')

model.example('a wide comb')
    .width(3)

model.example('a long comb')
    .length(10)

// 
// Factory
// 

model.factory(function($$$, params) {
    var size = params.size;
    var width = params.width;
    var length = params.length;
    var height = params.height;

    if (width/length < 0.2)
        width = 0.2 * length;
    
    return $$$.difference(
        body(),
        teeth().translate([0,length/12,0])
        ).scale(size);

// comb components
function body() {
    // objects
    var comb_main = $$$.cube({size:[width-0.5,length,height]});
    var comb_dome = $$$.cylinder({r:length/2, h:height});
    
    // transformations
    comb_main = $$$.translate([0.1,0,0], comb_main);
    comb_dome = $$$.translate([0.2,length/2,0], comb_dome);
    comb_dome = $$$.scale([0.3,1,1], comb_dome); 
    
    return $$$.union(comb_main, comb_dome);
}

function teeth() {
    // objects
    var t = $$$.cube({size:[width,0.1,height]});
    
    // transformation
    for(var i=0; i<=length*4; i++) {
        t = $$$.union(t, t.translate([0,0.2,0]));
   }
   return t;
}
})