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

exports.default = function (packageName, file) {
  file = file || _path2.default.join(process.cwd(), 'src', 'app.js');
  if (_fsExtra2.default.existsSync(file)) {

    var registrationName = (0, _getRegistrationName2.default)(packageName, file);

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

    lines.splice(lineNumber, 1);

    content = lines.join('\n');

    _fsExtra2.default.writeFileSync(file, content, { encoding: 'utf8' });
  } else {
    console.log(chalk.red('app.js at path ' + file + ' not found'));
  }
};