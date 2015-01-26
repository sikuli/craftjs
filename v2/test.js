"use strict"
var fs = require('fs')
var cheerio = require('cheerio')
var addWith = require('with')
var $$$ = require('craft-scad')

var contents = fs.readFileSync('examples/cube.xml', 'utf8')

function Model() {

}

Model.prototype.generate = function(params) {

    if (this.code) {

        var ret = {}
        var codeBlock = this.code + '; ret.csg = main();'
        var withCodeBlock = addWith('$$$', codeBlock)
        eval(withCodeBlock)

        return ret.csg
    }
}

function load(contents) {

    var obj = new Model()

    var $ = cheerio.load(contents);
    obj.code = $('main').text()


    return obj

}


var model = load(contents)

console.log(model.generate())

// load(contents)
// craft.load(contents)

// console.log($$$.cube)
// console.log(code)
// addWith('','console.log(5)')



// main()
//addWith(obj, 'console')// 	eval(code)
// }

//main()