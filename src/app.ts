import express from 'express';

import { syntheisze } from '@@modules/polly';

syntheisze('Hi, we are team gradhax');

const app = express();
app.listen(4001, () => {
  console.log('Listening...', 4001);
});
