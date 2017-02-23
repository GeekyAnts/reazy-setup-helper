'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _transform = require('./lib/transform');

var _transform2 = _interopRequireDefault(_transform);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (packageName, as, subTree, position, file) {
  file = file || _path2.default.join(process.cwd(), 'src', 'app.js');
  if (position === undefined) {
    position = -1;
  }

  if (_fsExtra2.default.existsSync(file)) {
    var content = _fsExtra2.default.readFileSync(file).toString();

    if (position === -1) {
      var lines = content.split('\n');
      var lineNumber = void 0;

      lines.filter(function (word, index) {
        if (word.match(/import.*from.*/g)) {
          lineNumber = index;
          return true;
        }
        return false;
      });

      var importStatement = void 0;

      if (!subTree || subTree.length === 0) {
        importStatement = 'import ' + as + ' from \'' + packageName + '\';\n';
      } else {
        importStatement = 'import ' + as + ', { ' + subTree + ' } from \'' + packageName + '\';\n';
      }

      lines.splice(lineNumber + 1, 0, importStatement);

      content = lines.join('\n');
    } else {
      var ast = _transform2.default.parse(content);
      _transform2.default.addImport(ast, as, packageName, subTree, position);
      content = _transform2.default.print(ast);
    }

    _fsExtra2.default.writeFileSync(file, content);
  } else {
    console.log(chalk.red('app.js at path ' + file + ' not found'));
  }
};