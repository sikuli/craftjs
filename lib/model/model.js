module.exports = function(craft) {

    craft.define1 = function(name, defineFunction) {
        var model = new Model()
        model.name = name
        defineFunction(model)
        return part
    }

    craft.model = {}

    craft.model.require = function model(name) {
        if (name in craft.models){
            var path = craft.models[name]
            return require(path)
        }
        // return undefined
        return undefined
    }

    craft.model.define = function define(factoryFunc) {
        if (1 == arguments.length){
            var m = new Model('')
            m.factory(factoryFunc)
            return m;
        }else{
            return new Model()
        }
    }


    // 
    // Model
    //

    function Model() {
        this.parameters = [];
        this.examples = [];

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

    Model.prototype.parameter = function(name) {
        this.Example.prototype[name] = function(v) {
            this.attrs[name] = v;
            return this;
        }

        var param = {
            name: name
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

    Model.prototype.factory = function(f) {
        this._factory = f;
        return this;
    }

    Model.prototype.generate = function(customParameters) {
        var customParameters = customParameters || {};
        var params = {};
        this.parameters.forEach(function(p) {
            var name = p.name;

            if (customParameters[name] !== undefined) {
                params[name] = customParameters[name];
            } else {
                params[name] = p.defaultValue;
            }
        })
        return this._factory(craft.scad, params);
    }

    function Parameter(attrs) {
        this._attrs = attrs;
    }

    Parameter.prototype.defaultValue = function(v) {
        if (0 == arguments.length) return this._attrs.defaultValue;
        this._attrs.defaultValue = v;
        return this;
    }


    craft.models = {}

    // 
    // Pack
    //

    craft.pack = function() {
        return new Pack();
    }

    function Pack() {
    }

    Pack.prototype.addFolder = function(folder) {

        var glob = require('glob');
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