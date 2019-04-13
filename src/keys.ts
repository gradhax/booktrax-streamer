import path from 'path';

const PRIVATE_KEY_PATH = path.resolve(__dirname, '..', '__keys');

let keys;

try {
  const awsKeys = require(`${PRIVATE_KEY_PATH}/aws.keys`);
  keys = {
    ...keys,
    awsKeys,
  };
} catch (err) {
  console.error(`You haven't setup keys. Make sure you have it in the right location`);
}

export default keys;