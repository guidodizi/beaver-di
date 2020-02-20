import express from 'express';
import bodyParser from 'body-parser';
import errorHandling from './utils/errorHandling';
import routes from './routes';

export default function server() {
  const app = express();

  app.use(bodyParser.json());

  routes(app);

  errorHandling(app);

  app.listen(3000, (err) => {
    if (err) {
      console.err(`Error: ${err}`);
      return;
    }

    console.log(`Listening on http://localhost:3000`);
  });

  return app;
}

server();
