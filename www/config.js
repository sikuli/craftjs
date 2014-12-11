var rc = require('rc'),
  defaultConfig = {
    title: 'CraftML Online Editor',
    description: 'CraftML is an XML Markup Language for Defining 3D Printable Models. 100% Open Source!',
    googleWebmasterMeta: 'DAyGOgtsg8rJpq9VVktKzDkQ1UhXm1FYl8SD47hPkjA',
    keywords: '3D, OpenSCAD, OpenJSCAD, Open Source, Node.js',
    author: 'Sikuli Lab'
  };

module.exports = function() {
  return rc('dillinger', defaultConfig);
};
