
'use strict';

module.exports =
  angular
  .module('diDocuments.sheet', [])
  .factory('Sheet', function() {

  return function(sheetData) {

    angular.extend(this, {
      id: new Date().getTime(),
      title: 'Untitled Document.xml',
      body: ''//require('raw!../../../canvas.xml')
    });

    return angular.extend(this, sheetData);
  };

});
