'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _addImport = require('./addImport');

var _addImport2 = _interopRequireDefault(_addImport);

var _removeImport = require('./removeImport');

var _removeImport2 = _interopRequireDefault(_removeImport);

var _addEnv = require('./addEnv');

var _addEnv2 = _interopRequireDefault(_addEnv);

var _removeEnv = require('./removeEnv');

var _removeEnv2 = _interopRequireDefault(_removeEnv);

var _getRegistrationName = require('./getRegistrationName');

var _getRegistrationName2 = _interopRequireDefault(_getRegistrationName);

var _addUse = require('./addUse');

var _addUse2 = _interopRequireDefault(_addUse);

var _removeUse = require('./removeUse');

var _removeUse2 = _interopRequireDefault(_removeUse);

var _runGenerator = require('./runGenerator');

var _runGenerator2 = _interopRequireDefault(_runGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  addEnv: _addEnv2.default,
  removeEnv: _removeEnv2.default,
  addImport: _addImport2.default,
  removeImport: _removeImport2.default,
  addUse: _addUse2.default,
  removeUse: _removeUse2.default,
  getRegistrationName: _getRegistrationName2.default,
  runGenerator: _runGenerator2.default
};