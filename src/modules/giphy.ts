import axios from 'axios';
import keys from '@@keys';

const HOST = 'http://api.giphy.com';

export async function getRandomGif(tag: string, rating: string = 'g', fmt: string = 'json') {
  console.log('giphy.getRandomGif(): request with tag: %s', tag);

  return new Promise((resolve, reject) => {
    const { giphyKeys } = keys;

    axios.get(`${HOST}/v1/gifs/random?api_key=${giphyKeys.apiKey}&tag=${escape(tag)}&rating=${rating}&fmt=${fmt}`)
      .then(({ data }) => {
        console.log('giphy.getRandomGif(): API responded:\n%o', data);

        const result = data && data.images && data.images.original && data.images.original.url;
        resolve(result || 'none');
      })
      .catch((err) => {
        reject(err);
      });
  });
}
