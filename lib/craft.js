// The module to be exported.
var craft = module.exports = {};

// Expose components
function gRequire(name) {
  return craft.components[name] = require('./components/' + name);
}

craft.components = {};

// Require all components
// TODO: do this automatically
gRequire('canvas');
gRequire('pin');