import express from 'express';

import { analyze, analyzeEntities } from '@@modules/nl';
import { synthesize } from '@@modules/polly';
import { getRandomGif } from '@@modules/giphy';

const router = express.Router();

router.post('/analyze', async (req, res, next) => {
  const { analyze_text } = req.body;
  const analyzeText = analyze_text ||
`The little town of Verrières can pass for one of the prettiest in Franche-Comté. Its white houses with their pointed red-tiled roofs stretch along the slope of a hill, whose slightest undulations are marked by groups of vigorous chestnuts. The Doubs flows to within some hundred feet above its fortifications, which were built long ago by the Spaniards, and are now in ruins. 
Verrières is sheltered on the north by a high mountain which is one of the branches of the Jura. The jagged peaks of the Verra are covered with snow from the beginning of the October frosts. A torrent which rushes down from the mountains traverses Verrières before throwing itself into the Doubs, and supplies the motive power for a great number of saw mills. The industry is very simple, and secures a certain prosperity to the majority of the inhabitants who are more peasant than bourgeois. It is not, however, the wood saws which have enriched this little town. It is the manufacture of painted tiles, called Mulhouse tiles, that is responsible for that general affluence which has caused the façades of nearly all the houses in Verrières to be rebuilt since the fall of Napoleon.`;

  const splitText = analyzeText.split('\n');
  const paragraphs = splitText.filter(split => {
    return split && split.trim().length > 0;
  });
  const promises = paragraphs.map(async function(paragraph) {
    const { documentSentiment, sentences } = await analyze(paragraph) as any;
    const voicePromise = sentences.map(({ text }, idx) => {
      text.$requestId = idx;
      return synthesize({
        requestId: idx,
        text: text.content,
      });
    });
    const entity = await analyzeEntities(analyzeText) as any;
    const voices = await Promise.all(voicePromise);
    const gifUrl = await getRandomGif(entity.name);
    return {
      analyze: {
        documentSentiment,
        sentences,
      },
      entity: {
        name: entity.name,
        salience: entity.salience,
        gifUrl: gifUrl,
      },
      voices,
    };
  });

  const result = await Promise.all(promises);
  console.log('result', result);

  res.send(result);
});

export default () => router;
