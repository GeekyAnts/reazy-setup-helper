'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _child_process = require('child_process');

// Return the version of yarn installed on the system, null if yarn is not available.
exports.default = function () {
  var yarnVersion;
  try {
    // execSync returns a Buffer -> convert to string
    if (process.platform.startsWith('win')) {
      yarnVersion = ((0, _child_process.execSync)('yarn --version').toString() || '').trim();
    } else {
      yarnVersion = ((0, _child_process.execSync)('yarn --version 2>/dev/null').toString() || '').trim();
    }
  } catch (error) {
    return null;
  }
  return yarnVersion;
};