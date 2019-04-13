import path from 'path';

const PRIVATE_KEY_PATH = path.resolve(__dirname, '..', '__keys');

let keys;

try {
  const awsKeys = require(`${PRIVATE_KEY_PATH}/aws.keys`);
  const giphyKeys = require(`${PRIVATE_KEY_PATH}/giphy.keys`);

  keys = {
    ...keys,
    awsKeys,
    giphyKeys,
  };
} catch (err) {
  console.error(
    `You haven't setup keys. Make sure you have it in the right location: %s`,
    PRIVATE_KEY_PATH,
  );
  throw new Error('no keys');
}

export default keys;