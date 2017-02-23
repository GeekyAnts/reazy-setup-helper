'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reazy = require('reazy');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (key, value, file) {
  if ((0, _reazy.isWeb)()) {
    file = file || _path2.default.join(process.cwd(), '.env.json');

    var content = void 0;

    if (_fsExtra2.default.existsSync(file)) {
      content = require(file);
    } else {
      content = {};
    }
    content[key] = value;
    _fsExtra2.default.writeJsonSync(file, content);0;
  } else {
    file = file || _path2.default.join(process.cwd(), '.env');
    var _content = key + '=' + value;

    if (_fsExtra2.default.existsSync(file)) {
      _fsExtra2.default.appendFileSync(file, '\n' + _content + '\n');
    } else {
      _fsExtra2.default.writeFileSync(file, _content, { encoding: 'utf8' });
    }
  }
};