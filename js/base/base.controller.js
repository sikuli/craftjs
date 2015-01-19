'use strict';

var ace = require('brace');

require('../documents/theme-dillinger');

var Viewer = require('../../../../lib/viewers/stlviewer')

module.exports =
    angular
    .module('diBase', [
        'diBase.controllers.about',
        'diBase.directives.switch',
        'diBase.directives.documentTitle',
        'diBase.directives.menuToggle',
        'diBase.directives.settingsToggle',
        'diBase.directives.previewToggle',
        'diBase.directives.preview',
        'craft',
        'project'
    ])
    .run(function($rootScope) {

    })
    .controller('SideBar', function($scope, $rootScope, $timeout, projectService) {

        $scope.exampleGroups = [{
            title: 'Basic',
            collapse: false,
            examples: ['2pins.xml', '2rings.xml',
                'hellopin.xml', 'helloworld.xml',
                'pins.xml', 'pintower.xml', 'desk.xml'
            ]
        }, {
            title: 'Braille',
            collapse: false,
            examples: ['braille.xml','barchart.xml']
        }, {
            title: 'Style',
            collapse: true,
            examples: ['style-pins.xml', 'heading.xml']
        }]

    })
    .controller('Export', function($scope, $rootScope, $timeout, projectService) {

        // http://stackoverflow.com/questions/19327749/javascript-blob-filename-without-link
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = 'display: none';

        $scope.asSTL = asSTL;

        function initDownload(contentString, name) {

            var blob = new Blob([contentString], {
                type: 'application/stla'
            })
            var blobURL = URL.createObjectURL(blob)

            a.download = name
            a.href = blobURL
            $timeout(function() {
                a.click();
                window.URL.revokeObjectURL(blobURL);
            })
        }

        function asSTL() {
            console.log('exporting done')
            projectService
                .build('export')
                .then(function(doc) {
                    console.log('exporting done')
                    var stl = doc.craftdom.csgs[0].stl
                    var name = doc.name + '.stl'
                    initDownload(stl, name)
                })
        }

    })
    .controller('Preview', function($scope, $rootScope, projectService) {

        var viewer = new Viewer('preview')
        viewer.setCameraPosition(0, -0.5, 1);
        viewer.render();

        $scope.build = function() {
            projectService.build('preview')
        }

        $rootScope.$on('craft.start', function() {
            $scope.isWorkerGeneratingModel = true
            delete $scope.errorMessage
        })

        $rootScope.$on('craft.end', function() {
            $scope.isWorkerGeneratingModel = false
        })

        $rootScope.$on('craft.error', function(event, error) {
            $scope.isWorkerGeneratingModel = false
            $scope.errorMessage = error
        })

        $rootScope.$on('document.built', function(event, doc) {
            var csgs = doc.craftdom.csgs
            viewer.addCSGs(csgs)
            viewer.render()
        })

    })
    .controller('Editor', function($rootScope, projectService) {

        var editor = ace.edit('editor');
        editor.getSession().setMode('ace/mode/xml');
        editor.setTheme('ace/theme/dillinger');
        editor.getSession().setUseWrapMode(true);
        editor.setShowPrintMargin(false);
        editor.setOption('minLines', 50);
        editor.setOption('maxLines', 90000);

        $rootScope.$on('document.refresh', function(event, doc) {
            editor.getSession().setValue(doc.body)
        })

        editor.on('change', function() {
            var contents = editor.getSession().getValue()
            $rootScope.$emit('editor.change', contents)
        })

        editor.commands.addCommand({
            name: "refresh",
            bindKey: {
                win: "Shift-Return",
                mac: "Shift-Return"
            },
            exec: function(editor) {
                console.debug('shift-return pressed')
                projectService.build('preview')
            }
        })
    })
    .controller('BaseController', function($routeParams, projectService) {

        projectService
            .open('examples/' + $routeParams.name)
            .then(function() {
                projectService.build('preview')
            })
    })