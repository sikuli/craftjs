var model = require('craft').model.define();

model.name('piano_keys')
    .author('dragosh')
    .version('1.0.0');

//
// Parameters
//

//
// Examples
//

model.example('default piano keys')

//
// Factory
//

model.factory(function($$$, params) {
    var black_map = [1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,1,0,1,1,1,0];
    var white_key = $$$.union($$$.cube({size: [1,6,1], round: true}).center([false,false,true]).scale([1,1,0.2]),$$$.cube({size : [0.9,5.8,1]}).translate([0.05,0.2,-1]));
    var black_key = $$$.union($$$.cube({size : [1,4,0.5] , round : true}).center([false,false,true]).translate([0,2,0]).scale([1,1,0.2]),$$$.cube({size : [0.9,3.8,0.4]}).translate([0.05,2.2,-0.4]));

    var white_keys = white_key;
    var black_keys = black_key.translate([0,0,0.4]);
    
    for(var i = 0; i < 22; i++)                   {white_keys = $$$.group(white_keys,white_key.translate([i,0,0]));}
    for(var j = 0; j < black_map.length; j++)     {
                                                        if(black_map[j] == 1){
                                                            black_keys = $$$.group(black_keys,black_key.translate([j,0,0.4]));
                                                            white_keys = $$$.difference(white_keys,$$$.cube({size:[1,4.2,5],round:true}).center([false,false,true]).translate([j + 0.5,2.1,0]));
                                                        }
                                                            
                                                  }
    
    return $$$.union(white_keys,black_keys.translate([0.5,0,0]));
});