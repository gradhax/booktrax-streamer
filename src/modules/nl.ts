import fs from 'fs';
import language from '@google-cloud/language';
import path from 'path';

const PROJECT_ID = 'gradhax-237506';

const privateKeyFilePath = path.resolve(__dirname, '..', '..', '__keys', 'gcp.keys.json');

const client = (function init() {
  try {
    if (!fs.existsSync(privateKeyFilePath)) {
      console.error('Key not found: %s', privateKeyFilePath);
      throw new Error('No key file');
    }

    const _client = new language.LanguageServiceClient({
      projectId: PROJECT_ID,
      keyFilename: privateKeyFilePath,
    });
    return _client;
  } catch (err) {
    console.error('Error initializing nl client', err);
    throw err;
  }
})();

export function analyze(text) {
  console.log('nl.analyze(): begin parsing, text of length: %s', text.length);

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  return new Promise((resolve, reject) => {
    client
      .analyzeSentiment({document: document})
      .then(([ result ]) => {
        if (!result || !result.sentences) {
          reject({
            error: true,
            msg: 'No analyzed data',
          });
        }
        resolve(result);
      })
      .catch(err => {
        console.error('nl.analyze(): error', err);
        reject({
          error: true,
          errorObj: err,
        });
      });
    });
}
