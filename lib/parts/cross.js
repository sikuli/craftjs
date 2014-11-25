// var S = require('../craft').openscad;

// // var part = exports;

// function definePart(name) {
//     return new Part(name);
// }

// function Part(name) {
//     // this.commands = [];
//     this._parameters = [];
//     this._examples = [];
//     // this._execs = [];
//     // this._args = [];/
//     // this._name = name;

//     this.Example = function Example(name) {
//         this._name = name;
//         // this._size_value = 

//         // this['size'] = function(v) {
//         //     // if (0 == arguments.length) return this['size_value'];
//         //     this['_size'] = v;
//         //     return this;
//         // }

//         // this['depth'] = function(v) {
//         //     // if (0 == arguments.length) return this._defaultValue;
//         //     this['_depth'] = v;
//         //     return this;
//         // }

//         return this;
//     }
// }

// Part.prototype.author = function(str) {
//     if (0 == arguments.length) return this._author;
//     this._author = str;
//     return this;
// }

// Part.prototype.version = function(str) {
//     if (0 == arguments.length) return this._version;
//     this._version = str;
//     return this;
// }

// Part.prototype.parameter = function(name) {

//     this.Example.prototype[name] = function(v) {
//         this['_' + name] = v;
//         return this;
//     }


//     var p = new Parameter(name);
//     this._parameters.push(p);
//     return p;
// }

// Part.prototype.example = function(str) {
//     var p = new this.Example(str);
//     this._examples.push(p);
//     return p;
// }

// function resolve(given_parameters, default_parameters) {
//     var resolved_parameters = {};

//     for (key in default_parameters) {
//         if (given_parameters[key] === undefined) {
//             resolved_parameters[key] = default_parameters[key];
//         } else if (typeof(default_parameters[key]) === 'object') {
//             resolved_parameters[key] = resolve(given_parameters[key], default_parameters[key]);
//         } else {
//             resolved_parameters[key] = given_parameters[key];
//         }
//     }
//     return resolved_parameters;
// }

// Part.prototype.factory = function(f) {
//     if (0 == arguments.length) return this._factory;
//     this._factory = f;
//     return this;
// }

// Part.prototype.generate = function(customParameters) {
//     var customParameters = customParameters || {};
//     // var params 
//     var params = {};
//     this._parameters.forEach(function(p) {
//         var name = p._name;

//         if (customParameters[name]) {
//             params[name] = customParameters[name];
//         } else {
//             params[name] = p._defaultValue;
//         }
//     })
//     return this._factory(params);
// }

// function Parameter(name) {
//     this._name = name;
// }

// Parameter.prototype.defaultValue = function(v) {
//     if (0 == arguments.length) return this._defaultValue;
//     this._defaultValue = v;
//     return this;
// }



// // Example.prototype.

// var part = definePart('cross')

// part.author('doubleshow')
//     .version('1.0.0')

// part.parameter('size')
//     .defaultValue(10)

// part.parameter('depth')
//     .defaultValue(2)

// part.parameter('head.size')
//     .defaultValue(5)   

// part.example('default cross')

// part.example('a bigger cross')
//     .size(10)

// part.example('a thicker cross')
//     .size(30)
//     .depth(5)

// part.factory(function(params) {

//     console.log(params);

//     var size = params.size;
//     var depth = params.depth;

//     var c = S.cube();
//     c = c.scale([1, size, depth]).center([true, true, false]);
//     c = S.union(c, c.rotateZ(90));
//     c.addConnector('back', [-size / 2, size / 2, 0], [0, 0, -1], [1, 0, 0]);
//     return c;
// });

// console.log(part);

// console.log(part.generate());

// // console.log(part._examples[1]._size);

// // // part.info = {
// // //     name: 'cross',
// // //     author: 'doubleshow',
// // //     version: '1.0.0',
// // //     examples: [{
// // //         description: 'default cross',
// // //         parameters: {}
// // //     }, {
// // //         description: 'a bigger cross',
// // //         parameters: {
// // //             size: 10
// // //         }
// // //     }, {
// // //         description: 'a thicker cross',
// // //         parameters: {
// // //             size: 30,
// // //             depth: 5
// // //         }
// // //     }]
// // // };

// // part.generate = function(parameters) {
// //     var params = parameters || {};
// //     var size = params.size || 3;
// //     var depth = params.depth || 1;
// //     var c = S.cube();
// //     c = c.scale([1, size, depth]).center([true, true, false]);
// //     c = S.union(c, c.rotateZ(90));
// //     c.addConnector('back', [-size / 2, size / 2, 0], [0, 0, -1], [1, 0, 0]);
// //     return c;
// // }