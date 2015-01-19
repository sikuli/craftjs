'use strict';

var path = require('path')

module.exports =
    angular
    .module('project', ['craft'])
    .factory('projectService', ['$http', '$rootScope', 'craftService',
        function($http, $rootScope, craftService) {

            var currentDocument = {}

            $rootScope.$on('editor.change', function(event, contents) {
                currentDocument.body = contents
            })

            return {
                open: open,
                build: build
            }

            function createDocument(name, body) {
                return {
                    name: name,
                    body: body
                }
            }

            function setCurrentDocument(doc) {
                currentDocument = doc
            }
            
            // mode: preview or export
            function build(mode) {
                console.debug('projectService.build')

                var src = currentDocument.body
                return craftService
                    .build(src, mode)
                    .then(function(results) {
                            var craftdom = results
                            currentDocument.craftdom = craftdom                            
                            $rootScope.$emit('document.built', currentDocument)
                            return currentDocument
                        },
                        function(error) {
                            console.error(error)
                        })
            }
            

            function open(url) {
                console.log('loading example: %s', url)

                return $http.get(url).
                success(function(data, status, headers, config) {
                    var name = path.basename(url,'.xml')
                    var doc = createDocument(name, data)
                    setCurrentDocument(doc)
                    $rootScope.$emit('document.refresh', doc);
                }).
                error(function(data, status, headers, config) {
                    // file can not be loaded
                })
            }
        }
    ]);