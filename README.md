# BookTrax Streamer
## Overview
BookTrax is a web application that enhances the reading experience by adding context-aware audio/visual multimedia in addition to transforming text into an audiobook. Utilizing AI services from Amazon and Google based on deep learning models, text selected for reading is analyzed for sentiment and entity extraction that is used to play appropriate background soundtracks and display a relevant GIF via the Giphy API. As the narrator reads the text, users can also follow along on the screen via text highlighting.

BookTrax was originally developed by the GradHax team for the HackSC Spring 2019 Hackathon held in Los Angeles from April 12th - April 14th.
## BookTrax Streamer Repo
The booktrax-streamer repo stores the code for the node-based server-side application. BookTrax Streamer serves up data for the corresponding client app BookTrax Web by taking in text input and returning sentiment, entity, and audio narration information.
BookTrax Streamer integrates with the following APIs:
* Google Cloud Natural Language API - sentiment analysis and entity extraction
* Amazon AWS Polly - text-to-speech synthesis
* Giphy API - get a random relevant GIF based on a tag, in this case the most relevant entity
The BookTrax Streamer application keeps a communication channel open with the client app with a web socket.
