import fs from 'fs-extra';
import path from 'path';

export default (packageName, file) => {
  file = file || path.join(process.cwd(), 'src', 'app.js');

  if (fs.existsSync(file)) {
    var content = fs.readFileSync(file).toString();
    const lines = content.split('\n');
    let importLineNumber;

    // Find import statement for the package
    const regExp = new RegExp('import.*from.*' + packageName, 'g');
    lines.filter((word, index) => {
      if (word.match(regExp)) {
        importLineNumber = index;
        return true;
      }
      return false;
    });

    const importStatement = lines[importLineNumber];

    if(!importStatement) {
      return null;
    }

    let imports = importStatement.split('import')[1];
    if(imports) {
      imports = imports.split('from')[0];
    }
    if(imports) {
      imports = imports.split(',');
    }

    let importVarName;
    imports.forEach((word, index) => {
      if(word.indexOf('{') === -1) {
        importVarName = word;
      }
    });

    importVarName = importVarName.trim();

    // Find app.use statement for this service
    let appUseLineNumber;
    const appUseRegExp = new RegExp('app\.use.*' + importVarName, 'g');

    lines.filter((word, index) => {
      if (word.match(appUseRegExp)) {
        appUseLineNumber = index;
        return true;
      }
      return false;
    });

    const appUseStatement = lines[appUseLineNumber];

    let regName = appUseStatement.split(',')[1]
    if(regName) {
      regName = regName.split(')')[0];
    }
    if(regName) {
      regName = regName.trim().replace(/[\'\"]/g, '');
    }

    return regName;
  } else {
    console.log(chalk.red(`app.js at path ${file} not found`));
  }
}
