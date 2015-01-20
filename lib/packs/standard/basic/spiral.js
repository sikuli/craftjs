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
    var no_of_turns = params.number_of_turns || 3;
    if(no_of_turns < 0) no_of_turns = 3;
    
    
    
    //--------------------------
    
    var sqrt3 = Math.sqrt(3) / 2;
    var radius = 1;

    var hex = CSG.Polygon.createFromPoints([
        [radius, 0, 0],
        [radius / 2, radius * sqrt3, 0],
        [-radius / 2, radius * sqrt3, 0],
        [-radius, 0, 0],
        [-radius / 2, -radius * sqrt3, 0],
        [radius / 2, -radius * sqrt3, 0]
    ]);

    var angle = 5;
    return hex.solidFromSlices({
      numslices: no_of_turns*360 / angle,
      callback: function(t, slice) {
         var coef = 1 - t * 0.8;
         return this.rotateZ(1 * slice).scale(coef).translate([radius * 4, t * 20, 0]).rotate(
            [0,20,0],
            [-1, 0, 0],
            angle * slice
         );
      }
   });
});