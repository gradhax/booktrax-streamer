import express from 'express';

import { analyze } from '@@modules/nl';
import { synthesize } from '@@modules/polly';

const router = express.Router();

router.post('/analyze', async (req, res, next) => {
  const text = `
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

  const analyzedSentences = await analyze(text);

  res.send({
    result: {
      analyzedSentences,
    },
  });
});

export default () => router;
