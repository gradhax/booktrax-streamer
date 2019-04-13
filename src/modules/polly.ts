import aws from 'aws-sdk';
import fs, { promises } from 'fs';
import path, { resolve } from 'path';

import keys from '@@keys';
import paths from '@@src/paths';

const polly = (function init() {
  const { awsKeys } = keys;

  console.info(
`
>>> polly is initializing
>>> keys: %o
>>> distPath: %s
`,
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

export function synthesize({
  requestId,
  text,
  voiceId = "Kimberly",
}) {
  if (!polly) {
    throw new Error('polly is not initialized');
  }

  const params = {
    'Text': text,
    'OutputFormat': 'mp3',
    'VoiceId': voiceId
  };

  return new Promise((resolve, reject) => {
    console.log('polly.synthesize(): begin synthesizing, requestId: %s', requestId);

    polly.synthesizeSpeech(params, (err, data) => {
      if (err) {
        console.error('polly.synthesize(): fail', err.code);
        reject({
          error: true,
        });
      } else if (data) {
        console.log('polly.synthesize(): API responded', data);

        if (data.AudioStream instanceof Buffer) {
          resolve({
            data,
            $requestId: requestId,
            ts: Date.now(),
          });
        } else {
          reject({
            error: true,
          });
        }
      }
    });
  });
}
