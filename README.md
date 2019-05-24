# BookTrax Streamer
**BookTrax** is an audiobook generating application that enhances the reading experience by adding context-aware audio/visual multimedia to the plain text.

Utilizing AI services from Amazon and Google based on deep learning models, text is analyzed for **sentiment and entity extraction** that is used to play appropriate **background soundtracks** and display a relevant **GIF** via the Giphy API. As the narrator reads the text, users can also follow along on the screen via *text highlighting*.

The [client side application (booktrax-web)](https://github.com/gradhax/booktrax-web) interacts with server side via **web socket**.

![demo](https://github.com/gradhax/booktrax-streamer/blob/master/docs/demo.gif?raw=true)

## Abstract
Let raw text T be a sequence of paragraph p (p1p2p3...pn), where a paragraph ends with new line character `\n`, and each consists of one or more words.

Behavior **Analyze** is a function A(p): (m, S), where p is a paragraph, m is a document sentiment and S is a sequence of sentences s.

Behavior **AnalyzeEntities** is a function N(t): e, where t is a text and e is the most prominent entity that appears in the text.ㄷ

Behavior **Synthesize** is a function Y(s): v, where s is a sentence or any raw text and v is a synthesized human voice reading loud the given sentence.

Behavior **getRandomGif** is a function G(e): u, where e is an entity or a word and u is a url of an image most likely representing the entity.

The core routine of booktrax runs as the following.
```
routine:
  P = split(T)
  { m, S } = A(P)
  V = Y(S)
  e = N(T)
  u = G(e)

  return (m, S, e, u, V)
```

## Demo
The application is deployed at [https://booktrax-web.herokuapp.com/](https://booktrax-web.herokuapp.com/). It might not longer be available in the near future.

## Third-party APIs
BookTrax Streamer integrates with the following APIs:
* **Google Cloud Natural Language API** - sentiment analysis and entity extraction
* **Amazon AWS Polly** - text-to-speech synthesis
* **Giphy API** - get a random relevant GIF based on a tag, in this case the most relevant entity

## HackSC 2019
BookTrax was originally developed by the team **GradHax** for the HackSC 2019 Hackathon held in Los Angeles, April 2019.

- [BookTrax DevPost](https://devpost.com/software/booktrax)
