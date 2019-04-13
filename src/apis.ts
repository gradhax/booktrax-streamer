import express from 'express';
import bodyParser from 'body-parser';

import { analyze } from '@@modules/nl';
import { synthesize } from '@@modules/polly';
import { getRandomGif } from '@@modules/giphy';

const app = express();
const router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.post('/analyze', async (req, res, next) => {
  let analyzeText;
  if (req.body.analyze_text)
    analyzeText = req.body.analyze_text;
  else
    analyzeText = `
      Verrières is sheltered on the north by a high mountain which is one of
      the branches of the Jura. The jagged peaks of the Verra are covered
      with snow from the beginning of the October frosts. A torrent which
      rushes down from the mountains traverses Verrières before throwing
      itself into the Doubs, and supplies the motive power for a great number
      of saw mills. The industry is very simple, and secures a certain
      prosperity to the majority of the inhabitants who are more peasant than
      bourgeois. It is not, however, the wood saws which have enriched this
      little town. It is the manufacture of painted tiles, called Mulhouse
      tiles, that is responsible for that general affluence which has caused
      the façades of nearly all the houses in Verrières to be rebuilt since
      the fall of Napoleon.
      `;

  const { documentSentiment, sentences } = await analyze(analyzeText) as any;
  const voicePromise = sentences.map(({ text }, idx) => {
    text.$requestId = idx;

    return synthesize({
      requestId: idx,
      text: text.content,
    });
  });
  const voices = await Promise.all(voicePromise);

  res.send({
    analyze: {
      documentSentiment,
      sentences,
    },
    voices,
  });
});

router.post('/getGif', async (req, res, next) => {
  let gifTag;
  if (req.body.gif_tag)
    gifTag = req.body.gif_tag;
  else
    gifTag = 'HACKERS';

  const gif = await getRandomGif(gifTag);
  console.log(gif);

  res.send({
    gif_tag: gifTag,
    gif_url: gif,
  });
});

export default () => router;
