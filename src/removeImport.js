import fs from 'fs-extra';
import path from 'path';

export default (packageName, file) => {
  file = file || path.join(process.cwd(), 'src', 'app.js');

  if (fs.existsSync(file)) {
    var content = fs.readFileSync(file).toString();
    const lines = content.split('\n');
    let lineNumber;

    lines.filter((word, index) => {
      if (
        word.indexOf('import') !== -1 &&
        (word.indexOf(`'${packageName}'`) !== -1 || word.indexOf(`"${packageName}"`) !== -1)
      ) {
        lineNumber = index;
        return true;
      }
      return false;
    });

    if(lineNumber !== undefined) {
      lines.splice(lineNumber, 1);
      content = lines.join('\n');
      fs.writeFileSync(file, content, {encoding: 'utf8'});
    }
  } else {
    console.log(chalk.red(`app.js at path ${file} not found`));
  }
}
