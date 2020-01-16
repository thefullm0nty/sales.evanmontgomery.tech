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
    next(new ClientError(`cannot ${req.method} ${req.originalUrl}. Please enter a positive number`, 400));
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
        next(new ClientError(`cannot ${req.method} ${req.originalUrl}. Product does not exist`, 404));
      } else {
        res.status(200).json(data);
      }
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  db.query("select 'Cart' as \"message\"")
    .then(res => res.json([]))
    .catch(err => next(err));
});

app.post('/api/cart', (req, res, next) => {
  const productId = req.body.productId
  console.log("product ID: ", productId)

  if (!parseInt(productId)) {
    next(new ClientError('Product id must be a number.', 400));
  }

  const SQLPrice = `
    select "price"
      from "products"
      where "productId" = $1;
  `;
  const params = [productId]

  db.query(SQLPrice, params)
    .then(res => {
      console.log('res.rows: ', res.rows);
      console.log('req.body: ', req.body);
      if (res.rows.length === 0) {
        next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 400));
      }

      const productPrice = res.rows[0].price;
      const cartId = req.session.cartId;

      if (!cartId){
        const SQLCart = `
          insert into "carts" ("cartId", "createdAt")
          values (default, default)
          returning "cartId"
          `;
        return db.query(SQLCart)
          .then(res => {
            const newCart = {};
            newCart.cartId = res.rows[0].cartId;
            newCart.productPrice = productPrice;
            console.log("new cart: ", newCartInfo)
            return newCartInfo;
          });
      } else {
        return { cartId, productPrice };
      }
    })
    .then(cartData => {
      console.log("cart data: ", cartData)
    })
    .catch(err => next(err));
});

app.use('/api/cart', (req, res, next) => {
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
