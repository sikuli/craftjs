var model = module.exports = require('craft').model.define()

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