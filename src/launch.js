const babelRc = require('./.babelrc');

require('@babel/polyfill');

require('@babel/register')({
  ...babelRc,
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
});

require('./keys/gcpKeyGenerator.js')();

require('./app.ts');
