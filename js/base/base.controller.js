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
    .controller('BaseController', function($scope, $timeout, $rootScope, $http, $routeParams, userService, documentsService) {

        var name = $routeParams.name
        $http.get('/examples/' + name).
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
            }
        })

        $rootScope.editor.on('change', function(){
            var item = documentsService.getCurrentDocument();
            item.body = $rootScope.editor.getSession().getValue();
            documentsService.setCurrentDocument(item);
        });

        var updatePreview = function() {
            $rootScope.currentDocument = documentsService.getCurrentDocument();
            var src = $rootScope.currentDocument.body
            var csg = craft.xml.generate(src)
            var stlString = csg.toStlString()

            $rootScope.viewer.setStl(csg.toStlString())
            $rootScope.viewer.render();
            // TODO: update three.js viewer on demand
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

        animate();

        function animate() {
            // requestAnimationFrame(animate);
            $rootScope.viewer.render();
        }

    });