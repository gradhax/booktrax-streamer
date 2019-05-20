require('./keys/gcpKeyGenerator.js')();
require('./keys/localKeyInit.js')();

(async () => {
  try {
    const bodyParser = await import('body-parser');
    const cors = (await import('cors')).default;
    const { default: express } = (await import('express'));
    const http = await import('http');

    const apis = (await import('./apis')).default;
    const behavior = (await import('./behavior')).default;
    const { init } = await import('@@modules/io');
    const log = (await import('@@modules/log')).default;

    const port = process.env.PORT || 4001;
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
    });

    function httpLogger() {
      return (req, res, next) => {
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
  } catch (err) {
    console.log('Error', err);
  }
})();
