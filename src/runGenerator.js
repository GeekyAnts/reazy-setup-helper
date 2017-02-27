import yeoman from 'yeoman-environment';
import chalk from 'chalk';

const env = yeoman.createEnv();

export default (generatorPath, generatorName, cb) => {

  env.register(generatorPath, generatorName);

  env.run(generatorName, { disableNotifyUpdate: true }, (err) => {
    cb(err);
  });
}
