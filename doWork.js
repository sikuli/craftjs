onmessage = function(e) {
	var data = e.data
    try {
    	var s = require('../../lib/craft.js')

        s.xml.build(data.craftdom)

        var stls = data.craftdom.csgs.map(function(csg){
            return {color: csg.color, stl: csg.toStlString()}
        })


        var msg = {
            type: 'stls',
            stls: stls
        }
        postMessage(msg)

    } catch (err) {
        var msg = {
            type: 'error',
            error: err
        }
        postMessage(msg)
    }
};