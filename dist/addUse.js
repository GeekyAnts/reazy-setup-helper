'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _getRegistrationName = require('./getRegistrationName');

var _getRegistrationName2 = _interopRequireDefault(_getRegistrationName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (statement, position, afterPackage, file) {
  file = file || _path2.default.join(process.cwd(), 'src', 'app.js');
  if (_fsExtra2.default.existsSync(file)) {

    if (position === undefined) {
      position = -1;
    }

    var content = _fsExtra2.default.readFileSync(file, { encoding: 'utf8' });
    var lines = content.split('\n');

    var lineNumber = void 0;

    if (afterPackage) {
      var registrationName = (0, _getRegistrationName2.default)(afterPackage, file);

      var appUseRegExp = new RegExp('app\.use.*' + registrationName, 'g');
      lines.filter(function (word, index) {
        if (word.match(appUseRegExp)) {
          lineNumber = index;
          return true;
        }
        return false;
      });

      lineNumber = lineNumber + 1;
    } else {
      var firstLineNumber = void 0;
      var lastLineNumber = void 0;

      lines.filter(function (word, index) {
        if (word.match(/app\.use.*/g)) {
          if (!firstLineNumber) {
            firstLineNumber = index;
          } else {
            lastLineNumber = index;
          }
          return true;
        }
        return false;
      });

      if (position === -1) {
        lineNumber = lastLineNumber + 1;
      } else {
        lineNumber = firstLineNumber + position;
      }
    }

    lines.splice(lineNumber, 0, statement);

    content = lines.join('\n');

    _fsExtra2.default.writeFileSync(file, content, { encoding: 'utf8' });
  } else {
    console.log(chalk.red('app.js at path ' + file + ' not found'));
  }
};