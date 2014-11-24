var should = require('chai').should();
var things = require('../lib/craft').things;
var craft = require('../lib/craft');
var CSG = require('../lib/things/node_modules/csg').CSG;

describe('craft', function() {

    describe('things', function() {

        it('generate a canvas', function() {
            things.canvas.generate().should.be.an.instanceof(CSG);
        });

        it('generate a pin', function() {
            things.pin.generate().should.be.an.instanceof(CSG);
        });

    });

    describe('connect', function() {

        it('connect a pin to a canvas', function() {
            var canvas = things.canvas.generate();
            var pin = things.pin.generate();

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