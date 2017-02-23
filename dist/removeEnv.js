'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reazy = require('reazy');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (key, file) {
  if ((0, _reazy.isWeb)()) {
    file = file || _path2.default.join(process.cwd(), '.env.json');

    if (_fsExtra2.default.existsSync(file)) {
      var content = require(file);
      delete content[key];
      _fsExtra2.default.writeJsonSync(file, content);
    } else {
      console.log(_chalk2.default.red('Env file at path ' + file + ' not found'));
    }
  } else {
    file = file || _path2.default.join(process.cwd(), '.env');

    if (_fsExtra2.default.existsSync(file)) {
      var _content = _fsExtra2.default.readFileSync(file, { encoding: 'utf8' });
      var envConfigs = _content.split('\n');
      var lineNumber = void 0;

      envConfigs.filter(function (word, index) {
        if (word.indexOf(key) === 0) {
          lineNumber = index;
          return true;
        }
        return false;
      });

      if (lineNumber !== undefined) {
        envConfigs.splice(lineNumber, 1);
        _content = envConfigs.join('\n');
        _fsExtra2.default.writeFileSync(file, _content, { encoding: 'utf8' });
      }
    } else {
      console.log(_chalk2.default.red('Env file at path ' + file + ' not found'));
    }
  }
};