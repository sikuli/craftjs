var craft = module.exports = {};

craft.make = function(makeFunc){
    return makeFunc(craft.scad)
}

craft.use = function(fn) {
    fn(craft)
}

craft.use(require('./scad'))
craft.use(require('./model'))
craft.use(require('./xml'))
craft.use(require('./packs/standard'))
// craft.use(require('./viewers'))