import yeoman from 'yeoman-environment';

const env = yeoman.createEnv();

export default (generatorPath, generatorName) => {

  env.register(generatorPath, generatorName);

  env.run(generatorName, { disableNotifyUpdate: true });
}
