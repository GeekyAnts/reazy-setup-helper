'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _getRegistrationName = require('./getRegistrationName');

var _getRegistrationName2 = _interopRequireDefault(_getRegistrationName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (packageName, file) {
  file = file || _path2.default.join(process.cwd(), 'src', 'app.js');
  if (_fsExtra2.default.existsSync(file)) {

    var registrationName = (0, _getRegistrationName2.default)(packageName, file);
    if (!registrationName) {
      console.log(_chalk2.default.yellow('import statement was not found for ' + _chalk2.default.underline(packageName)));
      console.log(_chalk2.default.yellow('The remove script might have used ') + _chalk2.default.cyan('removeImport() ') + _chalk2.default.yellow('before ') + _chalk2.default.cyan('removeUse()'));
      return null;
    }

    var content = _fsExtra2.default.readFileSync(file, { encoding: 'utf8' });
    var lines = content.split('\n');
    var lineNumber = void 0;

    var regExp = new RegExp('app\.use.*' + registrationName, 'g');
    lines.filter(function (word, index) {
      if (word.match(regExp)) {
        lineNumber = index;
        return true;
      }
      return false;
    });

    if (lineNumber === undefined) {
      console.log(_chalk2.default.yellow('Could not find app.use for ' + _chalk2.default.underline(packageName)));

      return null;
    }

    lines.splice(lineNumber, 1);

    content = lines.join('\n');

    _fsExtra2.default.writeFileSync(file, content, { encoding: 'utf8' });
  } else {
    console.log(_chalk2.default.red('app.js at path ' + file + ' not found'));
  }
};