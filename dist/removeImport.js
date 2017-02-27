'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (packageName, file) {
  file = file || _path2.default.join(process.cwd(), 'src', 'app.js');

  if (_fsExtra2.default.existsSync(file)) {
    var content = _fsExtra2.default.readFileSync(file).toString();
    var lines = content.split('\n');
    var lineNumber = void 0;

    lines.filter(function (word, index) {
      if (word.indexOf('import') !== -1 && (word.indexOf('\'' + packageName + '\'') !== -1 || word.indexOf('"' + packageName + '"') !== -1)) {
        lineNumber = index;
        return true;
      }
      return false;
    });

    if (lineNumber === undefined) {
      console.log(chalk.yellow('Could not find import for ' + chalk.underline(packageName)));

      return null;
    }

    lines.splice(lineNumber, 1);
    content = lines.join('\n');
    _fsExtra2.default.writeFileSync(file, content, { encoding: 'utf8' });
  } else {
    console.log(chalk.red('app.js at path ' + file + ' not found'));
  }
};