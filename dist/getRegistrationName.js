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
    var importLineNumber = void 0;

    // Find import statement for the package
    var regExp = new RegExp('import.*from.*' + packageName, 'g');
    lines.filter(function (word, index) {
      if (word.match(regExp)) {
        importLineNumber = index;
        return true;
      }
      return false;
    });

    var importStatement = lines[importLineNumber];

    if (!importStatement) {
      return null;
    }

    var imports = importStatement.split('import')[1];
    if (imports) {
      imports = imports.split('from')[0];
    }
    if (imports) {
      imports = imports.split(',');
    }

    var importVarName = void 0;
    imports.forEach(function (word, index) {
      if (word.indexOf('{') === -1) {
        importVarName = word;
      }
    });

    importVarName = importVarName.trim();

    // Find app.use statement for this service
    var appUseLineNumber = void 0;
    var appUseRegExp = new RegExp('app\.use.*' + importVarName, 'g');

    lines.filter(function (word, index) {
      if (word.match(appUseRegExp)) {
        appUseLineNumber = index;
        return true;
      }
      return false;
    });

    var appUseStatement = lines[appUseLineNumber];

    var regName = appUseStatement.split(',')[1];
    if (regName) {
      regName = regName.split(')')[0];
    }
    if (regName) {
      regName = regName.trim().replace(/[\'\"]/g, '');
    }

    return regName;
  } else {
    console.log(chalk.red('app.js at path ' + file + ' not found'));
  }
};