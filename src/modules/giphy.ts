import axios from 'axios';

import log from '@@modules/log';

const HOST = 'http://api.giphy.com';

export async function getRandomGif(tag: string, rating: string = 'g', fmt: string = 'json') {
  log('giphy.getRandomGif(): begin finding: %s', tag);

  return new Promise((resolve, reject) => {
    const { GIPHY_API_KEY } = process.env;

    axios.get(`${HOST}/v1/gifs/random?api_key=${GIPHY_API_KEY}&tag=${escape(tag)}&rating=${rating}&fmt=${fmt}`)
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
