import aws from 'aws-sdk';
import fs from 'fs';
import path from 'path';

import keys from '@@keys';
import paths from '@@src/paths';

const polly = (function init() {
  const { awsKeys } = keys;

  console.info(
    '>>> polly is initializing, \n>>> keys: %o\n>>> distPath: %s',
    awsKeys,
    paths.dist
  );

  const polly = new aws.Polly({
    credentials: new aws.Credentials({
      accessKeyId: awsKeys.accessKeyId,
      secretAccessKey: awsKeys.secretAccessKey,
    }),
    region: 'us-west-2',
    signatureVersion: 'v4',
  });

  try {
    fs.mkdirSync(paths.dist, { recursive: true });
  } catch (err) {
    console.error(err);
    throw new Error('polly, error creating dist path');
  }

  return polly;
})();

export function syntheisze(text: string) {
  if (!polly) {
    throw new Error('polly is not initialized');
  }

  const params = {
    'Text': text,
    'OutputFormat': 'mp3',
    'VoiceId': 'Kimberly'
  };

  return new Promise((resolve, reject) => {
    polly.synthesizeSpeech(params, (err, data) => {
      if (err) {
        console.log('polly synthesizeSpeech(): fail', err.code);
        reject(-2);
      } else if (data) {
        if (data.AudioStream instanceof Buffer) {
          const ts = Date.now();
          fs.writeFile(`${paths.dist}/speech-${ts}.mp3`, data.AudioStream, function(err) {
            if (err) {
              console.log(err);
              reject(-1);
            }
            console.log('polly synthesizeSpeech(): The file was saved!');
            resolve('good');
          });
        }
      }
    });
  });
}
