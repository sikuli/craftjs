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
        return craftdom.csg
    }
    
}