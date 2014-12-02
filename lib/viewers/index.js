var ejs = require('ejs')
var fs = require('fs')
var open = require('open')
var path = require('path')

module.exports = function(craft) {

    craft.viewer = {}

    function viewAsModel(model, params) {
        var templateFile = 'lib/viewers/templates/' + 'three.ejs';
        var template = fs.readFileSync(templateFile, 'utf8');

        var examples = model.generateExamples()

        var viewerHtml = ejs.render(template, {
            examples: examples,
            component: model
        })
        
        if (!fs.existsSync('build')){
            fs.mkdirSync('build')
        }
        var viewerFile = 'build/' + model.name + '.html';
        fs.writeFileSync(viewerFile, viewerHtml);

        console.log("viewer is saved as [" + viewerFile + "]");

        open(viewerFile);
    }

    function viewAsCSG(csg, params){
        params = params || {}
        var srcstring = params.src || ''
        var stlstring = csg.toStlString()

        var templateFile = 'lib/viewers/templates/' + 'one.ejs';
        var template = fs.readFileSync(templateFile, 'utf8');

        var viewerHtml = ejs.render(template, {
            stlstring: stlstring,
            xmlstring: srcstring,
        });
        

        if (!fs.existsSync('build')){
            fs.mkdirSync('build')
        }
        var viewerFile = 'build/view.html';
        fs.writeFileSync(viewerFile, viewerHtml);

        console.log("viewer is saved as [" + viewerFile + "]");

        open(viewerFile);
    }

    craft.viewer.view = function(x, params) {

        if ('_factory' in x) {
            // probably a model
            return viewAsModel(x, params)
        }else{
            return viewAsCSG(x, params)
        }
    }

}