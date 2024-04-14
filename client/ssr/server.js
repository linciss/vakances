import 'ignore-styles';
import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import App from '../src/App';
import { StaticRouter } from 'react-router-dom/server';
import path from 'path';
import fse from 'fs-extra';
import compression from 'compression';

const app = express();

app.use(express.static('public'));
app.use(express.static('dist', { index: false }));
app.use(express.static('node_modules'));

app.use(compression());

app.get('/*', (req, res) => {
  const app = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );

  const template = path.resolve('./dist/index.html');

  fse.readFile(template, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error');
    }
    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});

app.listen(8080, () => {
  console.log('Server is listening on port 8080');
});
