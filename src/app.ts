import express from 'express';

import { synthesize } from '@@modules/polly';
import { analyzeSentiment } from '@@modules/sentiment';

async function func() {
  const sentiment = await analyzeSentiment("Hello, world! This is a very positive sentence, you are beautiful! This is so so horribly sad, you are dumb!");
  console.log(22, sentiment);
}

func();

// sentiment.sentences.forEach(sentence => {
//   synthesize(sentence.text.content);
// })
//synthesize('Hi, we are team gradhax');

const app = express();
app.listen(4001, () => {
  console.log('Listening...', 4001);
});
