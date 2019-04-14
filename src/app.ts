import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Request, NextFunction } from 'express';
import http from 'http';

import apis from './apis';
import behavior from './behavior';
import { init } from '@@modules/io';
import log from '@@modules/log';

const port = 4001;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(httpLogger());
app.use(apis());
app.use(noMatch());

const server = http.createServer(app);
init(server, behavior);
server.listen(port, () => {
  log('App is listening on port: %s', port);
})

function httpLogger() {
  return (req, res, next: NextFunction) => {
    log(
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
