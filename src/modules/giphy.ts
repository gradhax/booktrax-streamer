import axios from 'axios';
import keys from '@@keys';

import log from '@@modules/log';

const HOST = 'http://api.giphy.com';

export async function getRandomGif(tag: string, rating: string = 'g', fmt: string = 'json') {
  log('giphy.getRandomGif(): begin finding: %s', tag);

  return new Promise((resolve, reject) => {
    const { giphyKeys } = keys;

    axios.get(`${HOST}/v1/gifs/random?api_key=${giphyKeys.apiKey}&tag=${escape(tag)}&rating=${rating}&fmt=${fmt}`)
      .then(({ data }) => {
        log('giphy.getRandomGif(): API responded, found %o', data.data.id);

        const result = data.data.image_url;
        resolve(result);
      })
      .catch((err) => {
        resolve('');
      });
  });
}
