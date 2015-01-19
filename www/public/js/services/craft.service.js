'use strict';

var craft = require('../../../../lib/craft')

module.exports =
    angular
    .module('craft', [])
    .factory('craftService', ['$q', '$rootScope',
        function($q, $rootScope) {

            return {
                build: build
            }

            var worker

            function build(src, mode) {
                console.debug("craftService.build")

                return init()
                    .then(function(worker) {

                        var deferred = $q.defer()

                        $rootScope.$emit('craft.start')
                        var craftdom = craft.xml.parse(src)
                        var msg = {
                            mode: mode,
                            craftdom: craftdom
                        }

                        worker.onmessage =
                            function(e) {
                                console.debug("notified by worker on job completion")
                                if (e.data.type === 'craftdom') {
                                    $rootScope.$emit('craft.end')
                                    deferred.resolve(e.data.craftdom)
                                } else if (e.data.type === 'error') {
                                    $rootScope.$emit('craft.error', e.data.error)
                                    deferred.reject(e.data.error)
                                }
                        }
                        worker.postMessage(msg)
                        return deferred.promise
                    })
            }

            function init() {

                return $q(function(resolve, reject) {

                    if (worker) {
                        resolve(worker)

                    } else {
                        console.log('initiating craft worker')
                        var url = 'http://localhost:8090/assets/worker.bundle.js'
                            // var url = 'js/worker.bundle.js'
                        var xhr = new XMLHttpRequest()
                        xhr.open('GET', url)
                        xhr.onload = function() {
                            if (xhr.status === 200) {
                                var workerSrcBlob, workerBlobURL

                                workerSrcBlob = new Blob([xhr.responseText], {
                                    type: 'text/javascript'
                                })

                                workerBlobURL = window.URL.createObjectURL(workerSrcBlob)

                                worker = new Worker(workerBlobURL)

                                resolve(worker)

                            } else {
                                reject("unable to load worker script")
                            }
                        }
                        xhr.send()
                    }

                })
            }
        }
    ]);