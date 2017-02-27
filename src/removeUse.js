import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';
import getRegistrationName from './getRegistrationName';

export default (packageName, file) => {
  file = file || path.join(process.cwd(), 'src', 'app.js');
  if (fs.existsSync(file)) {

    const registrationName = getRegistrationName(packageName, file);
    if(!registrationName) {
      console.log(chalk.yellow(`import statement was not found for ${chalk.underline(packageName)}`));
      console.log(
        chalk.yellow(`The remove script might have used `) +
        chalk.cyan('removeImport() ') +
        chalk.yellow('before ') +
        chalk.cyan('removeUse()')
      );
      return null;
    }

    let content = fs.readFileSync(file, {encoding: 'utf8'});
    const lines = content.split('\n');
    let lineNumber;

    const regExp = new RegExp('app\.use.*' + registrationName, 'g');
    lines.filter((word, index) => {
      if (word.match(regExp)) {
        lineNumber = index;
        return true;
      }
      return false;
    });

    if(lineNumber === undefined) {
      console.log(chalk.yellow(`Could not find app.use for ${chalk.underline(packageName)}`));

      return null;
    }

    lines.splice(lineNumber, 1);

    content = lines.join('\n');

    fs.writeFileSync(file, content, {encoding: 'utf8'});
  } else {
    console.log(chalk.red(`app.js at path ${file} not found`));
  }
}
