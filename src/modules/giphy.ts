import keys from '@@keys';
const http = require('http');

export async function getRandomGif(tag: string, rating: string = 'g', fmt: string = 'json') {
  return new Promise((resolve, reject) => {
    const { giphyKeys } = keys;
    const options = {
        host: 'api.giphy.com',
        port: 80,
        path: `/v1/gifs/random?api_key=${giphyKeys.apiKey}&rating=${rating}&fmt=${fmt}`,
        method: 'GET',
    }

    http.get(options, (res) => {
        let body: string[] = [];

        res.setEncoding('utf-8');
        res.on('data', (chunk) => {
            body.push(chunk);
        });
        res.on('end', () => {
            const giphyRes = JSON.parse(body.join(''));
            resolve(giphyRes.data.embed_url);
        });
        res.on('error', (err) => {
            console.error('giphy.getRandomGif(): Error with get response');
            reject({
              error: true,
              errorObj: err,
            });
        });
    }).on('error', (err) => {
        console.error('giphy.getRandomGif(): Error with http get');
        reject({
          error: true,
          errorObj: err,
        });
    });
  });
}
