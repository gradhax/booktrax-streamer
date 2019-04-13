import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Request, NextFunction } from 'express';
import http from 'http';

import apis from './apis';
import { init } from '@@modules/io';

const port = 4001;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(log());
app.use(apis());
app.use(noMatch());

const server = http.createServer(app);
init(server);
server.listen(port, () => {
  console.log('App is listening on port: %s', port);
})

function log() {
  return (req, res, next: NextFunction) => {
    console.info(
      '%s - %s %j %j',
      new Date().toISOString(),
      req.url,
      req.params,
      req.body,
    );
    next();
  };
}

function noMatch() {
  return (req, res, next) => {
    res.send({
      error: true,
      msg: 'No matched route',
      requestUrl: req.url,
    });
  };
}
