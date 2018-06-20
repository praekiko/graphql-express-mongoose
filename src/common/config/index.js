import localhost from './config.localhost';
import develop from './config.develop';
import production from './config.production';

const setupConfig = (env) => {
  switch (env) {
    case 'production':
      return production;
    case 'develop':
      return develop;
    default:
      return localhost;
  }
};

const env = process.env.NODE_ENV || 'localhost';
console.log('Environment =----> ', env);

export default setupConfig(env);
