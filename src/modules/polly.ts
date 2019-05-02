import aws from 'aws-sdk';
import fs from 'fs';

import log from '@@modules/log';
import paths from '@@src/paths';

const polly = (function init() {
  const {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
  } = process.env;

  if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
    throw new Error('[polly] keys are not defined');
  }

  log(
    '[polly] initializing, keys: %s, %s distPath: %s',
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    paths.dist,
  );

  const polly = new aws.Polly({
    credentials: new aws.Credentials({
      accessKeyId: AWS_ACCESS_KEY_ID as string,
      secretAccessKey: AWS_SECRET_ACCESS_KEY as string,
    }),
    region: 'us-west-2',
    signatureVersion: 'v4',
  });

  try {
    if (!fs.existsSync(paths.dist)) {
      fs.mkdirSync(paths.dist, { recursive: true });
    }
  } catch (err) {
    log('', err);
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
    log('polly.synthesize(): begin synthesizing, requestId: %s', requestId);

    polly.synthesizeSpeech(params, (err, data) => {
      if (err) {
        log('polly.synthesize(): fail', err.code);
        reject({
          error: true,
        });
      } else if (data) {
        log('polly.synthesize(): API responded, characters: %s', data.RequestCharacters);

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
