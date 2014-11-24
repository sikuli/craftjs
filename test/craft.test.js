var should = require('chai').should();
var parts = require('../lib/craft').parts;
var craft = require('../lib/craft');
var CSG = require('../lib/node_modules/csg').CSG;

describe('craft', function() {

    describe('parts', function() {

        it('generate a canvas', function() {
            parts.canvas.generate().should.be.an.instanceof(CSG);
        });

        it('generate a pin', function() {
            parts.pin.generate().should.be.an.instanceof(CSG);
        });

    });

    describe('connect', function() {

        it('connect a pin to a canvas', function() {
            var canvas = parts.canvas.generate();
            var pin = parts.pin.generate();

            craft.connect(pin, 'back').to(canvas, 'front');
        });

    });

    describe('make', function() {

        it('make a canvas from xml', function() {
            craft.makeFromXml('<canvas></canvas>').should.be.an.instanceof(CSG);
        });

        it('make a canvas from xml with a pin', function() {
            craft.makeFromXml('<canvas><pin></pin></canvas>').should.be.an.instanceof(CSG);
        });

    });

});