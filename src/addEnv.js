import { isWeb } from 'reazy';
import path from 'path';
import fs from 'fs-extra';

export default (key, value, file) => {
  if(isWeb()) {
    file = file || path.join(process.cwd(), '.env.json');

    let content;

    if(fs.existsSync(file)) {
      content = require(file);
    } else {
      content = {};
    }
    content[key] = value;
    fs.writeJsonSync(file, content);0

  } else {
    file = file || path.join(process.cwd(), '.env');
    const content = `${key}=${value}`;

    if(fs.existsSync(file)) {
      fs.appendFileSync(file, '\n' + content + '\n');
    } else {
      fs.writeFileSync(file, content, {encoding: 'utf8'});
    }
  }
}
