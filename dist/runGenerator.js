'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _yeomanEnvironment = require('yeoman-environment');

var _yeomanEnvironment2 = _interopRequireDefault(_yeomanEnvironment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = _yeomanEnvironment2.default.createEnv();

exports.default = function (generatorPath, generatorName) {

  env.register(generatorPath, generatorName);

  env.run(generatorName, { disableNotifyUpdate: true });
};