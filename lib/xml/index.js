var parser = require('./parser'),
    builder = require('./builder')

module.exports = function(craft) {

    craft.xml = {}
    craft.xml.generate = function(xmlstring) {

        // wrap all with <craftml></craftml> if missing
        if (!xmlstring.match(/^<craft>/)) {
            xmlstring = '<craft>' + xmlstring + "</craft>"
        }

        var craftdom = parser.parse(xmlstring)
            // console.log(JSON.stringify(craftdom, null, ' '))

        builder.build(craftdom)

        // display(craftdom)
        return craftdom
    }

    craft.xml.parse = function(xmlstring) {

        // wrap all with <craftml></craftml> if missing
        if (!xmlstring.match(/^<craft>/)) {
            xmlstring = '<craft>' + xmlstring + "</craft>"
        }

        return parser.parse(xmlstring)
    }

    craft.xml.build = function(craftdom, mode){
        if (mode === 'preview'){
            builder.build(craftdom)
        }else if (mode === 'export'){
            builder.buildToExport(craftdom)
        }
    }
}