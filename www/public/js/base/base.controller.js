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
    .controller('Base', function($scope, $timeout, $rootScope, userService, documentsService) {


        $scope.profile = userService.profile;
        $rootScope.currentDocument = documentsService.getCurrentDocument();
        $rootScope.editor = ace.edit('editor');

        $rootScope.editor.getSession().setMode('ace/mode/markdown');
        $rootScope.editor.setTheme('ace/theme/dillinger');
        $rootScope.editor.getSession().setUseWrapMode(true);
        $rootScope.editor.setShowPrintMargin(false);
        $rootScope.editor.getSession().setValue($rootScope.currentDocument.body);
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

        var updatePreview = function() {
            $rootScope.currentDocument = documentsService.getCurrentDocument();

            var src = $rootScope.currentDocument.body
            var csg = craft.xml.generate(src)
            var stlString = csg.toStlString()
            $rootScope.viewer.setStl(csg.toStlString())
            return;
            // return $rootScope.editor.getSession().setValue($rootScope.currentDocument.body);
        };

        $rootScope.$on('document.refresh', updatePreview);

        $rootScope.viewer = new Viewer('preview')
        $rootScope.viewer.setCameraPosition(0, -0.5, 1);

        animate();

        function animate() {
            requestAnimationFrame(animate);
            $rootScope.viewer.render();
        }

    });