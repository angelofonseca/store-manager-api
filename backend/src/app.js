const express = require('express');
const { productsRoute, salesRoute } = require('./routes/index');
// const connection = require('./models/connection');

const app = express();

app.use(express.json());
app.use(productsRoute);
app.use(salesRoute);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;