'use strict';

module.exports =
    angular
    .module('diDocuments.export', [
        'diDocuments.service',
        'diDocuments.export.service'
    ])
    .controller('DocumentsExport', function($scope, $timeout, documentsExportService) {

        var vm = this,
        $downloader = document.getElementById('downloader');

        // http://stackoverflow.com/questions/19327749/javascript-blob-filename-without-link

        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = 'display: none';

        vm.asSTL = asSTL;
        vm.asSTLBinary = asSTLBinary;
        // vm.asHTML       = asHTML;
        // vm.asStyledHTML = asStyledHTML;
        // vm.asMarkdown   = asMarkdown;
        // vm.asPDF        = asPDF;

        $scope.asSTL = asSTL;
        $scope.asSTLBinary = asSTLBinary;

        function initDownload() {
            var url = documentsExportService.file;
            var name = documentsExportService.name;
            a.download = name;
            a.href = url;
            $timeout(function() {
                a.click();
                window.URL.revokeObjectURL(url);
            });
            return false;
        }

        function asSTL(styled) {
            return documentsExportService.fetchSTL().then(initDownload);
        }

        function asSTLBinary(styled) {
            // return documentsExportService.fetchHTML(styled).then(initDownload);
            return "";
        }

        function asHTML(styled) {
            return documentsExportService.fetchHTML(styled).then(initDownload);
        }

        function asStyledHTML() {
            return asHTML(true);
        }

        function asMarkdown() {
            return documentsExportService.fetchMarkdown().then(initDownload);
        }

        function asPDF() {
            return documentsExportService.fetchPDF().then(initDownload);
        }

        $scope.$on('$destroy', function() {
            vm = null;
            $scope = null;

            return false;
        });

    });