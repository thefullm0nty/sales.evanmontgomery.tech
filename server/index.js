require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const SQL = `
  select "productId",
    "name",
    "price",
    "image",
    "shortDescription"
  from "products"
  `;

  db.query(SQL)
    .then(result => {
      const data = result.rows;
      res.status(200).json(data);
    })
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const productId = parseInt(req.params.productId);
  const values = [productId];

  if (isNaN(productId) || productId < 0) {
    res.status(400).json({ error: 'Please enter positive number.' });
    return;
  }

  const text = `
  SELECT *
  FROM "products"
  WHERE "productId" = $1
  `;

  db.query(text, values)
    .then(result => {
      const data = result.rows[0];
      if (!data) {
        res.status(404).json({ error: '404 error' });

      } else {
        res.status(200).json(data);
      }
    })
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
