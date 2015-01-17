'use strict';

var ace = require('brace');

require('brace/mode/markdown');
require('../documents/theme-dillinger');

var Viewer = require('../../../../lib/viewers/stlviewer')
var craft = require('../../../../lib/craft')



module.exports =
    angular
    .module('diBase', [
        'diBase.controllers.about',
        'diBase.directives.switch',
        'diBase.directives.documentTitle',
        'diBase.directives.menuToggle',
        'diBase.directives.settingsToggle',
        'diBase.directives.previewToggle',
        'diBase.directives.preview'
    ])
    .controller('BaseController', function($scope, $timeout, $q, $rootScope, $http, $routeParams, userService, documentsService) {

        var name = $routeParams.name
        $http.get('examples/' + name).
        success(function(data, status, headers, config) {

            var item = documentsService.createItem();
            item.title = name;
            item.body = data;
            documentsService.setCurrentDocument(item);

            $rootScope.$emit('document.refresh');

        }).
        error(function(data, status, headers, config) {
            // file can not be loaded
            // TODO: display an error message

        });

        $scope.profile = userService.profile;
        $scope.rendering = false

        // Editor configurations
        $rootScope.editor = ace.edit('editor');
        $rootScope.editor.getSession().setMode('ace/mode/xml');
        $rootScope.editor.setTheme('ace/theme/dillinger');
        $rootScope.editor.getSession().setUseWrapMode(true);
        $rootScope.editor.setShowPrintMargin(false);
        $rootScope.editor.setOption('minLines', 50);
        $rootScope.editor.setOption('maxLines', 90000);

        $rootScope.editor.commands.addCommand({
            name: "refresh",
            bindKey: {
                win: "Shift-Return",
                mac: "Shift-Return"
            },
            exec: function(editor) {
                updatePreview();
                $scope.$apply();
            }
        })

        $rootScope.editor.on('change', function() {
            var item = documentsService.getCurrentDocument();
            item.body = $rootScope.editor.getSession().getValue();
            documentsService.setCurrentDocument(item);
        });

        // configure web worker
        var worker

        // var url = 'http://localhost:8090/assets/worker.bundle.js'
        var url = 'js/worker.bundle.js'
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
                worker.addEventListener('message', workerMessageHandler, false)

                updatePreview()
                $scope.$apply()
            }
        }
        xhr.send()

        function workerMessageHandler(e) {
            //console.log('Worker said: ', e.data);
            if (e.data.type === 'stls') {
                var csgs = e.data.stls
                csgs.forEach(function(csg) {
                    csg.toStlString = function() {
                        return csg.stl
                    }
                })                
                $rootScope.viewer.addCSGs(csgs)
                $rootScope.viewer.render();                

                $scope.isWorkerGeneratingModel = false
                $scope.$apply()
            }else if (e.data.type === 'error'){

                $scope.isWorkerGeneratingModel = false
                $scope.errorMessage = e.data.error
                $scope.$apply()
            }
        }

        function buildModelFromXmlAsync(src) {
            if (worker !== undefined) {
                $scope.isWorkerGeneratingModel = true
                delete $scope.errorMessage
                var craftdom = craft.xml.parse(src)
                var msg = {
                    command: 'generate',
                    craftdom: craftdom
                }
                worker.postMessage(msg)
            }
        }

        var updatePreview = function() {
            $rootScope.currentDocument = documentsService.getCurrentDocument();
            var src = $rootScope.currentDocument.body
            buildModelFromXmlAsync(src)
            return;
        };

        var documentRefresh = function() {
            $rootScope.currentDocument = documentsService.getCurrentDocument();
            updatePreview()
            return $rootScope.editor.getSession().setValue($rootScope.currentDocument.body);
        };

        $rootScope.$on('document.refresh', documentRefresh);

        $rootScope.viewer = new Viewer('preview')
        $rootScope.viewer.setCameraPosition(0, -0.5, 1);
        $rootScope.viewer.render();
    });