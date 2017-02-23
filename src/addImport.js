import transform from './lib/transform';
import fs from 'fs-extra';
import path from 'path';

export default (packageName, as, subTree, position, file) => {
  file = file || path.join(process.cwd(), 'src', 'app.js');
  if(position === undefined) {
    position = -1;
  }

  if (fs.existsSync(file)) {
    var content = fs.readFileSync(file).toString();

    if(position === -1) {
      const lines = content.split('\n');
      let lineNumber;

      lines.filter((word, index) => {
        if (word.match(/import.*from.*/g)) {
          lineNumber = index;
          return true;
        }
        return false;
      });

      let importStatement;

      if(!subTree || subTree.length === 0) {
        importStatement = 'import ' + as + ' from \'' + packageName + '\';\n';
      } else {
        importStatement =
          'import ' + as + ', { '
          + subTree
          + ' } from \'' + packageName + '\';\n';
      }

      lines.splice(lineNumber + 1, 0, importStatement);

      content = lines.join('\n');
    } else {
      var ast = transform.parse(content);
      transform.addImport(ast, as, packageName, subTree, position);
      content = transform.print(ast);
    }

    fs.writeFileSync(file, content);
  } else {
    console.log(chalk.red(`app.js at path ${file} not found`));
  }
}
