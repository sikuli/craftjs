onmessage = function(e) {

    try {
        console.debug('worker.build: [%s] start', e.data.command)
        var s = require('../../lib/craft.js')

        var craftdom = e.data.craftdom        

        s.xml.build(craftdom, e.data.mode)

        craftdom.csgs.forEach(function(csg) {
            csg.stl = csg.toStlString()
        })

        var msg = {
            type: 'craftdom',
            craftdom: craftdom
        }
        postMessage(msg)
        console.debug('worker.build: done')

    } catch (err) {
        console.error('worker.build: failed %s', err)
        var msg = {
            type: 'error',
            error: err
        }
        postMessage(msg)
    }
};