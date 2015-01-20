var _ = require('lodash')

module.exports = function(craft) {

    craft.define1 = function(name, defineFunction) {
        var model = new Model()
        model.name = name
        defineFunction(model)
        return part
    }

    // an array that holds the paths to model definition files
    // it is populated by 'use()'
    craft.models = {}

    craft.model = {}

    craft.model.require = function model(name) {
        if (name in craft.models) {
            var model = craft.models[name]
            return model
        }
        return undefined
    }

    craft.model.define = function define(factoryFunc) {
        if (1 == arguments.length) {
            var m = new Model('')
            m.factory(factoryFunc)
            return m;
        } else {
            return new Model()
        }
    }


    var $$$ = craft.scad

    // 
    // Model
    //

    function Model() {
        this.parameters = []
        this.examples = []
        this.spaces = {}

        this.Example = function Example(attrs) {
            this.attrs = attrs;
            return this;
        }
    }

    Model.prototype.author = function(str) {
        this.author = str;
        return this;
    }

    Model.prototype.name = function(str) {
        this.name = str;
        return this;
    }

    Model.prototype.version = function(str) {
        if (0 == arguments.length) return this._version;
        this.version = str;
        return this;
    }

    Model.prototype.hasParameter = function(name){
        return _.any(this.parameters, function(d){
            return d.name === name
        })
    }

    Model.prototype.parameter = function(name) {
        this.Example.prototype[name] = function(v) {
            this.attrs[name] = v;
            return this;
        }

        var param = {
            name: name,            
        }
        this.parameters.push(param);            
        return new Parameter(param);
    }

    Model.prototype.example = function(description) {
        var attrs = {
            description: description
        };
        attrs.parameters = {};
        this.examples.push(attrs);
        return new this.Example(attrs.parameters);
    }

    Model.prototype.space = function(name, f) {
        this.spaces[name] = f
    }

    Model.prototype.factory = function(f) {
        this._factory = f;
        return this;
    }

    Model.prototype._resolveParameters = function(customParameters) {
        var params = {}
        this.parameters.forEach(function(p) {
            var name = p.name;
            var type = p.type;
            if (customParameters[name] !== undefined) {

                var v = customParameters[name]

                // automatic convert to the right type
                // note: the type is inferred from the defaultValue
                if (type === 'number'){
                    v = Number(v)                    
                } else if (type === 'string'){
                    v = String(v)
                }

                params[name] = v
                
            } else {

                params[name] = p.defaultValue;
            }
        })
        return params;
    }

    Model.prototype.generate = function(customParameters) {
        var customParameters = customParameters || {};
        var params = this._resolveParameters(customParameters)
        var csg = this._factory(craft.scad, params);

        // 
        // Create Spaces
        //

        csg.properties.spaces = new $$$.CSG.Properties()

        // calculate the default top and base spaces
        // based on the bounding box
        var b = csg.getBounds()
        var w = b[1].x - b[0].x
        var h = b[1].y - b[0].y
        var top = $$$.cube().scale([w, h, 1]).translate([b[0].x, b[0].y, b[1].z])
        var base = $$$.cube().scale([w, h, 1]).translate([b[0].x, b[0].y, b[0].z - 1])

        csg.properties.spaces['top'] = top
        csg.properties.spaces['base'] = base


        // add custom defined spaces
        for (var name in this.spaces) {
            var f = this.spaces[name]
            var cag = f($$$, params)
            csg.properties.spaces[name] = cag
        }

        return csg
    }

    Model.prototype.generateExamples = function() {

        var examples = []
        var self = this

        this.examples.forEach(function(example, i) {

            var params = self._resolveParameters(example.parameters)

            var csg = self.generate(params);
            var stl = csg.toStlString();

            // create a csg by taking the union of all space csgs
            var spaces_csg = $$$.union(_.values(csg.properties.spaces))
            var spaces_stl = spaces_csg.toStlString()

            examples.push({
                description: example.description,
                parameters: example.parameters,
                stl: stl,
                markers: spaces_stl
            });

            console.log("example " + (i + 1) + " generated");
        });

        return examples;
    }


    function Parameter(attrs) {
        this._attrs = attrs;
    }

    Parameter.prototype.defaultValue = function(v) {
        if (0 == arguments.length) return this._attrs.defaultValue;
        this._attrs.defaultValue = v;
        this._attrs.type = typeof(v);
        return this;
    }

    // 
    // Pack
    //

    craft.pack = function() {
        return new Pack();
    }

    function Pack() {}

    Pack.prototype.name = function(str) {
        this.name = str;
        return this;
    }

    Pack.prototype.add = function(model) {
        craft.models[model.name] = model
        return this;
    }

    Pack.prototype.addFolder = function(folder) {

        // var glob = require('glob');
        var path = require('path');

        glob.glob(folder + '/*.js', {
            sync: true
        }).forEach(function(file) {

            // console.log(file)
            // file <-- github/craftjs/lib/Model./canvas.js

            // name <-- canvas
            var name = path.basename(file, '.js');

            // this.modelNames.push(name)

            craft.models[name] = file

        });
        return this;
    }
}