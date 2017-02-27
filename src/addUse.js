import path from 'path';
import fs from 'fs-extra';
import getRegistrationName from './getRegistrationName';

export default (statement, position, afterPackage, file) => {
  file = file || path.join(process.cwd(), 'src', 'app.js');
  if (fs.existsSync(file)) {

    if(position === undefined) {
      position = -1;
    }

    let content = fs.readFileSync(file, {encoding: 'utf8'});
    const lines = content.split('\n');

    let lineNumber;

    if(afterPackage && getRegistrationName(afterPackage, file)) {
      const registrationName = getRegistrationName(afterPackage, file);

      const appUseRegExp = new RegExp('app\.use.*' + registrationName, 'g');
      lines.filter(function (word, index) {
        if (word.match(appUseRegExp)) {
          lineNumber = index;
          return true;
        }
        return false;
      });

      lineNumber = lineNumber + 1;

    } else {
      let firstLineNumber;
      let lastLineNumber;

      lines.filter((word, index) => {
        if (word.match(/app\.use.*/g)) {
          if(!firstLineNumber) {
            firstLineNumber = index;
          } else {
            lastLineNumber = index;
          }
          return true;
        }
        return false;
      });

      if(position === -1) {
        lineNumber = lastLineNumber + 1;
      } else {
        lineNumber = firstLineNumber + position;
      }
    }

    lines.splice(lineNumber, 0, statement);

    content = lines.join('\n');

    fs.writeFileSync(file, content, {encoding: 'utf8'});
  } else {
    console.log(chalk.red(`app.js at path ${file} not found`));
  }
}
