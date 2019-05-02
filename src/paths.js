const path = require('path');

module.exports = {
  dist: path.resolve(__dirname, '..', 'dist'),
  gcpKeys: path.resolve(__dirname, 'keys', 'gcp.keys.json'),
};
