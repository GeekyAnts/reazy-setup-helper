import { isWeb } from 'reazy';
import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';

export default (key, file) => {
  if(isWeb()) {
    file = file || path.join(process.cwd(), '.env.json');

    if(fs.existsSync(file)) {
      const content = require(file);
      delete content[key];
      fs.writeJsonSync(file, content);
    } else {
      console.log(chalk.red(`Env file at path ${file} not found`));
    }

  } else {
    file = file || path.join(process.cwd(), '.env');

    if(fs.existsSync(file)) {
      let content = fs.readFileSync(file, {encoding: 'utf8'});
      const envConfigs = content.split('\n');
      let lineNumber;

      envConfigs.filter((word, index) => {
        if (word.indexOf(key) === 0) {
          lineNumber = index;
          return true;
        }
        return false;
      });

      if(lineNumber !== undefined) {
        envConfigs.splice(lineNumber, 1);
        content = envConfigs.join('\n');
        fs.writeFileSync(file, content, {encoding: 'utf8'});
      }

    } else {
      console.log(chalk.red(`Env file at path ${file} not found`));
    }
  }
}
