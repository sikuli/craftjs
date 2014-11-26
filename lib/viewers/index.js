var ejs = require('ejs')
var fs = require('fs')
var open = require('open')
var path = require('path')

module.exports = function(craft) {

    craft.viewer = {}

    craft.viewer.view = function(csg) {

        var stlstring = csg.toStlString()

        var templateFile = 'lib/viewers/templates/' + 'one.ejs';
        var template = fs.readFileSync(templateFile, 'utf8');

        var viewerHtml = ejs.render(template, {
            stlstring: stlstring,
            xmlstring: ''
        });
        var viewerFile = 'build/view.html';

        fs.writeFileSync(viewerFile, viewerHtml);
// /
        console.log("viewer is saved as [" + viewerFile + "]");

        open(viewerFile);
    }

}