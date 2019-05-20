import fs from 'fs';
import language from '@google-cloud/language';
import path from 'path';

import paths from '@@src/paths';
import { getRandomInt } from '@@utils/random';
import log from '@@modules/log';

const PROJECT_ID = 'gradhax-237506';

const client = (function init() {
  try {
    if (!fs.existsSync(paths.gcpKeys)) {
      log('Key not found: %s', paths.gcpKeys);
      throw new Error('No key file');
    }

    const _client = new language.LanguageServiceClient({
      projectId: PROJECT_ID,
      keyFilename: paths.gcpKeys,
    });
    console.log('[nl] client connection success', _client.auth);

    return _client;
  } catch (err) {
    log('Error initializing nl client', err);
    throw err;
  }
})();

export function analyze(text) {
  log('nl.analyze(): begin parsing, text of length: %s', text.length);

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  return new Promise((resolve, reject) => {
    client
      .analyzeSentiment({document: document})
      .then(([ result ]) => {
        log('nl.analyze(): API responded');

        if (!result || !result.sentences) {
          reject({
            error: true,
            msg: 'No analyzed data',
          });
        }
        resolve(result);
      })
      .catch(err => {
        log('nl.analyze(): error', err);
        reject({
          error: true,
          errorObj: err,
        });
      });
    });
}

export function analyzeEntities(text) {
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  return new Promise((resolve, reject) => {
    client
      .analyzeEntities({document: document})
      .then(([ result ]) => {
        log('nl.analyzeEntities(): API responded');

        if (!result || !result.entities || result.entities.length < 1) {
          reject({
            error: true,
            msg: 'No entity data',
          });
        }
        const idx = getRandomInt(0, result.entities.length);
        resolve(result.entities[idx]);
      })
      .catch(err => {
        log('nl.analyzeEntities(): error', err);
        reject({
          error:true,
          errorObj: err,
        });
      })
  });
}
