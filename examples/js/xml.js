var craft = require('craft')
var viewer = craft.viewer

// Define a model using xml as a string
var xmlString = '<canvas><pin x="5" y="5"></pin></canvas>'

// Generate a solid from a string
var csg = craft.xml.generate(xmlString)

// View the solid
viewer.view(csg, {src: xmlString})